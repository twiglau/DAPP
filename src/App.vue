<template>
  <div id="app">
    <Header />
    <Footer />
    <router-view class="route_view" :class="!getIsMainChainID ? 'pt_more' : ''"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer';
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      getIsMainChainID:false
    }
  },
  methods: {
  },
  computed: {
  },
  mounted() {
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
  background-color: #F5F5F5;
  position: relative;
  padding-bottom: 80px;
  /* background-image: url('./assets/h_bg.png'); */
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
