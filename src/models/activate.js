import Wallet from '@/utils/Wallet.js';
function Activate(user,upper) {
  this.user = user
  this.upper = upper;
}
Activate.prototype.checkActivate = function(){
    let _self = this
    return new Promise((resolve,reject) => {
        Wallet.queryUpUser(_self.user,(res) =>{
            resolve(res)
        },(err) => {
            reject(err)
        })
    })
}

Activate.prototype.activateUser = function(){
    let _self = this
    return new Promise((resolve,reject) => {
      Wallet.activate(_self.user,_self.upper,(res) =>{
          resolve(res)
      },(err) => {
        reject(err)
      })
    })
}

export default Activate
