<template>
  <div id="app">
    <Header />
    <Footer />
    <!-- <keep-alive>
      
    </keep-alive> -->
    <router-view class="route_view" :class="!getIsMainChainID ? 'pt_more' : ''"/>
  </div>
</template>

<script>
import Header from './components/Header'
// import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    // Navbar,
    Header,
    Footer
  },
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters('accounts',['getIsMainChainID']),
  },
  mounted() {
    this.$store.dispatch('accounts/getMainChainID');
  }
}
</script>

<style>
body {
  margin: 0;
  -moz-user-select:none; /*火狐*/
  -webkit-user-select:none; /*webkit浏览器*/
  -ms-user-select:none; /*IE10*/
  -khtml-user-select:none; /*早期浏览器*/
  user-select:none;
}
div {
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
ul {margin: 0;padding: 0;}
#app {
  min-height: 100vh;
  background-color: rgb(244, 247, 250);
  position: relative;
  padding-bottom: 80px;
  background-image: url('./assets/h_bg.png');
  background-size: 100% auto;
  background-position: center bottom;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.mask_bg {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;right: 0;
  bottom: 0;left: 0;
}
.route_view {
  /*padding: 64px 0 64px 240px;*/
  padding: 76px 0 0 0;
}
.route_view.pt_more {
  padding: 146px 0 0 0;
}
.ant-modal-content {
  border-radius: 24px!important;
}
.ant-message-success .anticon {
  color: #20C7D3!important;
  border: 1px solid #20C7D3;
}
.ant-message-warning .anticon {
  color: #faad14!important;
  border: 1px solid #faad14;
}
.ant-message-error .anticon {
  color: #f5222d!important;
  border: 1px solid #f5222d;
}
.anticon {
  border-radius: 50%;
  padding: 2px;
}
/* 全局按钮 */
.operate_btn {
  width: 100%;
  height: 44px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg,#0066FF,#009FFF);
  border-radius: 22px;
  font-size: 18px;
  box-shadow: 0 2px 0 rgba(0,0,0,.32),0 2px 0 #0066FF;
  cursor: pointer;
  margin-bottom: 16px;
}
.operate_btn:last-child {
  margin-bottom: 0;
}
.operate_btn:hover {
  background: linear-gradient(45deg,#5199ff,#52baff);
}
.operate_btn:active {
  background: linear-gradient(45deg,#0059d6,#0082d6);
  box-shadow: none;
}
/* 小按钮 */
.v_btn_ele {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  white-space: nowrap;
  padding: 0 24px;
  color: #ffffff;
  font-size: 18px;
  font-weight: bolder;
  border-radius: 22px;
  background: linear-gradient(45deg,#0066FF,#009FFF);
  box-shadow: 0 2px 0 rgba(0,0,0,.32),0 2px 0 #0066FF;
  margin-left: 4px;
}
.v_btn_ele:hover {
  color: #ffffff;
  background: linear-gradient(45deg,#5199ff,#52baff);
}
.v_btn_ele:active {
  color: #ffffff;
  background: linear-gradient(45deg,#0059d6,#0082d6);
  box-shadow: none;
}
  /* 全局input */
  .ipt_ele {
    width: 100%;
    border: none;
    outline-style: none;
    height: 44px;
    line-height: 42px;
    border: 1px solid #ffffff;
    background-color: #202020;
    color: #ffffff;
    font-size: 18px;
    border-radius: 22px;
    margin: 8px 0 24px 0;
    padding: 0 91px 0 10px;
  }
  .ipt_ele.normal {
    padding: 0 10px;
    margin: 0;
  }
  .ipt_ele::placeholder {
    color: #ffffff;
  }
  .ipt_title {
    width: 81px;
    height: 42px;
    line-height: 42px;
    background-color: rgba(0,102,255,.1);
    position: absolute;
    right: 0;bottom: 24px;
    text-align: center;
    border-end-end-radius: 22px;
    border-start-end-radius: 22px;
  }
/* 百分比显示器 */
.per_ul {
  list-style: none;
  display: flex;
  margin-top: 20px;
  margin-bottom: 24px!important;
}
.per_ul li {
  width: 78px;
  height: 26px;
  line-height: 24px;
  border: 1px solid #0066FF;
  border-radius: 14px;
  color: #0066FF;
  font-size: 14px;
  cursor: pointer;
  margin-right: 8px;
  text-align: center;
}
.per_ul li:hover {
  background-color: #0066FF;
  color: #fff;
}
.per_ul li.active {
  background-color: #0055d6;
  color: #fff;
}
/* 一级大标题 */
.t_h0 {
  font-size: 28px;
}
.t_h1 {
  font-size: 24px;
  margin-bottom: 8px!important;
  font-weight: bolder;
}
.t_h2 {
  font-size: 20px;
}
.t_h3 {
  font-size: 18px;
}
.t_h4 {
  font-size: 16px;
}
.t_h5 {
  font-size: 14px;
}
.bolder {
  font-weight: bolder;
}

@media (max-width: 768px) {
  .route_view {
    padding: 124px 0 64px 0;
  }
  .route_view.pt_more {
    padding: 146px 0 64px 0;
  }
  /* 全局按钮 */
  .operate_btn {
    height: 32px;
    line-height: 32px;
    font-size: 16px;
  }
  .operate_btn:hover {
    background: linear-gradient(45deg,#0066FF,#009FFF);
    box-shadow: 0 2px 0 rgba(0,0,0,.32),0 2px 0 #0066FF;
  }
  .operate_btn:active {
    background: linear-gradient(45deg,#0066FF,#009FFF);
    box-shadow: 0 2px 0 rgba(0,0,0,.32),0 2px 0 #0066FF;
  }
  .operate_btn.tap {
    background: linear-gradient(45deg,#0059d6,#0082d6);
    box-shadow: none;
  }
  /* 输入框 */
  .ipt_ele {
    font-size: 14px;
    height: 32px;
  }
  .ipt_title {
    height: 32px;
    line-height: 32px;
    font-size: 16px;
  }
  /* 小按钮 */
  .v_btn_ele {
    height: 32px;
    font-size: 14px;
    padding: 0 12px;
  }
  .v_btn_ele:hover {
    background: linear-gradient(45deg,#0066FF,#009FFF);
    box-shadow: 0 2px 0 rgba(0,0,0,.32),0 2px 0 #0066FF;
  }
  .v_btn_ele:active {
    background: linear-gradient(45deg,#0066FF,#009FFF);
    box-shadow: 0 2px 0 rgba(0,0,0,.32),0 2px 0 #0066FF;
  }
  .v_btn_ele.tap {
    background: linear-gradient(45deg,#0059d6,#0082d6);
    box-shadow: none;
  }
  /* 标题字体大小 */
  .t_h0 {
    font-size: 20px;
  }
  .t_h1 {
    font-size: 18px;
  }
  .t_h2 {
    font-size: 16px;
  }
  .t_h3 {
    font-size: 16px;
  }
  .t_h4 {
    font-size: 14px;
  }
  .t_h5 {
    font-size: 12px;
  }
  .desc {
    font-size: 14px;
  }
}
</style>
