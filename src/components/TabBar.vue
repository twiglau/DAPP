<template>
    <div class="tab-bar">
        <div class="tab-item" @click="handleJump('home',1)">
            <svg-icon :icon-class="currentIndex == 1 ? tabs[0].active : tabs[0].inactive" />
            <span v-show="currentIndex == 1">{{$t('l.h_n1')}}</span>
        </div>
        <div class="tab-item" @click="handleJump('farm',2)">
            <svg-icon :icon-class="currentIndex == 2 ? tabs[1].active : tabs[1].inactive" alt="" />
            <span v-show="currentIndex == 2">{{$t('l.h_n2')}}</span>
        </div>
        <div class="tab-item" @click="handleJump('swap',3)">
            <svg-icon :icon-class="currentIndex == 3 ? tabs[2].active : tabs[2].inactive" alt="" />
            <span v-show="currentIndex == 3">{{$t('l.h_n3')}}</span>
        </div>
        <div class="tab-item" @click="handleJump('market',4)">
            <svg-icon :icon-class="currentIndex == 4 ? tabs[3].active : tabs[3].inactive" alt="" />
            <span v-show="currentIndex == 4">{{$t('l.h_n4')}}</span>
        </div>
        <div class="tab-item" @click="handleJump('mine',5)">
            <svg-icon :icon-class="currentIndex == 5 ? tabs[4].active : tabs[4].inactive" alt="" />
            <span v-show="currentIndex == 5">{{$t('l.h_n5')}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'TabBar',
    data() {
        return {
            tabs:[
                {inactive:'Tab1_nor',active:'Tab1_sel'},
                {inactive:'Tab2_nor',active:'Tab2_sel'},
                {inactive:'Tab3_nor',active:'Tab3_sel'},
                {inactive:'Tab4_nor',active:'Tab4_sel'},
                {inactive:'Tab5_nor',active:'Tab5_sel'},
            ],
            currentIndex:1,
        }
    },
    watch: {
      '$route'(to) {
        this.currentIndex = to.meta.index
      }
    },
    methods:{
      getIndex(){
        let str = window.location.href;
        if (str.indexOf("home") != -1 ) {
          this.currentIndex = 1
        }else if (str.indexOf("farm") != -1 ) {
          this.currentIndex = 2
        }else if (str.indexOf("market") != -1) {
          this.currentIndex = 4
        }else if (str.indexOf("swap") != -1) {
          this.currentIndex = 3
        }else if (str.indexOf("mine") != -1) {
          this.currentIndex = 5
        }else{
          this.currentIndex = 1
        }
      },
      handleJump(path,index) {
        this.currentIndex = index;
        this.$router.push({path: '/'+path})
        this.getIndex();
      },
    }
    
}
</script>
<style scoped lang="less">
.tab-bar {
    width: 100%;
    height: 50px;
    position: fixed;
    z-index: 100;
    bottom: 0;
    left: 0;
    background: white;
    display: flex;
    align-items: center;
    border-top: solid 1px #e1e1e1;
}
.tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    color: #43318C;
    position: relative;
    border-top: solid 1px transparent;
}
.tab-item .svg-icon {
    margin-top: -10px;
    width: 40px;
    height: 40px;
}
.tab-item span {
    position: absolute;
    top: 64%;
    left: 50%;
    transform: translateX(-50%);
}
</style>