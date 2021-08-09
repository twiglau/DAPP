<template>
  <div class="vault_wrap">
    <Spin class="global_loading" tip="loading" :spinning="spinStatus" size="large">
    <div class="vault_inner_wrap">
      <div class="vault_top_nav">
        <div class="copy_wrap">
          <span class="copy_text">{{$t('l.invite_text')}}</span>
          <span class="link_text">
            {{currentHref+'?address='+getActiveAccount}}
            <img @click="handleCopyLink" class="invite_icon" alt="" src="../assets/invite_icon.svg">
          </span>
        </div>
      </div>
      <div class="pools-main">
        <div class="pools__item" v-for="(item,index) in daoPoolsLists" :key="index">
            <div class="pools__box">
              <Spin tips="loading" :spinning="item.isLoading" size="large">
                <ul class="pools__rows">
                  <li class="pools__row-1">
                    <div class="pools__logo-name">
                      <img class="pools__coin-logo" :src="'./static/token_icons/'+item.logo_url">
                      <div class="pools__coin-name">{{item.poolName}}</div>
                      <span class="bandge" :class="'bandge-'+item.lockDay">{{item.lockDay}}</span>
                    </div>
                  </li>
                  <li class="pools__row pools__apy">
                    <div class="pools__labe-field">{{$t('l.nhsyl')}}</div>
                    <div class="pools__apy-value"><countTo :endVal='item.apy/1' :duration='3000' :decimals="4" suffix="%"></countTo></div>
                  </li>
                  <li class="pools__row">
                    <div class="pools__labe-field">{{$t('l.lockDay')}}</div>
                    <div class="pools__label-value pools__label-value--black">{{item.lockDay}} {{$t('l.days')}}</div>
                  </li>
                  <li class="pools__row">
                    <div class="pools__labe-field">{{$t('l.deposited')}}</div>
                    <div class="pools__label-value pools__label-value--black"><countTo :endVal='item.yourLock/1' :duration='3000' :decimals="2"></countTo></div>
                  </li>
                  <li class="pools__row">
                    <div class="pools__labe-field">{{$t('l.VL')}}</div>
                    <div class="pools__label-value"><countTo :endVal='item.totalLock/1' :duration='3000' :decimals="2"></countTo></div>
                  </li>
                  <li class="pools__group-buttons">
                    <div class="pools__button-group">
                      <button class="g-button pools__dialog__option g-button-heco-theme " @click="handleGoLock(item.index)">{{$t('l.goLock')}}</button>
                    </div>
                  </li>
                </ul>
                <div class="pools__mao-logo__wrap">
                  <img src="" alt="" class="pools__mao-logo">
                </div>
              </Spin>
            </div>
        </div>
      </div>
    </div>
    </Spin>
  </div>
</template>

<script>
import { ethers } from 'ethers';
import { mapGetters } from 'vuex'
import { Spin } from 'ant-design-vue'
import countTo from 'vue-count-to';
import Web3 from 'web3'
export default {
  name: "Home",
  components: {
    Spin,
    countTo,
  },
  data() {
    return {
      currentHref: window.location.origin+window.location.pathname,
      spinStatus: false,
      daoPoolsLists: [],
      contractDao: null,
      mintTokenAddress: null,// addresses.MintToken[this.$store.state.accounts.mainChainID],
      getDataInterVal: null,
      setStoreDataInterval: null,
      currentPoolID: -1,
      currentPoolIndex: -1,
      WFC_USDT_LPAddress: ""
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
    handleCopyLink() {
      if(!this.getActiveAccount) {
        this.$message.error(this.$t('l.error_tips_unconnect'))
        return
      }
      this.$copyText(this.currentHref+'#/dao?address='+this.getActiveAccount).then( () => {
        this.$message.success('复制成功')
      }, function () {
        this.$message.error('复制失败,请重试！')
      })
    },
    handleGoLock(index) {
      if(this.getActiveAccount) {
        this.$router.push({path: "/vault",query: {token: index}})
      }else {
        this.$message.error(this.$t('l.error_tips_unconnect'))
      }
    }
  },
  created() {
  },
  async mounted() {
  },
  destroyed() {
  }
}
</script>

<style scoped>
  .vault_inner_wrap {
    text-align: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 0 48px 0;
  }
  .vault_top_nav {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .copy_wrap {
    margin-left: auto;
    display: flex;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    width: 354px;
    height: 48px;
    background-color: #fff;
    border-radius: 8px;
  }
  .copy_wrap .copy_text {
    white-space: nowrap;
  }
  .copy_wrap .link_text {
    width: 100%;
    height: 28px;
    line-height: 28px;
    border: 1px solid #52CCC5;
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
  .bandge {
    position: absolute;
    width: 30px;
    border-radius: 6px;
    font-size: 10px;
    color: #733729;
    left: 20px;bottom: 0;
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
    color: #00b595;
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
    width: 100%;
  }
  .g-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 44px;
    outline: none;
    border: none;
    background-color: rgb(81, 204, 197);
    border-radius: 22px;
    font-size: 14px;
    color: #fff;
    font-weight: 700;
    cursor: pointer;
  }
  .g-button--normal {
    background-image: none;
    background-color: #fff;
    color: rgb(81, 204, 197);
    border: 1px solid rgb(81, 204, 197);
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
    background-color: rgb(81, 204, 197);
  }
  .g-button--normal:hover{
    background-color: rgb(81, 204, 197);
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
    color: rgb(81, 204, 197);
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
    .vault_top_nav {
      flex-direction: column;
    }
    .copy_wrap {
      order: -1;
      margin: 0;
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