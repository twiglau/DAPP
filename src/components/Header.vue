<template>
  <div class="header_wrap" :style="[{backgroundColor:currentIndex == 1? '#43318C':'white'}]">
    <div class="header_inner_wrap">

      <div class="left_nav">
        <div class="logo_wrap">
          <img :src="logoImg" alt="" class="logo">
        </div>
        <ul class="nav_text">
          <li class="nav_item" :class="currentIndex == 1 ? 'clickedWhiteNav': ''"><a @click="handleJump('home',1)">{{$t('l.h_n1')}}</a><div class="whiteLine"></div></li>
          <li class="nav_item" :class="currentIndex == 5 ? 'clickedNav': ''"><a @click="handleJump('swap',5)">{{$t('l.h_n3')}}</a><div class="line"></div></li>
          <li class="nav_item" :class="currentIndex == 3 ? 'clickedNav': ''"><a @click="handleJump('farm',3)">{{$t('l.h_n4')}}</a><div class="line"></div></li>
          <li class="nav_item" :class="currentIndex == 4 ? 'clickedNav': ''"><a @click="handleJump('dao',4)">{{$t('l.h_n5')}}</a><div class="line"></div></li>
        </ul>
      </div>
      <div class="right_nav">
        <a @touchstart="handleTapStart" @touchend="handleTapEnd" class="c_btn" :class="currentIndex == 1 ? 'c_bg':''"  @click="handleConnectWeb3Modal"><span class="c_btn_text">{{$t('l.cwallet')}}</span></a>
        <a class="lang_change" @click="showLangBox" :class="currentIndex == 1 ? 'c_bg':''" ><i class="icon"></i>{{this.lanc}}
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
export default {
  data() {
    return {
      currentIndex: 3,
      languageShow: false,
      lanc:'简体中文',
      currentHost: ''
    }
  },
  methods: {
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
      }else if (str.indexOf("swap") != -1) {
        this.currentIndex = 5
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

    logoImg:function(){
      if(this.currentIndex == 1){
        return require('@/assets/logo_white.png')
      }else{
        return require('@/assets/logo.png')
      }
    }
  },
  mounted() {
    this.currentHost = location.host
    this.getIndex();
    this.setLan();
  },
  created() {
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
    color: #43318C!important;
    /*font-weight: bold;*/
  }
  .clickedWhiteNav a{
    color: white !important;
    /*font-weight: bold;*/
  }
  .line{
    width: 100%;
    height: 3px;
    background-color: #43318C;
    position: absolute;
    bottom: -10px;
    display: none;
  }
  .whiteLine {
    width: 100%;
    height: 3px;
    background-color: white;
    position: absolute;
    bottom: -10px;
    display: none;
  }
  .clickedNav .line{
    display: block;
  }
  .clickedWhiteNav .whiteLine{
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
    color: #43318C;
  }
  .nav_text a {
    color: black;
  }
  .header_wrap .c_btn {
    height: 32px;
    line-height: 24px;
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
    padding: 0 15px;
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
    margin-top: 5px!important;
  }
  .right_nav .c_btn{
    border: 2px solid #43318C;
    float: right;
    margin-right: 15px;
  }

  .right_nav .c_bg{
    border: 0px solid transparent;
    background: rgba(255, 255, 255, 0.2);
    color: white;
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
  .logo_wrap {
    margin-right: 42px;
    width: 76px;
    height: 24px;
  }
  .logo_wrap img {
    width: 100%;
    height: 100%;
  }
  .lang_change {
    height: 32px;
    width: 90px;
    border-radius: 100px;
    line-height: 30px;
    float: right;
    /*display: flex;*/
    text-align: center;
    align-items: center;
    text-decoration: none;
    color: rgb(68, 62, 62);
    font-size: 14px;
    border:2px solid #43318C;
  }
  @media (max-width: 768px) {
    .logo_wrap {
      width: 76px;
      height: 24px;
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
    .header_wrap .c_btn:hover {
      color: rgb(68, 62, 62);
      background-color: #fff;
    }
    .header_wrap .c_btn:active {
      background-color: #fff;
      color: rgb(68, 62, 62);
      border-color:  #43318C;
    }
    .header_wrap .c_btn.tap {
      background-color: #43318C;
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