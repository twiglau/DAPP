<template>
  <div class="drawer" v-show="visible">
    <a-drawer
      placement="bottom"
      :closable="false"
      :visible="visible"
      @close="close"
    >
      <div class="container">
      </div>
    </a-drawer>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name:'OuterDrawer',
  data() {
    return {
      visible: true,
    }
  },
  computed:{
  },
  watch:{
  },
  mounted() {
  },
  methods: {
    close() {
       this.visible = false
    },
    show(){
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
  }
}
</script>

<style scoped lang="less">

</style>