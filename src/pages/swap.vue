<template>
    <div class="swap_container">
        <div class="swap-info">
            <a-spin class="global_loading" tip="loading" :spinning="spinStatus" size="large">
                <div class="top_info">
                    <div class="top_info_left">
                        <div class="top_info-title">{{$t('l.t_SWAP')}}</div>
                        <div class="top_info-sub">
                            <img src="../assets/Star_icon.png" alt="">
                            <span>{{$t('l.t_SWAP') + ' ' + (iptValue0 || 0) + ' ' + iptCoin0 + $t('l.t_Duic') + ' ' + (iptValue1 || 0) + ' ' + iptCoin1}}</span>
                        </div>
                    </div>
                    <div class="top_info_right" v-clickoutside="handleSetting">
                        <img @click="showConfig = !showConfig" src="../assets/Setting_icon.png" alt="">
                        <swap-config v-show="showConfig"></swap-config>
                    </div>
                </div>
                <div class="text-label">
                    {{$t('l.t_from')}}
                </div>
                <li class="pools__dialog__input">
                    <input @input="input_num(0)" :placeholder="$t('l.iptPlace')" v-model="iptValue0">
                    <div class="input_right">
                        <svg-icon icon-class="USDT_coin" alt="" />
                        <span>{{iptCoin0}}</span>
                        <img src="../assets/down_arrow.png" alt="">
                    </div>
                </li>
                <div class="span-info">
                    <span>{{$t('l.balance')}}({{iptCoin0}})</span><span><countTo :endVal='usdtAmount' :duration='1000' :decimals="4"></countTo></span>
                </div>
                <div class="text-label">
                    {{$t('l.t_to')}}
                </div>
                <li class="pools__dialog__input">
                    <input @input="input_num(1)" :placeholder="$t('l.iptPlace')" v-model="iptValue1">
                    <div class="input_right">
                        <svg-icon icon-class="LBR_coin" alt="" />
                        <span>{{iptCoin1}}</span>
                        <img src="../assets/down_arrow.png" alt="">
                    </div>
                </li>
                <div class="span-info">
                    <span>{{$t('l.t_Price')}}</span><span>1 USDT = <countTo :endVal='usdt_lbr_p' :duration='1000' :decimals="4"></countTo> LBR</span>
                </div>
                <!-- <div class="span-info">
                    <span>{{$t('l.t_MinPA')}}</span><span>100 USDT</span>
                </div> -->
                <li>
                    <a-button v-show="!isApprovedUSDT" :loading="isApproving" class="g-button" @click="handleApprovedFor()">{{isApproving ? $t('l.t_approving') : $t('l.approve')}}</a-button>
                    <button v-show="isApprovedUSDT" class="g-button" @click="handleSwap(iptValue0)">{{$t('l.t_Duic')}}</button>
                </li>
            </a-spin>
        </div>
    </div>
</template>
<script>
    import {getPrice,postExchangeData} from '@/utils/api'
    import Wallet from '@/utils/Wallet.js';
    import countTo from 'vue-count-to';
    import SwapConfig from '@/components/SwapConfig.vue'
    import clickoutside from '@/utils/clickoutside.js'
    export default {
        name:'swap',
        components: {
            countTo,
            SwapConfig
        },
        directives:{clickoutside},
        computed: {
        },
        watch:{
            iptValue0:{
                immediate:true,
                handler:function(newVal){
                    if(!newVal){
                        this.iptValue1 = null
                    }else {
                        if(!this.LBR_price || this.LBR_price < 0.000001){
                            this.iptValue1 = null
                        }else {
                            this.iptValue1 = ((+newVal) * ( 1 / +this.LBR_price)).toFixed(2)
                        }
                    }
                }
            }
        },
        mounted(){

            let inviteAddress = this.$route.query.address ? this.$route.query.address : ''
            if(inviteAddress && inviteAddress.length > 0) {
                this.$setCookie('inviteAddress',inviteAddress,30 * 24 * 60 * 60)
            }
            this.inviteAddress = this.$getCookie('inviteAddress') ? this.$getCookie('inviteAddress') : this.inviteAddress


            this.getPairPrice()
            this.queryBalance()
            this.queryApporve()
        },
        data() {
            return {
                spinStatus:false,
                iptValue0:null,
                iptCoin0:'USDT',
                iptValue1:null,
                iptCoin1:'LBR',
                isDui_sToken:true,
                usdt_lbr_p:0,
                LBR_price:0,
                usdtAmount:0,
                showConfig:false,
                isApprovedUSDT:false,
                isApproving:false,
                inviteAddress:'',
            }
        },
        methods: {
            async queryBalance(){
                let _self = this
                let walletAddress = localStorage.getItem("walletAddress");
                _self.walletAddress = walletAddress;
                Wallet.balanceOf('USDT',_self.walletAddress,(res)=>{
                    _self.usdtAmount = Number((res ? res : 0) / Wallet.Precisions('USDT'))
                })
            },
            async queryApporve(){
                let _self = this
                let walletAddress = localStorage.getItem("walletAddress");
                _self.walletAddress = walletAddress;
                Wallet.queryAllowance(_self.walletAddress,'USDT',(res)=>{
                    console.log({res})
                    if(res && res > 0) {
                        _self.isApprovedUSDT = true
                    }else {
                        _self.isApprovedUSDT = true
                    }
                })
            },
            async getPairPrice(){
               let _self = this
               getPrice({symbol:'librausdt'})
               .then((res) => {
                   let plc =  res.price
                   _self.LBR_price = plc
                   if(plc > 0){
                       _self.usdt_lbr_p = 1 / +plc
                   }
               })
            },
            input_num(index) {
                this['iptValue' + index] = this['iptValue' + index].replace(/[^\d.]/g, "")
                this['iptValue' + index] = this['iptValue' + index].replace(/\.{4,}/g, ".")
                this['iptValue' + index] = this['iptValue' + index].replace(/^\./g, "")
                this['iptValue' + index] = this['iptValue' + index].replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
                this['iptValue' + index] = this['iptValue' + index].replace(/^(-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3')
            },
            handleSetting(){
                this.showConfig = false
            },
            handleSwap(amount){
                let _self = this
                if (!amount || amount > _self.usdtAmount){
                    _self.$message.error("数量错误");
                    return;
                }
                //TODO 上级地址,从URL获取
                let walletAddress = localStorage.getItem("walletAddress");
                let upperAddress = _self.inviteAddress;
                _self.spinStatus = true
                Wallet.exchange(upperAddress,walletAddress,amount,(res)=>{
                    _self.spinStatus = false
                    if(res){
                        postExchangeData({
                           address:walletAddress,
                           parentAddress:upperAddress,
                           fromAmount:amount,
                           fromToken:_this.iptCoin0,
                           toAmount:_this.iptValue1,
                           toToken:_this.iptCoin1
                        })
                        .then((result) => {
                            const {status} = result
                            if(status == 200){
                                _self.iptValue0 = null;
                                _self.$success({
                                    title:_self.$t('l.t_SWAP'),
                                    content:_self.$t('l.t_SWAP') + ' success!'
                                })
                            }
                        })
                    }
                },(err)=>{
                    _self.spinStatus = false
                    _self.$error({
                        title:_self.$t('l.t_SWAP'),
                        content:err.message || 'error unknown'
                    })
                });
            },
            async handleApprovedFor() {
                let _self = this
                _self.isApproving = true
                this.walletAddress = localStorage.getItem("walletAddress");
                Wallet.approve('USDT',this.walletAddress,10000000,(res)=>{
                    _self.isApproving = false
                    if(res){
                        _self.updateApproveStatus('USDT');
                    }
                });
            },
            updateApproveStatus(){
                this.isApprovedUSDT = true;
                localStorage.setItem("isApprovedUSDT", true);
            },
        }
    }
</script>
<style scoped>
    .swap-info {
        position: relative;
        max-width: 420px;
        width: 100%;
        background: rgb(255, 255, 255);
        box-shadow: rgb(171 133 115 / 16%) 0px 2px 10px;
        border-radius: 20px;
        padding: 20px;
        border: 2px solid #43318C;
        margin: 0 auto;
    }
    .swap-info li {
        list-style: none;
    }
    .top_info {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .top_info-title {
        color: black;
        font-size: 16px;
    }
    .top_info-sub {
        color: #3C3C3C;
        font-size: 12px;
    }
    .top_info-sub img {
        width: 16px;
        height: 16px;
    }
    .top_info-sub span {
        margin-left: 6px;
    }
    .top_info_right {
        width: 48px;
        height: 48px;
    }
    .top_info_right img {
        width: 100%;
        height: 100%;
    }

    .text-label {
        margin: 30px 0px 6px 0px;
        color: #3C3C3C;
        font-size: 12px;
    }

    .pools__dialog__input input {
        box-sizing: border-box;
        width: 100%;
        background: #f6f8fb;
        border-radius: 16px;
        border: none;
        font-size: 16px;
        padding: 15px 100px 15px 30px;
        color: #131d32;
    }
    .pools__dialog__input {
        position: relative;
    }
    .input_right {
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #000;
        font-size: 12px;
    }
    .input_right span {
        margin: 0px 6px;
    }
    .input_right .svg-coin {
        width: 24px;
        height: 24px;
    }
    .input_right img:nth-of-type(1) {
        width: 11px;
        height: 11px;
    }
    .span-info {
        margin-top: 15px;
        font-size: 12px;
        color: #9C9C9C;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .span-info span:last-child {
        color: #3C3C3C;
    }


    .g-button {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 44px;
        outline: none;
        border: none;
        background-color: #43318C;
        border-radius: 22px;
        font-size: 14px;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
    }
    .g-button--normal {
        background-image: none;
        background-color: #fff;
        color: #43318C;
        border: 1px solid #43318C;
    }
@media (max-width: 768px) {
    .swap-info {
        border-radius: 0px;
        padding: 20px;
        border: 0px solid transparent;
        margin: 0 auto;
    }

}
</style>
