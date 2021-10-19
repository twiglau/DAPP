<template>
  <div id="app">
    <Header />
    <Footer />
    <side-navi-bar/>
    <router-view class="route_view" :class="getIsMobile? 'pt_mobile' : ''"/>
  </div>
</template>

<script>
import SideNaviBar from './components/SideNaviBar.vue'
import Header from './components/Header'
import Footer from './components/Footer'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
    SideNaviBar
  },
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters('accounts',['getIsMainChainID','getIsMobile']),
  },
  mounted() {
    this.$store.dispatch('accounts/getMainChainID');
  }
}
</script>

<style lang="less" scoped>
</style>
