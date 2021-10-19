<template>
  <div class="home_wrap">
    <div class="home-info">
      <div class="top_banner_wrap">
        <svg-icon icon-class="logo_bg_img" v-show="!isMoible" class="logo_bg" />
        <ul class="top_info" style="list-style:none;">
          <li>{{$t('l.t_home1')}}</li>
          <li>{{$t('l.t_home2')}}</li>
          <li>{{$t('l.t_home3')}}</li>
        </ul>
      </div>
      <ul class="home_ul">
        <div id="homeDate">
          <table id="PCTable">
            <tr class="lightColor">
              <th>{{$t('l.home_n1')}}</th>
              <th>{{$t('l.home_n3')}}</th>
              <th>{{$t('l.home_n2')}}</th>
              <th>{{$t('l.home_n4')}}</th>
            </tr>
            <tr>
              <td>
                <countTo :endVal='statistic.totalLock' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
              </td>
              <td>
                <countTo :endVal='coinPrice' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
              </td>
              <td>
                <countTo :endVal='statistic.destroyedAmount*coinPrice' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
              </td>
              <td>
                <countTo :endVal='statistic.feeAmount' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
              </td>
            </tr>
          </table>
          <table id="mobileTable">
            <tr>
              <th class="lightColor">{{$t('l.home_n1')}}</th>
              <td>
                <countTo :endVal='statistic.totalLock' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
              </td>
            </tr>
            <tr>
              <th class="lightColor">{{$t('l.home_n3')}}</th>
              <td>
                <countTo :endVal='coinPrice' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
              </td>
            </tr>
            <tr>
              <th class="lightColor">{{$t('l.home_n2')}}</th>
              <td>
                <countTo :endVal='statistic.destroyedAmount*coinPrice' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
              </td>
            </tr>
            <tr>
              <th class="lightColor">{{$t('l.home_n4')}}</th>
              <td>
                <countTo :endVal='statistic.feeAmount' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
              </td>
            </tr>
          </table>
        </div>
      </ul>
      <svg-icon icon-class="logo_bg_img" v-show="isMoible" class="logo_bg" />
    </div>
    <div class="jss107">
      <div class="jss108">
        <div class="jss110">
          <div class="jss111">
            <p class="jss112">{{$t('l.home_t2')}}</p>
            <p class="jss113">
              <span class="jss114" @click="handleToMore(2)">{{$t('l.home_seemore')}}</span>
            </p>
          </div>
          <div class="jss115" v-for="(item,index) in twos" :key="index">
            <div class="jss117">
              <div class="jss118">
                <svg-icon class="jss119 jss120" :icon-class="item.currency1 + '_coin'"  />
                <svg-icon class="jss119 jss120 jss_img2" :icon-class="item.currency2 + '_coin'" />
                <span class="jss121 jss122">{{item.currencyC1 + '/' + item.currency2}}</span>
              </div>
              <div class="jss125">
                <div>
                  <button class="MuiButtonBase-root MuiButton-root MuiButton-text jss73 jss126" tabindex="0" type="button">
                    <span class="MuiButton-label" @click="handleToMore(2)">{{$t('l.mining')}}</span>
                    <span class="MuiTouchRipple-root"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <!-- <div class="jss108 jss109">
        <div class="jss110">
          <div class="jss111">
            <p class="jss112">{{$t('l.home_t1')}}</p>
            <p class="jss113" @click="handleToMore(1)">
              <span class="jss114">{{$t("l.home_seemore")}}</span>
            </p>
          </div>
          <div class="jss115" v-for="(item,index) in ones" :key="index">
            <div class="jss117">
              <div class="jss118">
                <svg-icon class="jss119" :icon-class="item.currency + '_coin'" alt="" />
                <span class="jss121">{{item.currency}}</span>
              </div>
              <div class="jss125">
                <div>
                  <button class="MuiButtonBase-root MuiButton-root MuiButton-text jss73 jss126" tabindex="0" type="button">
                    <span class="MuiButton-label" @click="handleToMore(1)">{{$t("l.mining")}}</span>
                    <span class="MuiTouchRipple-root"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="load-sepical" v-if="isMoible" @click="loadMore">
        <a-spin :spinning="isMoreLoading">
          <div class="load-text">{{loadText}}</div>
        </a-spin>
      </div>

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Wallet from '@/utils/Wallet.js';
import countTo from 'vue-count-to';
import Farms from '@/models/farms';
import Statistic from '@/models/statistic';
import UserActivateMixin from '../mixin/UserActivateMixin'
export default {
  components: {
    countTo
  },
  computed: {
    ...mapGetters('accounts',{walletAddress:'getActiveAccount',isMain:'getIsMainChainID',isMoible:'getIsMobile'}),
  },
	mixins: [UserActivateMixin],
  data() {
    return {
      currentHref: window.location.origin+window.location.pathname,
      totalLock:0,
      coinPrice:0,
      ones:[],
      twos:[],
      homeTokens:new Farms(),
      statistic:new Statistic(),
      canLoadMore: true,
      loadText:this.$t('l.t_loadMore'),
      isMoreLoading:false,
    }
  },
  methods: {
    handleToMore(index) {
      this.$router.push({path: '/farm',query: {ptype: index}})
    },
    async getLockAmount(){
      let _self = this
      if(!_self.walletAddress || _self.walletAddress.length < 10){
          _self.$message.warning(_self.$t('l.error_tips_unconnect'))
          return
      }
      const amounts = await _self.statistic.getPlatformLockAmount()
      console.log({amounts})
      if(amounts){
        for(let i = 0, len = _self.statistic.coins.length; i < len; i++){
            _self.statistic.coins[i].amount = amounts[i]
        }
        _self.statistic.calculateStatisticData()
      }
    },
    async getPairPrice(){
        let _self = this
        Wallet.queryPrice('libra',(res)=>{
          _self.coinPrice = +(res || 1)
        },err => {})
    },
    handleScroll(){
      //距离顶部距离
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      //可视高度
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      //滚动条总高
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条底部的条件
      if(scrollTop + windowHeight >= scrollHeight && this.canLoadMore){
        this.isMoreLoading = true
        this.canLoadMore = false
        this.loadData()
      }
    },
    loadMore(){
        if(this.canLoadMore){
          this.canLoadMore = false
          this.isMoreLoading = true
          this.loadData()
        }
    },
    async loadData(){
        let _self = this
        const res = await _self.homeTokens.getTokens()
        if(_self.isMoible){
          if(_self.isMoreLoading){
            _self.isMoreLoading = false
            _self.loadText = _self.$t('l.t_isbottom')
            _self.ones = res[0]
            _self.twos = res[1]
          }else {
            _self.ones = res[0].slice(0,6)
            _self.twos = res[1].slice(0,6)
          }
        }else{
            _self.ones = res[0]
            _self.twos = res[1]
        }
    }
  },
  async mounted() {
      let _self = this
      window.addEventListener('scroll',_self.handleScroll)
      _self.loadText = this.$t('l.t_loadMore')
      _self.loadData()
      if(!_self.isMain){ 
        _self.$message.warning(_self.$t('l.notmainnet_tips'));
        return;
      }
      _self.checkUserInfo()
      _self.statistic.getCoinsPrice()
      _self.getPairPrice()
      _self.getLockAmount()
  },
  destroyed() {
    window.removeEventListener('scroll',this.handleScroll)
  }
}
</script>

<style scoped>
  .top_banner_wrap {
    background: #4C3B92;
    border: 1px solid #43318C;
    border-radius: 16px;
    max-width: 1200px;
    margin: 20px auto;
    height: 240px;
    overflow: hidden;
    color: rgba(255, 255, 255, 0.7);
    font-size: 20px;
    padding: 30px 60px;
    position: relative;
  }
  .home-info {
    position: relative;
    overflow: hidden;
  }
  .logo_bg {
    z-index: 0;
    position:absolute;
    bottom: 0;
    right: -40px;
    width: 153px;
    height: 139px;
  }
  .top_info {
    list-style: none;
    padding: 30px 60px;
  }
  .top_banner-wrap li {
    list-style: none;
  }
  .banner_img {
    width: 100%;
    max-height: 240px;
  }
  .valut_info_wrap {
    background: hsla(0,0%,100%,.7);
    border: 1px solid #fff;
    border-radius: 8px;
    max-width: 1200px;
    margin: 20px auto 0;
    display: flex;
    color: #3078ff;
    list-style: none;
  }
  .valut_info_item {
    flex: 1 1;
    text-align: center;
    padding: 20px 0;
  }
  .valut_info_item div:first-child {
    font-size: 14px;
    color: #8391a8;
    margin-bottom: 10px;
    font-family: MicrosoftYaHei-Bold;
    text-align: center;
    line-height: 22px;
    font-weight: 700;
    display: flex;
    justify-content: center;
  }
  .valut_info_item div:last-child {
    font-size: 18px;
    font-weight: 700;
    font-family: bolder;
  }
  .jss89 {
    color: #666666;
    font-size: 16px;
    margin-top: 16px;
    font-weight: 500;
  }
  .jss90 {
    width: auto;
    height: 48px;
    display: block;
  }
  .jss107 {
    max-width: 1200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 22px auto 20px;
  }
  .jss108 {
    width: 50%;
    box-sizing: border-box;
    padding-left: 10px;
  }
  .jss109 {
    width: 50%;
    padding-left: 0;
    padding-right: 10px;
  }
  .jss110 {
    width: 100%;
    border: 1px solid #FFFFFF;
    height: 100%;
    padding: 0 40px;
    background: rgba(255,255,255,0.80);
    box-sizing: border-box;
    border-radius: 16px;
  }
  .jss111 {
    padding-top: 24px;
    display: flex;
    justify-content: space-between;
  }
  .jss112 {
    color: #131D32;
    font-size: 18px;
    font-weight: 700;
  }
  .jss113 {
    cursor: pointer;
  }
  .jss114 {
    color: #3C3C3C;
    font-size: 12px;
    font-weight: 400;
  }
  .jss113 .svg-icon {
    width: 10px;
    margin-left: 4px;
  }
  .jss115 {
    padding: 24px 0px 0px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .jss117 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .jss118 {
    display: flex;
    min-width: 100px;
    align-items: center;
  }
  .jss119 {
    width: 32px;
    height: 32px;
    margin-right: 12px;
    border-radius: 50%;
  }
  .jss120 {
    margin-right: 5px;
  }
  .jss_img2 {
    margin-left: -18px;
  }
  .jss121 {
    color: #131D32;
    font-size: 20px;
    font-family: DINPro-Bold;
    font-weight: 700;
  }
  .jss122 {
    margin-left: 2px;
  }
  .jss125 {
    display: flex;
    align-items: center;
  }
  .jss123 {
    color: #C5C9D5;
    display: flex;
    font-size: 12px;
    align-items: center;
    font-family: MicrosoftYaHei;
    font-weight: 400;
  }
  .jss123 span {
    color: #00B595;
    display: block;
    font-size: 20px;
    min-width: 80px;
    text-align: right;
    font-family: DINPro-Bold;
    font-weight: 700;
    margin-left: 20px;
  }
  .project__apy {
    margin-right: 52px;
  }
  .MuiButton-text {
    padding: 6px 8px;
  }
  .MuiButton-root {
    color: rgba(0, 0, 0, 0.87);
    padding: 6px 16px;
    font-size: 0.875rem;
    min-width: 64px;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.75;
    border-radius: 4px;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
  }
  .MuiButtonBase-root {
    color: inherit;
    border: 0;
    cursor: pointer;
    margin: 0;
    display: inline-flex;
    outline: 0;
    padding: 0;
    position: relative;
    align-items: center;
    user-select: none;
    border-radius: 0;
    vertical-align: middle;
    -moz-appearance: none;
    justify-content: center;
    text-decoration: none;
    background-color: transparent;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }
  .jss126 {
    color: #43318C;
    cursor: pointer;
    height: 32px;
    padding: 0 14px;
    font-size: 14px;
    min-width: 96px;
    background: rgba(67, 49, 140, 0.1);
    font-weight: 700;
    border-radius: 4px;
  }
  .jss126 .MuiButton-label {
    font-size: 14px;
    font-family: DINPro-Bold;
  }
  .MuiButton-label {
    width: 100%;
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
  }
  .MuiTouchRipple-root {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    overflow: hidden;
    position: absolute;
    border-radius: inherit;
    pointer-events: none;
  }
  .parter_wrap {
    max-width: 1200px;
    padding-top: 72px;
    box-sizing: border-box;
    list-style: none;
    border-radius: 32px;
    margin: 16px auto 0;
    text-align: center;
  }
  .parter_wrap2 {
    max-width: 1200px;
    box-sizing: border-box;
    list-style: none;
    border-radius: 32px;
    margin: 16px auto 0;
    padding-bottom: 16px;
    text-align: center;
  }

  .parter_logo {
    max-width: 1200px;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  .sjjg {
    width: 120px;
    opacity: 0.3;
    transition: 0.3s;
    cursor: pointer;
  }

  .sjjg:hover {
    opacity: 0.8;
  }

  .p_item {
    width: 16.666666667%;
    padding-bottom: 30px;
  }

  .p_item img {
    width: 80%;
    margin: 0 auto;
    display: block;
  }

  .p_item:nth-of-type(1) img {
    width: 90%;
  }

  .p_item:nth-of-type(2) img {
    width: 66%;
  }

  .p_item:nth-of-type(4) img {
    width: 90%;
  }

  .p_item:nth-of-type(5) img {
    width: 60%;
  }

  .p_item:nth-of-type(6) img {
    width: 64%;
  }

  .p_title {
    display: inline-block;
    color: #52007A;
    font-size: 20px;
    text-align: center;
    font-weight: 700;
    line-height: 20px;
    margin-bottom: 28px !important;
    position: relative;
  }

  .p_title::before {
    content: '';
    display: block;
    width: 80px;
    height: 2px;
    position: absolute;
    top: 9px;
    left: -90px;
    background-color: #E7E4FB;
  }

  .p_title::after {
    content: '';
    display: block;
    width: 80px;
    height: 2px;
    position: absolute;
    top: 9px;
    right: -90px;
    background-color: #E7E4FB;
  }
  .home_ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    justify-content: center;
  }
  #homeDate table {
    width: 100%;
  }
  #mobileTable {
    display: none;
    overflow: hidden;
  }
  #mobileTable tr {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 10px;
  }
  #mobileTable tr:first-child {
    width: 100%;
  }
  #mobileTable tr:nth-child(2) {
    width: 33%;
    float: left;
  }
  #mobileTable tr:nth-child(3) {
    width: 33%;
    float: left;
  }
  #mobileTable tr:last-child {
    margin-bottom: 0;
  }
  #homeDate {
    width: 100%;
    max-width: 1200px;
    flex-wrap: wrap;
    background: #4C3B92;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 21px 32px;
    color: white;
  }
  .lightColor {
    color: rgba(255, 255, 255, 0.7);
  }
  #homeDate table {
    table-layout: fixed;
  }
  table th {
    font-weight: 400;
  }
  #homeDate th {
    table-layout: fixed;
    width: 100%;
    text-align: center;
    font-size: 14px;
  }
  #homeDate td {
    font-size: 24px;
    word-wrap: break-word;
    text-align: center;
    font-weight: bolder;
  }
  @media (max-width: 768px) {
    
    .home-info {
      margin-top: 0px;
    }
    .top_banner_wrap {
      margin: 0px;
      padding: 24px;
      height: 100px;
      font-size: 12px;
      border-radius: 0px;
      border: none;
    }
    .top_info {
      padding: 0px 0px;
    }
    .banner_img {
      max-height: 160px;
    }
    .valut_info_wrap {
      flex-wrap: wrap;
      margin: 20px 15px 0;
    }
    .valut_info_item {
      padding: 16px 0;
      flex: auto;
      width: 50%;
      box-sizing: border-box;
      flex-shrink: 0;
    }
    .valut_info_item div:last-child {
      font-size: 14px;
    }
    .jss107 {
       margin: 0px;
    }
    .jss108 {
      margin: 0px;
      width: 100%;
      padding-left: 0;
    }
    .jss108 + .jss108 {
      margin-top: 0px;
    }
    .jss109 {
      padding-right: 0;
    }
    .jss110 {
      padding: 24px;
      border-radius: 0px;
      border-bottom: solid 1px #f5f5f5;
    }
    .jss111 {
      padding-top: 0px;
    }
    .jss112 {
      color: #43318C;
      font-size: 16px;
    }
    .jss113 img {
      display: none;
    }
    .jss115 {
      padding: 16px 0 2px;
    }
    .jss117 {
      width: 100%;
      margin-bottom: 0px;
    }

    .load-sepical {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .load-text {
      color: #4C3B92;
      text-align: center;
      height: 100%;
      line-height: 100%;
      font-size: 14px;
      margin: 10px auto;
    }
    .jss119 {
      width: 28px;
      height: 28px;
    }
    .jss121 {
      font-size: 16px;
    }
    .jss123 {
      margin-right: 12px;
    }
    .jss123 span {
      margin-left: 0;
    }
    .jss126 {
      color: #43318C;
      border: none;
      height: 32px;
      line-height: 32px;
      min-width:80px;
      padding: 0px;
      font-size: 12px;
      font-weight: 700;
      border-radius: 8px;
      background: #f6f6f6;
    }
    .parter_wrap2 {
      padding-bottom: 0;
    }
    .parter_logo {
      padding: 0 15px;
    }
    .parter_wrap2 a {
      display: block;
      width: 100%;
      text-align: center;
    }
    .sjjg {
      width: 25%;
    }
    .parter_wrap {
      padding-top: 20px;
    }
    .p_title {
      font-size: 14px;
      line-height: 18px;
      margin-bottom: 20px !important;
    }
    .p_item {
      width: 33.3%;
      padding-bottom: 24px;
    }
    #homeDate {
      padding: 0px 24px 16px 24px;
      border-radius: 0px;
      margin: 0 0px 0;
    }
    #homeDate td {
      font-size: 15px;
      font-weight: bolder;
    }
    #homeDate th {
      text-align: left;
    }
    #homeDate tr {
      align-items: flex-start;
    }
    #PCTable {
      display: none;
    }
    #mobileTable {
      display: block;
    }
  }
</style>