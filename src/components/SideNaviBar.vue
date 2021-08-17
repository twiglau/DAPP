<template>
  <div class="SiderNavi">

    <a-drawer
      placement="left"
      :closable="false"
      :visible="visible"
      @close="onClose"
    >
    <div class="sider-items">
      
      <div class="top-info">
        <svg-icon icon-class="logo_white_L"></svg-icon>
        <lang-setting/>
      </div>
      <a-menu
      mode="inline"
      theme="dark"
    >
      <a-menu-item key="101">
      </a-menu-item>
      <a-menu-item key="1">
        <svg-icon icon-class="Wallet_icon"></svg-icon>
        <span>{{$t('l.w_cnt')}}</span>
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
      <a-menu-item key="4">
        <svg-icon icon-class="Github_icon"></svg-icon>
        <span>Github</span>
      </a-menu-item>
      <a-menu-item key="5">
        <svg-icon icon-class="Facebook_icon"></svg-icon>
        <span>Facebook</span>
      </a-menu-item>
      <a-menu-item key="6">
        <svg-icon icon-class="Twitter_icon"></svg-icon>
        <span>Twitter</span>
      </a-menu-item>
      <a-menu-item key="7">
        <svg-icon icon-class="Telegram_icon"></svg-icon>
        <span>Telegram</span>
      </a-menu-item>

    </a-menu>
    </div>
    </a-drawer>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import LangSetting from './LangSetting.vue'
export default {
  name:'SideNaviBar',
  data() {
    return {
      visible: true,
    }
  },
  components:{LangSetting},
  computed:{
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
  methods: {
      onClose() {
        this.$store.commit('accounts/setDrawer',false)
      }
  }
}
</script>

<style scoped>
.sider-items .svg-icon {
  width: 24px;
  height: 24px;
}
.sider-items span:nth-of-type(1) {
  margin: 0px 10px;
}
.top-info {
  margin: 90px 0 0 25px;
}
.top-info > .svg-icon {
   width: 102px;
   height: 32px;
}

</style>