<template>
  <div class="mine">
    <div class="income-info">
      <div class="total-item">
          <div class="total">
            <div>{{$t('l.t_tolIn')}}</div>
            <div><span><countTo :endVal='totalProfit' :duration='3000' :decimals="2" /></span><span>LBR</span></div>
            <div>≈<countTo :endVal='totalValue' :duration='3000' :decimals="2" prefit="$" /></div>
          </div>
          <div class="detail-c" @click="detailClick('/income-detail')">
            <div class="detail"><span>{{$t('l.t_de')}}</span><svg-icon icon-class="enter_icon"></svg-icon></div>
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
      price:0,
    }
  },
  computed: {
    totalValue:function(){
      return (+this.totalProfit) * (+this.price)
    }
  },
  methods: {
    detailClick(path){
      this.$router.push({path:path,query:{}})
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
      new Promise((resolve) => {
          Wallet.incomeAccount(_self.walletAddress,(res)=>{
             resolve(res)
          })
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
          const {
            total  //总收益
                } = res
          _self.totalProfit = total || 0
      }
  },
  destroyed() {
  }
}
</script>

<style scoped>
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
  flex: 1;
}
.detail-c {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

}
.detail {
  display: flex;
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