
import VueI18n from 'vue-i18n'

function getCookie(key){
    var arr1=document.cookie.split("; ");//由于cookie是通过一个分号+空格的形式串联起来的，所以这里需要先按分号空格截断,变成[name=Jack,pwd=123456,age=22]数组类型；
    for(var i=0;i<arr1.length;i++){
        var arr2=arr1[i].split("=");//通过=截断，把name=Jack截断成[name,Jack]数组；
        if(arr2[0]==key){
            return decodeURI(arr2[1]);
        }
    }
}

var wyfLan = 'en-US';
if (getCookie('pipipSwapLanguage') == 'en') {
  wyfLan = 'en-US';
}else if (getCookie('pipipSwapLanguage') == 'zh') {
 wyfLan = 'zh-CN';
}else if (getCookie('pipipSwapLanguage') == 'ja') {
  wyfLan = 'ja';
}else if (getCookie('pipipSwapLanguage') == 'ko') {
  wyfLan = 'ko';
}
const i18n = new VueI18n({
    locale: wyfLan,    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
      'zh-CN': require('../langpackage/zh'),   // 中文语言包
      'en-US': require('../langpackage/en'),    // 英文语言包
      'ko': require('../langpackage/ko'),    // 韩文语言包
      'ja': require('../langpackage/jp'),    // 日文语言包
    }
})

export function error(str){
    let msg = null
    let jsonStr = str
    
    if(jsonStr.indexOf("message") !== -1 && jsonStr.indexOf("data") !== -1){
        let start_x = jsonStr.indexOf("message")
        let end_x = jsonStr.lastIndexOf("data")
        const result = str.slice(start_x + 10,end_x-5)
        jsonStr = result.replace("/","").replace("\\","")
        console.log({jsonStr})
    }//格式化...
    msg = jsonStr
    //为空?
    if(!jsonStr || jsonStr.length < 1){
        msg = i18n.t('l.l_error_log_1')
    }
    //指定?
    if(jsonStr.indexOf('101') !== -1){
        msg = i18n.t('l.l_error_log_3')
    }
    if(jsonStr.indexOf('10001') !== -1){
        msg = i18n.t('l.l_error_log_4')
    }
    if(jsonStr.indexOf('102') !== -1){
        msg = i18n.t('l.l_error_log_5')
    }
    if(jsonStr.indexOf('103') !== -1){
        msg = i18n.t('l.l_error_log_6')
    }
    if(jsonStr.indexOf('104') !== -1){
        msg = i18n.t('l.l_error_log_7')
    }
    if(jsonStr.indexOf('201') !== -1 || jsonStr.indexOf('302') !== -1){
        msg = i18n.t('l.l_error_log_8')
    }
    if(jsonStr.indexOf('202') !== -1 || jsonStr.indexOf('303') !== -1){
        msg = i18n.t('l.l_error_log_9')
    }
    if(jsonStr.indexOf('No deposit history') !== -1){
        msg = i18n.t('l.l_error_log_10')
    }
    if(jsonStr.indexOf('execution reverted') !== -1){
        msg = i18n.t('l.l_error_log_11')
    }
    if(jsonStr.indexOf('509') !== -1 || jsonStr.indexOf('520') !== -1){
        msg = i18n.t('l.l_error_log_11')
    }
    if(jsonStr.indexOf('User denied') !== -1){
        msg = i18n.t('l.l_error_log_12')
    }
    if(jsonStr.indexOf('underPriced') !== -1){
        msg = i18n.t('l.l_error_log_13')
    }
    if(jsonStr.indexOf('Dapp browser') !== -1){
        msg = i18n.t('l.no_dapp_liulanqi');
    }
    if(jsonStr.indexOf('Error-title') !== -1){
        msg = i18n.t('l.notmainnet_title')
    }
    if(jsonStr.indexOf('signing you in') !== -1){
        msg = i18n.t('l.no_signin_liu')
    }
    if(jsonStr.indexOf('A-Success') !== -1) {
        msg = i18n.t('l.no_approved_success')
    }
    if(jsonStr.indexOf('A-A-Success') !== -1){
        msg = i18n.t('l.no_approved_success_tip')
    }
    if(jsonStr.indexOf('A-failed') !== -1){
        msg = i18n.t('l.no_approved_failed')
    }
    if(jsonStr.indexOf('A-A-Failed') !== -1){
        msg = i18n.t('l.no_approved_failed_tip')
    }
    

    return msg
}