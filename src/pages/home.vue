<template>
  <div class="home_wrap">
    <div class="top_banner_wrap white">
      <img class="banner_img" :src="$store.state.accounts.isMobile ? ($i18n.locale == 'zh-CN' ? zh_banner_mobile : en_banner_mobile ) : ($i18n.locale == 'zh-CN' ? zh_banner_pc : en_banner_pc)" alt="">
    </div>
    <ul class="home_ul">
      <div id="homeDate">
        <table id="PCTable">
          <tr>
            <th>{{$t('l.home_n1')}}</th>
            <th>{{$t('l.home_n2')}}</th>
            <th>{{$t('l.home_n3')}}</th>
          </tr>
          <tr>
            <td>
              <countTo :endVal='tvl/1' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
            </td>
            <td>
              <countTo :endVal='dopPrice/1' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
            </td>
            <td>
              <countTo :endVal='wfcPrice/1' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
            </td>
          </tr>
        </table>
        <table id="mobileTable">
          <tr>
            <th>{{$t('l.home_n1')}}</th>
            <td>
              <countTo :endVal='tvl/1' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
            </td>
          </tr>
          <tr>
            <th>{{$t('l.home_n2')}}</th>
            <td>
              <countTo :endVal='dopPrice/1' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
            </td>
          </tr>
          <tr>
            <th>{{$t('l.home_n3')}}</th>
            <td>
              <countTo :endVal='wfcPrice/1' :duration='1000' :decimals="2" suffix="" prefix="$"></countTo>
            </td>
          </tr>
        </table>
      </div>
    </ul>
    <ul class="valut_info_wrap">
      <li class="valut_info_item">
        <div><img class="jss90" src="../assets/home_icon1.svg" alt=""></div>
        <div class="jss89">{{$t('l.home_icon1_text')}}</div>
      </li>
      <li class="valut_info_item">
        <div><img class="jss90" src="../assets/home_icon2.svg" alt=""></div>
        <div class="jss89">{{$t('l.home_icon2_text')}}</div>
      </li>
      <li class="valut_info_item">
        <div><img class="jss90" src="../assets/home_icon3.svg" alt=""></div>
        <div class="jss89">{{$t('l.home_icon3_text')}}</div>
      </li>
      <li class="valut_info_item">
        <div><img class="jss90" src="../assets/home_icon4.svg" alt=""></div>
        <div class="jss89">{{$t('l.home_icon4_text')}}</div>
      </li>
    </ul>
    <div class="jss107">
      <div class="jss108 jss109">
        <div class="jss110">
          <div class="jss111">
            <p class="jss112">{{$t('l.home_t1')}}</p>
            <p class="jss113" @click="handleToMore(1)">
              <span class="jss114">{{$t("l.home_seemore")}}</span>
              <img src="../assets/icon-more.svg" alt="">
            </p>
          </div>
          <div class="jss115">
            <div class="jss117" v-for="(item,index) in dataListsDB" :key="index">
              <div class="jss118">
                <img class="jss119" :src="'./static/token_icons/'+item.logo_url" alt="">
                <span class="jss121">{{item.tokenName}}</span>
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
              <img src="../assets/icon-more.svg" alt="">
            </p>
          </div>
          <div class="jss115">
            <div class="jss117" v-for="(item,index) in dataListsLP" :key="index">
              <div class="jss118">
                <img class="jss119 jss120" :src="'./static/token_icons/'+item.logo_url" alt="">
                <img class="jss119 jss120 jss_img2" :src="'./static/token_icons/'+item.logo_url2" alt="">
                <span class="jss121 jss122">{{item.tokenName}}</span>
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
    <div class="parter_wrap">
      <p class="p_title">{{$t('l.partner')}}</p>
      <ul class="parter_logo">
        <li class="p_item"><img src="../assets/dapp4.svg" alt="bit"></li>
        <li class="p_item"><img src="../assets/dapp5.svg" alt="bit"></li>
        <li class="p_item"><img src="../assets/dapp6.svg" alt="bit"></li>
      </ul>
    </div>
    <div class="parter_wrap2">
      <p class="p_title">{{$t('l.sjjg')}}</p>
      <ul class="parter_logo">
        <a :href="$t('https://attest.im/attestation/searchResult?qurey=18f53a9bb3a54906b416c8ff67dd94ab')" target="_black"><img class="sjjg" src="../assets/lskj.jpg"></a>
      </ul>
    </div>
  </div>
</template>

<script>
const zh_banner_pc = require('../assets/top_banner_zh_pc.svg')
const zh_banner_mobile = require('../assets/top_banner_zh_mobile.svg')
const en_banner_pc = require('../assets/top_banner_en_pc.svg')
const en_banner_mobile = require('../assets/top_banner_en_mobile.svg')
import countTo from 'vue-count-to';
import { mapGetters } from 'vuex';
// import address from '../contracts/addresses.json'
// import priceOracleJSON from '../contracts/priceOracle.json'
import { ethers } from 'ethers';
import Web3 from 'web3'
export default {
  components: {
    countTo
  },
  computed: {
  },
  data() {
    return {
      zh_banner_pc,
      zh_banner_mobile,
      en_banner_pc,
      en_banner_mobile,
      dataListsDB: [],
      dataListsLP: [],
      address,
      priceOracleAbi:null,// priceOracleJSON.abi,
      tvl: 0,
      dopPrice: 0,
      wfcPrice: 0,
      getDataInterVal: null
    }
  },
  methods: {
    handleToMore(index) {
      this.$router.push({path: '/farm',query: {ptype: index}})
    },
  },
  mounted() {
    // this.getPoolsData()
  },
  destroyed() {
    clearInterval(this.getDataInterVal)
  }
}
</script>

<style scoped>
  .top_banner_wrap {
    background: rgba(255,255,255,0.60);
    border: 1px solid #fff;
    border-radius: 16px;
    max-width: 1200px;
    margin: 20px auto;
    height: 240px;
    overflow: hidden;
  }
  .white{
    background-color: white;
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
    height: 60px;
    display: flex;
    line-height: 60px;
    border-bottom: 1px solid #EDEFF2;
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
    color: #8391A8;
    font-size: 12px;
    font-weight: 400;
  }
  .jss113 img {
    width: 10px;
    margin-left: 4px;
  }
  .jss115 {
    padding: 20px 0 3px;
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
    margin-left: -15px;
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
    color: rgba(53, 154, 108);
    border: 1px solid;
    cursor: pointer;
    height: 32px;
    padding: 0 14px;
    font-size: 14px;
    min-width: 96px;
    background: #FFF;
    font-weight: 700;
    border-color: rgba(53, 154, 108);
    border-radius: 22px;
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
    margin-bottom: 16px;
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
    background: linear-gradient(-45deg,#98e0dc,#f4f7fa);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 21px 32px;
    color: #131D32;
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
    .top_banner_wrap {
      margin: 20px 15px 20px;
      height: 160px;
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
    .jss108 {
      margin: 20px 15px;
      width: 100%;
      padding-left: 0;
    }
    .jss109 {
      padding-right: 0;
    }
    .jss110 {
      padding: 0 20px;
    }
    .jss111 {
      height: 42px;
      line-height: 42px;
    }
    .jss112 {
      font-size: 14px;
    }
    .jss113 img {
      display: none;
    }
    .jss115 {
      padding: 16px 0 2px;
    }
    .jss117 {
      width: 100%;
      margin-bottom: 16px;
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
      color: rgba(53, 154, 108);
      border: none;
      height: 32px;
      padding: 0 12px;
      font-size: 12px;
      min-width: 70px;
      font-weight: 700;
      border-radius: 22px;
      background-color: rgba(48,120,255,0.1);
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
      padding: 16px 9%;
      border-radius: 24px;
      margin: 0 15px 0;
    }
    #homeDate td {
      font-size: 20px;
      font-weight: bolder;
    }
    #homeDate th {
      text-align: center;
    }
    #PCTable {
      display: none;
    }
    #mobileTable {
      display: block;
    }
  }
</style>