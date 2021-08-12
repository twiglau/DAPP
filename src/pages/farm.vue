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
            http://127.0.0.1:10086/farm?address={{walletAddress}}
            <img @click="handleCopyLink" class="invite_icon" alt="" src="../assets/copy_link.png">
          </span>
        </div>
      </div>
      <div v-show="currentIndex==0" class="pools-main">
        <div class="pools__item" v-for="item in oneTokens" :key="item.currency">
            <div class="pools__box">
              <a-spin tips="loading" :spinning="false" size="large">
                <ul class="pools__rows">
                  <li class="pools__row-1">
                    <div class="pools__logo-name">
                      <img class="pools__coin-logo" src="../assets/ETH_coin.png">
                      <img v-if="currentIndex == 1" class="pools__coin-logo logo_lp_2" src="../assets/Libra_icon.png">
                      <div class="pools__coin-name" :class="currentIndex == 1 ? 'name_lp_2' : ''">{{item.currency}}</div>
                    </div>
                    <div class="pools__info">{{$t('l.reward')}} Libra</div>
                  </li>
                  <li class="pools__row pools__apy">
                    <div class="pools__labe-field">{{$t('l.nhsyl')}}</div>
                    <div class="pools__apy-value"><countTo :endVal="item.rateOfAnnualized" :duration='3000' :decimals="4" suffix="%"></countTo></div>
                  </li>
                  <li class="pools__row">
                    <div class="pools__labe-field">{{$t('l.deposited')}}(ETH)</div>
                    <div class="pools__label-value pools__label-value--black"><countTo :endVal='item.lockAmount' :duration='3000' :decimals="4"></countTo></div>
                  </li>
                  <li class="pools__row">
                    <div class="pools__labe-field">{{$t('l.VL')}}(ETH)</div>
                    <div class="pools__label-value"><countTo :endVal='item.totalLockAmount' :duration='3000' :decimals="2"></countTo></div>
                  </li>
                  <li class="pools__group-buttons">
                    <div class="pools__button-group">
                      <button class="g-button pools__dialog__option g-button-heco-theme  g-button--normal" @click="handleShowWithdrawModal({})">{{$t('l.withdrawal')}}</button>
                      <button v-show="!item.isApproved" class="g-button pools__dialog__option g-button-heco-theme " @click="handleApprovedFor(item.currency,null)">{{$t('l.approve')}}</button>
                      <button v-show="item.isApproved" class="g-button pools__dialog__option g-button-heco-theme " @click="handleShowDepositModal(0)">{{$t('l.deposit')}}</button>
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
            <a-spin tips="loading" :spinning="false" size="large">
              <ul class="pools__rows">
                <li class="pools__row-1">
                  <div class="pools__logo-name">
                    <img class="pools__coin-logo" src="../assets/ETH_coin.png">
                    <img v-if="currentIndex == 1" class="pools__coin-logo logo_lp_2" src="../assets/Libra_icon.png">
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
                  <div class="pools__label-value pools__label-value--black"><countTo :endVal='item.lockAmount' :duration='3000' :decimals="4"></countTo></div>
                </li>
                <li class="pools__row">
                  <div class="pools__labe-field">{{$t('l.VL')}}({{item.currency1}}/{{item.currency2}})</div>
                  <div class="pools__label-value"><countTo :endVal='item.totalLockAmount' :duration='3000' :decimals="2"></countTo></div>
                </li>
                <li class="pools__group-buttons">
                  <div class="pools__button-group">
                    <button class="g-button pools__dialog__option g-button-heco-theme  g-button--normal" @click="handleShowWithdrawModal({})">{{$t('l.withdrawal')}}</button>
                    <button v-show="!item.isApproved" class="g-button pools__dialog__option g-button-heco-theme " @click="handleApprovedFor(item.currency1,item.currency2)">{{$t('l.approve')}}</button>
                    <button v-show="item.isApproved" class="g-button pools__dialog__option g-button-heco-theme " @click="handleShowDepositModal(0)">{{$t('l.deposit')}}</button>
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
      <a-modal v-model="isModalShow" :footer="null" :width="!$store.state.accounts.isMobile ? '600px' : '90%'" @cancel="handleMCancel" :centered="true">
        <div class="pools__dialog-inner pools__dialog-withdraw">
          <div class="pools__dialog__header">{{$t('l.withdrawal')}}</div>
          <ul class="pools__rows">
            <li class="pools__row-1">
              <div class="pools__logo-name">
                <img class="pools__coin-logo" src="../assets/ETH_coin.png">
                <img v-if="currentIndex == 1" class="pools__coin-logo logo_lp_2" src="../assets/Libra_icon.png">
                <div class="pools__coin-name" :class="currentIndex == 1 ? 'name_lp_2' : ''">ETH</div>
              </div>
              <div class="pools__info">{{$t('l.reward')}} Libra</div>
            </li>
            <li class="pools__income-field">
              <div class="pools__income-label">
                <p class="pools__income-title">{{$t('l.sygz')}}</p>
                <p class="pools__income-text"><countTo :endVal='1000.00' :duration='3000' :decimals="4"></countTo> Libra</p>
              </div>
              <div class="pools__income-button">
                <button @click="handleClaim" class="g-button g-button-heco-theme ">{{$t('l.claim')}}</button>
              </div>
            </li>
            <li class="pools__dialog__withdraw-field">
              <span>{{$t('l.deposited')}}({{currentPoolIndex > -1 ? 'ETH' : ''}})</span><span><countTo :endVal='10000.00' :duration='3000' :decimals="4"></countTo></span>
            </li>
            <li class="pools__dialog__input">
              <input @input="input_num(1)" :placeholder="$t('l.iptPlace')" v-model="iptValue1">
              <button @click="handleWithAll" class="g-button pools__dialog__deposit-all g-button-heco-theme  g-button--normal">{{$t('l.withdrawall')}}</button>
            </li>
            <li>
              <button @click="handleWithDraw" class="g-button pools__dialog__option g-button-heco-theme ">{{$t('l.withdrawal')}}</button>
            </li>
          </ul>
        </div>
      </a-modal>
      <a-modal v-model="isModalShowSave" :footer="null" :width="!$store.state.accounts.isMobile ? '600px' : '90%'" @cancel="handleMCancel" :centered="true">
        <div class="pools__dialog-inner pools__dialog-deposite">
          <div class="pools__dialog__header">{{$t('l.deposit')}}</div>
          <ul class="pools__dialog__fields">
            <li class="pools__row-1">
              <div class="pools__logo-name">
                <img class="pools__coin-logo" src="../assets/ETH_coin.png">
                <img v-if="currentIndex == 1" class="pools__coin-logo logo_lp_2" src="../assets/Libra_icon.png">
                <div class="pools__coin-name" :class="currentIndex == 1 ? 'name_lp_2' : ''">ETH</div>
              </div>
              <div class="pools__info">{{$t('l.reward')}} Libra</div>
            </li>
            <li class="pools__row">
              <div class="pools__labe-field">{{$t('l.deposited')}} (ETH)</div>
              <div class="pools__label-value pools__label-value--black"><countTo :endVal='1000.00' :duration='3000' :decimals="4"></countTo></div>
            </li>
            <li class="pools__row">
              <div class="pools__labe-field">{{$t('l.balance')}}(ETH)</div>
              <div class="pools__label-value pools__label-value--black"><countTo :endVal='1000.0' :duration='3000' :decimals="4"></countTo></div>
            </li>
            <li class="pools__dialog__input">
              <input @input="input_num(2)" :placeholder="$t('l.iptPlace')" v-model="iptValue2">
              <button @click="handleDepositAll" class="g-button pools__dialog__deposit-all g-button-heco-theme  g-button--normal">{{$t('l.depositall')}}</button>
            </li>
            <li>
              <button @click="handleDepositConfirm" class="g-button pools__dialog__option g-button-heco-theme ">{{$t('l.deposit')}}</button>
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
import Vue from 'vue';
import Web3 from 'web3'

export default {
  name: "Home",
  components: {
    countTo,
  },
  data() {
    return {
      currentHref: window.location.origin+window.location.pathname,
      spinStatus: false,
      isModalShow: false,
      isModalShowSave: false,
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
          lockAmount:0,
          totalLockAmount:0,
          isApproved:false,
        },
        {
          currency1:"Libra",
          currency2:"BNB",
          rateOfAnnualized:22.22,
          lockAmount:0,
          totalLockAmount:0,
          isApproved:false,
        },
        {
          currency1:"Libra",
          currency2:"USDT",
          rateOfAnnualized:33.33,
          lockAmount:0,
          totalLockAmount:0,
          isApproved:false,
        },
        {
          currency1:"Libra",
          currency2:"BTC",
          rateOfAnnualized:44.44,
          lockAmount:0,
          totalLockAmount:0,
          isApproved:false,
        },
        {
          currency1:"Libra",
          currency2:"FIL",
          rateOfAnnualized:55.55,
          lockAmount:0,
          totalLockAmount:0,
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

      currency = currency.toUpperCase();
      if(currency == "ETH"){
        this.isApprovedETH=true;
        localStorage.setItem("isApprovedETH",true);
      }else if(currency == "BNB"){
        this.isApprovedBNB=true;
        localStorage.setItem("isApprovedBNB",true);
      }else if(currency == "BTC"){
        this.isApprovedBTC=true;
        localStorage.setItem("isApprovedBTC",true);
      }else if(currency == "USDT"){
        this.isApprovedUSDT=true;
        localStorage.setItem("isApprovedUSDT",true);
      }else if(currency == "FIL"){
        this.isApprovedFIL=true;
        localStorage.setItem("isApprovedFIL",true);
      }else if(currency == "LIBRA"){
        this.isApprovedLibra=true;
        localStorage.setItem("isApprovedLibra",true);
      }else {
        return;
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
    updateAllApproveStatus(){
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
    async handleShowWithdrawModal(index) {
      this.isModalShow = true
    },
    async handleClaim() {
    },
    handleWithAll() {
    },
    async handleWithDraw() {
    },
    async handleShowDepositModal(index) {
      this.isModalShowSave = true
    },
    handleDepositAll() {
    },
    async handleDepositConfirm() {
    },
    //此函数处理所有的数据，两个分支，只判断有没有已连接账号，没有账号统一按照rpc连接
    async handleGetPoolsItemData() {
    },
    async getPoolsData(poolType) {
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
    this.updateAllApproveStatus();
  },
  async mounted() {
    let ptype = this.$route.query.ptype ? this.$route.query.ptype : 1
    if(ptype !== undefined) {
      this.handleContChange(ptype - 1)
      return
    }
    setTimeout(async () => {
      await this.getPoolsData(1)
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
    background-color: #43318C;
  }
  .g-button--normal:hover{
    background-color: #43318C;
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
