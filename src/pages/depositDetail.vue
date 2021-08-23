<template>
  <div class="vault_wrap">
    <a-spin class="global_loading" tip="loading" :spinning="spinStatus" size="large">
    <div class="vault_inner_wrap">
      <div class="vault_top_nav">
          <div class="copy_wrap" @click="goBack">
            <svg-icon icon-class="arrow_left"></svg-icon>
            <span>{{$t('l.back')}}</span>
          </div>
      </div>
      <div class="pools-main" v-if="records.length > 0">
        <div class="pools__item" v-for="(item,index) in records" :key="index">
            <div class="pools__box">
                <ul class="pools__rows">
                  <li class="pools__row-1">
                    <div class="pools__logo-name">
                      <svg-icon class="pools__coin-logo" :icon-class="coin1(item) + '_coin'"/>
                      <svg-icon v-if="item.currency2Index && item.currency2Index.length > 0" class="pools__coin-logo logo_lp_2" :icon-class="coin2(item) + '_coin'"/>
                      <div class="pools__coin-name" :class="item.currency2Index&& item.currency2Index.length > 0 ? 'name_lp_2' : ''">{{item.currency2Index&& item.currency2Index.length > 0 ? `${coin1(item) + '/' + coin2(item)}` : coin1(item)}}</div>
                    </div>
                    <div class="pools__info">{{$t('l.reward')}} Libra</div>
                  </li>
                  <li class="pools__row pools__apy">
                    <div class="pools__labe-field">{{coin1(item)}} {{$t('l.t_deposit')}}</div>
                    <div class="pools__label-value pools__label-value--black">{{amt1(item)}}</div>
                  </li>
                  <li class="pools__row" v-if="item.currency2Index && item.currency2Index.length > 0">
                    <div class="pools__labe-field">{{coin2(item)}} {{$t('l.t_deposit')}}</div>
                    <div class="pools__label-value pools__label-value--black">{{amt2(item)}}</div>
                  </li>
                  <li class="pools__row">
                    <div class="pools__labe-field">{{$t('l.t_dedata')}}</div>
                    <div class="pools__label-value">{{formatTimeStr(item)}}</div>
                  </li>
                </ul>
                <div class="pools__mao-logo__wrap">
                  <img src="" alt="" class="pools__mao-logo">
                </div>
            </div>
        </div>
      </div>
      <a-empty v-else description="no records" />
    </div>
    </a-spin>
  </div>
</template>

<script>
//{"0":"4","1":"0xFaC462928525FAEA834d8000796B7843f822AF1d",
//"2":"10000000000","3":"10000000000","4":"0","5":"1629387212",
//"currencyIndex":"4","userAddress":"0xFaC462928525FAEA834d8000796B7843f822AF1d",
//"totalAmount":"10000000000","useableAmount":"10000000000","takeoutAmount":"0",
//"depositTime":"1629387212"}

//{"0":"0xFaC462928525FAEA834d8000796B7843f822AF1d","1":"1","2":"10000000000",
//"3":"10000000000","4":"0","5":"5","6":"94449209",
//"7":"94449209","8":"0","9":"1629389428",
//"userAddress":"0xFaC462928525FAEA834d8000796B7843f822AF1d",
//"currency1Index":"1","totalAmount1":"10000000000",
//"useableAmount1":"10000000000","takeoutAmount1":"0",
//"currency2Index":"5","totalAmount2":"94449209","useableAmount2":"94449209",
//"takeoutAmount2":"0","depositTime":"1629389428"}
import Wallet from '@/utils/Wallet.js';
import countTo from 'vue-count-to';
export default {
  name: "DepositDetail",
  components: {
    countTo,
  },
  data() {
    return {
      spinStatus: false,
      records:[],
      walletAddress:'',
      oneSize:0,
      twoSize:0,
      coins:[
        {key:1,coin:'Libra'},
        {key:2,coin:'BTC'},
        {key:3,coin:'ETH'},
        {key:4,coin:'USDT'},
        {key:5,coin:'BNB'},
        {key:6,coin:'FIL'},
      ]
    }
  },
  computed: {
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    coin1(item){
      let index = item.currencyIndex ? item.currencyIndex : item.currency1Index
      return this.coins.find(ele => ele.key == index).coin
    },
    coin2(item){
      let index = item.currency2Index
      let item_a = this.coins.find(ele => ele.key == index)
      if(item_a){
        return item_a.coin
      }else {
        return 'Libra'
      }
    },
    amt1(item){
      let coin = this.coin1(item)
      let amount = item.useableAmount ? item.useableAmount : item.useableAmount1
      return  (amount / Wallet.Precisions(coin.toUpperCase())).toFixed(4)
    },
    amt2(item){
      let coin = this.coin2(item)
      let amount = item.useableAmount2
      return  (amount / Wallet.Precisions(coin.toUpperCase())).toFixed(4)
    },
    formatTimeStr(item){
      let timestamp = +item.depositTime * 1000
      return this.$formatTime(timestamp,'YYYY-MM-DD HH:MM')
    },
    async checkHasMyPairLockData(){
      let _self = this
      _self.walletAddress = localStorage.getItem("walletAddress") || '';
      if(!_self.walletAddress)return
      Wallet.queryTwosSize(_self.walletAddress,(res) =>{
          _self.twoSize = +res || 0
          if(_self.twoSize > 0)_self.getMyPairLockAmount()
      },(err) => {
          reject(err)
      })
    },
    async checkHasMyLockData(){
      let _self = this
      _self.walletAddress = localStorage.getItem("walletAddress") || '';
      if(!_self.walletAddress)return
      Wallet.queryOnesSize(_self.walletAddress,(res) =>{
          
          _self.oneSize = +res || 0
          if(_self.oneSize > 0) _self.getMyLockAmount()
      },(err) => {
          reject(err)
      })
    },
    async getMyPairLockAmount(start = 0,end = 1){
      let _self = this
      _self.walletAddress = localStorage.getItem("walletAddress") || '';
      new Promise((resolve,reject) => {
        try {
          let promiseMyLockArr = [],resultLockArr = [];
          let i = start;
          end = end > _self.twoSize ? _self.twoSize : end
          do {
            promiseMyLockArr[i] = new Promise((res,rej) => {
                Wallet.twoDepositOrder(_self.walletAddress,i,(record) => {
                  if(record){
                    resultLockArr.push(record)
                    res(record)
                  }else{
                    rej('error')
                  }
                },(err) => {rej(err)})
            })
            ++i;

          } while (i < end);

          //全部请求可能失败, finally接收
          Promise.all(promiseMyLockArr)
          .finally(() => {
            resolve('success')
            // TODO: 放入定时器后, 需要清除lockAmount,防止累加
            _self.records.push(...resultLockArr)
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
    async getMyLockAmount(start = 0, end = 1){
      let _self = this
      _self.walletAddress = localStorage.getItem("walletAddress") || '';
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
                },(err) => {rej(err)})
            })
            ++i;

          } while (i < end);

          //全部请求,可能失败, finally接收
          Promise.all(promiseMyLockArr).finally(() => {
            resolve('success')
            console.log({resultLockArr})
            _self.records.push(...resultLockArr)
            

            //格式化数据 0-ETH  1-BNB 3-BTC 4-USDT
            //返回  1libra.   2btc. 3eth.  4usdt.  5bnb.  6fil
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
  },
  created() {
  },
  async mounted() {
    this.checkHasMyLockData()
    this.checkHasMyPairLockData()
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
    justify-content: flex-start;
    align-items: center;
  }
  .copy_wrap {
    display: flex;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    width: 100px;
    height: 48px;
    background-color: #fff;
    border-radius: 8px;
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
    border-radius: 8px;
    border: none;
    font-size: 8px;
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
    .pools-main {
      width: 100%;
    }
    .pools__item {
      width: 100%;
      padding: 0 15px;
    }
    .pools__box {
      width: 100%;
      padding: 0px 10px 15px 10px;
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