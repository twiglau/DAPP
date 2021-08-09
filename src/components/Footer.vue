<template>
  <div class="footer_wrap">
    <div class="footer_inner">
      <ul class="text_ul">
        <a :href="$t('l.sjurl')" target="_blank">{{$t('l.footer1')}}</a>
        <a href="#" target="_blank">{{$t('l.footer2')}}</a>
        <a href="#" target="_blank">{{$t('l.footer3')}}</a>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasTap: false
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .footer_wrap {
    width: 100%;
    /*padding: 20px 0;*/
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
  }
  /*.text_item:first-child {
    margin-left: 0;
  }
  .text_item a {
    color: white;
  }
*/  .icon_ul {
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
 /* .icon_item:last-child {
    margin-right: 0;
  }*/
  .icon_item1 {
    /* background-image: url('../assets/b_icon_d_5.svg'); */
  }
  .icon_item1:hover {
    /* background-image: url('../assets/b_icon_a_5.svg'); */
  }
  .icon_item2 {
    /* background-image: url('../assets/b_icon_d_2.png'); */
  }
  .icon_item2:hover {
    /* background-image: url('../assets/b_icon_a_2.png'); */
  }
  .icon_item3 {
    /* background-image: url('../assets/b_icon_d_3.png'); */
  }
  .icon_item3:hover {
    /* background-image: url('../assets/b_icon_a_3.png'); */
  }
  .icon_item4 {
    /* background-image: url('../assets/b_icon_d_4.png'); */
  }
  .icon_item4:hover {
    /* background-image: url('../assets/b_icon_a_4.png'); */
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
    .icon_item1:active,.icon_item1:hover {
      /* background-image: url('../assets/b_icon_d_1.png'); */
    }
    .icon_item2:active,.icon_item2:hover {
      /* background-image: url('../assets/b_icon_d_2.png'); */
    }
    .icon_item3:active,.icon_item3:hover {
      /* background-image: url('../assets/b_icon_d_3.png'); */
    }
    .icon_item4:active,.icon_item4:hover {
      /* background-image: url('../assets/b_icon_d_4.png'); */
    }
    .icon_item1.tap {
      /* background-image: url('../assets/b_icon_a_1.png'); */
    }
    .icon_item2.tap {
      /* background-image: url('../assets/b_icon_a_2.png'); */
    }
    .icon_item3.tap {
      /* background-image: url('../assets/b_icon_a_3.png'); */
    }
    .icon_item4.tap {
      /* background-image: url('../assets/b_icon_a_4.png'); */
    }
  }
</style>