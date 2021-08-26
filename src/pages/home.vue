<template>
  <div class="home_wrap">
    <div class="home-info">
      <div class="top_banner_wrap">
        <svg-icon icon-class="logo_bg_img" v-show="!$store.state.accounts.isMobile" class="logo_bg" />
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
              <!-- <th>{{$t('l.home_n2')}}</th> -->
              <th>{{$t('l.home_n3')}}</th>
            </tr>
            <tr>
              <td>
                <countTo :endVal='totalLock' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
              </td>
              <!-- <td>
                <countTo :endVal='20000' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
              </td> -->
              <td>
                <countTo :endVal='coinPrice' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
              </td>
            </tr>
          </table>
          <table id="mobileTable">
            <tr>
              <th class="lightColor">{{$t('l.home_n1')}}</th>
              <td>
                <countTo :endVal='totalLock' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
              </td>
            </tr>
            <!-- <tr>
              <th class="lightColor">{{$t('l.home_n2')}}</th>
              <td>
                <countTo :endVal='50000' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
              </td>
            </tr> -->
            <tr>
              <th class="lightColor">{{$t('l.home_n3')}}</th>
              <td>
                <countTo :endVal='coinPrice' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
              </td>
            </tr>
          </table>
        </div>
      </ul>
      <svg-icon icon-class="logo_bg_img" v-show="$store.state.accounts.isMobile" class="logo_bg" />
    </div>
    <div class="jss107">
      <div class="jss108 jss109">
        <div class="jss110">
          <div class="jss111">
            <p class="jss112">{{$t('l.home_t1')}}</p>
            <p class="jss113" @click="handleToMore(1)">
              <span class="jss114">{{$t("l.home_seemore")}}</span>
            </p>
          </div>
          <div class="jss115" v-for="(item,index) in oneTokens" :key="index">
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
      </div>
      <div class="jss108">
        <div class="jss110">
          <div class="jss111">
            <p class="jss112">{{$t('l.home_t2')}}</p>
            <p class="jss113">
              <span class="jss114" @click="handleToMore(2)">{{$t('l.home_seemore')}}</span>
            </p>
          </div>
          <div class="jss115" v-for="(item,index) in twoTokens" :key="index">
            <div class="jss117">
              <div class="jss118">
                <svg-icon class="jss119 jss120" :icon-class="item.currency1 + '_coin'"  />
                <svg-icon class="jss119 jss120 jss_img2" :icon-class="item.currency2 + '_coin'" />
                <span class="jss121 jss122">{{item.currency1 + '/' + item.currency2}}</span>
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
    </div>
  </div>
</template>

<script>
import Wallet from '@/utils/Wallet.js';
import countTo from 'vue-count-to';
export default {
  components: {
    countTo
  },
  computed: {
  },
  data() {
    return {
      currentHref: window.location.origin+window.location.pathname,
      totalLock:0,
      coinPrice:0,
      walletAddress:'',
      oneTokens:[
        {
          currency:"ETH",
          rateOfAnnualized:12.1101,
          lockAmount:0,
          totalLockAmount:0,
          isApproved:false,
          isLoading:true,
        },
        {
          currency:"BNB",
          rateOfAnnualized:22.22,
          lockAmount:0,
          totalLockAmount:0,
          isApproved:false,
          isLoading:true,
        },
        {
          currency:"BTC",
          rateOfAnnualized:33.33,
          lockAmount:0,
          totalLockAmount:0,
          isApproved:false,
          isLoading:true,
        },
        {
          currency:"USDT",
          rateOfAnnualized:44.44,
          lockAmount:0,
          totalLockAmount:0,
          isApproved:false,
          isLoading:true,
        },
      ],
      twoTokens:[
        {
          currency1:"Libra",
          currency2:"ETH",
          rateOfAnnualized:12.1101,
          lockAmount1:0,
          lockAmount2:0,
          totalLockAmount1:0,
          totalLockAmount2:0,
          isApproved:false,
          isLoading:true,
        },
        {
          currency1:"Libra",
          currency2:"BNB",
          rateOfAnnualized:22.22,
          lockAmount1:0,
          lockAmount2:0,
          totalLockAmount1:0,
          totalLockAmount2:0,
          isApproved:false,
          isLoading:true,
        },
        {
          currency1:"Libra",
          currency2:"USDT",
          rateOfAnnualized:33.33,
          lockAmount1:0,
          lockAmount2:0,
          totalLockAmount1:0,
          totalLockAmount2:0,
          isApproved:false,
          isLoading:true,
        },
        {
          currency1:"Libra",
          currency2:"BTC",
          rateOfAnnualized:44.44,
          lockAmount1:0,
          lockAmount2:0,
          totalLockAmount1:0,
          totalLockAmount2:0,
          isApproved:false,
          isLoading:true,
        },
        {
          currency1:"Libra",
          currency2:"FIL",
          rateOfAnnualized:55.55,
          lockAmount1:0,
          lockAmount2:0,
          totalLockAmount1:0,
          totalLockAmount2:0,
          isApproved:false,
          isLoading:true,
        }
      ],
      coins:[
        {key:1,coin:'Libra',price:1,lockAmount:0},
        {key:2,coin:'BTC',price:1,lockAmount:0},
        {key:3,coin:'ETH',price:1,lockAmount:0},
        {key:4,coin:'USDT',price:1,lockAmount:0},
        {key:5,coin:'BNB',price:1,lockAmount:0},
        {key:6,coin:'FIL',price:1,lockAmount:0},
      ]
    }
  },
  methods: {
    handleToMore(index) {
      this.$router.push({path: '/farm',query: {ptype: index}})
    },
    //计算总锁仓
    async getPlatformLockAmount(){
      let _self = this
      return new Promise((resolve,reject) => {
        try {
            let promiseAllarr = []
            for(let i = 0; i < _self.coins.length;i++){
              console.log(i)
              promiseAllarr[i] = new Promise((res1,rej1) => {
                    Wallet.totalUseableBalance(_self.coins[i].coin,(in_a)=>{
                      let val = +in_a
                      in_a > 0 && (val = Number(in_a / Wallet.Precisions()))
                      val < -0.01 && (val = 0)
                      res1(val)
                    },(err) =>{rej1(err)})
                  })
            }
            //全部请求
            Promise.all(promiseAllarr).then((res) => {
              resolve(res)
            }).catch(err => {
              reject(err)
            })
        }catch(err){
            reject(err)
            _self.$message.error(_self.$t('l.catch_err'))
        }
      })
    },
    async getLockAmount(){
     const amounts = await this.getPlatformLockAmount()
     console.log({amounts})
     if(amounts){
       for(let i = 0, len = this.coins.length; i < len; i++){
          this.coins[i].lockAmount = amounts[i]
       }
       this.calculateTeamPerformance()
     }
    },
   async calculateTeamPerformance(){
      let _self = this;
      if(_self.coins[1].price < 3){
         const res = await _self.getCoinsPrice();
         //更新价格
         res.forEach((ele,index) => {
           _self.coins[index].price = (+ele || 1)
         })
      }
      var totala = 0;
      for(let i = 0,len = _self.coins.length; i < len; i++){
        let item = _self.coins[i]
        totala += item.price * item.lockAmount
      }
      _self.totalLock = totala
      
    },
    async getCoinsPrice(){
      let _self = this
      let promiseCoinRequestArray = this.coins.map(ele => {
          return new Promise((resolve,reject) => {
               Wallet.queryPrice(ele.coin.toLowerCase(),(res)=>{
                  resolve(Number(res? res : 1))
               },err => reject(err))
          })
      })
      return Promise.all(promiseCoinRequestArray)
    },
    async getPairPrice(){
        let _self = this
        Wallet.queryPrice('libra',(res)=>{
          _self.coinPrice = +(res || 1)
        },err => {})
    },
  },
  async mounted() {
      let _self = this
      _self.walletAddress = localStorage.getItem("walletAddress") || '';
      let inviteAddress = _self.$route.query.address
      if(inviteAddress && inviteAddress.length > 0) {_self.$setCookie('inviteAddress',inviteAddress,30 * 24 * 60 * 60)}
      _self.inviteAddress = _self.$getCookie('inviteAddress')
      _self.getPairPrice()
      _self.getLockAmount()
      _self.getCoinsPrice()

  },
  destroyed() {
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
    width: 50%;
    float: left;
  }
  #mobileTable tr:nth-child(3) {
    width: 50%;
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