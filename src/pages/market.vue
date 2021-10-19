<template>
  <div class="market">
    <a-spin class="global_loading" tip="loading" :spinning="spinStatus" size="large">
      <div class="team-amount">
        <svg-icon icon-class="team_top_icon" class="team-icon"></svg-icon>
        <div class="amount-item">
          <span>{{$t('l.t_tolp')}}</span><span>LBR</span><span><countTo :endVal='tInfo.totalProfit' :duration='3000' :decimals="2"></countTo></span>
        </div>
        <div class="amount-item">
          <span>{{$t('l.t_todayp')}}</span><span>LBR</span><span><countTo :endVal='tInfo.todayProfit' :duration='3000' :decimals="2"></countTo></span>
        </div>
      </div>
      <div class="team-level">

        <div class="level-desc">
          <span>{{$t('l.t_level')}}</span>
          <span :style="[{color:tInfo.status === $t('l.l_completed')? '#43318C':'#9C9C9C'}]">{{tInfo.status}}</span>
        </div>
        <div class="level">
            <div class="line-docr">
              <div class="line" :style="[{background:tInfo.leftLevel ? '#43318C':'white'}]"></div>
              <div class="line" :style="[{background:tInfo.rightLevel ? '#43318C':'white'}]"></div>
            </div>
            <div class="level-item" style="justify-content: flex-start;" >
              <div @click="leftTeamClick"><svg-icon v-show="tInfo.leftLevel" icon-class="left_icon"></svg-icon></div>
              <span v-show="tInfo.leftLevel" style="left:5px">{{tInfo.leftLevel}}</span>
            </div>
            <div class="level-item" style="justify-content: center;">
              <svg-icon class="team-level-icon" :icon-class="tInfo.level + '_icon'"></svg-icon>
            </div>
            <div class="level-item" style="justify-content: flex-end;" >
              <div @click="rightTeamClick"><svg-icon v-show="tInfo.rightLevel" icon-class="right_icon" ></svg-icon></div>
              <span v-show="tInfo.rightLevel" style="right:5px">{{tInfo.rightLevel}}</span>
            </div>
        </div>
        <div class="team-level-desc-nor">
          {{$t('l.t_desc')}}
        </div>
        <div class="team-level-amount"><countTo :endVal='tInfo.needTeamProfor' :duration='1000' :decimals="2" prefix="$"></countTo></div>
        <div class="team-level-desc">
          {{$t('l.t_desc1')}}{{tInfo.enjoyRatio}}
        </div>
        <a-button size="default" class="invite-btn" @click="handleCopyLink">{{$t('l.l_invite')}}</a-button>
      </div>
      <div class="team-level">
        <div class="level-desc">
          <span>{{$t('l.t_info')}}</span>
          <span>
            <a-input-search :loading="team.teamSearching" :allowClear="true" :placeholder="$t('l.l_teamlink')" @search="onSearchTeam">
              <a-button slot="enterButton" >
                <svg-icon  icon-class="search_icon" style="width:16px;height:16px;"></svg-icon>
              </a-button>
            </a-input-search>
          </span>
        </div>
        <div class="team-wrap">
        <a-spin class="team_loading" tip="loading" :spinning="team.teamLoading" size="large">
        <div class="team-info">
            <div class="info-item">
              <svg-icon icon-class="team_icon_01"></svg-icon>
              <span>{{$t('l.t_num')}}</span>
              <span><countTo :endVal='tInfo.teamPeople' :duration='1000'></countTo></span>
            </div>
            <div class="info-item">
              <svg-icon icon-class="team_icon_02"></svg-icon>
              <span>{{$t('l.t_ttt')}}</span>
              <span><countTo :endVal='tInfo.teamProformance' :duration='1000' :decimals="2"></countTo></span>
            </div>
            <div class="info-item">
              <svg-icon icon-class="team_icon_03"></svg-icon>
              <span>{{$t('l.t_tre')}}</span>
              <span><countTo :endVal='tInfo.teamProfit' :duration='1000' :decimals="2"></countTo></span>
            </div>
        </div>
        </a-spin>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import Wallet from '@/utils/Wallet.js';
import countTo from 'vue-count-to';
import Teams from '@/models/teams';
import {mapGetters} from 'vuex'
import UserActivateMixin from '../mixin/UserActivateMixin'
export default {
  name: "Market",
  components: {
    countTo,
  },
  mixins:[UserActivateMixin],
  data() {
    return {
      currentHref: window.location.origin+window.location.pathname,
      spinStatus:false,
      team:new Teams(),
      tInfo:new Teams(),
      currentTeam:new Teams(),
      layers:0,
      teamLevels:[
        {level:'LV1',value:Math.pow(10,5),ratio:'2%'},
        {level:'LV2',value:5*Math.pow(10,5),ratio:'3%'},
        {level:'LV3',value:10*Math.pow(10,5),ratio:'4%'},
        {level:'LV4',value:20*Math.pow(10,5),ratio:'5%'},
        {level:'LV5',value:30*Math.pow(10,5),ratio:'6%'},
        {level:'LV6',value:40*Math.pow(10,5),ratio:'7%'},
        {level:'LV7',value:50*Math.pow(10,5),ratio:'8%'},
      ],
      curLevelIndex:2,
    }
  },
  computed: {
    ...mapGetters('accounts',{walletAddress:'getActiveAccount',isMain:'getIsMainChainID'}),
  },
  methods: {

   onSearchTeam(value){
      console.log({searchValue:value})
      let _self = this
      if(!value){
          this.tInfo.teamProfit = this.currentTeam.teamProfit;
          this.tInfo.teamProformance = this.currentTeam.teamProformance;
          this.tInfo.teamPeople = this.currentTeam.teamPeople;
          return
      } 
      let genrateAddr = this.$emptyAddress()
      if(value && value.length < genrateAddr.length){
        this.$message.error({content:this.$t('l.l_enterrightaddress'),top:`300px`})
        return
      }
      _self.team.teamLoading = true
      _self.team.teamSearching = true
      setTimeout(async ()=>{
          _self.removeInfo() //搜索前移除信息
          await _self.team.searchNode(value,() => {
            //更新信息
            _self.tInfo = Object.assign({},_self.team)
          });
      },0);
   },
    leftTeamClick(){
      //减一
      this.curLevelIndex -= 1;
      let level =  `LV${this.curLevelIndex}`
      this.tInfo.level = level
      this.checkTeam()
    },
    rightTeamClick(){
      //加一
      this.curLevelIndex += 1;
      let level = `LV${this.curLevelIndex}`
      this.tInfo.level = level
      this.checkTeam()
    },
    checkTeam(){
      const {teamProformance,level} = this.tInfo
      console.log({level})
      if(level == this.teamLevels[0].level){
        this.tInfo.needTeamProfor = this.teamLevels[0].value
        this.tInfo.enjoyRatio = this.teamLevels[0].ratio
        this.tInfo.leftLevel = null
        this.tInfo.level = 'LV1'
        this.tInfo.rightLevel = 'LV2'
        this.tInfo.status = teamProformance < this.teamLevels[0].value ? this.$t('l.l_unfinished') : this.$t('l.l_completed')
      }else if (level == this.teamLevels[1].level){
        this.tInfo.needTeamProfor = this.teamLevels[1].value
        this.tInfo.enjoyRatio = this.teamLevels[1].ratio
        this.tInfo.leftLevel = 'LV1'
        this.tInfo.level = 'LV2'
        this.tInfo.rightLevel = 'LV3'
        this.tInfo.status = teamProformance < this.teamLevels[1].value ? this.$t('l.l_unfinished') : this.$t('l.l_completed')
      }else if (level == this.teamLevels[2].level){
        this.tInfo.needTeamProfor = this.teamLevels[2].value
        this.tInfo.enjoyRatio = this.teamLevels[2].ratio
        this.tInfo.leftLevel = 'LV2'
        this.tInfo.level = 'LV3'
        this.tInfo.rightLevel = 'LV4'
        this.tInfo.status = teamProformance < this.teamLevels[2].value ? this.$t('l.l_unfinished') : this.$t('l.l_completed')
      }else if (level == this.teamLevels[3].level){
        this.tInfo.needTeamProfor = this.teamLevels[3].value
        this.tInfo.enjoyRatio = this.teamLevels[3].ratio
        this.tInfo.leftLevel = 'LV3'
        this.tInfo.level = 'LV4'
        this.tInfo.rightLevel = 'LV5'
        this.tInfo.status = teamProformance < this.teamLevels[3].value ? this.$t('l.l_unfinished') : this.$t('l.l_completed')
      }else if (level == this.teamLevels[4].level){
        this.tInfo.needTeamProfor = this.teamLevels[4].value
        this.tInfo.enjoyRatio = this.teamLevels[4].ratio
        this.tInfo.leftLevel = 'LV4'
        this.tInfo.level = 'LV5'
        this.tInfo.rightLevel = 'LV6'
        this.tInfo.status = teamProformance < this.teamLevels[4].value ? this.$t('l.l_unfinished') : this.$t('l.l_completed')
      }else if (level == this.teamLevels[5].level){
        this.tInfo.needTeamProfor = this.teamLevels[5].value
        this.tInfo.enjoyRatio = this.teamLevels[5].ratio
        this.tInfo.leftLevel = 'LV5'
        this.tInfo.level = 'LV6'
        this.tInfo.rightLevel = 'LV7'
        this.tInfo.status = teamProformance < this.teamLevels[5].value ? this.$t('l.l_unfinished') : this.$t('l.l_completed')
      }else if (level == this.teamLevels[6].level){
        this.tInfo.needTeamProfor = this.teamLevels[6].value
        this.tInfo.enjoyRatio = this.teamLevels[6].ratio
        this.tInfo.leftLevel = 'LV6'
        this.tInfo.level = 'LV7'
        this.tInfo.rightLevel = null
        this.tInfo.status = teamProformance < this.teamLevels[6].value ? this.$t('l.l_unfinished') : this.$t('l.l_completed')
      }
    },
    async getIncomeData(){
      let _self = this
      new Promise((resolve) => {
          Wallet.incomeAccount(_self.walletAddress,(res)=>{
             resolve(res)
          })
      })
    },
    handleCopyLink() {

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
    removeInfo(){
      this.tInfo.teamPeople = 0
    },
  },
  async mounted() {
      let _self = this
      _self.tInfo.status = this.$t('l.l_unfinished');

      if(!this.isMain){ 
          _self.$message.warning(_self.$t('l.notmainnet_tips'));
          return;
      }
      _self.checkUserInfo()
      setTimeout(async ()=>{

         const res = await _self.team.getCoinsPrice();
        res.forEach((ele,index) => {
          _self.team.currencyInfos[index].price = (+ele || 1)
        })
        if(!_self.walletAddress) return
         _self.removeInfo() //清除信息
         _self.team.teamLoading = true
         await _self.team.searchNode(_self.walletAddress,() => {
            //更新信息
            _self.tInfo = Object.assign({},_self.team)
            _self.currentTeam.teamProformance = _self.tInfo.teamProformance;
            _self.currentTeam.teamPeople = _self.tInfo.teamPeople;
            _self.currentTeam.teamProfit = _self.tInfo.teamProfit;
         });
      },500);
      const res = await _self.getIncomeData()
      if(res){
          const {
            total,  //总收益
            takeout, //总取出
            todayDividend,//今日分红
            todayShareAmount,//今日分享收益
            todayGlobalAmount//今日全球算力
                } = res
          _self.tInfo.totalProfit = (total || 0)/Wallet.Precisions()
          _self.tInfo.todayProfit = ((+todayDividend || 0) + (+todayShareAmount || 0) + (+todayGlobalAmount || 0))/Wallet.Precisions()
      }

  },
  beforeDestroy(){
    this.removeInfo()
  },
  destroyed() {
  }
}
</script>

<style scoped lang="less">
.team-wrap {
  width: 100%;
}
.team-amount {
  display: flex;
  align-items: center;
  margin: 0px auto;
  max-width: 1200px;
  width: 100%;
  border-radius: 20px;
  background: #43318C;
  height: 126px;
  position: relative;
  overflow: hidden;
}
.team-icon {
  width:64px;
  height: 48px;
  position: absolute;
  bottom:-21px;
  left:50%;
  transform: translateX(-50%);
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
  height: 3px;
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
  font-weight: 500;
  flex: 1;
}
.level-desc span:nth-child(2) {
  color: #9c9c9c;
  font-size: 14px;
  flex: 1;
  margin-right: 0px;
  text-align: right;
}
/deep/.ant-input {
    background-color: #f1f1f1;
    border: 1px solid transparent;
    border-radius: 4px;
}
/deep/.ant-btn {
    background-color: #f1f1f1;
    border: 1px solid transparent;
    border-color: transparent;
}
/deep/.ant-btn-primary {
    color: #43318C;
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
   width: 32px;
   height: 32px;
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
  text-align: center;
  color: #000;
}
.invite-btn {
  margin-top: 24px;
  width: 148px;
  height: 40px;
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
  text-align: center;
}
.info-item .svg-icon {
  width: 32px;
  height: 32px;
}
.info-item span:nth-of-type(1) {
  color: #9c9c9c;
  font-size: 14px;
  margin: 10px 0px 1px 0px;
}
.info-item span:nth-of-type(2) {
  color: #000;
  font-size: 16px;
}

@media (max-width: 768px) {
  .team-amount,.team-level {
    border-radius: 0px;
  }
  .team-info {
    margin-top:15px;
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