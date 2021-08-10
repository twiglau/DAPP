<template>
    <div class="swap_container">
        <div class="swap-info">
        <Spin class="global_loading" tip="loading" :spinning="spinStatus" size="large">
            <div class="top_info">
                <div class="top_info_left">
                   <div class="top_info-title">SWAP</div>
                   <div class="top_info-sub">
                       <img src="../assets/Star_icon.png" alt="">
                       <span>Swap 100 USDT for 100 LBR</span>
                   </div>
                </div>
                <div class="top_info_right">
                    <img src="../assets/Setting_icon.png" alt="">
                </div>
            </div>
            
        </Spin>
        </div>
    </div>
</template>
<script>
import countTo from 'vue-count-to';
import { Spin } from 'ant-design-vue'
export default {
    name:'swap',
    components: {
        countTo,
        Spin
    },
    computed: {
    },
    data() {
        return {
            spinStatus:false,
        }
    },
    methods: {}
}
</script>
<style scoped>
.swap-info {
    position: relative;
    max-width: 420px;
    width: 100%;
    background: rgb(255, 255, 255);
    box-shadow: rgb(171 133 115 / 16%) 0px 2px 10px;
    border-radius: 20px;
    padding: 20px;
    border: 2px solid #43318C;
    margin: 0 auto;
}
.top_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.top_info-title {
    color: black;
    font-size: 16px;
}
.top_info-sub {
    color: #3C3C3C;
    font-size: 12px;
}
.top_info-sub img {
    width: 16px;
    height: 16px;
}
.top_info-sub span {
    margin-left: 6px;
}
.top_info_right {
    width: 48px;
    height: 48px;
}
.top_info_right img {
    width: 100%;
    height: 100%;
}
</style>