<template>
  <div class="loading">
    <a-modal v-model="visible" :zIndex="1100" :closable="false" :footer="null" :width="!$store.state.accounts.isMobile ? '600px' : '75%'" :centered="true">
         <div class="container">
             <div class="container__close" @click="close">
               <svg-icon icon-class="close_icon"></svg-icon>
             </div>
             <div class="container__icon">
               <svg-icon v-if="status == 0" id="loading" icon-class="loading_icon"></svg-icon>
               <svg-icon v-if="status == 1" icon-class="success_icon"></svg-icon>
               <svg-icon v-if="status == 2" icon-class="failed_icon"></svg-icon>
             </div>
             <div class="container__content">
               {{alert.title}}
             </div>
             <div class="container__msg" v-if="alert.content && alert.content.length > 0">
               {{alert.content}}
             </div>
             <div class="container__msg container__desc" v-if="alert.desc && alert.desc.length > 0">
               {{alert.desc}}
             </div>
             <a-button class="container__btn" @click="close" v-if="!alert.content">{{$t('l.l_konwIt')}}</a-button>
         </div>
    </a-modal>
  </div>
</template>

<script>

export default {
  name:'Loading',
  props:{
    note:{
      type:Object,
      default:()=>({})
    },
  },
  data() {
    return {
      alert:this.note,
      visible: false,
      status:0, //0 - loading / 1 - success / 2 - failed
    }
  },
  computed:{
  },
  watch:{
  },
  mounted() {
  },
  methods: {
    success(info) {
        this.alert = info
        this.status = 1
        setTimeout(()=> { this.close()},3000)
    },
    failed(info){
        this.alert = info
        this.status = 2
    },
    show(info){
        this.alert = info
        this.status = 0
        this.visible = true
    },
    close(){
        if(this.status == 0) return
        this.visible = false
    },
  }
}
</script>

<style scoped lang="less">
/deep/.ant-modal-content {
    border-radius: 8px!important;
}
/deep/.ant-modal-mask {
    background-color: rgba(255, 255, 255, 0.7);
    filter: alpha(opacity=50);
}
.container {
  display: flex;
  flex-direction: column;
  padding: 24px;
  position: relative;
  border-bottom: 1px solid transparent;
  &__close {
    position:absolute;
    top: 0px;
    right: 0px;
    width: 16px;
    height: 16px;
  }
  &__close .svg-icon {
    width: 100%;
    height: 100%;
  }
  &__icon {
    margin-top: 24px;
    display: flex;
    justify-content: center;
  }
  &__icon .svg-icon {
    width: 48px;
    height: 48px;
  }
  &__content {
    margin-top: 24px;
    text-align: center;
    color: #000;
    font-size: 18px;
    font-weight: 500;
  }
  &__msg {
    margin-top: 24px;
    text-align: center;
    color: #6C6C6C;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
  }
  &__desc {
    margin-top: 4px;
  }
  &__btn {
    margin: 24px auto;
    margin-bottom: 0px;
    width: 156px;
    height: 40px;
    border: solid 1px #43318C;
    border-radius: 8px;
    color: #43318C;
    background: white;
  }
}

#loading {
  animation: spin linear 1s infinite;
  transform-origin: center center;
}

@keyframes spin {
  from { transform: rotate(0turn); }
  to { transform: rotate(1turn); }
}
</style>