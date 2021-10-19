<template>
  <a-dropdown placement="bottomLeft">
    <div class="coin_right">
        <svg-icon :icon-class="defaultCoin.lanImg"></svg-icon>
        <span>{{$transformCurrency(defaultCoin.lanc)}}</span>
        <img src="../assets/down_arrow.png" alt="">
    </div>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item v-for="(item,index) in coins" :key="index" @click="changeLangType(item)">
          <svg-icon :icon-class="item.lanImg"></svg-icon>
          {{$transformCurrency(item.lanc)}}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
export default {
  name: 'CoinSelect',
  props:{
    coins:{
      type:Array,
      default:[]
    },
    defaultCoin:{
      type:Object,
      defalut:{
        lanc:'',
        lanImg:''
      }
    }
  },
  data:function(){
      return {
      }
  },
  watch:{},
  computed:{
  },
  mounted(){
  },
  methods: {
      changeLangType(item) {
          this.$emit('selectA',item)
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
    max-width: 120px;
  }
  .svg-icon {
    width: 20px;
    height: 20px;
  }
}


.coin_right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #000;
    font-size: 12px;
    font-weight: 500;
}
.coin_right span {
    margin: 0px 6px;
    min-width: 36px;
    font-size: 14px;
}
.coin_right .svg-coin {
    width: 24px;
    height: 24px;
}
.coin_right img:nth-of-type(1) {
    width: 11px;
    height: 11px;
}

</style>
