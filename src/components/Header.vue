<template>
  <div class="header_wrap">
    <Alert
        v-if="!getIsMainChainID"
        :message="$t('l.notmainnet_title')"
        :description="$t('l.notmainnet_tips')"
        type="warning"
        show-icon
      />
    <div class="header_inner_wrap">

      <div class="left_nav">
        <div class="logo_wrap">
          <img src="../assets/logo.svg" alt="" class="logo">
        </div>
        <ul class="nav_text">
          <li class="nav_item" :class="currentIndex == 1 ? 'clickedNav': ''"><a @click="handleJump('home',1)">{{$t('l.h_n1')}}</a><div class="line"></div></li>
          <li class="nav_item" :class="currentIndex == 5 ? 'clickedNav': ''"><a href="https://www.wfcbsc.com/swap/">{{$t('l.h_n3')}}</a></li>
          <li class="nav_item" :class="currentIndex == 3 ? 'clickedNav': ''"><a @click="handleJump('farm',3)">{{$t('l.h_n4')}}</a><div class="line"></div></li>
          <li class="nav_item" :class="currentIndex == 4 ? 'clickedNav': ''"><a @click="handleJump('dao',4)">{{$t('l.h_n5')}}</a><div class="line"></div></li>
        </ul>
      </div>
      <div class="right_nav">
        <a @touchstart="handleTapStart" @touchend="handleTapEnd" class="c_btn" v-if="!isUserConnected" @click="handleConnectWeb3Modal"><span class="c_btn_text">{{$t('l.cwallet')}}</span></a>
        <a class="h_address" v-if="isUserConnected" @click="disconnectWeb3Modal">{{formatAddress(getActiveAccount)}}</a>
        <a class="lang_change" @click="showLangBox" :class="this.$i18n.locale == 'zh-CN' ? 'en-US' : 'zh-CN'" ><i class="icon"></i>{{this.lanc}}
          <div id="languageBox" v-show="languageShow" >
            <li :class="this.$i18n.locale == 'en-US' ? 'active' : ''" @click.stop.prevent="changeLangType(1)">English</li>
            <li :class="this.$i18n.locale == 'zh-CN' ? 'active' : ''" @click.stop.prevent="changeLangType(2)">简体中文</li>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { Alert } from 'ant-design-vue'
import { mapGetters , mapActions } from 'vuex'
export default {
  components: {
    Alert
  },
  data() {
    return {
      currentIndex: 3,
      languageShow: false,
      lanc:'',
      currentHost: ''
    }
  },
  methods: {
    ...mapActions('accounts',["initWeb3Modal","connectWeb3Modal", "disconnectWeb3Modal"]),
    switchMenu() {
      this.$store.dispatch('accounts/changeMenuStatus')
    },
    showLangBox(){
      this.languageShow = !this.languageShow;
    },
    setLan(){
      if (this.getLangType == 'zh-CN') {
        this.lanc = "简体中文";
      }else if(this.getLangType == 'en-US'){
        this.lanc = "English";
      }
    },
    setCookie(key,value){
        var oDate=new Date();
        oDate.setDate(oDate.getDate()+36000);
        document.cookie=key+"="+value+"; expires="+oDate.toDateString();
    },
    changeLangType(type) {
      console.log(type)
      var llWYf='';
      if (type == 1) {
        this.$i18n.locale = 'en-US';
        this.lanc = "English";
        llWYf = 'en';
      }else if (type == 2) {
        this.$i18n.locale = 'zh-CN';
        this.lanc = "简体中文";
        llWYf = 'zh-CN';
      }
      this.showLangBox();
      // this.$i18n.locale = this.getLangType == 'zh-CN' ? 'en-US' : 'zh-CN'
      this.$store.commit('accounts/setLangType',this.$i18n.locale)
      localStorage.setItem('langType',this.$i18n.locale);
      this.setCookie('pipipSwapLanguage',llWYf);
    },
    handleTapStart(e) {
      e.target.classList.toggle('tap')
    },
    handleTapEnd(e) {
      e.target.classList.toggle('tap')
    },
    async handleConnectWeb3Modal() {
      let result = await this.connectWeb3Modal()
      if(result && result.status == 400) {
        this.$message.warning(this.$t('l.no_metamask_tips'))
      }
    },
    formatAddress(address) {
      if(address !== '' && address !== undefined) {
        let pre = address.slice(0,6)
        let suf = address.slice(-4)
        return  `${pre}...${suf}`
      }else {
        return ''
      }
    },
    getIndex(){
      let str = window.location.href;
      if (str.indexOf("home") != -1 ) {
        this.currentIndex = 1
      }else if (str.indexOf("vault") != -1 ) {
        this.currentIndex = 4
      }else if (str.indexOf("farm") != -1 ) {
        this.currentIndex = 3
      }else if (str.indexOf("dao") != -1) {
        this.currentIndex = 4
      }else if (str.indexOf("nft") != -1) {
        this.currentIndex = 6
      }else if (str.indexOf("ranking") != -1) {
        this.currentIndex = 7
      }else{
        this.currentIndex = 1
      }
    },
    handleJump(path,index) {
      this.currentIndex = index;
      this.$router.push({path: '/'+path})
      this.getIndex();
    }
  },
  computed: {
    ...mapGetters('accounts',["getActiveAccount", "isUserConnected", "getWeb3Modal",'getIsMainChainID','getLangType']),
  },
  mounted() {
    this.currentHost = location.host
    this.getIndex();
    this.setLan();
  },
  created() {
    this.$store.dispatch('accounts/initWeb3Modal');
    this.$store.dispatch('accounts/ethereumListener');
    this.$store.dispatch('contracts/storeERC20Abi');
  },
  watch: {
    '$route'(to) {
      this.currentIndex = to.meta.index
    }
  }
}
</script>

<style scoped>
  .dashedLine{
    width: 100vw;
    border-bottom: 2px dashed #359A6C;
    position: absolute;
    left: 0;
    top: 65px;
  }
  #languageBox{
    margin-top: 12px;
    padding: 20px 0;
    background-color: white;
    border-radius: 10px;
  }
  #languageBox li{
    list-style: none;
    color: black;
    height: 30px;
    line-height: 30px;
  }
  #languageBox li.active {
    color: rgb(81, 204, 197);
  }
  #languageBox li:firstk-child {
    margin-bottom: 24px;
  }
  .clickedNav a{
    color: rgb(53, 154, 108)!important;
    /*font-weight: bold;*/
  }
  .line{
    width: 100%;
    height: 3px;
    background-color: rgb(53, 154, 108);
    position: absolute;
    bottom: -10px;
    display: none;
  }
  .clickedNav .line{
    display: block;
  }
  .icon6{
    display: inline-block;
    width: 16px;
    height: 16px;
    position: relative;
    top: 2px;
    border-radius: 4px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    /* background-image: url(../assets/exIco.svg); */
    position: absolute;
    top: 8px;
    right: 10px;
  }
  .header_wrap {
    /*background-color: rgb(61, 61, 61);*/
    background-color: #fff;
    position: fixed;
    top: 0;left: 0;
    right: 0;
    z-index: 90;
    /*padding: 10px 24px;*/
    padding: 0 24px;
    height: 60px;
  }
  .header_inner_wrap {
    width: 100%;
    margin: 0 auto;
    /*background-color: #282828;*/
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    /*background: rgb(61, 61, 61);*/
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .left_nav {
    display: flex;
    flex-wrap: nowrap;
    margin-right: auto;
    align-items: center;
  }
  .nav_text {
    display: flex;
    flex-wrap: nowrap;
    list-style: none;
  }
  .nav_text .nav_item {
    margin-right: 24px;
    position: relative;
    white-space: nowrap;
  }
  .nav_text .nav_item:hover a {
    color: rgb(81, 204, 197);
  }
  .nav_text a {
    /*color: rgb(127, 134, 143);;*/
    color: black;
  }
  .header_wrap .c_btn {
    height: 44px;
    line-height: 36px;
    padding: 2px;
    /*background: linear-gradient(45deg, #0066FF, #ffffff);*/
    background-color: transparent;
    font-size: 16px;
    color: rgb(68, 62, 62);
    border-radius: 20px;
    text-decoration: none;
    box-sizing: border-box;
  }
  .c_btn_text {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 14px;
    /*background-color: #282828;*/
    border-radius: 20px;
    padding: 0 22px;
    /*border: 2px solid #359A6C;*/
  }
  .header_wrap .c_btn:hover {
    /* background-color: #20C7D3; */
    color: rgb(68, 62, 62);
  }
  .header_wrap .c_btn:active {
    /* background-color: #1AA7B1; */
    color: rgb(68, 62, 62);
    /* border-color: #1AA7B1; */
  }
  .right_nav {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    margin-left: auto;
    flex-direction: row;
    /*margin-top: 10px!important;*/
  }
  .right_nav .c_btn{
    border: 2px solid #359A6C;
    float: right;
    margin-right: 15px;
  }
  .h_address {
    float: right;
    color: #20C7D3;
    font-size: 16px;
    /*background-color: rgba(255,255,255,.3);*/
    /*background-color: #2F2E2D;*/
    /*box-sizing: border-box;*/
    border:2px solid #359A6C;
    color: rgb(68, 62, 62);
    border-radius: 100px;
    height: 44px;
    padding: 0 30px;
    line-height: 40px;
    position: relative;
    margin-right: 10px;
  }
  .menu_icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    margin: 0 0 0 16px;
    cursor: pointer;
    display: none;
    /* background-image: url('../assets/m_menu_icon.svg'); */
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
  }
  .m_logo {
    display: none;
    width: 40px;
    height: 40px;
    margin: 0 0 0 24px;
    vertical-align: middle;
  }
  .logo_wrap {
    overflow: hidden;
    margin-right: 42px;
    width: 37px;
    height: 37px;
  }
  .logo_wrap img {
    width: 100%;
    height: 100%;
  }
  .lang_change {
    height: 44px;
    width: 100px;
    border-radius: 100px;
    line-height: 40px;
    float: right;
    /*display: flex;*/
    text-align: center;
    align-items: center;
    text-decoration: none;
    color: rgb(68, 62, 62);
    font-size: 14px;
    border:2px solid #359A6C;
  }
  .lang_change:hover {
    /*color: rgb(238, 151, 21);;*/
  }
  .lang_change .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    margin: 0 16px 0 24px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    display: none!important;
    /*background-image: url('../assets/lang_icon.svg');*/
  }
  .en-US .icon{
    /* background-image: url('../assets/mg.svg'); */
  }
  .zh-CN .icon{
    /* background-image: url('../assets/zg.svg'); */
  }
  .lang_change:hover .icon {
    display: inline-block;
    width: 22px;
    height: 22px;
    /*background-image: url('../assets/lang_icon_a.svg');*/
  }
  @media (max-width: 768px) {
    .logo_wrap {
      width: 37px;
      height: 37px;
    }
    .h_address {
      float: left;
      max-width: 200px;
      margin: 0 16px 0 auto;
    }
    .header_wrap .c_btn {
      margin: 0 16px 0 auto;
      font-size: 14px;
      float: left;
    }
    .header_inner_wrap {
      height: 100%;
      padding-left: 0;
      display: flex;
      align-items: center;
      margin-top: 0;
    }
    .dashedLine{
      top: 55px;
    }
    .right_nav {
      margin: 0 auto 0 0;
      margin-top: 20px!important;
      display: block;
      width: 100%;
    }
    .menu_icon {
      display: inline-block;
    }
    .m_logo {
      display: inline-block;
    }
    .header_wrap .c_btn:hover {
      color: rgb(68, 62, 62);
      background-color: #fff;
    }
    .header_wrap .c_btn:active {
      background-color: #fff;
      color: rgb(68, 62, 62);
      border-color:  #20C7D3;
    }
    .header_wrap .c_btn.tap {
      background-color: #1AA7B1;
      color: #ffffff;
      color: rgb(68, 62, 62);
    }
    .header_wrap {
      padding: 10px 24px;
      height: auto!important;
    }
    .lang_change{
      float: right;
    }
    .lang_change .icon {
      margin: 0 16px 0 0;
    }
  }
</style>
<style>
  .ant-alert {
    width: 100%;
    max-width: 100vw;
  }
  ul {
    margin-bottom: 0!important;
  }
</style>