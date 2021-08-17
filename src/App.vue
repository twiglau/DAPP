<template>
  <div id="app">
    <Header />
    <Footer />
    <side-navi-bar/>
    <router-view class="route_view" :class="!getIsMainChainID ? 'pt_more' : ''"/>
  </div>
</template>

<script>
import SideNaviBar from './components/SideNaviBar.vue'
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
    SideNaviBar
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

.route_view {
  /*padding: 64px 0 64px 240px;*/
  padding: 76px 0 0 0;
}
.route_view.pt_more {
  padding: 130px 0 0 0;
}
</style>
