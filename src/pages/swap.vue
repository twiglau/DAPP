<template>
    <div class="swap_container">
        <Spin class="global_loading" tip="loading" :spinning="spinStatus" size="large">
            
        </Spin>
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

</style>