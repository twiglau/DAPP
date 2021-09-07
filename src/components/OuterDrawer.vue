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
              <span>{{$t('l.withdrawal')}}</span>
              <div @click="close"><svg-icon icon-class="close_icon"></svg-icon></div>
          </div>
          <div class="container__coin">
              <svg-icon class="left-icon"  :icon-class="(model.currency || model.currency1) + '_coin'"></svg-icon>
              <svg-icon class="right-icon" v-if="model.isSingle == 1" :icon-class="model.currency2 + '_coin'"></svg-icon>
              <span>{{model.isSingle == 1? `${model.currency1}/${model.currency2}` : `${model.currency}`}}</span>
          </div>
          <div class="container__desc">
              <span>{{$t('l.deposited')}}({{model.currency || model.currency1}})</span><span><countTo :endVal='( model.isSingle == 0? model.lockAmount : model.lockAmount1)' :duration='1000' :decimals="4"></countTo></span>
          </div>
          <div class="container__input">
              <input @input="input_num(1)" :placeholder="$t('l.iptPlace')" v-model="iptValue1">
              <div class="input__info">
                  <span>{{model.isSingle == 1? `${model.currency1}/${model.currency2}` : `${model.currency}`}}</span>
                  <a-button class="max-btn" @click="iptValue1 = (model.isSingle == 0? model.lockAmount : model.lockAmount1).toFixed(4)">{{$t('l.l_maxa')}}</a-button>
              </div>
          </div>
          <div class="container__detail">
              {{$t('l.l_ming')}}
          </div>
          <div class="container__info" style="margin-top:8px">
              <div class="info-l">
                  <span>{{model.currency || model.currency1}}</span>{{$t('l.withdrawal')}}
              </div>
              <div class="info-r">
                  <countTo :endVal='model.nAmount1 || model.nAmount' :duration='1000' :decimals="4"></countTo>
              </div>
          </div>
          <div class="container__info" v-if="model.isSingle == 1">
              <div class="info-l">
                  <span>{{model.currency2}}</span>{{$t('l.withdrawal')}}
              </div>
              <div class="info-r">
                  <countTo :endVal='model.nAmount2' :duration='1000' :decimals="4"></countTo>
              </div>
          </div>
          <div class="container__info">
              <div class="info-l">
                  <span>{{$t('l.l_fee')}}</span>
                  <a-tooltip placement="topRight">
                    <template slot="title">
                      <div class="tips-title">
                        <span>{{$t('l.l_fee_tip1')}}</span>
                        <span>{{$t('l.l_fee_tip2')}}</span>
                      </div>
                    </template>
                    <div class="info-qs">
                        <svg-icon icon-class="yiwen_icon" />
                    </div>
                  </a-tooltip>
              </div>
              <div class="info-r">
                  <div class="info-fee">
                     <countTo :endVal='fee.fee1' :duration='1000' :decimals="4"></countTo>
                     <span>{{model.isSingle == 0? model.currency : model.currency1}}</span>
                  </div>
                  <div class="info-add" v-if="model.isSingle == 1">+</div>
                  <div class="info-fee" v-if="model.isSingle == 1">
                     <countTo :endVal='fee.fee2' :duration='1000' :decimals="4"></countTo>
                     <span>{{model.currency2}}</span>
                  </div>
              </div>
          </div>
          <div class="container__ratio">
              <span>{{$t('l.l_you')}}</span>
              <span>
                {{model.isSingle == 0? `${model.nResult} ${model.currency}` : `${model.nResult1} ${model.currency1} + ${model.nResult2} ${model.currency2}`}}
                </span>
          </div>
          <a-button class="container__sure" @click="sureClick">{{$t('l.l_sureIt')}}</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>

import Fees from '@/models/fee';
import countTo from 'vue-count-to';
export default {
  name:'OutDrawer',
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
      drawerHeight:440,
      model:{},
      fee:new Fees()
    }
  },
  components: {
    countTo,
  },
  watch:{
    iptValue1:{
      immediate:true,
      handler:function(newVal) {
        
        this.fee.fee1 = 0;
        this.fee.fee2 = 0;
        if(this.model && this.model.currency){
          if(!newVal){
            this.model.realM_v = 0
            this.model.nAmount = 0
            this.model.nResult = 0
            this.fee.fee1 = 0
          }else {
            this.model.realM_v = (+newVal) * (+this.model.mPrice)
            this.model.nAmount = +newVal
            this.fee.amount1 = +newVal
            this.fee.calculateOne()
            this.model.nResult = (+newVal - Number(this.fee.fee1)).toFixed(4)
          }
        }
        if(this.model && this.model.currency1){
          if(!newVal){
            this.model.realS_v = 0;this.model.realM_v = 0;
            this.model.nAmount1 = 0;this.model.nAmount2 = 0;
            this.model.nResult1 = 0;this.model.nResult2 = 0;
            this.fee.fee1 = 0;this.fee.fee2 = 0;
          }else{
            this.model.realS_v = (+newVal) * (+this.model.sPrice)
            //计算主流币 = 存入代币数量 * 代币单价 *4 / 主流币单价
            this.model.nAmount1 = (+newVal)
            this.model.nAmount2 = this.model.lockAmount1 > 0 ? this.model.nAmount1 * this.model.lockAmount2 / this.model.lockAmount1
                                                          : 0
            if(this.model.lockAmount1 > 0){
              this.fee.amount1 = this.model.nAmount1
              this.fee.amount2 = this.model.nAmount2
              this.fee.calculateTwo()
              this.model.nResult1 = (this.model.nAmount1 - Number(this.fee.fee1)).toFixed(4)
              this.model.nResult2 = (this.model.nAmount2 - Number(this.fee.fee2)).toFixed(4)
            }
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
        this.$nextTick(()=>{
          this.model = this.info
          this.drawerHeight = this.model.isSingle == 0 ? 478 : 502
          this.fee.oneRecords = this.model?.oneRecords || [];
          this.fee.twoRecords = this.model?.twoRecords || [];
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
.tips-title {
  display: flex;
  flex-direction: column;
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
        .info-l .svg-icon {
          width: 16px;
          height: 16px;
        }
        .info-r {
          color: #3c3c3c;
          font-weight: bold;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        .info-add {
          margin-left: 5px;
        }
        .info-fee {
          margin-left: 5px;
          display: flex;
          align-items: center;
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