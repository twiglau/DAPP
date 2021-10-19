<template>
    <div class="swap_container">
        <div class="swap-info">
            <a-spin class="global_loading" tip="loading" :spinning="spinStatus" size="large">
                <div class="top_info">
                    <div class="top_info_left">
                        <div class="top_info-title">{{$t('l.t_SWAP')}}</div>
                        <div class="top_info-sub">
                            <img src="../assets/Star_icon.png" alt="">
                            <span>{{$t('l.t_SWAP') + ' ' + (iptValue0 || 0) + ' ' + $transformCurrency(iptCoin0) + ' ' + $t('l.t_Duic') + ' ' + (iptValue1 || 0) + ' ' + $transformCurrency(iptCoin1)}}</span>
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
                        <coin-select :defaultCoin="{lanc:iptCoin0,lanImg: `${iptCoin0}_coin`}" :coins="TOPCOINS" @selectA="changeTop"></coin-select>
                    </div>
                </li>
                <div class="span-info">
                    <span>{{$t('l.balance')}}({{$transformCurrency(iptCoin0)}})</span><span><countTo :endVal='$formatDecimal(iptBalance0,4)' :duration='1000' :decimals="4"></countTo></span>
                </div>
                <div class="text-label">
                    {{$t('l.t_to')}}
                    <svg-icon icon-class="down_icon" class="down-dir"></svg-icon>
                </div>
                <li class="pools__dialog__input">
                    <input @input="input_num(1)" :placeholder="$t('l.iptPlace')" v-model="iptValue1">
                    <div class="input_right">
                        <coin-select :defaultCoin="{lanc:iptCoin1,lanImg: `${iptCoin1}_coin`}" :coins="BOTTOMCOINS" @selectA="changeBottom"></coin-select>
                    </div>
                </li>
                <div class="span-info">
                    <span>{{$t('l.t_Price')}}</span><span>1 {{$transformCurrency(iptCoin0)}} = <countTo :endVal='iptRatio' :duration='1000' :decimals="4"></countTo> {{$transformCurrency(iptCoin1)}}</span>
                </div>
                <!-- <div class="span-info">
                    <span>{{$t('l.t_MinPA')}}</span><span>100 USDT</span>
                </div> -->
                <li>
                    <a-button v-show="!isApproved" :loading="isApproving" class="g-button" @click="handleApprovedFor()">{{isApproving ? $t('l.t_approving') : $t('l.approve')}}</a-button>
                    <button v-show="isApproved" class="g-button" @click="handleSwapAction(iptValue0)">{{$t('l.t_Duic')}}</button>
                </li>
            </a-spin>
        </div>
        <swap-config ref="config"></swap-config>
        <swap-drawer ref="swap" :info="swap" @sure="handleSwap"></swap-drawer>
        <loading ref="loading"/>
    </div>
</template>
<script>
    import Wallet from '@/utils/Wallet.js';
    import countTo from 'vue-count-to';
    import SwapConfig from '@/components/SwapConfig.vue'
    import clickoutside from '@/utils/clickoutside.js'
    import SwapDrawer from '@/components/SwapDrawer'
    import Loading from '@/components/Loading'
    import CoinSelect from '@/components/CoinSelect'
    import {error} from '@/utils/errorLog'
    import {mapGetters} from 'vuex'
    import UserActivateMixin from '../mixin/UserActivateMixin'
    export default {
        name:'swap',
        components: {
            countTo,
            SwapConfig,
            SwapDrawer,
            Loading,
            CoinSelect
        },
        mixins:[UserActivateMixin],
        directives:{clickoutside},
        computed: {
            ...mapGetters('accounts',{walletAddress:'getActiveAccount',isMain:'getIsMainChainID'}),
            isApproved:function(){
                const {iptCoin1} = this
                if(iptCoin1 == 'Libra'){
                    return this.needApprovedArray[0].isApproved
                }else if(iptCoin1 == 'USDT'){
                    return this.needApprovedArray[0].isApproved && this.needApprovedArray[2].isApproved
                }else {
                    return this.needApprovedArray[0].isApproved && this.needApprovedArray[1].isApproved
                }
            },
            iptPrice0:function(){
                const {iptCoin0} = this
                let item = this.needApprovedArray.find(ele => ele.currency == iptCoin0)
                return +item.price || 1
            },
            iptBalance0:function(){
                const {iptCoin0} = this
                let item = this.needApprovedArray.find(ele => ele.currency == iptCoin0)
                return +item.amount || 0
            },
            iptPrice1:function(){
                const {iptCoin1} = this
                let item = this.needApprovedArray.find(ele => ele.currency == iptCoin1)
                return +item.price || 1
            },
            iptRatio:function(){
                let ratio = 0
                if(this.iptPrice1 > 0){
                    ratio = this.iptPrice0 / this.iptPrice1
                }
                return ratio
            }

        },
        watch:{
            iptValue0:{
                immediate:true,
                handler:function(newVal){
                    if(!newVal){
                        this.iptValue1 = null
                    }else {
                        if(!this.iptPrice1 || this.iptPrice1 < 0.000001){
                            this.iptValue1 = null
                        }else {
                            this.iptValue1 = ((+newVal) * ( this.iptPrice0 / +this.iptPrice1)).toFixed(2)
                        }
                    }
                }
            }
        },
        mounted(){
 
            if(!this.isMain){ 
                this.$message.warning(this.$t('l.notmainnet_tips'));
                return;
            }
            this.getPairPrice()
            this.queryBalance()
            this.queryApporve()
            this.checkUserInfo()
        },
        data() {
            return {
                spinStatus:false,
                iptValue0:null,
                iptCoin0:'USDT',
                iptValue1:null,
                iptCoin1:'Libra',
                needApprovedArray:[
                    {currency:'USDT',isApproved:false,gas:0,price:0,amount:0},
                    {currency:'Diem',isApproved:false,gas:0,price:0,amount:0},
                    {currency:'Libra',isApproved:false,gas:0,price:0,amount:0}
                ],
                isApproving:false,
                swap:{},
                TOPCOINS:[
                    {lanc:'USDT',lanImg:'USDT_coin'},
                    {lanc:'Libra',lanImg:'Libra_coin'}
                ],
                BOTTOMCOINS:[
                    {lanc:'Libra',lanImg:'Libra_coin'},
                    {lanc:'Diem',lanImg:'Diem_coin'}
                ]
            }
        },
        methods: {
            error,
            showConfig(){
               this.$refs.config.show()
            },
            changeTop(top){
                 this.iptCoin0 = top.lanc
                 if(top.lanc === 'Libra'){
                    this.iptCoin1 = 'USDT'
                    this.BOTTOMCOINS = [{lanc:'USDT',lanImg:'USDT_coin'}]
                 }else {
                    this.iptCoin1 = 'Libra'
                    this.BOTTOMCOINS = [
                        {lanc:'Libra',lanImg:'Libra_coin'},
                        {lanc:'Diem',lanImg:'Diem_coin'}
                    ]
                 }
                 this.changeDui(this.iptCoin1)
                 this.getPairPrice()
                 this.queryBalance()
            },
            changeBottom(bottom){
                 this.iptCoin1 = bottom.lanc
                 this.changeDui(this.iptCoin1)
            },
            changeDui(e){
                let _self = this
                _self.iptValue0 = 0;
            },
            async queryApporve(){
                let _self = this
                if(!_self.walletAddress || _self.walletAddress.length < 10){
                    _self.$message.warning(_self.$t('l.error_tips_unconnect'))
                    return
                }
                let promiseArr = _self.needApprovedArray.map(ele => {
                    return new Promise((resolve,reject) => {
                        Wallet.queryAllowance(_self.walletAddress,ele.currency,(res)=>{
                            if(res && res > 0) {
                                resolve({approve:true,gas:+res})
                            }else {
                                resolve({approve:false,gas:0})
                            }
                        },err => resolve({approve:false,gas:0}))
                    })
                })
                Promise.all(promiseArr)
                .then(res => {
                    res.forEach((ele,index) => {
                        _self.needApprovedArray[index].isApproved = ele.approve
                        _self.needApprovedArray[index].gas = ele.gas
                    })
                })

            },
            async queryBalance(){
                let _self = this
               let balanceArr = _self.needApprovedArray.map(ele => {
                   return new Promise((resolve) => {
                        Wallet.balanceOf(ele.currency,_self.walletAddress,(res)=>{
                            resolve(Number(res ? res : 0))
                        },err=> {resolve(0)})
                   })
               })
               Promise.all(balanceArr)
               .then(res => {
                   console.log({'balance':res})
                   res.forEach((amount,index) => {
                       let dict = _self.needApprovedArray[index]
                       dict.amount = amount
                       _self.needApprovedArray.splice(index,1,dict)
                   })
               })
            },
            async getPairPrice(){
               let _self = this
               let priceArr = _self.needApprovedArray.map(ele => {
                   return new Promise((resolve) => {
                       Wallet.queryPrice(ele.currency,res =>{
                            resolve(+(res || 1)) 
                        },err => resolve(0))
                   })
               })
               Promise.all(priceArr)
               .then(res => {
                   console.log({'price':res})
                   res.forEach((price,index) => {
                       let dict = _self.needApprovedArray[index]
                       dict.price = price
                       _self.needApprovedArray.splice(index,1,dict)
                   })
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

                _self.queryApporve() // 更新授权 GAS
                if(!this.inviteAddress || this.inviteAddress.length < 10){
                    _self.$message.error(_self.$t('l.l_upper'))
                    return;
                }
                if(!this.walletAddress || this.walletAddress.length < 10){
                    _self.$message.error(_self.$t('l.error_tips_unconnect'))
                    return;
                }
                if(this.inviteAddress.toLowerCase() == this.walletAddress.toLowerCase()){
                    _self.$message.error(_self.$t('l.l_addrror'))
                    return
                }
                if (!amount || amount > _self.iptBalance0){
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
                const {iptCoin1,iptValue1,iptValue0} = this
                console.log({amount})
                let formatAmount = parseFloat(amount)
                let needGas0 = parseFloat(iptValue0) * Math.pow(10,18)
                let needGas1 = parseFloat(iptValue1) * Math.pow(10,18)

                // needApprovedArray:[
                //     {currency:'USDT',isApproved:false,gas:0},
                //     {currency:'Diem',isApproved:false,gas:0},
                //     {currency:'Libra',isApproved:false,gas:0}
                // ],
                if(iptCoin1 == 'Libra'){
                    let usdt = _self.needApprovedArray[0]
                    if(needGas0 >= usdt.gas){
                        // udst 授权额度不足,需要重新授权
                        usdt.isApproved = false
                        this.needApprovedArray.splice(0,1,usdt)
                        _self.$message.error('USDT ' + _self.$t('l.l_edubuzu'))
                        return
                    }
                }else if(iptCoin1 == 'USDT'){
                    let usdt = _self.needApprovedArray[0]
                    let libra = _self.needApprovedArray[2]
                    if(needGas0 >= libra.gas && needGas1 < usdt.gas){
                        // libra 授权额度不足,需要重新授权
                        libra.isApproved = false
                        this.needApprovedArray.splice(2,1,libra)
                        _self.$message.error('Libra ' + _self.$t('l.l_edubuzu'))
                        return
                    }else if(needGas0 < libra.gas && needGas1 >= usdt.gas){
                        // usdt 授权额度不足,需要重新授权
                        usdt.isApproved = false
                        this.needApprovedArray.splice(0,1,usdt)
                        _self.$message.error('USDT ' + _self.$t('l.l_edubuzu'))
                        return
                    }else if(needGas0 >= libra.gas && needGas1 >= usdt.gas){
                        // usdt,libra 授权额度不足,需要重新授权
                        libra.isApproved = false
                        usdt.isApproved = false
                        this.needApprovedArray.splice(0,1,usdt)
                        this.needApprovedArray.splice(2,1,libra)
                        _self.$message.error('USDT Libra ' + _self.$t('l.l_edubuzu'))
                        return
                    }
                }else {

                    let usdt = _self.needApprovedArray[0]
                    let diem = _self.needApprovedArray[1]
                    if(needGas0 >= usdt.gas && needGas1 < diem.gas){
                        // usdt 授权额度不足,需要重新授权
                        usdt.isApproved = false
                        this.needApprovedArray.splice(0,1,usdt)
                        _self.$message.error('USDT ' + _self.$t('l.l_edubuzu'))
                        return
                    }else if(needGas0 < usdt.gas && needGas1 >= diem.gas){
                        // diem 授权额度不足,需要重新授权
                        diem.isApproved = false
                        _self.needApprovedArray.splice(1,1,diem)
                        _self.$message.error('Diem ' + _self.$t('l.l_edubuzu'))
                        return
                    }else if(needGas0 >= usdt.gas && needGas1 >= diem.gas){
                        // usdt,diem 授权额度不足,需要重新授权
                        usdt.isApproved = false
                        diem.isApproved = false
                        _self.needApprovedArray.splice(0,1,usdt)
                        _self.needApprovedArray.splice(1,1,diem)
                        _self.$message.error('USDT Diem ' + _self.$t('l.l_edubuzu'))
                        return
                    }
                }
                //TODO 上级地址,从URL获取
                let walletAddress = _self.walletAddress;
                let upperAddress = _self.inviteAddress;
                _self.$refs.loading.show({title:_self.$t('l.l_duiing'),content:_self.$t('l.l_swaps',[this.iptValue0,this.iptCoin0,this.iptValue1,this.iptCoin1]),desc:_self.$t('l.l_swapb')})
                
                Wallet.exchange(_self.iptCoin1,upperAddress,walletAddress,formatAmount,(res)=>{
                    _self.spinStatus = false
                    if(res){
                        _self.iptValue0 = null;
                        _self.$refs.swap.close();
                        _self.$refs.loading.success({title:_self.$t('l.l_success')})
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
                let realNeedApproveds
                if(_self.iptCoin1 == 'Libra'){
                   realNeedApproveds = _self.needApprovedArray.filter(ele => ele.currency == 'USDT' && ele.isApproved == false)
                }else if(_self.iptCoin1 == 'USDT'){
                   realNeedApproveds = _self.needApprovedArray.filter(ele => ele.currency != 'Diem' && ele.isApproved == false)
                }else {
                   realNeedApproveds = _self.needApprovedArray.filter(ele => ele.currency != 'Libra' && ele.isApproved == false)
                }
                let promiseArr = realNeedApproveds.map(ele => {
                    return new Promise((resolve,reject) => {
                        Wallet.approve(ele.currency,this.walletAddress,Math.pow(10,8),(res)=>{
                            if(res){
                                _self.$notification.success({ message: error('A-Success'), description:ele.currency + ` ${error('A-A-Success')}`})
                            }else {
                                _self.$notification.error({message: error('A-failed'),description:ele.currency + ` ${error('A-A-Failed')}`})
                            }
                            if(res){
                                resolve(ele.currency)
                            }else {
                                reject("error")
                            }
                        },(err) => {
                            let msg = JSON.stringify(err.message || err)
                            _self.$notification.error({
                                message: error('A-failed'),
                                description:ele.currency + `  ${error(msg)},${error('A-A-Failed')}`
                            })
                            reject(err)
                        });
                    })
                })
                Promise.all(promiseArr)
                .then(res => {
                    _self.isApproving = false
                    res.forEach((ele,index) => {
                        for(let i = 0,len = _self.needApprovedArray.length; i < len; i++){
                            let item = _self.needApprovedArray[i];
                            if(item.currency == ele){
                                //更新状态
                                _self.needApprovedArray[i].isApproved = true
                            }
                        }
                    })
                })
                .catch(err => {
                    _self.isApproving = false
                })
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
