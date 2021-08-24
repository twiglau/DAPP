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
      <div class="vault_seg_nav">
        <ul class="vault_left">
          <li v-for="(item,index) in navArr" :key="index" @click="handleContChange(index)" class="valut_nav_item" :class="currentIndex == index ? 'active animation-scale-up' : 'animation-scale-down'">{{item}}</li>
          <div id="donghuaBox" :style="{left:currentIndex*50+'%'}"></div>
        </ul>
        <div class="vault_right">
           <span>{{currentIndex == 0? $t('l.t_tolIn') : $t('l.t_tolOut')}}</span>
           <span>{{currentIndex == 0? totalProfit : takeOutProfit}}</span>
        </div>
      </div>
      <div class="pools-main" v-if="records.length > 0">
        <div class="pools__item" v-for="(item,index) in records" :key="index">
            <div class="pools__box">
            <a-spin tips="loading" :spinning="false" size="large">
                <ul class="pools__rows">
                  <li class="pools__row-1">
                    <div class="pools__logo-name">
                      <svg-icon class="pools__coin-logo" icon-class="Libra_coin" />
                      <div class="pools__coin-name">Libra</div>
                    </div>
                    <div class="pools__logo-name">
                      <div class="pools__coin-name pools__apy-value">+{{amt(item)}}</div>
                    </div>
                  </li>
                  <li class="pools__row">
                    <div class="pools__labe-field">{{$t('l.t_jiedata')}}</div>
                    <div class="pools__label-value">{{formatTimeStr(item)}}</div>
                  </li>
                </ul>
                <div class="pools__mao-logo__wrap">
                  <img src="" alt="" class="pools__mao-logo">
                </div>
            </a-spin>
            </div>
        </div>
      </div>
      <a-empty v-else description="no records" />
    </div>
    </a-spin>
  </div>
</template>

<script>
import Wallet from '@/utils/Wallet.js';
export default {
  name: "IncomeDetail",
  components: {
  },
  data() {
    return {
      spinStatus: false,
      walletAddress:'',
      records:[],
      dataSize:0,
      navArr: [this.$t('l.t_profitD'),this.$t('l.t_wde')],
      currentIndex:0,
      totalProfit:0,
      takeOutProfit:0,
    }
  },
  computed: {
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    async handleContChange(index) {
      this.currentIndex = index
      this.records = []
      if(this.currentIndex == 0){
        const count = await this.checkHasIncomeData()
        console.log({count})
        if(count > 0){
          this.dataSize = count
          this.spinStatus = true
          const res = await this.getProfitRecord()
          this.spinStatus = false
        }
      }else{
        const count = await this.checkHasTiquData()
        console.log({count})
        if(count > 0){
          this.dataSize = count
          this.spinStatus = true
          const res = await this.getTiquRecord()
          this.spinStatus = false
        }
      }
    },
    formatTimeStr(item){
      let timestamp = this.currentIndex == 0?  +item.time * 1000 : +item.takeoutTime * 1000
      return this.$formatTime(timestamp,'YYYY-MM-DD HH:MM')
    },
    amt(item){
      let amount = item.amount
      return  (amount / Wallet.Precisions()).toFixed(4)
    },
    async getIncomeData(){
      let _self = this
      _self.walletAddress = localStorage.getItem("walletAddress") || '';
      return new Promise((resolve,reject) => {
          Wallet.incomeAccount(_self.walletAddress,(res)=>{
             resolve(res)
          },(err) => {reject(err)})
      })
    },
    async checkHasTiquData(){
      let _self = this
      _self.walletAddress = localStorage.getItem("walletAddress") || '';
      return new Promise((resolve,reject) => {
        Wallet.queryTakeoutIncomeRecordSize(_self.walletAddress,(res) =>{
            let result = +res || 0
            resolve(result)
        },(err) => {
            reject(err)
        })

      })
    },
    async getTiquRecord(start = 0, end = 1){
      let _self = this
      _self.walletAddress = localStorage.getItem("walletAddress") || '';
      return new Promise((resolve,reject) => {
        try {
          let promiseRecordArr = [],resultRecordArr = [];
          let i = start;
          do {
            end = end > _self.dataSize ? _self.dataSize : end
            promiseRecordArr[i] = new Promise((res,rej) => {
                Wallet.queryTakeoutIncomeRecord(_self.walletAddress,i,(record) => {
                  console.log({record,i})
                  if(record){
                    resultRecordArr.push(record)
                    res(record)
                  }else{
                    rej('error')
                  }
                },(err) => {rej(err)})
            })
            ++i;

          } while (i < end);

          //全部请求,可能失败, finally接收
          Promise.all(promiseRecordArr).finally(() => {
            resolve('success')
            console.log(resultRecordArr)
            _self.records.push(...resultRecordArr)
            //这里过滤数据, 递归
            if(_self.dataSize > end){
              _self.getTiquRecord(end,end + 1)
            }
          })

        } catch (error) {
            reject(error)
            _self.$message.error(_self.$t('l.catch_err'))
        }
      })
    },
    async checkHasIncomeData(){
      let _self = this
      _self.walletAddress = localStorage.getItem("walletAddress") || '';
      return new Promise((resolve,reject) => {
        Wallet.queryIncomeSize(_self.walletAddress,(res) =>{
            let result = +res || 0
            resolve(result)
        },(err) => {
            reject(err)
        })
      })
    },
    async getProfitRecord(start = 0, end = 1){
      let _self = this
      _self.walletAddress = localStorage.getItem("walletAddress") || '';
      return new Promise((resolve,reject) => {
        try {
          let promiseRecordArr = [],resultRecordArr = [];
          let i = start;
          do {
            end = end > _self.dataSize ? _self.dataSize : end
            promiseRecordArr[i] = new Promise((res,rej) => {
                Wallet.incomeRecord(_self.walletAddress,i,(record) => {
                  console.log({record,i})
                  if(record){
                    resultRecordArr.push(record)
                    res(record)
                  }else{
                    rej('error')
                  }
                },(err) => {rej(err)})
            })
            ++i;

          } while (i < end);

          //全部请求,可能失败, finally接收
          Promise.all(promiseRecordArr).finally(() => {
            resolve('success')
            console.log(resultRecordArr)
            _self.records.push(...resultRecordArr)
            //这里过滤数据, 递归
            if(_self.dataSize > end){
              _self.getProfitRecord(end,end + 1)
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
    let _self = this
    const res = await _self.getIncomeData()
      if(res){
          console.log({res})
          const {
            total,  //总收益
            takeout //取出
                } = res
          _self.totalProfit = (Number(total)/Wallet.Precisions() || 0).toFixed(2)
          _self.takeOutProfit = (Number(takeout)/Wallet.Precisions() || 0).toFixed(2)
      }
    this.handleContChange(0)

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
  #donghuaBox{
    width: 50%;
    height: 100%;
    position: absolute;
    z-index: 1;
    background-color: #43318C;
    border-radius: 100px;
    transition: 0.5s;
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
  .vault_seg_nav {
    padding: 5px 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

  }
  .vault_left {
    position: relative;
    background-color: #fff;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #666666;
    overflow: hidden;
    list-style: none;
    display: flex;
    justify-content: space-around;
    border-radius: 40px;
  }
  .vault_right {
    font-size: 14px;
    font-weight: bold;
    color: #6c6c6c;
  }
  .vault_right span:nth-child(2){
    color: #19A569;
    font-size: 16px;
    margin-left: 8px;
  }
  .valut_nav_item {
    padding: 0px 10px;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transition: 0.5s;
  }
  .valut_nav_item.active {
    color: white;
    font-weight: 500;
  }

  li {
    list-style: none;
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
          transform: scale(1.2)
      }
  }

  @keyframes scale-down {
      0% {
          opacity: 0;
          transform: scale(1.2)
      }

      100% {
          opacity: 1;
          transform: scale(1)
      }
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
    top: 2px;left: 10%;
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
    
    .vault_seg_nav {
      border-bottom:solid 1px #f1f1f1;
    }
    .pools-main {
      width: 100%;
    }
    #donghuaBox {
      background:white;
    }

    .valut_nav_item.active {
      color: #000;
      font-weight: 500;
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