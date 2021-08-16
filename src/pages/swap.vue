<template>
    <div class="swap_container">
        <div class="swap-info">
        <a-spin class="global_loading" tip="loading" :spinning="spinStatus" size="large">
            <div class="top_info">
                <div class="top_info_left">
                   <div class="top_info-title">SWAP</div>
                   <div class="top_info-sub">
                       <img src="../assets/Star_icon.png" alt="">
                       <span>Swap 100 USDT for 100 LBR</span>
                   </div>
                </div>
                <div class="top_info_right" v-clickoutside="handleSetting">
                    <img @click="showConfig = !showConfig" src="../assets/Setting_icon.png" alt="">
                    <swap-config v-show="showConfig"></swap-config>
                </div>
            </div>
            <div class="text-label">
                From
            </div>
            <li class="pools__dialog__input">
              <input @input="input_num(0)" :placeholder="$t('l.iptPlace')" v-model="iptValue0">
              <div class="input_right">
                  <img src="../assets/ETH_coin.png" alt="">
                  <span>USDT</span>
                  <img src="../assets/down_arrow.png" alt="">
              </div>
            </li>
            <div class="text-label">
                To
            </div>
            <li class="pools__dialog__input">
              <input @input="input_num(1)" :placeholder="$t('l.iptPlace')" v-model="iptValue1">
              <div class="input_right">
                  <img src="../assets/Libra_icon.png" alt="">
                  <span>LIBRA</span>
                  <img src="../assets/down_arrow.png" alt="">
              </div>
            </li>
            <div class="span-info">
                <span>Price</span><span>1 USDT = 1 LBR</span>
            </div>
            <div class="span-info">
                <span>Minimun Amount</span><span>100 USDT</span>
            </div>
            <li>
              <button class="g-button" @click="handleSwap(iptValue0)">兑换</button>
            </li>
        </a-spin>
        </div>
    </div>
</template>
<script>
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
    data() {
        return {
            spinStatus:false,
            iptValue0:null,
            iptValue1:null,
            showConfig:false,
        }
    },
    methods: {

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
            if (amount == null || amount == undefined || amount <= 0){
                alert("数量错误");
                return;
            }
            //TODO 上级地址,从URL获取
            let walletAddress = localStorage.getItem("walletAddress");
            let upperAddress = walletAddress;
            Wallet.exchange(upperAddress,amount,(res)=>{
                alert("成功"+JSON.stringify(res));
            },(res)=>{
                alert("失败"+JSON.stringify(res));
            });
        }
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
.input_right img:nth-of-type(1) {
    width: 24px;
    height: 24px;
}
.input_right img:nth-of-type(2) {
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
</style>
