import Activate from "../models/activate";
import {error} from '@/utils/errorLog';
export default  {
  data(){
    return {
      inviteAddress:null,
      activate:null,
    }
  },
  beforeCreate() {
  },
  mounted(){},
  methods:{
     error,
     async checkUserInfo(){
       let _self = this
       setTimeout(async ()=> {
          //获取钱包地址是异步的,延迟获取
          try {
            _self.activate = new Activate(_self.walletAddress,null)
            const res = await _self.activate.checkActivate()
            const {upperAddress} = res
            console.log({'检测是否有上级地址:':upperAddress})
            if(upperAddress.indexOf('0x00000000000000000000000000') !== -1){
              //没有上级地址
              _self.$store.commit('accounts/setUpperAccount',null)
              _self.$store.commit('accounts/setIsActiveUpper',false)

              let invite_d = _self.$route.query.address
              console.log({'没有有上级地址,但是路径中有地址吗:':invite_d})
              if(invite_d && invite_d.length > 0) {
                  //绑定
                  _self.activate.upper = invite_d
                  const bindUser = await _self.activate.activateUser()
                  console.log({'没有有上级地址,但是路径中有地址,激活结果:':bindUser})
                  if(bindUser.result && bindUser.result.length > 0) {
                    _self.inviteAddress = invite_d

                    _self.$store.commit('accounts/setUpperAccount',invite_d)
                    _self.$store.commit('accounts/setIsActiveUpper',true)
                  }
              }else {
                  console.log('没有有上级地址,同时路径中也没有有地址,不会激活')
                  _self.inviteAddress = null
                  _self.$store.commit('accounts/setUpperAccount',null)
                  _self.$store.commit('accounts/setIsActiveUpper',false)
              }
            }else{
              _self.inviteAddress = upperAddress
              _self.$store.commit('accounts/setUpperAccount',upperAddress)
              _self.$store.commit('accounts/setIsActiveUpper',true)
            }
          } catch (error) {
            let msg = JSON.stringify(error.message || error)
            let msg_log = _self.error(msg)
            _self.$message.error(msg_log)
            _self.inviteAddress = null
            _self.$store.commit('accounts/setUpperAccount',null)
            _self.$store.commit('accounts/setIsActiveUpper',false)
          }
       },1000);
     }
  }

}
