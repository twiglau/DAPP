<template>
  <div class="footer_wrap">
    <div class="footer_inner">
      <ul class="text_ul">
        <!-- <a :href="$t('l.sjurl')" target="_blank">Github</a>
        <a href="#" target="_blank">Facebook</a> -->
        <a href="https://twitter.com/Libradefiglobal?s=09" target="_blank">Twitter</a>
        <a href="https://t.me/quncu828" target="_blank">Telegram</a>
      </ul>
    </div>
    <tab-bar v-show="getIsMobile"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import TabBar from './TabBar.vue'
export default {
  data() {
    return {
      hasTap: false
    }
  },
  computed:{
    ...mapGetters('accounts',['getIsMobile'])
  },
  components:{TabBar},
  methods: {
    
  }
}
</script>

<style scoped>
  .footer_wrap {
    width: 100%;
    height: 50px;
    background-color: transparent;
    position: absolute;
    bottom: 0;left: 0;
    font-size: 14px;
    color: white;
  }
  .footer_inner {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    overflow-x: hidden;
  }
  .text_ul {
    flex-flow: row;
    background: transparent;
    position: absolute;
    width: 100vw;
    height: 50px;
    bottom: 0px;
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    font-size: 14px;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 0px 16px;
  }
  .text_ul a {
    position: relative;
    color: black;
    margin: 0px 12px;
    text-decoration: none;
  } .icon_ul {
    list-style: none;
    display: flex;
    margin: 0 0 0 auto;
  }
  .icon_item {
    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    cursor: pointer;
    margin-right: 32px;
  }
  @media (max-width: 768px) {
    .footer_wrap {
      padding-left: 0;
    }
    .footer_inner {
      flex-direction: column;
    }
    .icon_ul {
      margin: 30px auto 0;
    }
    .text_ul {
      display: flex;
      flex-wrap: nowrap;
      margin: 0 auto;
      justify-content: center;
    }
    .text_item {
      margin: 0 8px;
    }
    .text_item:last-child {
      margin: 0 0 0 8px;
    }
    .text_item:hover a {
      color: #666666;
    }
    .text_item:active a {
      color: #666666;
    }
    .text_item a.tap {
      color: #51007A;
    }
  }
</style>