<template>
  <div class="drawer">
    <a-drawer
      placement="bottom"
      :closable="false"
      :visible="visible"
      :height="drawerHeight"
      @close="close"
    >
      <div class="container">
          <div class="container__top">
              <span>{{$t('l.active_a')}}</span>
              <div @click="close"><svg-icon icon-class="close_icon"></svg-icon></div>
          </div>
          <div class="container__desc">
              <span>{{$t('l.active_address')}}</span><span></span>
          </div>
          <div class="container__input">
              <input :placeholder="$t('l.active_ple_address')" v-model="iptValue1">
          </div>
          <a-button class="container__sure" @click="sureClick">{{$t('l.l_sureIt')}}</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>

import countTo from 'vue-count-to';
export default {
  name:'ActiveDrawer',
  props:{
      inviteAddr:{
          type:String,
          default:''
      }
  },
  data() {
    return {
      visible: false,
      iptValue1:null,
      drawerHeight:260,
    }
  },
  components: {
    countTo,
  },
  watch:{},
  mounted() {
  },
  methods: {
    close() {
       this.iptValue1 = null
       this.visible = false
    },
    show(){
        this.$nextTick(()=>{
          this.iptValue1 = this.inviteAddr
        })
        this.visible = true
    },
    sureClick(){
        this.$emit('sure',this.iptValue1)
    },
  }
}
</script>

<style scoped lang="less">
/deep/.ant-drawer-mask {
    background-color: rgba(255, 255, 255, 0.7);
}
/deep/.ant-drawer-body {
    padding: 0;
}
.container {
    background: white;
    padding: 24px;
    .svg-icon {
        width: 32px;
        height: 32px;
    }
    &__top {
      display: flex;
      justify-content: space-between;
      color: #000;
      font-size: 16px;
      font-weight: 500;
      .svg-icon {
          width: 16px;
          height: 16px;
      }
    }
    &__coin {
      margin-top: 24px;
      display: flex;
      align-items: center;
    }
    &__coin span {
      margin-left: 8px;
      color: #000;
      font-size: 16px;
      font-weight: 500;
    }
    .right-icon{
        margin-left: -18px;
    }
    &__desc {
        margin-top: 24px;
        color: #9C9C9C;
        font-size: 12px;
    }
    &__desc span:nth-of-type(2){
        margin-left: 8px;
        color: #3C3C3C;
    }
    &__input {
        margin-top: 8px;
        position: relative;
    }
    &__input input {
        box-sizing: border-box;
        border: none;
        width: 100%;
        background: #f5f5f5;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        padding: 16px 100px 16px 24px;
        color: #131d32;
    }
    &__input .input__info {
        position:absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 24px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #000;
        font-size: 14px;
        font-weight: 500;
    }
    .input__info span {
      margin-right: 16px;
    }
    .max-btn {
        height: 24px;
        width: 48px;
        border-radius: 4px;
        color: #43318C;
        font-size: 12px;
        font-weight: 500;
        background: white;
        text-align: center;
        padding: 0;
        border: none;
    }
    &__detail {
      padding: 24px 0px 16px 0px;
      border-bottom: solid 1px #f5f5f5;
      font-size: 14px;
      color: #000;
      font-weight: 500;
    }
    &__info {
        padding-top: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #9C9C9C;
        font-size: 12px;
        .info-l {
            display: flex;
            align-items: center;
        }
        .info-l span {
          padding-right: 4px;
        }
        .info-r {
          color: #3c3c3c;
          font-weight: bold;
        }
    }

    &__ratio {
        padding-top: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #000;
        font-size: 14px;
        font-weight: 500;
    }
    &__ratio span:last-child {
       color: #43318C;
       font-size: 16px;
    }
    &__sure {
        margin-top: 32px;
        height: 48px;
        line-height: 48px;
        width: 100%;
        border-radius: 8px;
        color: white;
        font-size: 14px;
        background: #43318C;
        text-align: center;
        padding: none;
        border: none;

    }
}
</style>