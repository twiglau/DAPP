<template>
  <div class="market">
    <a-spin class="global_loading" tip="loading" :spinning="spinStatus" size="large">
      <div class="team-amount">
        <div class="amount-item">
          <span>{{$t('l.t_tolp')}}</span><span>LBR + USDT</span><span><countTo :endVal='team.totalProfit' :duration='3000' :decimals="2"></countTo></span>
        </div>
        <div class="amount-item">
          <span>{{$t('l.t_todayp')}}</span><span>LBR + USDT</span><span><countTo :endVal='team.todayProfit' :duration='3000' :decimals="2"></countTo></span>
        </div>
      </div>
      <div class="team-level">

        <div class="level-desc">
          <span>{{$t('l.t_level')}}</span>
          <span>Completed</span>
        </div>
        <div class="level">
            <div class="line-docr">
              <div class="line"></div>
              <div class="line"></div>
            </div>
            <div class="level-item" style="justify-content: flex-start;">
              <svg-icon icon-class="left_icon"></svg-icon>
              <span style="left:5px">LV2</span>
            </div>
            <div class="level-item" style="justify-content: center;">
              <svg-icon class="team-level-icon" icon-class="LV2_icon"></svg-icon>
            </div>
            <div class="level-item" style="justify-content: flex-end;">
              <svg-icon icon-class="right_icon"></svg-icon>
              <span style="right:5px">LV4</span>
            </div>
        </div>
        <div class="team-level-desc-nor">
          {{$t('l.t_desc')}}
        </div>
        <div class="team-level-amount"><countTo :endVal='team.needTeamProfor' :duration='3000' :decimals="2" prefix="$"></countTo></div>
        <div class="team-level-desc">
          {{$t('l.t_desc1')}}
        </div>
        <a-button size="default" class="invite-btn" @click="handleCopyLink">Invite</a-button>
      </div>
      <div class="team-level">
        <div class="level-desc">
          <span>{{$t('l.t_info')}}</span>
          <span></span>
        </div>
        <div class="team-info">
          <div class="info-item">
            <svg-icon icon-class="team_icon_01"></svg-icon>
            <span>{{$t('l.t_num')}}</span>
            <span><countTo :endVal='team.teamPeople' :duration='3000' :decimals="2"></countTo></span>
          </div>
          <div class="info-item">
            <svg-icon icon-class="team_icon_02"></svg-icon>
            <span>{{$t('l.t_ttt')}}</span>
            <span><countTo :endVal='team.teamProformance' :duration='3000' :decimals="2"></countTo></span>
          </div>
          <div class="info-item">
            <svg-icon icon-class="team_icon_03"></svg-icon>
            <span>{{$t('l.t_tre')}}</span>
            <span><countTo :endVal='team.teamProfit' :duration='3000' :decimals="2"></countTo></span>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import Wallet from '@/utils/Wallet.js';
import countTo from 'vue-count-to';
export default {
  name: "Market",
  components: {
    countTo,
  },
  data() {
    return {
      currentHref: window.location.origin+window.location.pathname,
      spinStatus:false,
      walletAddress:'',
      inviteAddress:'',
      team:{
        totalProfit:0,
        todayProfit:0,
        teamPeople:0,
        teamProformance:0,
        needTeamProfor:0,
        teamProfit:0,
      },
    }
  },
  computed: {
  },
  methods: {
    //查一个节点的所有下级
    async getTeamDown(address,start = 0, end = 1){
      let _self = this
      if(!address) return

      new Promise((resolve,reject) => {
        try {
          let promiseDownArr = [],resultDownArr = [];
          let i = start;
          do {
            ++i;
            promiseDownArr[i] = new Promise((res,rej) => {
                Wallet.queryDownUser(address,i,(info) => {
                  if(record){
                    resultDownArr.push(info)
                    res(info)
                  }else{
                    rej('error')
                  }
                })
            })

          } while (i < end);

          Promise.all(promiseDownArr)
          .finally(() => {
            resolve('success')
            //这里过滤数据, 递归
            if(resultDownArr.length == end){
              _self.getTeamDown(end,end + 1)
            }
          })
        } catch (error) {
            reject(error)
            _self.$message.error(_self.$t('l.catch_err'))
        }
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
      this.$copyText(this.currentHref+'#/market?address='+this.walletAddress).then( () => {
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

      const res = await _self.getIncomeData()
      if(res){
          const {
            total,  //总收益
            takeout, //总取出
            todayDividend,//今日分红
            todayShareAmount,//今日分享收益
            todayGlobalAmount//今日全球算力
                } = res
          _self.team.totalProfit = total || 0
          _self.team.todayProfit = (+todayDividend || 0) + (+todayShareAmount || 0) + (+todayGlobalAmount || 0)
      }

  },
  destroyed() {
  }
}
</script>

<style scoped>
.team-amount {
  display: flex;
  align-items: center;
  margin: 0px auto;
  max-width: 1200px;
  width: 100%;
  border-radius: 20px;
  background: #43318C;
  height: 120px;
}
.amount-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}
.amount-item span:nth-of-type(3) {
  color: white;
  font-size: 16px;
  font-weight: bold;
}

.team-level {
  margin: 0 auto;
  margin-top: 30px;
  padding: 20px;
  border-radius: 20px;
  max-width: 1200px;
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.level {
  margin: 0px 30px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.line-docr {
  position:absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  left: 0;

  display: flex;
}
.line-docr .line {
  width: 50%;
  height: 10px;
  background: #43318C;
}
.level-desc {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.level-desc span:nth-child(1) {
  color: #000;
  font-size: 16px;
}
.level-desc span:nth-child(2) {
  color: #9c9c9c;
  font-size: 14px;
}
.level-item {
  flex: 1;
  display: flex;
  position: relative;
}
.level-item span {
  position:absolute;
  top: 100%;
}
.level-item .svg-icon {
   width: 40px;
   height: 40px;
}
.level-item .team-level-icon {
  width: 80px;
  height: 80px;
}
.team-level-desc-nor {
  margin-top: 24px;
  font-size: 14px;
  color: #9c9c9c;
}
.team-level-amount {
  margin: 10px 0px;
  font-size: 18px;
  font-weight: bold;
  color: #43318C;
}
.team-level-desc {
  font-size: 14px;
  color: #000;
}
.invite-btn {
  margin-top: 24px;
  color: white;
  background: #000;
}
.team-info {
  display: flex;
  align-items: center;
  width: 100%;
}
.info-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color:#9c9c9c;
}
.info-item .svg-icon {
  width: 32px;
  height: 32px;
}
.info-item span:nth-of-type(1) {
  color: #9c9c9c;
  font-size: 14px;
  margin: 10px 0px;
}
.info-item span:nth-of-type(2) {
  color: #000;
  font-size: 16px;
}

@media (max-width: 768px) {
  .team-amount,.team-level {
    border-radius: 0px;
  }
  .team-level {
    margin-top: 0px;
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