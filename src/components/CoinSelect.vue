<template>
  <a-dropdown placement="bottomLeft">
    <div class="coin_right">
        <svg-icon :icon-class="lanImg"></svg-icon>
        <span>{{lanc}}</span>
        <img src="../assets/down_arrow.png" alt="">
    </div>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item key="1" @click="changeLangType">
          <svg-icon icon-class="Libra_coin"></svg-icon>
          Libra
        </a-menu-item>
        <a-menu-item key="2" @click="changeLangType">
          <svg-icon icon-class="Diem_coin"></svg-icon>
          Diem
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
export default {
  name: 'CoinSelect',
  data:function(){
      return {
         lanc:'Libra',
         lanImg:'Libra_coin',
      }
  },
  computed:{
  },
  mounted(){
  },
  methods: {
      changeLangType(type) {
        const {key} = type
        if (key == 1) {
          this.lanc = "Libra";
          this.lanImg = 'Libra_coin'
        }else if (key == 2) {
          this.lanc = "Diem";
          this.lanImg = 'Diem_coin'
        }
        this.$emit('selectA',this.lanc)
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
