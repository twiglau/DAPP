<template>
  <div class="mine">
    <div class="income-info">
      <div class="total-item">
          <div class="total-left">
            <div class="total">
              <div>{{$t('l.t_tolOne')}}</div>
              <div><span><countTo :endVal='useableProfit' :duration='3000' :decimals="2" /></span><span>LBR</span></div>
              <div>≈<countTo :endVal='useValue' :duration='3000' :decimals="2" prefit="$" /></div>
            </div>
          </div>
          <div class="detail-c">
            <div class="detail" @click="detailClick('/income-detail')"><span>{{$t('l.t_de')}}</span><svg-icon icon-class="enter_icon"></svg-icon></div>
            <a-button class="g-button" @click="isModalShowProfit=true">{{$t("l.claim")}}</a-button>
          </div>
      </div>
      <div class="sepertor-line"></div>
      <div class="invite-item">
        <div class="invite-title">
          {{$t('l.t_int')}}
        </div>
        <div class="invite-detail">
          <div class="invite-link">{{currentHref+'#/mine?address='+walletAddress}}</div>
          <div @click="handleCopyLink"><svg-icon icon-class="Button"></svg-icon></div>
        </div>
      </div>
    </div>
    <div class="income-info mine-detail">
       <div class="detail-item" @click="detailClick('/deposit-detail')">
         <span>{{$t('l.t_depD')}}</span>
         <svg-icon icon-class="enter_icon"></svg-icon>
       </div>
       <div class="detail-item" @click="detailClick('/withdrawel-detail')">
         <span>{{$t('l.t_wde')}}</span>
         <svg-icon icon-class="enter_icon"></svg-icon>
       </div>
       <div class="detail-item" @click="detailClick('/swap-detail')">
         <span>{{$t('l.t_abd')}}</span>
         <svg-icon icon-class="enter_icon"></svg-icon>
       </div>
    </div>
    <svg-icon class="bottom-logo" icon-class="logo-gray"></svg-icon>

      <!-- 提取收益 -->
      <a-modal v-model="isModalShowProfit" :footer="null" :width="!$store.state.accounts.isMobile ? '600px' : '90%'" @cancel="handleMCancel" :centered="true">
        <div class="pools__dialog-inner pools__dialog-withdraw">
          <div class="pools__dialog__header">{{$t('l.withdrawal')}}</div>
          <ul class="pools__rows">
            <li class="pools__row-1">
              <div class="pools__logo-name">
                <svg-icon class="pools__coin-logo" icon-class="Libra_coin" />
                <div class="pools__coin-name">Libra</div>
              </div>
              <div class="pools__info"></div>
            </li>
            <li class="pools__dialog__withdraw-field">
              <span>{{$t('l.l_unprofit')}}(Libra)</span><span><countTo :endVal='useableProfit' :duration='1000' :decimals="4"></countTo></span>
            </li>
            <li class="pools__dialog__input">
              <input @input="input_num(1)" :placeholder="$t('l.iptPlace')" v-model="iptValue1">
              <button @click="iptValue1 = useableProfit" class="g-button pools__dialog__deposit-all  g-button--normal">{{$t('l.withdrawall')}}</button>
            </li>
            <li>
              <a-button :loading="pLoading"  @click="handleProfitAction" class="g-button g-button--tip" style="margin-left:auto;margin-top:20px;">{{$t('l.withdrawal')}}</a-button>
            </li>
          </ul>
        </div>
      </a-modal>
  </div>
</template>

<script>
import {getPrice} from '@/utils/api'
import Wallet from '@/utils/Wallet.js';
import countTo from 'vue-count-to';
export default {
  name: "Mine",
  components: {
    countTo,
  },
  data() {
    return {
      currentHref: window.location.origin+window.location.pathname,
      walletAddress:'',
      inviteAddress:'',
      totalProfit:0,
      useableProfit:0,
      price:0,
      pLoading:false,
      isModalShowProfit:false,
      iptValue1:null,
    }
  },
  computed: {
    totalValue:function(){
      return (+this.totalProfit) * (+this.price)
    },
    useValue:function(){
      return (+this.useableProfit) * (+this.price)
    }
  },
  methods: {
    detailClick(path){
      this.$router.push({path:path,query:{}})
    },
    input_num(index) {
      this['iptValue' + index] = this['iptValue' + index].replace(/[^\d.]/g, "")
      this['iptValue' + index] = this['iptValue' + index].replace(/\.{4,}/g, ".")
      this['iptValue' + index] = this['iptValue' + index].replace(/^\./g, "")
      this['iptValue' + index] = this['iptValue' + index].replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
      this['iptValue' + index] = this['iptValue' + index].replace(/^(-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3')
    },
    handleMCancel() {
      this.iptValue1 = undefined
      this.isModalShowProfit = false
    },
    handleProfitAction(){
       const {useableProfit,walletAddress,iptValue1} = this
       let _self = this
       if(!useableProfit || useableProfit < 0.00001){
         this.$message.error(_self.$t('l.l_noprofit'))
         return
       }
       if(!walletAddress || walletAddress.length < 10){
         this.$message.error(_self.$t('l.error_tips_unconnect'))
         return
       }
       if(!iptValue1 || iptValue1 > useableProfit){
         this.$message.error(_self.$t('l.l_numerror'))
         return
       }
       console.log({walletAddress})
       _self.pLoading = true
       Wallet.takeoutIncome(walletAddress,iptValue1,(res) => {
         if(res){
           _self.handleMCancel()
           _self.getIncomeData()
           _self.$success({
             title:_self.$t('l.claim'),
             content:_self.$t('.ok_tips_withdraw')
           })
         }
       },(err)=>{
         console.log({err})
         _self.pLoading = false
         _self.$error({
           title:_self.$t('l.claim'),
           content:err || '错误'
         })
       })

    },
    async getPairPrice(){
        let _self = this
        getPrice({symbol:'librausdt'})
        .then((res) => {
            let plc =  res.price
            _self.price = plc
        })
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
    handleCopyLink() {
      this.walletAddress = localStorage.getItem("walletAddress") || '';
      if(!this.walletAddress) {
        this.$message.error(this.$t('l.error_tips_unconnect'))
        return
      }
      this.$copyText(this.currentHref+'#/mine?address='+this.walletAddress).then( () => {
        this.$message.success('复制成功')
      }, function () {
        this.$message.error('复制失败,请重试！')
      })
    },
  },
  created() {
  },
  async mounted() {
      let _self = this
      _self.walletAddress = localStorage.getItem("walletAddress") || '';
      let inviteAddress = _self.$route.query.address ? _self.$route.query.address : ''
      if(inviteAddress && inviteAddress.length > 0) {
          _self.$setCookie('inviteAddress',inviteAddress,30 * 24 * 60 * 60)
      }
      _self.inviteAddress = _self.$getCookie('inviteAddress') ? _self.$getCookie('inviteAddress') : _self.inviteAddress

      _self.getPairPrice()
      const res = await _self.getIncomeData()
      if(res){
          console.log({res})
          const {
            total,  //总收益
            takeout //取出
                } = res
          _self.totalProfit = Number(total)/Wallet.Precisions() || 0
          _self.useableProfit = _self.totalProfit - (Number(takeout)/Wallet.Precisions() || 0)
      }
  },
  destroyed() {
  }
}
</script>

<style scoped>
  .mine {
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
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
  .g-button {
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 86px;
    height: 36px;
    outline: none;
    border: solid 1px #43318C;
    background-color: white;
    font-size: 14px;
    color: #43318C;
    font-weight: 700;
    cursor: pointer;
  }
  .g-button--tip {
    width: 100%;
    height: 48px;
    background-color: #43318C;
    color: white;
  }
  .g-button--tip:hover {
    background-color: hsl(253, 68%, 47%);
  }
  .g-button:hover {
    background-color: hsl(252, 37%, 70%);
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
  .pools__coin-logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .logo_lp_2 {
    position: absolute;
    top: 0;left: 10%;
  }
  .pools__coin-name {
    margin-left: 12px;
    font-size: 16px;
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
  .pools__label-value--gray {
    color: #9C9C9C;
    font-size: 12px;
  }
  .pools__button-group {
    display: flex;
    justify-content: space-between;
  }
  .pools__button-group .g-button {
    width: 46%;
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
    top: 0px;
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
  .g-button--normal {
    background-image: none;
    background-color: #fff;
    color: #43318C;
    border: none;
    border-radius: 4px;
  }
  .g-button--normal:hover{
    background-color: #1d0c63;
    color:#fff;
    border:none
  }
.income-info {
  padding: 20px 20px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  border-radius: 20px;
  background: white;
}
.total-item,.invite-item {
  flex: 1;
}
.total-item {
  display: flex;
}
.total {
  min-width: 150px;
}
.total-left {
  flex: 1;
  display: flex;
  align-items: center;
  
}
.detail-c {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;

}
.detail {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #3C3C3C;
  font-size: 14px;
  margin-bottom: 15px;
}
.detail .svg-icon {
  width: 9px;
  height: 8px;
  margin-left: 8px;
}
.total div:nth-of-type(1) {
   color: #3C3C3C;
   font-size: 14px;
}
.total div:nth-of-type(2) {
   color: #43318C;
   font-size: 24px;
   margin: 8px 0px;
}
.total div:nth-of-type(2) > span:nth-of-type(2) {
   color: #000;
   font-size: 12px;
   margin-left: 5px;
}
.total div:nth-of-type(3) {
   color: #9C9C9C;
   font-size: 12px;
}
.sepertor-line {
  width: 1px;
  height: 60px;
  margin: 0px 30px;
  background: #e1e1e1;
}
.invite-title {
  color: #000;
  font-size: 15px;
  font-weight: bold;
}
.invite-detail {
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.invite-detail .invite-link {
  color: #6C6C6C;
  font-size: 14px;
  margin-right: 15px;
  max-width: 240px;
  overflow: hidden;
}
.invite-detail .svg-icon {
  width: 113px;
  height: 40px;
}
.mine-detail {
  margin-top: 30px;
}
.detail-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 16px;
  font-weight: bold;
  flex: 1;
}

.detail-item + .detail-item{
  border-left: solid 1px #e1e1e1;
}
.detail-item .svg-icon {
  margin-top: 20px;
  width: 9px;
  height: 8px;
}
.bottom-logo {
  width: 101px;
  height: 32px;
  margin: 80px auto;
}



@media (max-width: 768px) {
  .income-info {
    border-radius: 0px;
    flex-direction: column;
  }
  .mine-detail {
    margin-top: 10px;
  }
  .total-item, .invite-item{
    width: 100%;
  }
  .sepertor-line {
    width: 100%;
    height: 1px;
    margin: 30px 0px;
    background: #e1e1e1;
  }
  .invite-detail {
    width: 100%;
  }
  .invite-detail .invite-link {
    color: #6C6C6C;
    font-size: 14px;
    margin-right: 15px;
  }
  .detail-item {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 10px 0px;
    font-size: 14px;
  }

  .detail-item + .detail-item{
    border-left: solid 1px transparent;
    border-top: solid 1px #e1e1e1;
  }
  .detail-item .svg-icon {
    margin-top: 0px;
  }

}
</style>