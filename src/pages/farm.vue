<template>
  <div class="vault_wrap">
    <a-spin class="global_loading" tip="loading" :spinning="spinStatus" size="large">
    <div class="vault_inner_wrap">
      <div class="vault_top_nav">
        <ul class="vault_nav shadow">
          <li v-for="(item,index) in navArr" :key="index" @click="handleContChange(index)" class="valut_nav_item" :class="currentIndex == index ? 'active' : ''">{{$t('l.'+item)}}</li>
          <div id="donghuaBox" :style="{left:currentIndex*50+'%'}"></div>
        </ul>
        <div class="copy_wrap">
          <span class="copy_text" v-if="!$store.state.accounts.isMobile">{{$t('l.invite_text')}}</span>
          <span class="link_text">
            {{currentHref + '?address=' +walletAddress}}
            <img @click="handleCopyLink" class="invite_icon" alt="" src="../assets/copy_link.png">
          </span>
        </div>
      </div>
      <div v-show="currentIndex==0" class="pools-main">
        <div class="pools__item" v-for="item in oneTokens" :key="item.currency">
            <div class="pools__box">
              <a-spin tips="loading" :spinning="item.isLoading" size="large">
                <ul class="pools__rows">
                  <li class="pools__row-1">
                    <div class="pools__logo-name">
                      <svg-icon class="pools__coin-logo" :icon-class="item.currency + '_coin'" />
                      <div class="pools__coin-name" :class="currentIndex == 1 ? 'name_lp_2' : ''">{{item.currency}}</div>
                    </div>
                    <div class="pools__info">{{$t('l.reward')}} Libra</div>
                  </li>
                  <li class="pools__row pools__apy">
                    <div class="pools__labe-field">{{$t('l.nhsyl')}}</div>
                    <div class="pools__apy-value"><countTo :endVal="item.rateOfAnnualized" :duration='3000' :decimals="4" suffix="%"></countTo></div>
                  </li>
                  <li class="pools__row">
                    <div class="pools__labe-field">{{$t('l.deposited')}}({{item.currency}})</div>
                    <div class="pools__label-value pools__label-value--black"><countTo :endVal='item.lockAmount' :duration='3000' :decimals="4"></countTo></div>
                  </li>
                  <li class="pools__row">
                    <div class="pools__labe-field">{{$t('l.VL')}}({{item.currency}})</div>
                    <div class="pools__label-value"><countTo :endVal='item.totalLockAmount' :duration='3000' :decimals="2"></countTo></div>
                  </li>
                  <li class="pools__group-buttons">
                    <div class="pools__button-group">
                      <button class="g-button pools__dialog__option g-button-heco-theme  g-button--normal" @click="handleShowWithdrawModal(0,item)">{{$t('l.withdrawal')}}</button>
                      <button v-show="!item.isApproved" class="g-button pools__dialog__option g-button-heco-theme " @click="handleApprovedFor(item.currency,null)">{{$t('l.approve')}}</button>
                      <button v-show="item.isApproved" class="g-button pools__dialog__option g-button--approved" @click="handleShowDepositModal(0,item)">{{$t('l.deposit')}}</button>
                    </div>
                  </li>
                </ul>
                <div class="pools__mao-logo__wrap">
                  <img src="" alt="" class="pools__mao-logo">
                </div>
              </a-spin>
            </div>
        </div>
      </div>
      <div v-show="currentIndex==1" class="pools-main">
        <div class="pools__item" v-for="item in twoTokens" :key="item.currency2">
          <div class="pools__box">
            <a-spin tips="loading" :spinning="item.isLoading" size="large">
              <ul class="pools__rows">
                <li class="pools__row-1">
                  <div class="pools__logo-name">
                    <svg-icon class="pools__coin-logo" :icon-class="item.currency1 + '_coin'"/>
                    <svg-icon v-if="currentIndex == 1" class="pools__coin-logo logo_lp_2" :icon-class="item.currency2 + '_coin'"/>
                    <div class="pools__coin-name" :class="currentIndex == 1 ? 'name_lp_2' : ''">{{item.currency1}}/{{item.currency2}}</div>
                  </div>
                  <div class="pools__info">{{$t('l.reward')}} Libra</div>
                </li>
                <li class="pools__row pools__apy">
                  <div class="pools__labe-field">{{$t('l.nhsyl')}}</div>
                  <div class="pools__apy-value"><countTo :endVal='item.rateOfAnnualized' :duration='3000' :decimals="4" suffix="%"></countTo></div>
                </li>
                <li class="pools__row">
                  <div class="pools__labe-field">{{$t('l.deposited')}}({{item.currency1}}/{{item.currency2}})</div>
                  <div class="pools__label-value pools__label-value--black">
                    <countTo :endVal='item.lockAmount1' :duration='3000' :decimals="4"></countTo>
                    /
                    <countTo :endVal='item.lockAmount2' :duration='3000' :decimals="4"></countTo>
                    </div>
                </li>
                <li class="pools__row">
                  <div class="pools__labe-field">{{$t('l.VL')}}({{item.currency1}}/{{item.currency2}})</div>
                  <div class="pools__label-value">
                    <countTo :endVal='item.totalLockAmount1' :duration='3000' :decimals="2"></countTo>
                    /
                    <countTo :endVal='item.totalLockAmount2' :duration='3000' :decimals="2"></countTo>
                    </div>
                </li>
                <li class="pools__group-buttons">
                  <div class="pools__button-group">
                    <button class="g-button pools__dialog__option g-button-heco-theme  g-button--normal" @click="handleShowWithdrawModal(1,item)">{{$t('l.withdrawal')}}</button>
                    <button v-show="!item.isApproved" class="g-button pools__dialog__option g-button-heco-theme " @click="handleApprovedFor(item.currency1,item.currency2)">{{$t('l.approve')}}</button>
                    <button v-show="item.isApproved" class="g-button pools__dialog__option g-button--approved" @click="handleShowDepositModal(1,item)">{{$t('l.deposit')}}</button>
                  </div>
                </li>
              </ul>
              <div class="pools__mao-logo__wrap">
                <img src="" alt="" class="pools__mao-logo">
              </div>
            </a-spin>
          </div>
        </div>
      </div>
      <!-- 单币种取出 -->
      <a-modal v-model="isModalShowWithOne" :footer="null" :width="!$store.state.accounts.isMobile ? '600px' : '90%'" @cancel="handleMCancel" :centered="true">
        <div class="pools__dialog-inner pools__dialog-withdraw">
          <div class="pools__dialog__header">{{$t('l.withdrawal')}}</div>
          <ul class="pools__rows">
            <li class="pools__row-1">
              <div class="pools__logo-name">
                <svg-icon class="pools__coin-logo" :icon-class="withdrawalInfo.currency + '_coin'" />
                <img v-if="currentIndex == 1" class="pools__coin-logo logo_lp_2" src="../assets/Libra_icon.png">
                <div class="pools__coin-name" :class="currentIndex == 1 ? 'name_lp_2' : ''">{{withdrawalInfo.currency}}</div>
              </div>
              <div class="pools__info">{{$t('l.reward')}} {{withdrawalInfo.currency}}</div>
            </li>
            <li class="pools__dialog__withdraw-field">
              <span>{{$t('l.deposited')}}({{withdrawalInfo.currency}})</span><span><countTo :endVal='withdrawalInfo.lockAmount' :duration='3000' :decimals="4"></countTo></span>
            </li>
            <li class="pools__dialog__input">
              <input @input="input_num(1)" :placeholder="$t('l.iptPlace')" v-model="iptValue1">
              <button @click="iptValue1 = withdrawalInfo.lockAmount" class="g-button pools__dialog__deposit-all g-button-heco-theme  g-button--normal">{{$t('l.withdrawall')}}</button>
            </li>
            <li>
              <button @click="handleWithDrawOne(withdrawalInfo.currency,iptValue1)" class="g-button pools__dialog__option g-button-heco-theme ">{{$t('l.withdrawal')}}</button>
            </li>
          </ul>
        </div>
      </a-modal>
      <!-- 双币种取出 -->
      <a-modal v-model="isModalShowWithTwo" :footer="null" :width="!$store.state.accounts.isMobile ? '600px' : '90%'" @cancel="handleMCancel" :centered="true">
        <div class="pools__dialog-inner pools__dialog-withdraw">
          <div class="pools__dialog__header">{{$t('l.withdrawal')}}</div>
          <ul class="pools__rows">
            <li class="pools__row-1">
              <div class="pools__logo-name">
                <svg-icon class="pools__coin-logo" :icon-class="withdrawalInfo.currency1 + '_coin'" />
                <svg-icon v-if="currentIndex == 1" class="pools__coin-logo logo_lp_2" :icon-class="withdrawalInfo.currency2 + '_coin'" />
                <div class="pools__coin-name" :class="currentIndex == 1 ? 'name_lp_2' : ''">{{withdrawalInfo.currency1 + "/" + withdrawalInfo.currency2}}</div>
              </div>
              <div class="pools__info">{{$t('l.reward')}} {{withdrawalInfo.currency1}}</div>
            </li>
            <li class="pools__dialog__withdraw-field">
              <span>{{$t('l.deposited')}}({{withdrawalInfo.currency1}})</span><span><countTo :endVal='withdrawalInfo.lockAmount1' :duration='3000' :decimals="4"></countTo></span>
            </li>
            <li class="pools__dialog__input">
              <input @input="input_num(1)" :placeholder="$t('l.iptPlace')" v-model="iptValue1">
              <button @click="iptValue1 = withdrawalInfo.lockAmount1" class="g-button pools__dialog__deposit-all g-button-heco-theme  g-button--normal">{{$t('l.withdrawall')}}</button>
            </li>
            <li>
              <button @click="handleWithDrawTwo(iptValue1,withdrawalInfo.currency2)" class="g-button pools__dialog__option g-button-heco-theme ">{{$t('l.withdrawal')}}</button>
            </li>
          </ul>
        </div>
      </a-modal>
      <!-- 单币种存入 -->
      <a-modal v-model="isModalShowSaveOne" :footer="null" :width="!$store.state.accounts.isMobile ? '600px' : '90%'" @cancel="handleMCancel" :centered="true">
        <div class="pools__dialog-inner pools__dialog-deposite">
          <div class="pools__dialog__header">{{$t('l.deposit')}}</div>
          <ul class="pools__dialog__fields">
            <li class="pools__row-1">
              <div class="pools__logo-name">
                <svg-icon class="pools__coin-logo" :icon-class="depositInfo.currency + '_coin'" />
                <svg-icon v-if="currentIndex == 1" class="pools__coin-logo logo_lp_2" :icon-class="depositInfo.currency + '_coin'" />
                <div class="pools__coin-name" :class="currentIndex == 1 ? 'name_lp_2' : ''">{{depositInfo.currency}}</div>
              </div>
              <div class="pools__info">{{$t('l.reward')}} Libra</div>
            </li>
            <li class="pools__row">
              <div class="pools__labe-field">{{$t('l.deposited')}} ({{depositInfo.currency}})</div>
              <div class="pools__label-value pools__label-value--black"><countTo :endVal='depositInfo.lockAmount' :duration='3000' :decimals="4"></countTo></div>
            </li>
            <li class="pools__row">
              <div class="pools__labe-field">{{$t('l.balance')}}({{depositInfo.currency}})</div>
              <div class="pools__label-value pools__label-value--black"><countTo :endVal='depositInfo.balance' :duration='3000' :decimals="4"></countTo></div>
            </li>
            <li class="pools__dialog__input">
              <input @input="input_num(2)" :placeholder="$t('l.iptPlace')" v-model="iptValue2">
              <button @click="iptValue2=depositInfo.balance" class="g-button pools__dialog__deposit-all g-button-heco-theme  g-button--normal">{{$t('l.depositall')}}</button>
            </li>
            <li>
              <button @click="handleDepositConfirmOne(depositInfo.currency,iptValue2)" class="g-button pools__dialog__option g-button-heco-theme ">{{$t('l.deposit')}}</button>
            </li>
          </ul>
        </div>
      </a-modal>
      <!-- 双币种存入 -->
      <a-modal v-model="isModalShowSaveTwo" :footer="null" :width="!$store.state.accounts.isMobile ? '600px' : '90%'" @cancel="handleMCancel" :centered="true">
        <div class="pools__dialog-inner pools__dialog-deposite">
          <div class="pools__dialog__header">{{$t('l.deposit')}}</div>
          <ul class="pools__dialog__fields">
            <li class="pools__row-1">
              <div class="pools__logo-name">
                <svg-icon class="pools__coin-logo" :icon-class="depositInfo.currency1 + '_coin'" />
                <svg-icon v-if="currentIndex == 1" class="pools__coin-logo logo_lp_2" :icon-class="depositInfo.currency2 + '_icon'" />
                <div class="pools__coin-name" :class="currentIndex == 1 ? 'name_lp_2' : ''">Libra/{{depositInfo.currency2}}</div>
              </div>
              <div class="pools__info">{{$t('l.reward')}} Libra</div>
            </li>
            <li class="pools__row">
              <div class="pools__labe-field">{{$t('l.deposited')}} (Libra/{{depositInfo.currency2}})</div>
              <div class="pools__label-value pools__label-value--black"><countTo :endVal='depositInfo.lockAmount2' :duration='3000' :decimals="4"></countTo></div>
            </li>
            <li class="pools__row">
              <div class="pools__labe-field">{{$t('l.balance')}}(Libra/{{depositInfo.currency2}})</div>
              <div class="pools__label-value pools__label-value--black"><countTo :endVal='depositInfo.balance' :duration='3000' :decimals="4"></countTo></div>
            </li>
            <li class="pools__dialog__input">
              <input @input="input_num(2)" :placeholder="$t('l.iptPlace')" v-model="iptValue2">
              <button @click="iptValue2=depositInfo.balance" class="g-button pools__dialog__deposit-all g-button-heco-theme  g-button--normal">{{$t('l.depositall')}}</button>
            </li>
            <li>
              <button @click="handleDepositConfirmTwo(iptValue2,depositInfo.currency2)" class="g-button pools__dialog__option g-button-heco-theme ">{{$t('l.deposit')}}</button>
            </li>
          </ul>
        </div>
      </a-modal>
    </div>
    </a-spin>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
import Wallet from '@/utils/Wallet.js';
import {getRate,postWithdrawalData,postExchangeData} from '@/utils/api'
export default {
  name: "Home",
  components: {
    countTo
  },
  data() {
    return {
      currentHref: window.location.origin+window.location.pathname,
      spinStatus: false,
      isModalShowWithOne:false,
      isModalShowWithTwo:false,
      isModalShowSaveOne: false,
      isModalShowSaveTwo: false,
      inviteAddress:null,
      modalCurrencyOne:'',
      modalCurrencyTwo:'',
      withdrawalCurrency:'',
      withdrawalInfo:{},
      depositInfo:{},
      currentIndex: 0,   //0 单币  1 lp
      navArr: ['db','lp'],
      iptValue: undefined,
      currentPoolID: -1,
      currentPoolIndex: -1,
      incomeAmount: 0,
      iptValue1: undefined,
      iptValue2: undefined,

      isApprovedETH:false,
      isApprovedBNB:false,
      isApprovedBTC:false,
      isApprovedUSDT:false,
      isApprovedFIL:false,
      isApprovedLibra:false,

      oneTokens:[
        {
          currency:"ETH",
          rateOfAnnualized:12.1101,
          lockAmount:0,
          totalLockAmount:0,
          isApproved:false,
        },
        {
          currency:"BNB",
          rateOfAnnualized:22.22,
          lockAmount:0,
          totalLockAmount:0,
          isApproved:false,
        },
        {
          currency:"BTC",
          rateOfAnnualized:33.33,
          lockAmount:0,
          totalLockAmount:0,
          isApproved:false,
        },
        {
          currency:"USDT",
          rateOfAnnualized:44.44,
          lockAmount:0,
          totalLockAmount:0,
          isApproved:false,
        },
      ],
      twoTokens:[
        {
          currency1:"Libra",
          currency2:"ETH",
          rateOfAnnualized:12.1101,
          lockAmount1:0,
          lockAmount2:0,
          totalLockAmount1:0,
          totalLockAmount2:0,
          isApproved:false,
        },
        {
          currency1:"Libra",
          currency2:"BNB",
          rateOfAnnualized:22.22,
          lockAmount1:0,
          lockAmount2:0,
          totalLockAmount1:0,
          totalLockAmount2:0,
          isApproved:false,
        },
        {
          currency1:"Libra",
          currency2:"USDT",
          rateOfAnnualized:33.33,
          lockAmount1:0,
          lockAmount2:0,
          totalLockAmount1:0,
          totalLockAmount2:0,
          isApproved:false,
        },
        {
          currency1:"Libra",
          currency2:"BTC",
          rateOfAnnualized:44.44,
          lockAmount1:0,
          lockAmount2:0,
          totalLockAmount1:0,
          totalLockAmount2:0,
          isApproved:false,
        },
        {
          currency1:"Libra",
          currency2:"FIL",
          rateOfAnnualized:55.55,
          lockAmount1:0,
          lockAmount2:0,
          totalLockAmount1:0,
          totalLockAmount2:0,
          isApproved:false,
        },
      ],
      walletAddress:'',
    }
  },
  computed: {
  },
  methods: {
    handleTapStart(e) {
      e.target.classList.add('tap')
    },
    handleTapEnd(e) {
      e.target.classList.remove('tap')
    },
    handleContChange(index) {
      this.$setCookie('vault',index/1,30 * 24 * 60 * 60);
      this.currentIndex = index
    },
    handleCopyLink() {
    },
    handleMCancel() {
      this.currentPoolIndex = -1;
      this.incomeAmount = 0
      this.iptValue1 = undefined
      this.iptValue2 = undefined
    },
    async handleApprovedFor(currency1,currency2) {
      currency1=currency1.toUpperCase();
      if (currency2!= null){
        currency2=currency2.toUpperCase();
      }
      console.log("currency1 = "+currency1);
      console.log("currency2 = "+currency2);
      this.walletAddress = localStorage.getItem("walletAddress");

      if (currency2==null){
        Wallet.approve(currency1,this.walletAddress,10000000,(res)=>{
          if(res){
            this.updateApproveStatus(currency1);
          }
        });
      }else {
        Wallet.approve(currency1,this.walletAddress,10000000,(res)=>{
          if(res){
            this.updateApproveStatus(currency1);
          }
        });

        Wallet.approve(currency2,this.walletAddress,10000000,(res)=>{
          if(res){
            this.updateApproveStatus(currency2);
          }
        });
      }
    },

    updateApproveStatus(currency){

      if (currency != null) {
        currency = currency.toUpperCase();
        if (currency == "ETH") {
          this.isApprovedETH = true;
          localStorage.setItem("isApprovedETH", true);
        } else if (currency == "BNB") {
          this.isApprovedBNB = true;
          localStorage.setItem("isApprovedBNB", true);
        } else if (currency == "BTC") {
          this.isApprovedBTC = true;
          localStorage.setItem("isApprovedBTC", true);
        } else if (currency == "USDT") {
          this.isApprovedUSDT = true;
          localStorage.setItem("isApprovedUSDT", true);
        } else if (currency == "FIL") {
          this.isApprovedFIL = true;
          localStorage.setItem("isApprovedFIL", true);
        } else if (currency == "LIBRA") {
          this.isApprovedLibra = true;
          localStorage.setItem("isApprovedLibra", true);
        } else {
          return;
        }
      }

      for (var i=0;i<this.oneTokens.length;i++){
        if (this.oneTokens[i].currency.toUpperCase()=="ETH"){
          if (this.isApprovedETH){
            this.oneTokens[i].isApproved=true;
          }else {
            this.oneTokens[i].isApproved=false;
          }
        }else if (this.oneTokens[i].currency.toUpperCase()=="BNB"){
          if (this.isApprovedBNB){
            this.oneTokens[i].isApproved=true;
          }else {
            this.oneTokens[i].isApproved=false;
          }
        }else if (this.oneTokens[i].currency.toUpperCase()=="BTC"){
          if (this.isApprovedBTC){
            this.oneTokens[i].isApproved=true;
          }else {
            this.oneTokens[i].isApproved=false;
          }
        }else if (this.oneTokens[i].currency.toUpperCase()=="USDT"){
          if (this.isApprovedUSDT){
            this.oneTokens[i].isApproved=true;
          }else {
            this.oneTokens[i].isApproved=false;
          }
        }
      }
      for (var j=0;j<this.twoTokens.length;j++){
        if (this.twoTokens[j].currency2.toUpperCase()=="ETH"){
          if (this.isApprovedLibra && this.isApprovedETH){
            this.twoTokens[j].isApproved=true;
          }else {
            this.twoTokens[j].isApproved=false;
          }
        }else if (this.twoTokens[j].currency2.toUpperCase()=="BNB"){
          if (this.isApprovedLibra && this.isApprovedBNB){
            this.twoTokens[j].isApproved=true;
          }else {
            this.twoTokens[j].isApproved=false;
          }
        }else if (this.twoTokens[j].currency2.toUpperCase()=="USDT"){
          if (this.isApprovedLibra && this.isApprovedUSDT){
            this.twoTokens[j].isApproved=true;
          }else {
            this.twoTokens[j].isApproved=false;
          }
        }else if (this.twoTokens[j].currency2.toUpperCase()=="BTC"){
          if (this.isApprovedLibra && this.isApprovedBTC){
            this.twoTokens[j].isApproved=true;
          }else {
            this.twoTokens[j].isApproved=false;
          }
        }else if (this.twoTokens[j].currency2.toUpperCase()=="FIL"){
          if (this.isApprovedLibra && this.isApprovedFIL){
            this.twoTokens[j].isApproved=true;
          }else {
            this.twoTokens[j].isApproved=false;
          }
        }
      }
    },

    async handleShowWithdrawModal(index,currency) {
      this.withdrawalInfo = currency;
      if (index==0){
        this.isModalShowWithOne=true;
      }else {
        this.isModalShowWithTwo=true;
      }
    },
    async handleClaim() {
    },
    handleWithAll() {
    },
    async handleWithDrawOne(currency,amount) {
      let _this = this
      let aUp = +amount;
      if (aUp > _this.withdrawalInfo.lockAmount || !amount){
        _this.$message.error("数量错误")
        return;
      }
      Wallet.takeoutOne(this.walletAddress,currency,aUp, (res)=>{
        console.log(res)
         if(res){
           postWithdrawalData({address:_this.walletAddress,amount:amount,parentAddress:_this.inviteAddress,token1:currency})
           .then(res => {
              const {status} = res
              if(status == 200){
                 _this.isModalShowWithOne = false
                 _this.$success({
                   title:'提取',
                   content:'提取成功'
                 })

              }
           })
         }
        
      }, (res)=>{
        _this.$error({
          title:'提取',
          content:res.message || '提取失败'
        })
      });
    },
    async handleWithDrawTwo(amount1,currency2) {
      let _this = this
      if (currency2 == null || currency2 == undefined){
        _this.$message.error("币种错误");
        return ;
      }
      if (!amount1 || amount1 > _this.withdrawalInfo.lockAmount1){
        _this.$message.error("数量错误")
        return ;
      }
      console.log(amount1,currency2)
      Wallet.takeoutTwo(this.walletAddress,amount1,currency2,(res)=>{

         if(res){
           postWithdrawalData({address:_this.walletAddress,amount:amount1,parentAddress:_this.inviteAddress,token1:_this.withdrawalInfo.currency1,token2:currency2})
           .then(res => {
              const {status} = res
              if(status == 200){
                 _this.isModalShowWithOne = false
                 _this.$success({
                   title:'提取',
                   content:'提取成功'
                 })

              }
           })
         }
      }, (res)=>{
        _this.$error({
          title:'提取',
          content:res.message || '提取失败'
        })
      });
    },
    async handleShowDepositModal(index,item) {
      let _self = this
      _self.depositInfo = item
      _self.$message.loading({ content: 'Loading...',key:'lang'})
      let currency = _self.depositInfo.currency ? _self.depositInfo.currency : _self.depositInfo.currency2;
      Wallet.balanceOf(currency,_self.walletAddress,(res)=>{
         _self.$message.success({ content: 'Loaded!',key:'lang' ,duration: 2 });
         _self.depositInfo.balance = Number((res ? res : 0) / Wallet.Precisions(currency))
        if(index==0){
          _self.isModalShowSaveOne = true
        }else if(index==1){
          _self.isModalShowSaveTwo = true
        }
      })
    },
    async handleDepositConfirmOne(currency,amount) {
      if (currency == undefined||currency ==  null){
        alert("请选择币种");
        return ;
      }
      if (!amount || amount > _self.depositInfo.balance){
        _this.$message.error("存入数量不正确")
        return;
      }
      //TODO 获取币种currency的价格price，amount*price 必须 大于 100美元
      
      //TODO 判断账户Currency余额

      //调用合约方法存入币种
      Wallet.depositOne(this.walletAddress,this.walletAddress,currency,amount,(res)=>{
        alert("已存入");
      },(res)=>{
        alert("报错："+res);
      });
    },
    async handleDepositConfirmTwo(libraAmount,currency2) {
      let _this = this
      if (currency2 == undefined||currency2 ==  null){
        _this.$message.error("请选择币种")
        return;
      }
      if (libraAmount == undefined || libraAmount == null || libraAmount <= 0){
        _this.$message.error("请输入存入数量");
        return ;
      }
      //TODO 获取libra价格（libraPrice），和currency2价格（currency2Price），
      //TOoneDepositOrderDO (libraAmount*libraPrice)+currency2Amount*currency2Price 必须大于 100美元
      //调用合约方法存入币种
      Wallet.depositTwo(this.walletAddress,this.walletAddress,libraAmount,currency2,(res)=>{
        _this.$message.success("已存入！"+JSON.stringify(res));
      },(res)=>{
        _this.$message.error("报错："+res);
      });
    },
    async getMyPairLockAmount(start = 0,end = 5){
      let _self = this
      new Promise((resolve,reject) => {
        try {
          let promiseMyLockArr = [],resultLockArr = [];
          let i = start;
          do {
            ++i;
            promiseMyLockArr[i] = new Promise((res,rej) => {
                Wallet.twoDepositOrder(_self.walletAddress,i,(record) => {
                  if(record){
                    resultLockArr.push(record)
                    res(record)
                  }else{
                    rej('error')
                  }
                })
            })

          } while (i < end);

          //全部请求可能失败, finally接收
          Promise.all(promiseMyLockArr)
          .finally(() => {
            resolve('success')
            // TODO: 放入定时器后, 需要清除lockAmount,防止累加

            //格式化数据 0-Libra/ETH  1-Libra/BNB 3-Libar/USDT 4-Libra/BTC 5-Libra/FIL
            //返回  1libra.   2btc. 3eth.  4usdt.  5bnb.  6fil
            _self.twoTokens[0].lockAmount1 += _self.caluUseable('LIBRA','useableAmount1',1,3,resultLockArr)
            _self.twoTokens[0].lockAmount2 += _self.caluUseable('ETH','useableAmount2',1,3,resultLockArr)

            _self.twoTokens[1].lockAmount1 += _self.caluUseable('LIBRA','useableAmount1',1,5,resultLockArr)
            _self.twoTokens[1].lockAmount2 += _self.caluUseable('BNB','useableAmount2',1,5,resultLockArr)

            _self.twoTokens[2].lockAmount1 += _self.caluUseable('LIBRA','useableAmount1',1,4,resultLockArr)
            _self.twoTokens[2].lockAmount2 += _self.caluUseable('USDT','useableAmount2',1,4,resultLockArr)

            _self.twoTokens[3].lockAmount1 += _self.caluUseable('LIBRA','useableAmount1',1,2,resultLockArr)
            _self.twoTokens[3].lockAmount2 += _self.caluUseable('BTC','useableAmount2',1,2,resultLockArr)

            _self.twoTokens[4].lockAmount1 += _self.caluUseable('LIBRA','useableAmount1',1,6,resultLockArr)
            _self.twoTokens[4].lockAmount2 += _self.caluUseable('FIL','useableAmount2',1,6,resultLockArr)
            
            //这里过滤数据, 递归
            if(resultLockArr.length == end){
              _self.getMyPairLockAmount(end,end + 5)
            }
          })
        } catch (error) {
            reject(error)
            _self.$message.error(_self.$t('l.catch_err'))
        }
      })
    },
    caluUseable(currency,key,index1,index2,array){
        let libra_eth_1 = array.filter(ele => index2 == -1 ? ele.currencyIndex == index1 :  ele.currency1Index == index1 && ele.currency2Index == index2)
                                        .reduce((currentTotal,item) => {
                                            let num = +item[key]
                                            return num + currentTotal
                                        },0)  || 0
        
        libra_eth_1 > 0 && (libra_eth_1 = Number(libra_eth_1 / Wallet.Precisions(currency)))
        console.log(currency,libra_eth_1)
        return libra_eth_1
    },
    async getMyLockAmount(start = 0, end = 5){
      let _self = this
      new Promise((resolve,reject) => {
        try {
          let promiseMyLockArr = [],resultLockArr = [];
          let i = start;
          do {
            ++i;
            promiseMyLockArr[i] = new Promise((res,rej) => {
                Wallet.oneDepositOrder(_self.walletAddress,i,(record) => {
                  if(record){
                    resultLockArr.push(record)
                    res(record)
                  }else{
                    rej('error')
                  }
                })
            })

          } while (i < end);

          //全部请求,可能失败, finally接收
          Promise.all(promiseMyLockArr).finally(() => {
            resolve('success')
            console.log(resultLockArr)
            // TODO: 放入定时器后, 需要清除lockAmount,防止累加

            //格式化数据 0-ETH  1-BNB 3-BTC 4-USDT
            //返回  1libra.   2btc. 3eth.  4usdt.  5bnb.  6fil
            _self.oneTokens[0].lockAmount += _self.caluUseable('ETH','useableAmount',3,-1,resultLockArr)

            _self.oneTokens[1].lockAmount += _self.caluUseable('BNB','useableAmount',5,-1,resultLockArr)

            _self.oneTokens[2].lockAmount += _self.caluUseable('BTC','useableAmount',2,-1,resultLockArr)

            _self.oneTokens[3].lockAmount += _self.caluUseable('USDT','useableAmount',4,-1,resultLockArr)
            
            //这里过滤数据, 递归
            if(resultLockArr.length == end){
              _self.getMyLockAmount(end,end + 5)
            }

          })
          
        } catch (error) {
            reject(error)
            _self.$message.error(_self.$t('l.catch_err'))
        }
      })
    },
    //计算交易对锁仓
    async getPairLockAmount(){
      let _self = this
      _self.walletAddress = localStorage.getItem("walletAddress");
      new Promise((resolve,reject) => {
        try {
            let promiseAllarr = []
            for(let i = 0; i < _self.twoTokens.length;i++){
              promiseAllarr[i] = new Promise((res) => {

                Promise.all([
                  new Promise((res1) => {
                    Wallet.totalDepositBalance(_self.twoTokens[i].currency1,(in_a)=>{
                      let val = in_a
                      in_a > 0 && (val = Number(in_a / Wallet.Precisions(_self.twoTokens[i].currency1)))
                      val < -0.01 && (val = 0)
                      res1(val)
                    })
                  }),
                  new Promise((res2) => {
                    Wallet.totalTakeoutAmount(_self.twoTokens[i].currency1,(out_a)=>{
                      let val = out_a
                      out_a > 0 && (val = Number(out_a / Wallet.Precisions(_self.twoTokens[i].currency1)))
                      val < -0.01 && (val = 0)
                      res2(val)
                    })
                  }),
                  new Promise((res3) => {
                    Wallet.totalDepositBalance(_self.twoTokens[i].currency2,(in_a)=>{
                      let val = in_a
                      in_a > 0 && (val = Number(in_a / Wallet.Precisions(_self.twoTokens[i].currency2)))
                      val < -0.01 && (val = 0)
                      res3(val)
                    })
                  }),
                  new Promise((res4) => {
                    Wallet.totalTakeoutAmount(_self.twoTokens[i].currency2,(out_a)=>{
                      let val = out_a
                      out_a > 0 && (val = Number(out_a / Wallet.Precisions(_self.twoTokens[i].currency2)))
                      val < -0.01 && (val = 0)
                      res4(val)
                    })
                  }),
                  new Promise((res5) => {

                      Wallet.queryAllowance(_self.walletAddress,_self.twoTokens[i].currency1,(res)=>{
                        if(res && res > 0) {
                            res5(true)
                        }else {
                            res5(false)
                        }
                         
                      })
                  }),
                  new Promise((res6) => {
                      Wallet.queryAllowance(_self.walletAddress,_self.twoTokens[i].currency2,(res)=>{
                        if(res && res > 0) {
                            res6(true)
                        }else {
                            res6(false)
                        }
                      });
                  })
                ])
                .then((in_out) => {
                    _self.twoTokens[i].totalLockAmount1 = in_out[0] - in_out[1]
                    _self.twoTokens[i].totalLockAmount2 = in_out[2] - in_out[3]
                    _self.twoTokens[i].isApproved = in_out[4]&&in_out[5] ? true : false
                    _self.twoTokens[i].isLoading = false
                    res('success')
                })
                .finally(() => {
                    _self.twoTokens[i].isLoading = false
                    res('success')
                })

              })
            }
            //全部请求
            Promise.all(promiseAllarr).then(() => {
              resolve('success')
            }).catch(err => {
              reject(err)
            })
        }catch(err){
            reject(err)
            _self.$message.error(_self.$t('l.catch_err'))
        }
      })
    },
    //计算总锁仓
    async getLockAmount(){
      let _self = this
      _self.walletAddress = localStorage.getItem("walletAddress");
      new Promise((resolve,reject) => {
        try {
            let promiseAllarr = []
            for(let i = 0; i < _self.oneTokens.length;i++){
              promiseAllarr[i] = new Promise((res) => {

                Promise.all([
                  new Promise((res1) => {
                    Wallet.totalDepositBalance(_self.oneTokens[i].currency,(in_a)=>{
                      let val = in_a
                      in_a > 0 && (val = Number(in_a / Wallet.Precisions(_self.oneTokens[i].currency)))
                      val < -0.01 && (val = 0)
                      res1(val)
                    })
                  }),
                  new Promise((res2) => {
                    Wallet.totalTakeoutAmount(_self.oneTokens[i].currency,(out_a)=>{
                      let val = out_a
                      out_a > 0 && (val = Number(out_a / Wallet.Precisions(_self.oneTokens[i].currency)))
                      val < -0.01 && (val = 0)
                      res2(val)
                    })
                  }),
                  new Promise((res3) => {
                    Wallet.queryAllowance(_self.walletAddress,_self.oneTokens[i].currency,(pro)=>{
                        console.log({pro})
                        if(pro && pro > 0) {
                            res3(true)
                        }else {
                            res3(false)
                        }
                    });
                  })
                ])
                .then((in_out) => {
                    _self.oneTokens[i].totalLockAmount = in_out[0] - in_out[1]
                    _self.oneTokens[i].isApproved = in_out[2]
                    _self.oneTokens[i].isLoading = false
                    res('success')
                })
                .finally(() => {
                    _self.oneTokens[i].isLoading = false
                    res('success')
                })
              })
            }
            //全部请求
            Promise.all(promiseAllarr).then(() => {
              resolve('success')
            }).catch(err => {
              reject(err)
            })
        }catch(err){
            reject(err)
            _self.$message.error(_self.$t('l.catch_err'))
        }
      })
    },
    //年收益率
    async getRatePairs(){
      let _self = this
      const res = await Promise.all([getRate({type:1}),getRate({type:2})])
      const result1 = res[0].result, result2 = res[1].result;
      _self.oneTokens = _self.oneTokens.map(ele => {
        const data = {...ele}
        const find = result1.find(fd => fd.token1 == ele.currency).rate || 0
        data.rateOfAnnualized = find
        return data
      })

      _self.twoTokens = _self.twoTokens.map(ele => {
        const data = {...ele}
        const find = result2.find(fd => fd.token1 == ele.currency2.toUpperCase() && fd.token2 == ele.currency1.toUpperCase()).rate || 0
        data.rateOfAnnualized = find
        return data
      })
    },
    input_num(index) {
      this['currentPerIndex' + index] = -1
      this['iptValue' + index] = this['iptValue' + index].replace(/[^\d.]/g, "")
      this['iptValue' + index] = this['iptValue' + index].replace(/\.{4,}/g, ".")
      this['iptValue' + index] = this['iptValue' + index].replace(/^\./g, "")
      this['iptValue' + index] = this['iptValue' + index].replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
      this['iptValue' + index] = this['iptValue' + index].replace(/^(-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3')
    },
  },
  created() {
    this.walletAddress = localStorage.getItem("walletAddress");
    this.isApprovedETH=localStorage.getItem("isApprovedETH");
    this.isApprovedBNB=localStorage.getItem("isApprovedBNB");
    this.isApprovedBTC=localStorage.getItem("isApprovedBTC");
    this.isApprovedUSDT=localStorage.getItem("isApprovedUSDT");
    this.isApprovedFIL=localStorage.getItem("isApprovedFIL");
    this.isApprovedLibra=localStorage.getItem("isApprovedLibra");
    this.updateApproveStatus(null);
  },
  mounted() {

    //上级地址
    let inviteAddress = this.$route.query.address ? this.$route.query.address : ''
    inviteAddress && this.$setCookie('inviteAddress',inviteAddress,30 * 24 * 60 * 60)
    this.inviteAddress = this.$getCookie('inviteAddress') ? this.$getCookie('inviteAddress') : this.$emptyAddress()

    let ptype = this.$route.query.ptype ? this.$route.query.ptype : 1
    if(ptype !== undefined) {
      this.handleContChange(ptype - 1)
    }
    setTimeout(async () => {
       await this.getLockAmount()
       await this.getPairLockAmount()
       await this.getMyLockAmount()
       await this.getMyPairLockAmount()
       await this.getRatePairs()
    },500)
  },
  destroyed() {
    clearInterval(this.getDataInterVal)
    clearInterval(this.setStoreDataInterval)
  }
}
</script>

<style scoped>
  .vault_top_nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .copy_wrap {
    margin-left: auto;
    display: flex;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
  }
  .copy_wrap .copy_text {
    white-space: nowrap;
  }
  .copy_wrap .link_text {
    width: 100%;
    height: 28px;
    line-height: 28px;
    border: 1px solid #43318C;
    border-radius: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 40px 0 12px;
    box-sizing: border-box;
    margin-left: auto;
    position: relative;
    margin-left: 12px;
  }
  .copy_wrap .link_text img {
    position: absolute;
    right: 12px;
    top: 4px;
    cursor: pointer;
    width: 21px;
    height: 21px;
  }
  #donghuaBox{
    width: 50%;
    height: 100%;
    position: absolute;
    z-index: 1;
    background-color: #43318C;
    border-radius: 100px;
    transition: 0.5s;
  }
  .vault_nav {
    position: relative;
    background-color: #fff;
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
    margin: 0;padding: 0;
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
    /*background-color: #B98DCF;*/
    /*donghuaBox取代了这个*/
    border-radius: 16px;
  }
  li {
    list-style: none;
  }
  .copy_wrap {
    width: 354px;
    height: 48px;
    background-color: #fff;
    border-radius: 8px;
  }
  .vault_inner_wrap {
    text-align: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 0 48px 0;
  }
  .pools-main {
    width: calc(100% + 15px);
    max-width: 1230px;
    margin: 20px 0 0 -7.5px;
    overflow: hidden;
  }
  .pools__item {
    width: calc(100% / 3 - 15px);
    box-sizing: border-box;
    display: flex;
    position: relative;
    margin: 0 7.5px 30px;
    float: left;
  }
  .pools__box {
    width: 100%;
    box-sizing: border-box;
    padding: 28px 28px;
    border-radius: 16px;
    background-color: hsla(0,0%,100%,.7);
    border: 1px solid #fff;
    position: relative;
  }
  .pools__rows {
    position: relative;
    z-index: 1;
    list-style: none;
  }
  .pools__rows>li {
    margin-bottom: 16px;
  }
  .pools__rows>li:last-child {
    margin-bottom: 0;
  }
  .pools__row, .pools__row-1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .pools__row {
    flex-wrap: wrap;
  }
  .pools__logo-name {
    display: flex;
    align-items: center;
    position: relative;
  }
  .pools__coin-logo {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  .logo_lp_2 {
    position: absolute;
    top: 0;left: 10%;
  }
  .pools__coin-name {
    margin-left: 12px;
    font-size: 24px;
    color: #131d32;
    font-weight: 700;
  }
  .name_lp_2 {
    margin-left: 40px;
  }
  .pools__info, .pools__labe-field {
    color: #8391a8;
    display: flex;
    align-items: center;
  }
  .pools__info {
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    font-family: MicrosoftYaHei;
    margin-top: 4px;
  }
  .pools__apy {
    align-items: flex-end;
  }
  .pools__info, .pools__labe-field {
    color: #8391a8;
    display: flex;
    align-items: center;
  }
  .pools__labe-field, .ques__labe-field {
    color: #8391a8;
    display: flex;
    align-items: center;
  }
  .pools__apy-value {
    font-size: 24px;
    color: #19A569;
    font-weight: 700;
    font-family: DINPro-Black;
  }
  .pools__label-value {
    font-size: 14px;
    color: #8391a8;
    font-weight: bolder;
    margin-left: auto;
  }
  .pools__label-value--black {
    color: #131d32;
  }
  .pools__button-group {
    display: flex;
    justify-content: space-between;
  }
  .pools__button-group .g-button {
    width: 46%;
  }
  .g-button {
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
  .g-button--approved {
    background-image: none;
    background-color: #19A569;
  }
  .g-button--normal {
    background-image: none;
    background-color: #fff;
    color: #43318C;
    border: 1px solid #43318C;
  }
  .pools__mao-logo__wrap {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    overflow: hidden;
    border-radius: 16px;
  }
  .pools__mao-logo {
    -webkit-filter: blur(50px);
    filter: blur(50px);
    opacity: .3;
  }
  .g-button:hover {
    background-color: hsl(252, 74%, 21%);
  }
  .g-button--approved:hover {
    background-image: none;
    background-color: #183f2e;
  }
  .g-button--normal:hover{
    background-color: #1d0c63;
    color:#fff;
    border:none
  }
  .pools__dialog-inner {
    box-sizing: border-box;
    width: 100%;
    min-width: 100%;
    border-radius: 16px;
    font-size: 14px;
  }
  .pools__dialog__header {
    font-size: 20px;
    color: #131d32;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 28px;
    position: relative;
  }
  .pools__income-field {
    background: rgba(255,163,79,.08);
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 32px;
  }
  .pools__income-button {
    width: 108px;
  }
  .pools__dialog__withdraw-field span:first-child {
    color: #8391a8;
  }
  .pools__dialog__withdraw-field span:last-child {
    font-size: 16px;
    color: #131d32;
    float: right;
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
  .g-button:disabled {
    opacity: .5;
  }
  .pools__dialog__input {
    position: relative;
  }
  .pools__dialog__deposit-all {
    position: absolute;
    right: 20px;
    top: 10px;
    background: #e0eafa;
    border-radius: 16px;
    border: none;
    width: auto;
    padding: 0 10px;
    height: 32px;
    font-size: 14px;
    color: #43318C;
  }
  .pools__income-text {
    font-family: DINPro-Bold;
    font-size: 16px;
    color: #131d32;
    letter-spacing: 0;
    line-height: 20px;
    font-weight: 700;
    margin-bottom: 6px;
  }
  .pools__income-button .g-button {
    height: 36px;
  }
  .pools__dialog__fields li {
    margin-bottom: 22px;
  }
  @media (max-width: 768px) {
    .vault_nav {
      margin-left: 15px;
      font-size: 12px;
      width: 94%;
    }
    .pools-main {
      width: 100%;
    }
    .pools__item {
      width: 100%;
      padding: 0 15px;
    }
    .pools__box {
      width: 100%;
      padding: 24px;
    }
    .pools__rows>li {
      margin-bottom: 14px;
    }
    .pools__coin-name {
      font-size: 20px;
    }
    .pools__coin-logo {
      width: 36px;
      height: 36px;
    }
    .pools__info, .pools__labe-field {
      font-family: MicrosoftYaHei;
      font-size: 12px;
      font-weight: 400;
    }
    .pools__dialog-inner {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }
    .pools__dialog__header {
      font-family: MicrosoftYaHei-Bold;
      font-size: 16px;
      color: #131d32;
      line-height: 20px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .pools__dialog__header__close {
      right: -26px;
      top: -23px;
      width: 48px;
      height: 48px;
      background-size: 16px 16px;
    }
    .pools__dialog__fields li {
      margin-bottom: 13px;
    }
    .pools__income-field {
      padding: 10px 10px;
    }
    /* .vault_top_nav {
      flex-direction: column;
    } */
    .copy_wrap {
      margin: 0px 15px 0px 30px;
      height: 28px;
      padding: 0px;
    }
    .copy_wrap .link_text {
      margin-left: 0px;
    }
  }
</style>
<style>
  .global_loading.ant-spin-nested-loading > div > .ant-spin {
    width: 100%;height: 100vh;
    position: fixed!important;
    top: 0!important;
    bottom: 0!important;
    left: 0!important;
    right: 0!important;
    z-index: 99999!important;
    max-height: 10000px!important;
    background-color: rgba(255,255,255,.6);
  }
</style>
