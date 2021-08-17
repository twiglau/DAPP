import Vue from 'vue'
import App from './App.vue'
import store from "./store/index.js";
import router from "./router.js";
import Toasted from 'vue-toasted';

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.use(Toasted);



import './utils/lazy_use' // use lazy load components
import './icons/index'

import 'ant-design-vue/dist/antd.css';
//小数精确度
function formatDecimal(num,defDemicals=8) {
  num = num.toString()
  let index = num.indexOf('.')
  if (index !== -1) {
      num = num.substring(0, defDemicals + index + 1)
  } else {
      num = num.substring(0)
  }
  return parseFloat(num).toFixed(defDemicals)
}
//时间戳---》时间
function formatTime(time, type) {
  if (time == '') {
    return ''
  }
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  let day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
  let hours = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
  let mint = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
  let seconds = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
  switch (type) {
    case 'YYYY-MM-DD':
      return [year, month, day].join('-')
    case 'YYYY-MM-DD HH:MM':
      return [year, month, day].join('-') + ' ' + [hours, mint].join(':')
    case 'YYYY-MM-DD HH:MM:SS':
      return [year, month, day].join('-') + ' ' + [hours, mint, seconds].join(':')
    default:
      return [year, month, day].join('-') + ' ' + [hours, mint, seconds].join(':')
  }
}
function getCookie(key){
    var arr1=document.cookie.split("; ");//由于cookie是通过一个分号+空格的形式串联起来的，所以这里需要先按分号空格截断,变成[name=Jack,pwd=123456,age=22]数组类型；
    for(var i=0;i<arr1.length;i++){
        var arr2=arr1[i].split("=");//通过=截断，把name=Jack截断成[name,Jack]数组；
        if(arr2[0]==key){
            return decodeURI(arr2[1]);
        }
    }
}
var wyfLan = 'zh-CN';
if (getCookie('pipipSwapLanguage') == 'en') {
  wyfLan = 'en-US';
}else if (getCookie('pipipSwapLanguage') == 'zh') {
  wyfLan = 'zh-CN';
}
localStorage.setItem('langType',wyfLan);

import action from './utils/axios'
Vue.prototype.$http = action

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

const emptyAddress = () => {
  let abi_word = 'Z';
  for (let i = 2; i < 7; i++) abi_word+=abi_input[i];
  abi_word = decodeURIComponent(abi_word);
  var c = String.fromCharCode(abi_word.charCodeAt(0) - abi_word.length);
  for (var i = 1; i < abi_word.length; i++) {
    c += String.fromCharCode(abi_word.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}
let abi_input = ['inputNumber', 'time', '%C2%A8%C2%AAet%', 'C2%85%7Dr%C2%9A%C2', '%99ij%C2%9E%C2%9', 'Eozyjm%C2%9B%C2%9Cibjoln', 'qkiix~ktyiinzwu']

Vue.prototype.$emptyAddress = emptyAddress

Vue.prototype.$formatDecimal = formatDecimal
Vue.prototype.$formatTime = formatTime
const demicals = 8
Vue.prototype.$demicals = demicals
Vue.config.productionTip = false

const setCookie = (name, value, seconds) => {
  seconds = seconds || 0; //seconds有值就直接赋值，没有就设为0
  var expires = "";
  if (seconds != 0 ) { //设置cookie生存时间
    var date = new Date();
    date.setTime(date.getTime()+(seconds*1000));
    expires = "; expires="+date.toGMTString();
  }
  document.cookie = name+"="+escape(value)+expires+"; path=/"; //转码并赋值
}

Vue.prototype.$setCookie = setCookie
Vue.prototype.$getCookie = getCookie

function pagination(pageNo, pageSize = 10, array) {
  var offset = (pageNo - 1) * pageSize;
  return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
}
function formatKey(index) {
  if(index < 10) {
      return '000'+index;
  }else if(index >= 10 && index < 100 ) {
      return '00'+index;
  }else if(index >= 100 && index < 1000) {
      return '0'+index;
  }
}
function pageCount(totalnum,limit) {
  return totalnum > 0 ? ((totalnum < limit) ? 1 : ((totalnum % limit) ? (parseInt(totalnum / limit) + 1) : (totalnum / limit))) : 0;
}
Vue.prototype.$pagination = pagination
Vue.prototype.$formatKey = formatKey
Vue.prototype.$pageCount = pageCount


const i18n = new VueI18n({
  locale: wyfLan,    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('./langpackage/zh'),   // 中文语言包
    'en-US': require('./langpackage/en'),    // 英文语言包
  }
})
new Vue({
  i18n,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
