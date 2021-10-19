<template>
  <div class="SiderNavi">

    <a-drawer
      placement="left"
      :closable="false"
      :visible="visible"
      @close="onClose"
      :width="'90%'"
    >
    <div class="sider-items">
      
      <div class="top-info">
        <svg-icon icon-class="logo_white_L"></svg-icon>
        <div class="lang-setter">
           <lang-setting/>
        </div>
      </div>
      <a-menu
      mode="inline"
      theme="dark"
      @click="menuClick"
    >
      <a-menu-item key="101">
        {{formatAddress(getActiveAccount)}}
      </a-menu-item>
      <a-menu-item key="1">
        <svg-icon icon-class="Wallet_icon"></svg-icon>
        <span>{{isUserConnected? $t('l.w_scnt') : $t('l.w_cnt')}}</span>
        <svg-icon class="status-icon" :icon-class="isUserConnected? 'connected':'warning'"></svg-icon>
      </a-menu-item>
      <a-menu-item key="2">
        <svg-icon icon-class="Invite_icon"></svg-icon>
        <span>{{$t('l.i_invite')}}</span>
      </a-menu-item>
      <a-menu-item key="3">
        <svg-icon icon-class="Team_icon"></svg-icon>
        <span>{{$t('l.t_team')}}</span>
      </a-menu-item>
      <a-menu-item key="0" :disabled="true">
      </a-menu-item>
      <!-- <a-menu-item key="4">
        <svg-icon icon-class="Github_icon"></svg-icon>
        <span>Github</span>
      </a-menu-item>
      <a-menu-item key="5">
        <svg-icon icon-class="Facebook_icon"></svg-icon>
        <span>Facebook</span>
      </a-menu-item> -->
      <a-menu-item key="6">
        <svg-icon icon-class="Twitter_icon"></svg-icon>
        <span><a href="https://twitter.com/Libradefiglobal?s=09" target="_blank">Twitter</a></span>
      </a-menu-item>
      <a-menu-item key="7">
        <svg-icon icon-class="Telegram_icon"></svg-icon>
        <span><a href="https://t.me/quncu828" target="_blank">Telegram</a></span>
      </a-menu-item>

    </a-menu>
    </div>
    </a-drawer>
  </div>
</template>

<script>

import Vue from 'vue'
import Web3 from 'web3'
import Wallet from '@/utils/Wallet.js'
import { mapGetters,mapActions } from 'vuex'
import LangSetting from './LangSetting.vue'
export default {
  name:'SideNaviBar',
  data() {
    return {
      visible: true,
      walletAddress:'',
      currentHref: window.location.origin+window.location.pathname,
    }
  },
  components:{LangSetting},
  computed:{
    ...mapGetters('accounts',["getActiveAccount", "isUserConnected",'getIsMainChainID']),
    ...mapGetters('accounts',['getShowDrawer','getLangType'])
  },
  watch:{
    getShowDrawer:{
      immediate:true,
      handler:function(newVal){
        if(this.visible !== newVal){
          this.visible = newVal
        }
      }
    }
  },
  mounted() {
    this.walletAddress = localStorage.getItem("walletAddress") || '';
  },
  methods: {
      ...mapActions('accounts',["connectWeb3Modal", "disconnectWeb3Modal"]),
      menuClick(e){
        const key = e.key
        if(key == 1){
          //钱包
          if(this.isUserConnected){
            this.disconnectWeb3Modal()
          }else {
            this.handleConnectWeb3Modal()
          }
        }else if(key == 2){
          //邀请
          this.handleCopyLink()
        }else if(key == 3){
          //团队
          
          this.$router.push({path:'/market',query:{address:this.walletAddress}})
        }else if(key == 4){
          //Github
        }else if(key == 5){
          //Facebook
        }else if(key == 6){
          //Twitter
        }else if(key == 7){
          //gelegram
        }
        this.$store.commit('accounts/setDrawer',false)

      },
      async handleConnectWeb3Modal() {
        this.initWallet()
        let result = await this.connectWeb3Modal()
        if(result && result.status == 400) {
          this.$message.warning(this.$t('l.no_metamask_tips'))
        }
      },
      initWallet(){
        Vue.prototype.Web3 = Web3;
        Wallet.initWallet((address)=>{
          if(address.indexOf('Error-title') !== -1){
            // this.$notification.error({ message: this.$t('l.notmainnet_title'),description:this.$t('l.no_dapp_liulanqi')})
          }else if (address.indexOf('signing you in') !== -1){
            // this.$notification.error({ message: this.$t('l.notmainnet_title'),description:this.$t('l.no_signin_liu')})
          }else {
            this.walletAddress = address;
            this.showConnectBtn = false;
            localStorage.setItem("walletAddress",address);
          }
        })
      },
      formatAddress(address) {
        if(!address || address.length < 10) {
          return ''
        }else {
          let pre = address.slice(0,6)
          let suf = address.slice(-4)
          return  `${pre}...${suf}`
        }
      },
      onClose() {
        this.$store.commit('accounts/setDrawer',false)
      },
      handleCopyLink() {
        let walletAddress = localStorage.getItem("walletAddress") || '';
        if(!walletAddress) {
          this.$message.error(this.$t('l.error_tips_unconnect'))
          return
        }
        this.$copyText(this.currentHref+'#/home?address='+walletAddress).then( () => {
          this.$message.success('复制成功')
        }, function () {
          this.$message.error('复制失败,请重试！')
        })
      },
  }
}
</script>

<style scoped lang="less">

/deep/.ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    background-color: transparent;
}


 a {
    color: rgba(255, 255, 255, 0.65);
}
.sider-items .svg-icon {
  width: 24px;
  height: 24px;
}
.sider-items .status-icon {
  width: 16px;
  height: 16px;
}
.sider-items span:nth-of-type(1) {
  margin: 0px 10px;
}
.top-info {
  margin: 90px 0 0 25px;
  display: flex;
  flex-direction: column;
}
.top-info > .svg-icon {
   width: 102px;
   height: 32px;
}
.top-info > .lang-setter {
  margin-top: 24px;
  display: inline-block;
  width: 120px;
  height: 32px;
  line-height: 32px;
  background: white;
  border-radius: 120px;
  display: flex;
  justify-content: center;
}
</style>