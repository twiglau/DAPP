<template>
  <div class="market">
    <a-spin class="global_loading" tip="loading" :spinning="spinStatus" size="large">
      <div class="team-amount">
        <div class="amount-item">
          <span>{{$t('l.t_tolp')}}</span><span>LBR + USDT</span><span>1000.00</span>
        </div>
        <div class="amount-item">
          <span>{{$t('l.t_todayp')}}</span><span>LBR + USDT</span><span>100.00</span>
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
        <div class="team-level-amount">$1900.00</div>
        <div class="team-level-desc">
          {{$t('l.t_desc1')}}
        </div>
        <a-button size="default" class="invite-btn">Invite</a-button>
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
            <span>2456</span>
          </div>
          <div class="info-item">
            <svg-icon icon-class="team_icon_02"></svg-icon>
            <span>{{$t('l.t_ttt')}}</span>
            <span>186777.99</span>
          </div>
          <div class="info-item">
            <svg-icon icon-class="team_icon_03"></svg-icon>
            <span>{{$t('l.t_tre')}}</span>
            <span>94678.99</span>
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
      spinStatus:false,
      walletAddress:'',
    }
  },
  computed: {
  },
  methods: {
    async getTeamData(){
      new Promise((resolve,reject) => {
          
      })
    }
  },
  created() {
  },
  mounted() {
      this.walletAddress = localStorage.getItem("walletAddress") || '';
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