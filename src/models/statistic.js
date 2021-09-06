
import Wallet from '@/utils/Wallet.js';
import {currencyMap} from '@/utils/api';
function Statistic(){
   this.coins = currencyMap;
   this.totalLock = 0;
   this.destroyedAmount = 0;
   this.feeAmount = 0;
}


    //计算总锁仓
Statistic.prototype.getPlatformLockAmount = function(){
    let _self = this
    return new Promise((resolve,reject) => {
        try {
            let promiseAllarr = []
            for(let i = 0; i < _self.coins.length;i++){
            console.log(i)
            promiseAllarr[i] = new Promise((res1,rej1) => {
                    Wallet.totalUseableBalance(_self.coins[i].currency,(in_a)=>{
                    let val = +in_a
                    in_a > 0 && (val = Number(in_a / Wallet.Precisions()))
                    val < -0.01 && (val = 0)
                    res1(val)
                    },(err) =>{rej1(err)})
                })
            }
            //全部请求
            Promise.all(promiseAllarr).then((res) => {
            resolve(res)
            }).catch(err => {
            reject(err)
            })
        }catch(err){
            reject(err)
        }
    })
}

Statistic.prototype.calculateStatisticData = async function(){
    let _self = this;
    if(_self.coins[1].price < 3){
       const res = await _self.getCoinsPrice();
       //更新价格
       res.forEach((ele,index) => {
         _self.coins[index].price = (+ele || 1)
       })
    }
    //1. 总锁仓
    var totala = 0;
    for(let i = 0,len = _self.coins.length; i < len; i++){
      let item = _self.coins[i]
      totala += item.price * item.amount
    }
    _self.totalLock = totala
    //2. 总手续费
    const feeAmount = await _self.getFeeTotal()
    _self.feeAmount = feeAmount

    //3. destroyed数量
    const destroyedA = await _self.getDestroyAmount()
    _self.destroyedAmount = destroyedA
}
//获取币种价格
Statistic.prototype.getCoinsPrice = function(){
    let _self = this
    let promiseCoinRequestArray = this.coins.map(ele => {
        return new Promise((resolve,reject) => {
             Wallet.queryPrice(ele.currency.toLowerCase(),(res)=>{
                resolve(Number(res? res : 1))
             },err => {console.log({'getCoinsPrice':err});reject(err);})
        })
    })
    return Promise.all(promiseCoinRequestArray)
}

Statistic.prototype.getFeeTotal = function(){
    let _self = this
    return new Promise((resolve,reject) => {
        Wallet.queryFeeBalance(res => {
            resolve(res)
        },err => { reject(err);console.log({'getFeeTotal':err});})
    })
}
Statistic.prototype.getDestroyAmount = function(){
    return new Promise((resolve,reject) => {
        Wallet.queryLibraDestroyAmount(res => {
            resolve(res)
        },err => { reject(err);console.log({'getDestroyAmount':err});})
    })
}

export default Statistic;