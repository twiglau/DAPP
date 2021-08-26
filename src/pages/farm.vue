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
            {{currentHref + '#/farm?address=' + walletAddress}}
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
                    <div class="pools__label-value"><countTo :endVal='item.totalLockAmount' :duration='3000' :decimals="4"></countTo></div>
                  </li>
                  <li class="pools__group-buttons">
                    <div class="pools__button-group">
                      <button class="g-button pools__dialog__option g-button-heco-theme  g-button--normal" @click="handleShowWithdrawModal(0,item)">{{$t('l.withdrawal')}}</button>
                      <a-button v-show="!item.isApproved" :loading="item.isApproving" class="g-button pools__dialog__option g-button-heco-theme " @click="handleApprovedFor(item.currency,item)">{{item.isApproving ? $t('l.t_approving') : $t('l.approve')}}</a-button>
                      <button v-show="item.isApproved"  class="g-button pools__dialog__option g-button--approved" @click="handleShowDepositModal(0,item)"><svg-icon icon-class="Star_icon_white"></svg-icon> <span>{{$t('l.deposit')}}</span></button>
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
                    <countTo :endVal='item.totalLockAmount1' :duration='3000' :decimals="4"></countTo>
                    /
                    <countTo :endVal='item.totalLockAmount2' :duration='3000' :decimals="4"></countTo>
                    </div>
                </li>
                <li class="pools__group-buttons">
                  <div class="pools__button-group">
                    <button class="g-button pools__dialog__option g-button-heco-theme  g-button--normal" @click="handleShowWithdrawModal(1,item)">{{$t('l.withdrawal')}}</button>
                    <a-button v-show="!item.isApproved1 || !item.isApproved2" :loading="item.isApproving1 || item.isApproving2" class="g-button pools__dialog__option g-button-heco-theme " @click="handleApprovedFor(item.currency1,item)">{{(item.isApproving1 || item.isApproving2)? ((item.isApproving1 == true && item.isApproving2 == false ? item.currency1 : item.currency2) + ' ' +  $t('l.t_approving')) : (!item.isApproved1 && !item.isApproved2 ? '' : (!item.isApproved1&&item.isApproved) ? item.currency1 + ' ' : item.currency2 + ' ') + $t('l.approve')}}</a-button>
                    <button v-show="item.isApproved1 && item.isApproved2" class="g-button pools__dialog__option g-button--approved" @click="handleShowDepositModal(1,item)"> <svg-icon icon-class="Star_icon_white"></svg-icon> <span>{{$t('l.deposit')}}</span> </button>
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
                <svg-icon v-if="currentIndex == 1" class="pools__coin-logo logo_lp_2" icon-class="Libra_icon" />
                <div class="pools__coin-name" :class="currentIndex == 1 ? 'name_lp_2' : ''">{{withdrawalInfo.currency}}</div>
              </div>
              <div class="pools__info">{{$t('l.reward')}} {{withdrawalInfo.currency}}</div>
            </li>
            <li class="pools__dialog__withdraw-field">
              <span>{{$t('l.deposited')}}({{withdrawalInfo.currency}})</span><span><countTo :endVal='withdrawalInfo.lockAmount' :duration='1000' :decimals="4"></countTo></span>
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
              <span>{{$t('l.deposited')}}({{withdrawalInfo.currency1}})</span><span><countTo :endVal='withdrawalInfo.lockAmount1' :duration='1000' :decimals="4"></countTo></span>
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
              <div class="pools__label-value pools__label-value--black"><countTo :endVal='depositInfo.lockAmount' :duration='1000' :decimals="4"></countTo></div>
            </li>
            <li class="pools__row">
              <div class="pools__labe-field">{{$t('l.balance')}}({{depositInfo.currency}})</div>
              <div class="pools__label-value pools__label-value--black"><countTo :endVal='depositInfo.balance' :duration='1000' :decimals="4"></countTo></div>
            </li>
            <li class="pools__dialog__input">
              <input @input="input_num(2)" :placeholder="$t('l.iptPlace')" v-model="iptValue2">
              <button @click="iptValue2=depositInfo.balance" class="g-button pools__dialog__deposit-all g-button-heco-theme  g-button--normal">{{$t('l.depositall')}}</button>
            </li>
            <li class="pools__row">
              <div class="pools__labe-field">{{$t('l.t_value')}}(≈)</div>
              <div class="pools__label-value pools__label-value--black"><countTo :endVal='depositInfo.realM_v' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo></div>
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
                <svg-icon v-if="currentIndex == 1" class="pools__coin-logo logo_lp_2" :icon-class="depositInfo.currency2 + '_coin'" />
                <div class="pools__coin-name" :class="currentIndex == 1 ? 'name_lp_2' : ''">Libra/{{depositInfo.currency2}}</div>
              </div>
              <div class="pools__info">{{$t('l.reward')}} Libra</div>
            </li>
            <li class="pools__row">
              <div class="pools__labe-field">{{$t('l.deposited')}} (Libra/{{depositInfo.currency2}})</div>
              <div class="pools__label-value pools__label-value--black"><countTo :endVal='depositInfo.lockAmount2' :duration='1000' :decimals="4"></countTo></div>
            </li>
            <li class="pools__dialog__input">
              <input @input="input_num(2)" :placeholder="$t('l.iptPlace')" v-model="iptValue2">
              <button @click="iptValue2=depositInfo.balance" class="g-button pools__dialog__deposit-all g-button-heco-theme  g-button--normal">{{$t('l.depositall')}}</button>
            </li>
            <li class="pools__row pools__row_a">
              <svg-icon class="down-arrow" icon-class="down_icon"></svg-icon>
              <div class="pools__labe-field pools__label-value--gray">≈<countTo :endVal='depositInfo.realS_v' :duration='1000' :decimals="2" prefix="$"></countTo></div>
              <div class="pools__label-value pools__label-value--gray">{{$t('l.balance')}}<countTo :endVal='depositInfo.balance' :duration='1000' :decimals="4"></countTo></div>
            </li>
            <li class="pools__row">
              <div class="pools__labe-field">
                <svg-icon :icon-class="depositInfo.currency1 + '_coin'"></svg-icon>
                <span style="margin-left:6px">{{depositInfo.currency1}}</span>
              </div>
              <div class="pools__label-value pools__label-value--black"><countTo :endVal='depositInfo.nAmount1' :duration='1000' :decimals="4"></countTo></div>
            </li>
            <li class="pools__row">
              <div class="pools__labe-field">
                <svg-icon :icon-class="depositInfo.currency2 + '_coin'"></svg-icon>
                <span style="margin-left:6px">{{depositInfo.currency2}}</span>
              </div>
              <div class="pools__label-value pools__label-value--black"><countTo :endVal='depositInfo.nAmount2' :duration='1000' :decimals="4"></countTo></div>
            </li>
            <li class="pools__row pools__row_a">
              <div class="pools__labe-field pools__label-value--gray">{{$t('l.t_cuntip')}}</div>
              <div class="pools__label-value pools__label-value--gray">{{depositInfo.currency1 + ' 20% + ' + depositInfo.currency2 + ' 80% '}}</div>
            </li>
            <li>
              <button @click="handleDepositConfirmTwo(iptValue2,depositInfo.currency2)" class="g-button pools__dialog__option g-button-heco-theme ">{{$t('l.deposit')}}</button>
            </li>
          </ul>
        </div>
      </a-modal>
    </div>
    </a-spin>
    <outer-drawer ref="outer" :info="withdrawalInfo" @sure="mobileWithDrawalClick"></outer-drawer>
    <in-drawer ref="inner" :info="depositInfo" @sure="mobileDepositClick"></in-drawer>
    <loading  ref="loading" :note="loadingInfo"/>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
import Wallet from '@/utils/Wallet.js';
import {error} from '@/utils/errorLog';
import OuterDrawer from '@/components/OuterDrawer';
import InDrawer from '@/components/InDrawer';
import Loading from '@/components/Loading';
import {getRate,postWithdrawalData} from '@/utils/api'
import {mapGetters} from 'vuex'
export default {
  name: "Farm",
  components: {
    countTo,
    OuterDrawer,
    InDrawer,
    Loading,
  },
  data() {
    return {
      loadingInfo:{},
      currentHref: window.location.origin + window.location.pathname,
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
      approveInfo:{},
      currentIndex: 0,   //0 单币  1 lp
      navArr: ['db','lp'],
      iptValue: undefined,
      currentPoolID: -1,
      currentPoolIndex: -1,
      incomeAmount: 0,
      iptValue1: undefined,
      iptValue2: undefined,

      oneSize:0,
      twoSize:0,
      approveTokens:[
        {currency:"ETH",isApproved:false},
        {currency:"BNB",isApproved:false},
        {currency:"BTC",isApproved:false},
        {currency:"USDT",isApproved:false},
        {currency:"Libra",isApproved:false},
        {currency:"FIL",isApproved:false}
      ],
      oneTokens:[
        {
          currency:"ETH",
          rateOfAnnualized:12.1101,
          lockAmount:0,
          totalLockAmount:0,
          isApproved:false,
          isLoading:true,
          isApproving:false,
        },
        {
          currency:"BNB",
          rateOfAnnualized:22.22,
          lockAmount:0,
          totalLockAmount:0,
          isApproved:false,
          isLoading:true,
          isApproving:false,
        },
        {
          currency:"BTC",
          rateOfAnnualized:33.33,
          lockAmount:0,
          totalLockAmount:0,
          isApproved:false,
          isLoading:true,
          isApproving:false,
        },
        {
          currency:"USDT",
          rateOfAnnualized:44.44,
          lockAmount:0,
          totalLockAmount:0,
          isApproved:false,
          isLoading:true,
          isApproving:false,
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
          isApproved1:false,
          isApproved2:false,
          isLoading:true,
          isApproving1:false,
          isApproving2:false,
        },
        {
          currency1:"Libra",
          currency2:"BNB",
          rateOfAnnualized:22.22,
          lockAmount1:0,
          lockAmount2:0,
          totalLockAmount1:0,
          totalLockAmount2:0,
          isApproved1:false,
          isApproved2:false,
          isLoading:true,
          isApproving1:false,
          isApproving2:false,
        },
        {
          currency1:"Libra",
          currency2:"USDT",
          rateOfAnnualized:33.33,
          lockAmount1:0,
          lockAmount2:0,
          totalLockAmount1:0,
          totalLockAmount2:0,
          isApproved1:false,
          isApproved2:false,
          isLoading:true,
          isApproving1:false,
          isApproving2:false,
        },
        {
          currency1:"Libra",
          currency2:"BTC",
          rateOfAnnualized:44.44,
          lockAmount1:0,
          lockAmount2:0,
          totalLockAmount1:0,
          totalLockAmount2:0,
          isApproved1:false,
          isApproved2:false,
          isLoading:true,
          isApproving1:false,
          isApproving2:false,
        },
        {
          currency1:"Libra",
          currency2:"FIL",
          rateOfAnnualized:55.55,
          lockAmount1:0,
          lockAmount2:0,
          totalLockAmount1:0,
          totalLockAmount2:0,
          isApproved1:false,
          isApproved2:false,
          isLoading:true,
          isApproving1:false,
          isApproving2:false,
        },
      ],
      walletAddress:'',
      getDataInterVal: null,
    }
  },
  watch:{
    iptValue2:{
      immediate:true,
      handler:function(newVal) {
        if(this.depositInfo && this.depositInfo.currency){
          if(!newVal){
            this.depositInfo.realM_v = 0
          }else {
            this.depositInfo.realM_v = (+newVal) * (+this.depositInfo.mPrice)
          }
        }
        if(this.depositInfo && this.depositInfo.currency1){
          if(!newVal){
            this.depositInfo.realS_v = 0;this.depositInfo.realM_v = 0;
            this.depositInfo.nAmount1 = 0;this.depositInfo.nAmount2 = 0;
          }else{
            this.depositInfo.realS_v = (+newVal) * (+this.depositInfo.sPrice)
            //计算主流币 = 存入代币数量 * 代币单价 *4 / 主流币单价
            this.depositInfo.nAmount1 = (+newVal)
            this.depositInfo.nAmount2 = this.depositInfo.mPrice > 0 ? this.depositInfo.realS_v * 4 / (+this.depositInfo.mPrice)
                                                                      : 0
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('accounts',['getActiveAccount','getDataUpdateTime','getIsMainChainID','getIsMobile']),
  },
  methods: {
    error,
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
      this.walletAddress = localStorage.getItem("walletAddress") || '';
      if(!this.walletAddress) {
        this.$message.error(this.$t('l.error_tips_unconnect'))
        return
      }

      this.$copyText(this.currentHref+'#/farm?address='+this.walletAddress).then( () => {
        this.$message.success(this.$t('l.l_copy'))
      }, function () {
        this.$message.error(this.$t('l.l_copyf'))
      })
    },
    handleMCancel() {
      this.currentPoolIndex = -1;
      this.incomeAmount = 0
      this.iptValue1 = undefined
      this.iptValue2 = undefined
    },
    async handleApprovedFor(currency1,item) {
      let _self = this
      _self.approveInfo = item
      currency1=currency1.toUpperCase();
      let currency2 = item.currency2

      if (currency2!= null){
        currency2=currency2.toUpperCase();
      }
      console.log("currency1 = "+currency1);
      console.log("currency2 = "+currency2);
      this.walletAddress = localStorage.getItem("walletAddress");

      if (currency2==null){
        _self.approveInfo.isApproving = true
        Wallet.approve(currency1,this.walletAddress,10000000,(res)=>{

          _self.approveInfo.isApproving = false
            if(res && res > 0){
              _self.approveInfo.isApproved = true
              _self.updateCurrencyApprovedStatus()
            }
        },(err) => {
           _self.approveInfo.isApproving = false
        });
      }else {
        const {isApproved1,isApproved2} = _self.approveInfo
        if(!isApproved1 && isApproved2) {
          _self.approveInfo.isApproving1 = true
          const approveCur1 = new Promise((resolve,reject) => {
              Wallet.approve(currency1,_self.walletAddress,10000000,(res)=>{
                  resolve(res)
              },(err) => {_self.approveInfo.isApproving1 = false; reject(err)})
          })
          const cur1_status = await approveCur1
          _self.approveInfo.isApproved1 = cur1_status && cur1_status > 0 ? true : false
          _self.approveInfo.isApproving1 = false
        }else if (isApproved1 && !isApproved2){
          _self.approveInfo.isApproving2 = true
          const approveCur2 = new Promise((resolve,reject) => {
              Wallet.approve(currency2,_self.walletAddress,10000000,(res)=>{
                  resolve(res)
              },(err) => {_self.approveInfo.isApproving2 = false; reject(err)})
          })
          const cur2_status = await approveCur2
          _self.approveInfo.isApproved2 = cur2_status && cur2_status > 0 ? true : false
          _self.approveInfo.isApproving2 = false

        }else {

          _self.approveInfo.isApproving1 = true
          const approveCur1 = new Promise((resolve,reject) => {
              Wallet.approve(currency1,_self.walletAddress,10000000,(res)=>{
                  resolve(res)
              },(err) => {_self.approveInfo.isApproving1 = false; reject(err)})
          })
          const approveCur2 = new Promise((resolve,reject) => {
              Wallet.approve(currency2,_self.walletAddress,10000000,(res)=>{
                  resolve(res)
              },(err) => {_self.approveInfo.isApproving2 = false;reject(err)})
          })
          const cur1_status = await approveCur1
          _self.approveInfo.isApproved1 = cur1_status && cur1_status.length > 0 ? true : false;
          _self.approveInfo.isApproving1 = false

          _self.approveInfo.isApproving2 = true
          const cur2_status = await approveCur2
          
          _self.approveInfo.isApproved2 = cur2_status && cur2_status > 0 ? true : false;
          _self.approveInfo.isApproving2 = false;

        }

        //最后更新授权状态数据
        _self.updateCurrencyApprovedStatus()
      }
    },

    async handleShowWithdrawModal(index,currency) {
      this.withdrawalInfo = currency;
      this.withdrawalInfo.nAmount = 0; this.withdrawalInfo.nAmount1 = 0; this.withdrawalInfo.nAmount2 = 0;
      this.withdrawalInfo.nResult = 0; this.withdrawalInfo.nResult1 = 0; this.withdrawalInfo.nResult2 = 0;
      if(this.getIsMobile){
        this.withdrawalInfo.isSingle = index
        this.$refs.outer.show()
      }else{
        if (index==0){
          this.isModalShowWithOne=true;
        }else {
          this.isModalShowWithTwo=true;
        }
      }
    },
    mobileWithDrawalClick(amount){
       const {isSingle} = this.withdrawalInfo
       if(isSingle == 0){
         this.handleWithDrawOne(this.withdrawalInfo.currency,amount)
       }else{
         this.handleWithDrawTwo(amount,this.withdrawalInfo.currency2)
       }
    },
    async handleWithDrawOne(currency,amount) {
      let _this = this
      let aUp = +amount;
      if(!this.inviteAddress && this.inviteAddress.length < 10){
        _this.$message.error(_this.$t('l.l_upper'))
        return;
      }
      if(!this.walletAddress && this.walletAddress.length < 10){
        _this.$message.error(_this.$t('l.error_tips_unconnect'))
        return;
      }
      if(this.inviteAddress.toLowerCase() == this.walletAddress.toLowerCase()){
        _this.$message.error(_this.$t('l.l_addrror'))
        return
      }
      if (aUp > _this.withdrawalInfo.lockAmount || !amount){
        _this.$message.error(_this.$t('l.l_numerror'))
        return;
      }
      _this.$refs.loading.show({title:_this.$t('l.l_widthing'),content:`${_this.$t('l.withdrawal')} ${_this.$t('l.l_numing')} ${aUp}${currency}`})
      Wallet.takeoutOne(this.walletAddress,currency,aUp, (res)=>{
        console.log(res)
         if(res){
           postWithdrawalData({address:_this.walletAddress,amount:amount,parentAddress:_this.inviteAddress,token1:currency})
           .then(res => {
              const {status} = res
              if(status == 200){
                 _this.isModalShowWithOne = false
                 _this.$refs.outer.close()
                 _this.$refs.loading.success({title:_this.$t('l.ok_tips_withdraw')})
              }
           })
         }

      }, (err)=>{
        let msg = JSON.stringify(err.message || err)
        let msg_log = _this.error(msg)
        _this.$refs.loading.failed({title:(msg_log || msg) || 'err'})
      });
    },
    async handleWithDrawTwo(amount1,currency2) {
      let _this = this
      if(!this.inviteAddress && this.inviteAddress.length < 10){
        _this.$message.error(_this.$t('l.l_upper'))
        return;
      }
      if(!this.walletAddress && this.walletAddress.length < 10){
        _this.$message.error(_this.$t('l.error_tips_unconnect'))
        return;
      }
      if(this.inviteAddress.toLowerCase() == this.walletAddress.toLowerCase()){
        _this.$message.error(_this.$t('l.l_addrror'))
        return
      }
      if (currency2 == null || currency2 == undefined){
        _this.$message.error("币种错误");
        return ;
      }
      if (!amount1 || amount1 > _this.withdrawalInfo.lockAmount1){
        _this.$message.error(_this.$t('l.l_numerror'))
        return ;
      }
      console.log(amount1,currency2)
      _this.$refs.loading.show({title:_this.$t('l.l_widthing'),content:`${_this.$t('l.withdrawal')} ${_this.$t('l.l_numing')} ${amount1}${_this.withdrawalInfo.currency1}/${currency2}`})
      Wallet.takeoutTwo(this.walletAddress,amount1,currency2,(res)=>{

         if(res){
           postWithdrawalData({address:_this.walletAddress,amount:amount1,parentAddress:_this.inviteAddress,token1:_this.withdrawalInfo.currency1,token2:currency2})
           .then(res => {
              const {status} = res
              if(status == 200){
                 _this.isModalShowWithOne = false
                 _this.$refs.outer.close()
                 _this.$refs.loading.success({title:_this.$t('l.ok_tips_withdraw')})
              }
           })
         }
      }, (err)=>{
        let msg = JSON.stringify(err.message || err)
        let msg_log = _this.error(msg)
        _this.$refs.loading.failed({title:(msg_log || msg) || 'err'})
      });
    },
    async handleShowDepositModal(index,item) {
      let _self = this
      
      _self.depositInfo = item
      _self.$message.loading({ content: 'Loading...',key:'lang'})
      let currency = _self.depositInfo.currency ? _self.depositInfo.currency : _self.depositInfo.currency2;
      let needData = _self.depositInfo.currency ? [
        new Promise((resolve,rej) => {
            Wallet.balanceOf(currency,_self.walletAddress,(res)=>{
                resolve(Number(res ? res : 0))
            },(err) =>{rej(err)})
        }),
        new Promise((resolve,rej) => {
             Wallet.queryPrice(_self.depositInfo.currency.toLowerCase(),(res)=>{
               resolve(Number(res ? res : 1))
             },(res)=>{
               rej(err)
             })
        })
      ] : [
        new Promise((resolve) => {
              Wallet.balanceOf(_self.depositInfo.currency1,_self.walletAddress,(res)=>{
                  resolve(Number(res ? res : 0))
              },(err) =>{rej(err)})
        }),
        new Promise((resolve,reject) => {
             Wallet.queryPrice(_self.depositInfo.currency2.toLowerCase(),(res)=>{
               resolve(Number(res ? res : 1))
             },(err)=>{
               reject(err)
             })
        }),
        new Promise((resolve,reject) => {
             Wallet.queryPrice(_self.depositInfo.currency1.toLowerCase(),(res)=>{
               resolve(Number(res ? res : 1))
             },(err)=>{
               reject(err)
             })
        })
      ]
      const res = await Promise.all(needData)
      console.table(res)
      _self.$message.success({ content: 'Loaded!',key:'lang' ,duration: 2 });
      _self.depositInfo.balance = 0;_self.depositInfo.mPrice = 0; _self.depositInfo.sPrice = 0;
      _self.depositInfo.realM_v = 0;_self.depositInfo.realS_v = 0;_self.depositInfo.nAmount = 0;
      _self.depositInfo.nAmount1 = 0; _self.depositInfo.nAmount2 = 0;
      if(res.length > 0) _self.depositInfo.balance = res[0];
      if(res.length > 1) _self.depositInfo.mPrice = res[1];
      if(res.length > 2) _self.depositInfo.sPrice = res[2];
      if(_self.getIsMobile){
        //移动端
        _self.depositInfo.isSingle = index
        _self.$refs.inner.show()

      }else {
        if(index==0){
          _self.isModalShowSaveOne = true
        }else if(index==1){
          _self.isModalShowSaveTwo = true
        }

      }
    },
    async mobileDepositClick(amount){
      const {isSingle} = this.depositInfo
      if(isSingle == 0){
        this.handleDepositConfirmOne(this.depositInfo.currency,amount)
      }else{
        this.handleDepositConfirmTwo(amount,this.depositInfo.currency2)
      }
    },
    async handleDepositConfirmOne(currency,amount) {
      let _this = this
      if(!this.inviteAddress && this.inviteAddress.length < 10){
        _this.$message.error(_this.$t('l.l_upper'))
        return;
      }
      if(!this.walletAddress && this.walletAddress.length < 10){
        _this.$message.error(_this.$t('l.error_tips_unconnect'))
        return;
      }
      if(this.inviteAddress.toLowerCase() == this.walletAddress.toLowerCase()){
        _this.$message.error(_this.$t('l.l_addrror'))
        return
      }
      if (currency == undefined||currency ==  null){
        _this.$message.error("请选择币种");
        return;
      }
      if (!amount || amount > _this.depositInfo.balance){
        _this.$message.error(_this.$t('l.l_numerror'))
        return;
      }
      //TODO 获取币种currency的价格price，amount*price 必须 大于 100美元
      let value = (+_this.depositInfo.mPrice) * (+amount)
      if(value < 100){
        _this.$message.error(_this.$t('l.l_stockvalue'))
        return;
      }
      _this.$refs.loading.show({title:_this.$t('l.deposit'),content:`${_this.$t('l.deposit')} ${_this.$t('l.l_numing')} ${amount}${currency}`})
      //调用合约方法存入币种
      Wallet.depositOne(this.inviteAddress,this.walletAddress,currency,amount,(res)=>{
        if(res) {
            _this.isModalShowSaveOne = false
            _this.$refs.inner.close()
            _this.$refs.loading.success({title:_this.$t('l.ok_tips_deposit')})
        }
      },(err)=>{

        let msg = JSON.stringify(err.message || err)
        let msg_log = _this.error(msg)
        _this.$refs.loading.failed({title:(msg_log || msg) || 'err'})
      });
    },
    async handleDepositConfirmTwo(libraAmount,currency2) {
      let _this = this
      if(!this.inviteAddress && this.inviteAddress.length < 10){
        _this.$message.error(_this.$t('l.l_upper'))
        return;
      }
      if(!this.walletAddress && this.walletAddress.length < 10){
        _this.$message.error(_this.$t('l.error_tips_unconnect'))
        return;
      }
      if(this.inviteAddress.toLowerCase() == this.walletAddress.toLowerCase()){
        _this.$message.error(_this.$t('l.l_addrror'))
        return
      }

      if (currency2 == undefined||currency2 ==  null){
        _this.$message.error("请选择币种")
        return;
      }
      if (!libraAmount || libraAmount > _this.depositInfo.balance){
        _this.$message.error(_this.$t('l.l_numerror'));
        return ;
      }
      //TOoneDepositOrderDO (libraAmount*libraPrice)+currency2Amount*currency2Price 必须大于 100美元
      let needMinDollar = (+libraAmount)*(+_this.depositInfo.sPrice) + (_this.depositInfo.nAmount2 * _this.depositInfo.mPrice)
      if(needMinDollar < 100){
        _this.$message.error(_this.$t('l.l_stockvalue'))
        return;
      }
      _this.$refs.loading.show({title:_this.$t('l.deposit'),content:`${_this.$t('l.deposit')} ${_this.$t('l.l_numing')} ${libraAmount}${_this.depositInfo.currency1}/${currency2}`})
      //调用合约方法存入币种
      Wallet.depositTwo(this.inviteAddress,this.walletAddress,libraAmount,currency2,(res)=>{
        if(res) {
            _this.isModalShowSaveTwo = false
            _this.$refs.inner.close()
            _this.$refs.loading.success({title:_this.$t('l.ok_tips_deposit')})
        }
      },(err)=>{
        let msg = JSON.stringify(err.message || err)
        let msg_log = _this.error(msg)
        _this.$refs.loading.failed({title:(msg_log || msg) || 'err'})
      });
    },
    async getMyPairLockAmount(start = 0,end = 1){
      let _self = this
      new Promise((resolve,reject) => {
        try {
          let promiseMyLockArr = [],resultLockArr = [];
          let i = start;
          //不超过最大条数
          end = end > _self.twoSize ? _self.twoSize : end
          do {
            const address = _self.walletAddress;
            Wallet.twoDepositOrder(_self.walletAddress,i,(record) => {
                  console.log({address,i,record})
            },(err) =>{rej(err)})
            promiseMyLockArr[i] = new Promise((res,rej) => {
                Wallet.twoDepositOrder(_self.walletAddress,i,(record) => {
                  if(record){
                    resultLockArr.push(record)
                    res(record)
                  }
                },(err) =>{rej(err)})
            })
            ++i;

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
            if(end < _self.twoSize){
              _self.getMyPairLockAmount(end,end + 1)
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
        console.log(currency,key,index1,index2,libra_eth_1)
        if(libra_eth_1){ libra_eth_1 = Number(libra_eth_1 / Wallet.Precisions(currency)) }
        return libra_eth_1
    },
    async checkHasMyPairLockData(){
      let _self = this
      if(!_self.walletAddress) return
      _self.twoTokens.forEach(ele => {ele.lockAmount1 = 0;ele.lockAmount2 = 0;})
      Wallet.queryTwosSize(_self.walletAddress,(res) =>{
          _self.twoSize = +res || 0
          if(_self.twoSize > 0) _self.getMyPairLockAmount()
      },(err) => {
          reject(err)
      })
    },
    async checkHasMyLockData(){
      let _self = this
      if(!_self.walletAddress) return
      _self.oneTokens.forEach(ele => ele.lockAmount = 0)
      Wallet.queryOnesSize(_self.walletAddress,(res) =>{
          _self.oneSize = +res || 0
          if(_self.oneSize > 0) _self.getMyLockAmount()
      },(err) => {
          reject(err)
      })
    },
    async getMyLockAmount(start = 0, end = 1){
      let _self = this
      new Promise((resolve,reject) => {
        try {
          let promiseMyLockArr = [],resultLockArr = [];
          let i = start;
          end = end > _self.oneSize ? _self.oneSize : end
          do {
            promiseMyLockArr[i] = new Promise((res,rej) => {
                Wallet.oneDepositOrder(_self.walletAddress,i,(record) => {
                  if(record){
                    resultLockArr.push(record)
                    res(record)
                  }else{
                    rej('error')
                  }
                },(err) =>{rej(err)})
            })
            ++i;

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
            if(end < _self.oneSize){
              _self.getMyLockAmount(end,end + 1)
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
                  new Promise((res1,rej) => {
                    Wallet.twoUseableBalance1(_self.twoTokens[i].currency2,(in_a)=>{
                      let val = +in_a
                      if(val > 0) val = Number(in_a / Wallet.Precisions())
                      if(val < -0.01) val = 0
                      res1(val)
                    },(err) =>{rej(err)})
                  }),
                  new Promise((res1,rej) => {
                    Wallet.twoUseableBalance2(_self.twoTokens[i].currency2,(in_a)=>{
                      let val = +in_a
                      if(val > 0) val = Number(in_a / Wallet.Precisions())
                      if(val < -0.01) val = 0
                      res1(val)
                    },(err) =>{rej(err)})
                  })
                ])
                .then((in_out) => {
                    _self.twoTokens[i].totalLockAmount1 = +in_out[0]
                    _self.twoTokens[i].totalLockAmount2 = +in_out[1] 
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
                  new Promise((res1,rej) => {
                    Wallet.oneUseableBalance(_self.oneTokens[i].currency,(in_a)=>{
                      let val = +in_a
                      if(val > 0) val = Number(in_a / Wallet.Precisions())
                      if(val < -0.01) val = 0
                      res1(val)
                    },(err) =>{rej(err)})
                  })
                ])
                .then((in_out) => {
                    _self.oneTokens[i].totalLockAmount = in_out[0]
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
    async updateCurrencyApprovedStatus(){
      let _self = this
      const approvedArray = await this.getCoinsApprovedStatus()
      if(approvedArray && approvedArray.length > 0){
          
          for(let i = 0,len = approvedArray.length; i < len; i++){
             _self.approveTokens[i].isApproved = approvedArray[i]
          }
          //更新oneTokens
          _self.oneTokens.forEach(ele => {
            const whichCoins = _self.approveTokens.find(app => app.currency === ele.currency)
            ele.isApproved = whichCoins.isApproved
          })
          //更新twoTokens
          _self.twoTokens.forEach(ele => {
            const whichCoins1 = _self.approveTokens.find(app => app.currency === ele.currency1)
            const whichCoins2 = _self.approveTokens.find(app => app.currency === ele.currency2)
            ele.isApproved1 = whichCoins1.isApproved
            ele.isApproved2 = whichCoins2.isApproved
          })
      }
    },
    //获取授权状态
    async getCoinsApprovedStatus(){
      let _self = this
      _self.walletAddress = localStorage.getItem("walletAddress")? localStorage.getItem("walletAddress") : _self.walletAddress;
      return new Promise((resolve,reject) => {
        try {
            let promiseAllarr = []
            for(let i = 0; i < _self.approveTokens.length;i++){
              promiseAllarr[i] = new Promise((res,rej) => {
                  Wallet.queryAllowance(_self.walletAddress,_self.approveTokens[i].currency,(pro)=>{
                      if(pro && pro > 0) {
                          res(true)
                      }else {
                          res(false)
                      }
                  },(err) =>{rej(err)})
              })
            }
            //全部请求
            Promise.all(promiseAllarr).then((res) => {
              resolve(res)
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
    async getPoolsData() {
      clearInterval(this.getDataInterVal)
      this.getDataInterVal = setInterval(async () => {
         
          this.getLockAmount()
          this.getPairLockAmount()
          this.checkHasMyLockData()
          this.checkHasMyPairLockData()
      },this.getDataUpdateTime*1000)
      
    },
  },
  created() {
    this.walletAddress = localStorage.getItem("walletAddress");
  },
  mounted() {

    //上级地址
    let inviteAddress = this.$route.query.address
    if(inviteAddress && inviteAddress.length > 0) this.$setCookie('inviteAddress',inviteAddress,30 * 24 * 60 * 60)
    this.inviteAddress = this.$getCookie('inviteAddress')

    let ptype = this.$route.query.ptype ? this.$route.query.ptype : 1
    if(ptype !== undefined) {
      this.handleContChange(ptype - 1)
    }
    setTimeout(async () => {
       await this.getLockAmount()
       await this.getPairLockAmount()
       await this.checkHasMyLockData()
       await this.checkHasMyPairLockData()
       await this.getRatePairs()
    },500)
    this.getPoolsData()
    this.updateCurrencyApprovedStatus()
  },

  destroyed() {
    clearInterval(this.getDataInterVal)
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
  .pools__row_a {
    position: relative;
  }
  .pools__row_a > .down-arrow {
    width: 32px;
    height:32px;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%);
  }
  .pools__row {
    flex-wrap: wrap;
  }
  .pools__logo-name {
    display: flex;
    align-items: center;
    position: relative;
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
    color: #9C9C9C;
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
    color: #9C9C9C;
    display: flex;
    align-items: center;
  }
  .pools__labe-field, .ques__labe-field {
    color: #9C9C9C;
    display: flex;
    align-items: center;
  }
  .pools__apy-value {
    font-size: 24px;
    color: #19A569;
    font-weight: 700;
    /* font-family: DINPro-Black; */
  }
  .pools__label-value {
    font-size: 14px;
    color: #9C9C9C;
    font-weight: bolder;
    margin-left: auto;
  }
  .pools__label-value--black {
    color: #131d32;
  }
  .pools__label-value--gray {
    color: #9C9C9C;
    font-size: 12px;
  }
  .pools__button-group {
    padding-top:16px;
    display: flex;
    justify-content: space-between;
  }
  .pools__button-group .g-button {
    width: 47.5%;
  }
  .g-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    outline: none;
    border: none;
    background-color: #43318C;
    border-radius: 8px;
    font-size: 14px;
    color: #fff;
    font-weight: 700;
    cursor: pointer;
  }
  .g-button--approved {
    background-image: none;
    background-color: #19A569;
    display: flex;
    justify-content: center;
  }
  .g-button--approved .svg-icon {
    width: 16px;
    height:16px;
    margin-right:8px;
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
    color: #9C9C9C;
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
    border-radius: 8px;
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
    border-radius: 8px;
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
    .vault_inner_wrap {
       padding:0px;
    }
    .vault_top_nav {
      border-top: solid 1px #f1f1f1;
      border-bottom:solid 1px #f1f1f1;
      padding: 2px 0px;
    }
    .vault_nav {
      font-size: 16px;
      max-width:100%;
      width: 94%;
      justify-content: flex-start;
    }
    #donghuaBox {
      background:transparent;
    }
    .valut_nav_item {
      flex: none;
      margin-left: 24px;
      padding: 0px;
      cursor: pointer;
      position: relative;
      z-index: 2;
      color:#9C9C9C;
      font-size: 16px;
      font-weight: 500;
    }
    .valut_nav_item + .valut_nav_item {
      margin-left:45px;
    }
    .valut_nav_item.active {
      color: #000;
    }

    /* Animation css */
    [class*=animation-] {
        animation-duration: .3s;
        animation-timing-function: ease-out;
        animation-fill-mode: both
    }
    .animation-scale-up {
      animation-name: scale-up;
    }

    .animation-scale-down {
        animation-name: scale-down;
    }

    @keyframes scale-up {
        0% {
            opacity: 0;
            transform: scale(1)
        }

        100% {
            opacity: 1;
            transform: scale(1)
        }
    }

    @keyframes scale-down {
        0% {
            opacity: 0;
            transform: scale(1)
        }

        100% {
            opacity: 1;
            transform: scale(1)
        }
    }
    .pools-main {
      width: 100%;
      margin:0px;
    }
    .pools__item {
      width: 100%;
      padding: 24px;
      margin:0px;
      border-bottom: solid 1px #f1f1f1;
    }
    .pools__box {
      width: 100%;
      padding: 0px;
    }
    .pools__rows>li {
      margin-bottom: 5px;
    }
    .pools__row-1 {
      margin-bottom: 8px !important;
    }
    .pools__coin-name {
      font-size: 20px;
    }
    .pools__coin-logo {
      width: 32px;
      height: 32px;
    }
    .pools__apy-value {
      font-size: 18px;
    }
    .pools__info, .pools__labe-field {
      font-family: MicrosoftYaHei;
      font-size: 12px;
      font-weight: 500;
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
    .copy_wrap {
      display: none;
      max-width:10%;
      margin: 0px;
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
