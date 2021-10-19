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
              <span>{{$t('l.l_swapt')}}</span>
              <div @click="close"><svg-icon icon-class="close_icon"></svg-icon></div>
          </div>
          <div class="container__input">
              <div class="info-l">
              <svg-icon class="right-icon" :icon-class="model.currency1 + '_coin'"></svg-icon>
              <span>{{`${model.currency1}`}}</span>
              </div>
              <div class="info-r">
                <countTo :endVal='model.amount1' :duration='1000' :decimals="2"></countTo>
              </div>
              <svg-icon icon-class="down_icon" class="down-a"></svg-icon>
          </div>
          <div class="container__input">
              <div class="info-l">
              <svg-icon class="right-icon" :icon-class="model.currency2 + '_coin'"></svg-icon>
              <span>{{`${model.currency2}`}}</span>
              </div>
              <div class="info-r">
                <countTo :endVal='model.amount2' :duration='1000' :decimals="2"></countTo>
              </div>
          </div>
          <div class="container__desc">
              {{$t('l.l_swapm',[model.amount2,model.currency2])}}
          </div>
          <a-button class="container__sure" @click="sureClick">{{$t('l.l_next')}}</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>

import countTo from 'vue-count-to';
export default {
  name:'SwapDrawer',
  props:{
      info:{
          type:Object,
          default:{}
      }
  },
  data() {
    return {
      visible: false,
      iptValue1:null,
      drawerHeight:396,
      model:{}
    }
  },
  components: {
    countTo,
  },
  watch:{
    iptValue1:{
      immediate:true,
      handler:function(newVal) {
        if(this.model && this.model.currency){
          if(!newVal){
            this.model.realM_v = 0
            this.model.nAmount = 0
          }else {
            this.model.realM_v = (+newVal) * (+this.model.mPrice)
            this.model.nAmount = +newVal
          }
        }
        if(this.model && this.model.currency1){
          if(!newVal){
            this.model.realS_v = 0;this.model.realM_v = 0;
            this.model.nAmount1 = 0;this.model.nAmount2 = 0;
          }else{
            this.model.realS_v = (+newVal) * (+this.model.sPrice)
            //计算主流币 = 存入代币数量 * 代币单价 *4 / 主流币单价
            this.model.nAmount1 = (+newVal)
            this.model.nAmount2 = this.model.mPrice > 0 ? this.model.realS_v * 4 / (+this.model.mPrice)
                                                          : 0
          }
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    close() {
       this.iptValue1 = null
       this.visible = false
    },
    show(){
        this.$nextTick(() =>{
          this.model = this.info
        })
        this.visible = true
    },
    input_num(index) {
      this['currentPerIndex' + index] = -1
      this['iptValue' + index] = this['iptValue' + index].replace(/[^\d.]/g, "")
      this['iptValue' + index] = this['iptValue' + index].replace(/\.{4,}/g, ".")
      this['iptValue' + index] = this['iptValue' + index].replace(/^\./g, "")
      this['iptValue' + index] = this['iptValue' + index].replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
      this['iptValue' + index] = this['iptValue' + index].replace(/^(-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3')
    },
    sureClick(){
        this.$emit('sure',this.model.amount1)
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
        width: 24px;
        height: 24px;
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
    &__input {
        margin-top: 24px;
        position: relative;
        height: 56px;
        padding: 0px 24px;
        border-radius: 8px;
        background: #f5f5f5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #000;
        font-size: 14px;
        font-weight: 500;
    }
    &__input + &__input {
      margin-top: 48px;
    }
    .info-l {
        display: flex;
        align-items: center;
    }
    .info-l span {
        margin-left: 8px;
    }
    .svg-icon {
      width: 24px;
      height: 24px;
    }
    &__input .down-a {
      width: 32px;
      height: 32px;
      position:absolute;
      bottom: -40px;
      left: 20px;
    }
    &__desc {
      margin-top: 24px;
      color: #9c9c9c;
      font-size: 12px;
    }
    &__sure {
        margin-top: 48px;
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