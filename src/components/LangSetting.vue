<template>
  <a-dropdown placement="bottomLeft">
    <div class="lang">
        <svg-icon :icon-class="lanImg"></svg-icon>
        <span>{{lanc}}</span>
        <img src="../assets/down_arrow.png" alt="">
    </div>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item key="1" @click="changeLangType">
          <svg-icon icon-class="Lang_cn"></svg-icon>
          简体中文
        </a-menu-item>
        <a-menu-item key="2" @click="changeLangType">
          <svg-icon icon-class="Lang_en"></svg-icon>
          English
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'LangSetting',
  data:function(){
      return {
         lanc:'简体中文',
         lanImg:'Lang_cn',
      }
  },
  computed:{
    ...mapGetters('accounts',['getShowDrawer','getLangType'])
  },
  methods: {
    
      initLan(){
        if (this.getLangType == 'zh-CN') {
          this.lanc = "简体中文";
          this.lanImg = 'Lang_cn'
        }else if(this.getLangType == 'en-US'){
          this.lanc = "English";
          this.lanImg = 'Lang_en'
        }
      },
      changeLangType(type) {
        const {key} = type
        var llWYf='';
        if (key == 2) {
          this.$i18n.locale = 'en-US';
          this.lanc = "English";
          this.lanImg = 'Lang_en'
          llWYf = 'en';
        }else if (key == 1) {
          this.$i18n.locale = 'zh-CN';
          this.lanc = "简体中文";
          this.lanImg = 'Lang_cn'
          llWYf = 'zh-CN';
        }
        this.$store.commit('accounts/setLangType',this.$i18n.locale)
        localStorage.setItem('langType',this.$i18n.locale);
      },
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 120px;
  }
  .svg-icon {
    width: 20px;
    height: 20px;
  }
}


.top-info > .lang {
  display: inline-block !important;
  margin-top: 24px;
  height: 32px;
  line-height: 32px;
  padding: 0px 10px;
  border-radius: 40px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
.lang > .svg-icon:nth-of-type(1) {
  width: 20px;
  height: 20px;
}
.lang > img:nth-of-type(1) {
  width: 10px;
  height: 10px;
}
.lang > span {
  margin: 0 6px;
}
</style>
