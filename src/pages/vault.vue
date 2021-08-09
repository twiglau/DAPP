<template>
    <div class="vault_wrap">
        <Spin class="global_loading" tip="loading" :spinning="spinStatus" size="large">
            <div class="lock_box">
                <p class="go_back" @click="handleGoBack">
                    <img class="back_icon" src="../assets/arrow_left.svg" alt="">
                    {{$t('l.back')}}
                </p>
                <div class="token_logo_wrap">
                    <img src="" alt="">
                    <span class="bandge" :class="'bandge-5'">{{currentDaoInfo.lockDay}}</span>
                    <span class="token_name">{{currentDaoInfo.poolName}}</span>
                </div>
                <ul class="data_wrap">
                    <li class="data_item">
                        <span class="data_title">{{$t('l.totalLock')}}</span>
                        <span class="data_value">
                            <countTo :endVal='currentDaoInfo.totalLock/1' :duration='3000' :decimals="2"></countTo>
                        </span>
                    </li>
                    <li class="data_item">
                        <span class="data_title">{{$t('l.rcl')}}</span>
                        <span class="data_value">
                            <countTo :endVal='currentDaoInfo.rcl/1' :duration='3000' :decimals="0"></countTo>
                        </span>
                    </li>
                    <li class="data_item">
                        <span class="data_title">{{$t('l.nhsyl')}}</span>
                        <span class="data_value">
                            <countTo :endVal='currentDaoInfo.apy/1' :duration='3000' :decimals="4" suffix="%"></countTo>
                        </span>
                    </li>
                </ul>
                <div class="operate_wrap">
                    <ul class="vault_nav shadow">
                        <li v-for="(item,index) in navArr" :key="index" @click="handleContChange(index)" class="valut_nav_item" :class="currentIndex == index ? 'active' : ''">{{$t('l.'+item)}}</li>
                        <div id="donghuaBox" :style="{left:currentIndex*50+'%'}"></div>
                    </ul>
                    <ul class="ipt_operate_wrap" v-if="currentIndex == 0">
                        <li class="ipt_operate_item">
                            <div class="title_wrap">
                                <p class="title_wrap_left">
                                    <span class="title_text">{{$t('l.wbalance')}}</span>
                                    <span class="title_val">
                                        <countTo :endVal='wBalance/1' :duration='3000' :decimals="2"></countTo>
                                    </span>
                                </p>
                                <p class="title_wrap_right">
                                    <span class="title_text">{{$t('l.myLocked')}}</span>
                                    <span class="title_val">
                                        <countTo :endVal='currentDaoInfo.yourLock/1' :duration='3000' :decimals="2"></countTo>
                                    </span>
                                </p>
                            </div>
                            <div class="ipt_div">
                                <div class="ipt_wrap">
                                    <input class="ipt_ele" @input="input_num(1)" v-model="iptValue1" type="number" placeholder="0">
                                    <span class="ipt_bandge" @click="handleDoMax(1)">{{$t('l.max')}}</span>
                                </div>
                                <div class="c_btn" v-if="!isApproved" @click="handleApprove"><img class="btn_icon" src="../assets/approve_icon.svg" alt=""> {{$t('l.approve')}}</div>
                                <div class="c_btn" v-else @click="handleDeposit"><img class="btn_icon" src="../assets/approve_icon.svg" alt=""> {{$t('l.goLock')}}</div>
                            </div>
                        </li>
                    </ul>
                    <ul class="ipt_operate_wrap" v-if="currentIndex == 1">
                        <li class="ipt_operate_item">
                            <div class="title_wrap">
                                <p class="title_wrap_left">
                                    <span class="title_text">{{$t('l.avaliable')}}</span>
                                    <span class="title_val">
                                        <countTo :endVal='currentDaoInfo.getNum/1' :duration='3000' :decimals="2"></countTo>
                                    </span>
                                </p>
                                <p class="title_wrap_right">
                                    <span class="title_text">{{$t('l.myLocked')}}</span>
                                    <span class="title_val">
                                        <countTo :endVal='currentDaoInfo.yourLock/1' :duration='3000' :decimals="2"></countTo>
                                    </span>
                                </p>
                                <div class="clear"></div>
                                <p class="title_wrap_right">
                                    <span class="title_text">{{$t('l.lockTime')}}</span>
                                    <span class="title_val">{{currentDaoInfo.yourLock == 0 ? $t('l.noLock') : currentDaoInfo.lockTime}}</span>
                                    <!-- <span class="title_val"><countTo :endVal='currentDaoInfo.yourLock == 0 ? currentDaoInfo.lockTime  : currentDaoInfo.lockTime' :duration='3000' :decimals="2"></countTo></span> -->
                                </p>
                            </div>
                            <div class="ipt_div">
                                <div class="c_btn c_btn_large" :class="canWithDraw ? '' : 'disabled'" @click="handleWithDraw"><img class="btn_icon" src="../assets/approve_icon.svg" alt=""> {{$t('l.withdrawal')}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tips_box">
                <p class="tips_title">{{$t('l.bt_t')}}</p>
                <p class="tips_text">{{$t('l.bt_1_1')}}{{currentDaoInfo.poolName}}{{$t('l.bt_1_2')}}</p>
                <p class="tips_text">{{$t('l.bt_2_1')}}{{currentDaoInfo.lockDay}}{{$t('l.bt_2_2')}}</p>
                <p class="tips_text">{{$t('l.bt_3_1')}}{{currentDaoInfo.poolName}}{{$t('l.bt_3_2')}}</p>
                <p class="tips_text">{{$t('l.bt_4')}}</p>
            </div>
        </Spin>
    </div>
</template>
<script>
import countTo from 'vue-count-to';
import { ethers } from 'ethers';
import { mapGetters } from 'vuex'
import { Spin } from 'ant-design-vue'
import Web3 from 'web3'
export default {
    components: {
        countTo,
        Spin
    },
    computed: {
    },
    data() {
        return {
            spinStatus: false,
            currentIndex: 0,
            currentDaoIndex: undefined,
            navArr: ['deposit1', 'withdrawal1'],
            daoPoolsLists: [],
            currentDaoInfo: {
                index: "",
                address: "",
                poolName: "",
                logo_url: "",
                lockDay: 0,
                apy: 0,
                yourLock: 0,
                totalLock: 0,
                rcl: 0,
                lockTime: 0,
                getNum: 0,
            },
            wBalance: 0,
            available: 0,
            isApproved: false,
            setStoreDataInterval: null,
            getPageDataInterVal: null,
            getAccountDataInterVal: null,
            iptValue1: undefined,
            canWithDrawAmount: 10,
            canWithDraw: false,
            WFC_USDT_LPAddress: ""
        }
    },
    methods: {
        handleContChange(index) {
            this.currentIndex = index
        },
        handleGoBack() {
            this.$router.push('/dao')
        },
        handleDoMax(index) {
            if (index == 1) {
                this.iptValue1 = this.wBalance
            }
        },
        input_num(index) {
            this['iptValue' + index] = this['iptValue' + index].replace(/[^\d.]/g, "")
            this['iptValue' + index] = this['iptValue' + index].replace(/\.{2,}/g, ".")
            this['iptValue' + index] = this['iptValue' + index].replace(/^\./g, "")
            this['iptValue' + index] = this['iptValue' + index].replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
            this['iptValue' + index] = this['iptValue' + index].replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
        },
        timeConverter(lockBlockNum,binfo) {
            let lockBlock = lockBlockNum  //到期块
            let lockBlockTime = binfo.timestamp + (lockBlock - binfo.number ) * 3

            var a = new Date(lockBlockTime * 1000);
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
            return time;
        }
    },
    mounted() {
        this.currentDaoIndex = this.$route.query.token
        if (this.currentDaoIndex !== undefined && this.currentDaoIndex !== '') {
            
        } else {
            this.$router.push('/dao')
        }
    },
    created() {
    },
    destroyed() {
    }
}
</script>
<style scoped>
.clear {
    width: 100%;
    clear: both;
}

.lock_box {
    width: 60%;
    max-width: 860px;
    margin: 30px auto;
    padding: 48px;
    border-radius: 16px;
    background-color: hsla(0, 0%, 100%, .7);
    border: 1px solid #fff;
}

.back_icon {
    width: 24px;
    height: 24px;
    margin-right: 4px;
}

.go_back {
    cursor: pointer;
    font-size: 16px;
    color: #131D32;
    display: flex;
    align-items: center;
}

.token_logo_wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 32px;
    position: relative;
}

.bandge {
    position: absolute;
    width: 30px;
    border-radius: 6px;
    font-size: 10px;
    color: #733729;
    left: calc(50% - 6px);
    top: 30px;
    text-align: center;
}

.bandge-5 {
    background-color: #F2AB91;
}

.bandge-30 {
    background-color: #BFBFBF;
}

.bandge-100 {
    background-color: #F2CF1D;
}

.token_name {
    font-size: 24px;
    color: #111D34;
    margin-top: 8px;
}

.data_wrap {
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 40px 0 24px 0;
    border-bottom: 1px solid #DDDDDD;
}

.data_item {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    color: #131D32;
    margin-bottom: 16px;
}

.data_item:last-child {
    margin-bottom: 0;
}

.data_title {
    font-size: 16px;
}

.data_value {
    font-size: 20px;
    font-weight: 700;
    margin-left: auto;
}

#donghuaBox {
    width: 50%;
    height: 100%;
    position: absolute;
    z-index: 1;
    background-color: rgb(81, 204, 197);
    border-radius: 100px;
    transition: 0.5s;
}

.vault_nav {
    position: relative;
    background-color: #f2f2f2;
    width: 232px;
    max-width: 232px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    font-size: 14px;
    color: #666666;
    overflow: hidden;
    list-style: none;
    display: flex;
    justify-content: space-around;
    margin: 24px auto;
    padding: 0;
    text-align: center;
}

.valut_nav_item {
    flex: 1;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transition: 0.5s;
}

.valut_nav_item.active {
    color: #fff;
    border-radius: 16px;
}

.ipt_operate_wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    list-style-type: none;
    margin-top: 24px;
}

.ipt_operate_item {
    width: 100%;
    color: #131D32;
}

.title_wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.title_wrap_left,
.title_wrap_right {
    margin-bottom: 0;
}

.title_wrap_right {
    margin-left: auto;
}

.title_text {
    font-size: 16px;
    margin: 0;
}

.title_val {
    font-size: 20px;
    font-weight: 700;
}

.ipt_div {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    margin-top: 8px;
}

.ipt_wrap {
    position: relative;
    width: 100%;
    height: 54px;
}

.ipt_bandge {
    position: absolute;
    padding: 4px 24px;
    background-color: #E0EAFA;
    border-radius: 16px;
    color: #52CCC5;
    top: 13px;
    right: 24px;
    cursor: pointer;
}

.c_btn {
    width: 200px;
    height: 54px;
    cursor: pointer;
    background-color: #52CCC5;
    margin-left: 8px;
    border-radius: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
}

.c_btn.disabled {
    opacity: 0.8;
    cursor: not-allowed;
    background-color: #bbbbbb;
}

.c_btn_large {
    width: 100%;
}

.btn_icon {
    width: 24px;
    height: 24px;
    margin-right: 4px;
}

.ipt_ele {
    width: 100%;
    height: 54px;
    background-color: #F6F8FB;
    color: #757575;
    margin: 0;
    padding: 0 108px 0 24px;
}

.ipt_ele::placeholder {
    color: #757575;
}

.tips_box {
    width: 60%;
    max-width: 860px;
    margin: 30px auto;
    color: #131D32;
    font-size: 16px;
}

.tips_title {
    font-weight: 700;
}

@media (max-width: 768px) {
    .lock_box {
        width: 92%;
        padding: 24px 16px 32px;
        margin-top: 16px;
    }

    .tips_box {
        width: 92%;
        margin-top: 16px;
    }

    .data_wrap {
        padding: 32px 0 24px 0;
    }

    .vault_nav {
        font-size: 12px;
        width: 94%;
    }

    .title_wrap_right,
    .title_wrap_left {
        width: 100%;
        display: flex;
    }

    .title_val {
        margin-left: auto;
    }

    .title_wrap_right {
        margin-left: 0;
    }

    .ipt_div {
        flex-wrap: wrap;
    }

    .ipt_wrap,
    .c_btn {
        width: 100%;
        margin-left: 0;
        margin-top: 8px;
    }
}
</style>