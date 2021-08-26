<template>
    <div class="container">
        <a-modal v-model="visible" :footer="null" :width="!$store.state.accounts.isMobile ? '600px' : '90%'" :closable="false" :centered="true">
            <div class="config">
                <div class="bar">
                    <span>{{$t('l.swap_setting')}}</span>
                    <div @click="close"><img src="../assets/close_icon.png" alt=""></div>
                </div>
                <div class="tip-info">
                    <span>{{$t('l.Slippage_tolerance')}}</span>
                    <img src="../assets/qs_icon.png" alt="">
                </div>
                <div class="slide">
                    <button class="slide_btn" type="button">0.1%</button>
                    <button class="slide_btn" type="button">0.5%</button>
                    <button class="slide_btn" type="button">1%</button>
                    <button class="slide_btn slide_last" type="button">
                        <div class="last-conf">
                            <span role="img" aria-label="warning">⚠️</span>
                            <input @input="input_num(0)" :placeholder="0.0" v-model="iptValue0">
                            %
                        </div>
                    </button>
                </div>
                <div class="tip-info">
                    <span>{{$t('l.Transaction_deadline')}}</span>
                    <img src="../assets/qs_icon.png" alt="">
                </div>
                <div class="slide">
                    <button class="slide_btn slide_last" style="max-width:120px;" type="button">
                        <div class="last-conf">
                            <input @input="input_num(1)" :placeholder="0.0" v-model="iptValue1">
                        </div>
                    </button>
                    <span>{{$t('l.minute_swap')}}</span>
                </div>
                <div class="bar" style="margin-top:20px">
                    <span>{{$t('l.Interface_Settings')}}</span>
                </div>
                <div class="tip-info tip-bw">
                    <span>{{$t('l.Slippage_tolerance')}}</span>
                    <a-switch :checked-children="$t('l.swap_on')" :un-checked-children="$t('l.swap_off')" default-checked />
                </div>
            </div>
      </a-modal>
    </div>
    
</template>
<script>
export default {
    name:'SwapConfig',
    data() {
        return {
            iptValue0:null,
            iptValue1:null,
            visible:false,
        }
    },
    methods:{
        input_num(index) {
            
            this['iptValue' + index] = this['iptValue' + index].replace(/[^\d.]/g, "")
            this['iptValue' + index] = index == 0 ? this['iptValue' + index].replace(/\.{2,}/g, ".") : `${parseInt(this['iptValue' + index]? this['iptValue' + index] : 0)}`
            this['iptValue' + index] = this['iptValue' + index].replace(/^\./g, "")
            this['iptValue' + index] = this['iptValue' + index].replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
            this['iptValue' + index] = index == 0 ? this['iptValue' + index].replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') : `${parseInt(this['iptValue' + index]? this['iptValue' + index] : 0)}` 
        },
        close(){
            this.iptValue0 = null
            this.iptValue1 = null
            this.visible = false
        },
        show(){
            this.visible = true
        }
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
.config {
    width:100%;
    max-width: 422px;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    padding: 0px;
}
.bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.bar span {
    color: #000;
    font-size: 16px;
}
.bar img {
    width: 20px;
    height: 20px;
}
.tip-info {
    margin-top: 15px;
    color: #9c9c9c;
    font-size: 12px;
    display: flex;
    align-items: center;
}
.tip-bw {
    justify-content: space-between;
}
.tip-info img {
    margin-left: 5px;
    width: 14px;
    height: 14px;
}
.slide {
    margin-top: 15px;
    display: flex;
    align-items: center;
}
.slide_btn:hover {
    cursor: pointer;
}
.slide_btn:focus {
    background:#43318C;
    color: white;
}
.slide_last:focus {
    background:#F5F5F5;
    border: 1px solid rgb(206, 208, 217);
    color: #43318C;
}
.slide_btn:hover {
    border: 1px solid rgb(206, 208, 217);
}
.slide_btn {
    -webkit-box-align: center;
    align-items: center;
    height: 2rem;
    border-radius: 5px;
    font-size: 12px;
    width: auto;
    min-width: 3rem;
    outline: none;
    background: #F5F5F5;
    border: 1px solid transparent;
    margin-right: 8px;
    color: #43318C;
}
.last-conf {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    width: 100%;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
}

.last-conf input {
    box-sizing: border-box;
    width: 100%;
    background: #f5f5f5;
    border-radius: 16px;
    border: none;
    font-size: 16px;
    padding: 0px 5px;
    margin: 0px 10px;
    color: #43318C;
    text-align: right;
}
</style>