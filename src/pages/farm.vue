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
        <div class="pools__item" v-for="item in farms.ones" :key="item.currency">
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
        <div class="pools__item" v-for="item in farms.twos" :key="item.currency2">
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
                    <a-button v-show="!item.isApproved1 || !item.isApproved2" :loading="item.isApproving1 || item.isApproving2" class="g-button pools__dialog__option g-button-heco-theme " @click="handleApprovedFor(item.currency1,item)">{{formatApproveStatus(item)}}</a-button>
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
import {error} from '@/utils/errorLog';
import OuterDrawer from '@/components/OuterDrawer';
import InDrawer from '@/components/InDrawer';
import Loading from '@/components/Loading';
import {mapGetters} from 'vuex'
import Farms from '../models/farms'
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

      walletAddress:'',
      getDataInterVal: null,
      farms: new Farms(),
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
    formatApproveStatus(item){
      const {isApproving1,isApproving2,currency1,currency2,isApproved1,isApproved2} = item
      if(isApproving1 || isApproving2) {
        if(isApproving1 && !isApproving2){
          return currency1 + ' ' + this.$t('l.t_approving')
        }else {
          return currency2 + ' ' + this.$t('l.t_approving')
        }
      }else {
        if(!isApproved1 && !isApproved2){
           return this.$t('l.approve')
        }else if(!isApproved1 && isApproved2){
          return currency1 + ' ' + this.$t('l.approve')
        }else {
          return currency2 + ' ' + this.$t('l.approve')
        }
      }
    },
    async handleApprovedFor(currency1,item) {
      let _self = this
      _self.farms.address = localStorage.getItem('walletAddress')
      _self.farms.upperAddress = _self.$getCookie('inviteAddress')
      _self.farms.currency1 = currency1
      _self.farms.currency2 = item?.currency2
      _self.farms.approveTokensAction(item?.currency2 ? 2 : 1,item,(type,currency,isAppr) => {
        //数组嵌套太深,遍历方法,检测不到
        if(type == 1){
          //更新 1
          // _self.$set(_self.farms.approveInfo, isApproved, isAppr)
          //更新 2

        }else{
          if(currency == currency1){
          // _self.$set(_self.farms.approveInfo, isApproved1, isAppr)
          }else{
          // _self.$set(_self.farms.approveInfo, isApproved2, isAppr)
          }
        }
        // _self.$forceUpdate()
      })
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
      
      _this.farms.address = localStorage.getItem('walletAddress')
      _this.farms.upperAddress = _this.$getCookie('inviteAddress')
      _this.farms.currency1 = currency
      _this.farms.amount = aUp
      let one = _this.farms.withDrawOne()
      one.then((res)=>{
          console.log(res)
          _this.isModalShowWithOne = false
          _this.$refs.outer.close()
          _this.$refs.loading.success({title:_this.$t('l.ok_tips_withdraw')})
      })
      .catch(err => {
          let msg = JSON.stringify(err.message || err)
          let msg_log = _this.error(msg)
          _this.$refs.loading.failed({title:(msg_log || msg) || 'err'})
      })
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
      _this.$refs.loading.show({title:_this.$t('l.l_widthing'),content:`${_this.$t('l.withdrawal')} ${_this.$t('l.l_numing')} ${amount1}${_this.withdrawalInfo.currency1}/${currency2}`})
      
      _this.farms.address = localStorage.getItem('walletAddress')
      _this.farms.upperAddress = _this.$getCookie('inviteAddress')
      _this.farms.currency1 = _this.withdrawalInfo.currency1
      _this.farms.currency2 = currency2
      _this.farms.amount = amount1
      let two = _this.farms.withDrawTwo()
      two.then((res)=>{
          console.log(res)
          _this.isModalShowWithTwo = false
          _this.$refs.outer.close()
          _this.$refs.loading.success({title:_this.$t('l.ok_tips_withdraw')})
      })
      .catch(err => {
          let msg = JSON.stringify(err.message || err)
          let msg_log = _this.error(msg)
          _this.$refs.loading.failed({title:(msg_log || msg) || 'err'})
      })
    },
    async handleShowDepositModal(index,item) {
      let _self = this
      
      _self.depositInfo = item
      _self.$message.loading({ content: 'Loading...',key:'lang'})
      let type = _self.depositInfo.currency ? 1 : 2;
      
      _self.farms.address = localStorage.getItem('walletAddress')
      _self.farms.upperAddress = _self.$getCookie('inviteAddress')
      _self.farms.currency1 = _self.depositInfo.currency ? _self.depositInfo.currency : _self.depositInfo.currency1;
      _self.farms.currency2 = _self.depositInfo.currency2
      const res = await _self.farms.configDepositInfo(type)
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
      _this.farms.address = localStorage.getItem('walletAddress')
      _this.farms.upperAddress = _this.$getCookie('inviteAddress')
      _this.farms.amount = amount
      _this.farms.depositOneCurrency()
      .then(res => {
        if(res) {
            _this.isModalShowSaveOne = false
            _this.$refs.inner.close()
            _this.$refs.loading.success({title:_this.$t('l.ok_tips_deposit')})
        }
      })
      .catch(err => {
        let msg = JSON.stringify(err.message || err)
        let msg_log = _this.error(msg)
        _this.$refs.loading.failed({title:(msg_log || msg) || 'err'})
      })
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
      _this.farms.address = localStorage.getItem('walletAddress')
      _this.farms.upperAddress = _this.$getCookie('inviteAddress')
      _this.farms.amount = libraAmount
      _this.farms.currency2 = currency2
      _this.farms.depositTwoCurrency()
      .then(res => {
        if(res) {
            _this.isModalShowSaveTwo = false
            _this.$refs.inner.close()
            _this.$refs.loading.success({title:_this.$t('l.ok_tips_deposit')})
        }
      })
      .catch(err => {
        let msg = JSON.stringify(err.message || err)
        let msg_log = _this.error(msg)
        _this.$refs.loading.failed({title:(msg_log || msg) || 'err'})
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
      let _self = this
      clearInterval(this.getDataInterVal)
      
      this.getDataInterVal = setInterval(async () => {
          _self.farms.refreshData()
      },this.getDataUpdateTime*1000)
    },
  },
  created() {
    this.walletAddress = localStorage.getItem("walletAddress");
  },
  async mounted() {
    let _self = this
    //上级地址
    let inviteAddress = this.$route.query.address
    if(inviteAddress && inviteAddress.length > 0) this.$setCookie('inviteAddress',inviteAddress,30 * 24 * 60 * 60)
    this.inviteAddress = this.$getCookie('inviteAddress')

    //从首页过来的
    let ptype = this.$route.query.ptype ? this.$route.query.ptype : 1
    if(ptype !== undefined) {
      this.handleContChange(ptype - 1)
    }
    _self.farms.address = localStorage.getItem("walletAddress")
    _self.farms.upperAddress = this.$getCookie('inviteAddress')
    
    //开启定时器线程
    setTimeout(async () => {
       _self.farms.getTokens()
       .then((res) => {
         _self.getPoolsData()
       })
    },500)
  },

  destroyed() {
    clearInterval(this.getDataInterVal)
  }
}
</script>

<style scoped lang="less">
 @import "./_farm";
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
