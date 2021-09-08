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
                    <div class="top_info_right">
                        <img @click="showConfig" src="../assets/Setting_icon.png" alt="">
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
                    <svg-icon icon-class="down_icon" class="down-dir"></svg-icon>
                </div>
                <li class="pools__dialog__input">
                    <input @input="input_num(1)" :placeholder="$t('l.iptPlace')" v-model="iptValue1">
                    <div class="input_right">
                        <coin-select></coin-select>
                        <!-- <svg-icon icon-class="LBR_coin" alt="" />
                        <span>{{iptCoin1}}</span>
                        <img src="../assets/down_arrow.png" alt=""> -->
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
                    <button v-show="isApprovedUSDT" class="g-button" @click="handleSwapAction(iptValue0)">{{$t('l.t_Duic')}}</button>
                </li>
            </a-spin>
        </div>
        <swap-config ref="config"></swap-config>
        <swap-drawer ref="swap" :info="swap" @sure="handleSwap"></swap-drawer>
        <loading ref="loading"/>
    </div>
</template>
<script>
    import {postExchangeData} from '@/utils/api'
    import Wallet from '@/utils/Wallet.js';
    import countTo from 'vue-count-to';
    import SwapConfig from '@/components/SwapConfig.vue'
    import clickoutside from '@/utils/clickoutside.js'
    import SwapDrawer from '@/components/SwapDrawer'
    import Loading from '@/components/Loading'
    import CoinSelect from '@/components/CoinSelect'
    import {error} from '@/utils/errorLog'
    export default {
        name:'swap',
        components: {
            countTo,
            SwapConfig,
            SwapDrawer,
            Loading,
            CoinSelect
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

            let inviteAddress = this.$route.query.address
            if(inviteAddress && inviteAddress.length > 0) { this.$setCookie('inviteAddress',inviteAddress,30 * 24 * 60 * 60) }
            this.inviteAddress = this.$getCookie('inviteAddress')


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
                daiBiPriceArray:[],
                LBR_price:0,
                usdtAmount:0,
                isApprovedUSDT:false,
                isApproving:false,
                inviteAddress:'',
                swap:{},
            }
        },
        methods: {
            error,
            showConfig(){
               this.$refs.config.show()
            },
            async queryBalance(){
                let _self = this
                let walletAddress = localStorage.getItem("walletAddress");
                _self.walletAddress = walletAddress;
                Wallet.balanceOf('USDT',_self.walletAddress,(res)=>{
                    _self.usdtAmount = Number(res ? res : 0)
                })
            },
            async queryApporve(){
                let _self = this
                let walletAddress = localStorage.getItem("walletAddress");
                _self.walletAddress = walletAddress;
                Wallet.queryAllowance(_self.walletAddress,'USDT',(res)=>{
                    if(res && res > 0) {
                        _self.isApprovedUSDT = true
                    }else {
                        _self.isApprovedUSDT = false
                    }
                })

            },
            async getPairPrice(){
               let _self = this
               Promise.all([
                   new Promise((resolve) => {
                       Wallet.queryPrice('libra',res =>{
                            resolve(+(res || 1)) 
                        },err => resolve(0))
                   }),
                   new Promise((resolve) => {
                       Wallet.queryPrice('diem',res =>{
                            resolve(+(res || 1)) 
                        },err => resolve(0))
                   })
               ])
               .then(res => {
                   _self.daiBiPriceArray = res
                   if(!_self.usdt_lbr_p){
                       _self.LBR_price = _self.daiBiPriceArray[0]
                       _self.usdt_lbr_p = _self.LBR_price > 0 ? 1 / _self.LBR_price : 0;
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
            handleSwapAction(amount){
                let _self = this
                if(!this.inviteAddress && this.inviteAddress.length < 10){
                    _self.$message.error(_self.$t('l.l_upper'))
                    return;
                }
                if(!this.walletAddress && this.walletAddress.length < 10){
                    _self.$message.error(_self.$t('l.error_tips_unconnect'))
                    return;
                }
                if(this.inviteAddress.toLowerCase() == this.walletAddress.toLowerCase()){
                    _self.$message.error(_self.$t('l.l_addrror'))
                    return
                }
                if (!amount || amount > _self.usdtAmount){
                    _self.$message.error(_self.$t('l.l_numerror'));
                    return;
                }

                this.swap = {
                    currency1:this.iptCoin0,
                    currency2:this.iptCoin1,
                    amount1:+amount,
                    amount2:+this.iptValue1
                }
                this.$refs.swap.show()
            },
            handleSwap(amount){
                let _self = this
                console.log({amount})
                //TODO 上级地址,从URL获取
                let walletAddress = localStorage.getItem("walletAddress");
                let upperAddress = _self.inviteAddress;
                _self.$refs.loading.show({title:_self.$t('l.l_duiing'),content:_self.$t('l.l_swaps',[this.iptValue0,this.iptCoin0,this.iptValue1,this.iptCoin1]),desc:_self.$t('l.l_swapb')})
                Wallet.exchange(upperAddress,walletAddress,amount,(res)=>{
                    _self.spinStatus = false
                    if(res){
                        postExchangeData({
                           address:walletAddress,
                           parentAddress:upperAddress,
                           fromAmount:amount,
                           fromToken:_self.iptCoin0,
                           toAmount:_self.iptValue1,
                           toToken:_self.iptCoin1
                        })
                        .then((result) => {
                            const {status} = result
                            if(status == 200){
                                _self.iptValue0 = null;
                                _self.$refs.swap.close();
                                _self.$refs.loading.success({title:_self.$t('l.l_success')})
                            }
                        })
                    }
                },(err)=>{
                    _self.spinStatus = false
                    let msg = JSON.stringify(err.message || err)
                    let msg_log = _self.error(msg)
                    _self.$refs.loading.failed({title:(msg_log || msg) || 'err'})
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
                },(err) => {});
            },
            updateApproveStatus(){
                this.isApprovedUSDT = true;
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
        padding: 24px;
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
        font-weight: 500;
    }
    .top_info-sub {
        color: #3C3C3C;
        font-size: 12px;
        margin-top: 5px;
        display: flex;
        align-items: center;
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
        position: relative;
    }
    .text-label .svg-icon {
        position:absolute;
        width: 40px;
        height: 40px;
        right: 25%;
        bottom: 0px;
    }

    .pools__dialog__input input {
        box-sizing: border-box;
        width: 100%;
        background: #f6f8fb;
        border-radius: 8px;
        border: none;
        font-size: 8px;
        padding: 15px 100px 15px 30px;
        color: #131d32;
        font-size: 16px;
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
        font-weight: 500;
    }
    .input_right span {
        margin: 0px 6px;
        min-width: 36px;
        font-size: 14px;
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
        border-radius: 8px;
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
        padding: 24px;
        border: 0px solid transparent;
        border-top: solid 2px #f5f5f5;
        margin: 0 auto;
    }

}
</style>
