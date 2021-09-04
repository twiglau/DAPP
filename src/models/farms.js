import {getRate,postWithdrawalData,getOneTokens,getTwoTokens,getCurrencyIndex} from '@/utils/api'
import Wallet from '@/utils/Wallet.js';
import Deposits from './deposits'

function getCookie(key){
    var arr1=document.cookie.split("; ");//由于cookie是通过一个分号+空格的形式串联起来的，所以这里需要先按分号空格截断,变成[name=Jack,pwd=123456,age=22]数组类型；
    for(var i=0;i<arr1.length;i++){
        var arr2=arr1[i].split("=");//通过=截断，把name=Jack截断成[name,Jack]数组；
        if(arr2[0]==key){
            return decodeURI(arr2[1]);
        }
    }
}

function Farms(address,upperAddress){
    this.address = address || (localStorage.getItem("walletAddress") || '');
    this.upperAddress = upperAddress || (getCookie('inviteAddress') || '');
    this.amount = 0;
    this.currency1 = null;
    this.currency2 = null;
    this.ones = [];
    this.twos = [];
    //授权状态
    this.approveTokens = [
      {currency:"ETH",isApproved:false},
      {currency:"BNB",isApproved:false},
      {currency:"BTC",isApproved:false},
      {currency:"USDT",isApproved:false},
      {currency:"Libra",isApproved:false},
      {currency:"FIL",isApproved:false}
    ];
    //某个币种授权信息
    this.approveInfo = {};
}

/**
 * 刷新数据
 */
Farms.prototype.refreshData = function(){
   let _self = this
   _self.getMySingleCoinsLockData()
   _self.getMyPairCoinsLockData()
   _self.getLockAmount()
   _self.getPairLockAmount()
}
Farms.prototype.caluUseable = function(currency,key,index1,index2,array){
    let libra_eth_1 = array.filter(ele => index2 == -1 ? ele.currencyIndex == index1 :  ele.currency1Index == index1 && ele.currency2Index == index2)
                                    .reduce((currentTotal,item) => {
                                        let num = +item[key]
                                        return num + currentTotal
                                    },0)  || 0
    console.log(currency,key,index1,index2,libra_eth_1)
    if(libra_eth_1){ libra_eth_1 = Number(libra_eth_1 / Wallet.Precisions(currency)) }
    return libra_eth_1
},
/**
 * 获取我的单币种锁仓
 * @returns 
 */
Farms.prototype.getMySingleCoinsLockData = async function(){
  let _self = this
  let deposit = new Deposits()
  const one = await deposit.checkHasMyLockData()
  if(one && one > 0){

    _self.ones.forEach(ele => {ele.lockAmount = 0;ele.oneRecords = [];})
    deposit.getMyLockAmount()
    .then(res => {
      //格式化数据 0-ETH  1-BNB 3-BTC 4-USDT
      //返回  1libra.   2btc. 3eth.  4usdt.  5bnb.  6fil
      for(let i = 0,len = _self.ones.length; i < len; i++){
        let index = getCurrencyIndex(_self.ones[i].currency)
        _self.ones[i].lockAmount += _self.caluUseable(_self.ones[i].currency,'useableAmount',index,-1,res)
        _self.ones[i].oneRecords.push(...(res.filter(ele => ele.currencyIndex == index) || []))
      }
    })
  }
  
}
/**
 * 获取我的双币种锁仓
 * @returns 
 */
Farms.prototype.getMyPairCoinsLockData = async function(){
  let _self = this
  let deposit = new Deposits()
  const two = await deposit.checkHasMyPairLockData()
  if(two && two > 0){
    _self.twos.forEach(ele => {ele.lockAmount1 = 0;ele.lockAmount2 = 0;ele.twoRecords=[];})
    deposit.getMyPairLockAmount()
    .then(res => {
      for(let i = 0,len = _self.twos.length; i < len; i++){
          let index1 = getCurrencyIndex(_self.twos[i].currency1)
          let index2 = getCurrencyIndex(_self.twos[i].currency2)
          _self.twos[i].lockAmount1 += _self.caluUseable(_self.twos[i].currency1,'useableAmount1',index1,index2,res)
          _self.twos[i].lockAmount2 += _self.caluUseable(_self.twos[i].currency2,'useableAmount2',index1,index2,res)
          _self.twos[i].twoRecords.push(...(res.filter(ele => ele.currency1Index == index1 && ele.currency2Index == index2) || []))

      }
      //格式化数据 0-Libra/ETH  1-Libra/BNB 3-Libar/USDT 4-Libra/BTC 5-Libra/FIL
      //返回  1libra.   2btc. 3eth.  4usdt.  5bnb.  6fil
    })
  }

}
/**
 * 获取币种
 * @returns 币种
 */
Farms.prototype.getTokens = function(){
  let _self = this
  return new Promise((resolve,reject) => {
    Promise.all([getOneTokens(),getTwoTokens()])
    .then(res => {
      _self.ones = res[0]
      _self.twos = res[1]
      _self.getRatePairs()
      _self.updateCurrencyApprovedStatus()
      resolve(res)
    })
    .catch(err => {
      reject(err)
    })
  })
}

//年收益率
Farms.prototype.getRatePairs = async function(){
  let _self = this
  const res = await Promise.all([getRate({type:1}),getRate({type:2})])
  const result1 = res[0].result, result2 = res[1].result;
  _self.ones = _self.ones.map(ele => {
    const data = {...ele}
    const find = result1.find(fd => fd.token1 == ele.currency)?.rate || 0
    data.rateOfAnnualized = find
    return data
  })

  _self.twos = _self.twos.map(ele => {
    const data = {...ele}
    const find = result2.find(fd => fd.token1 == ele.currency2.toUpperCase() && fd.token2 == ele.currency1.toUpperCase()).rate || 0
    data.rateOfAnnualized = find
    return data
  })
},

/**
 * 双币锁仓计算
 */
 Farms.prototype.getPairLockAmount = function(){
  let _self = this
  new Promise((resolve,reject) => {
    try {
        let promiseAllarr = []
        for(let i = 0; i < _self.twos.length;i++){
          promiseAllarr[i] = new Promise((res) => {

            Promise.all([
              new Promise((res1,rej) => {
                Wallet.twoUseableBalance1(_self.twos[i].currency2,(in_a)=>{
                  let val = +in_a
                  if(val > 0) val = Number(in_a / Wallet.Precisions())
                  if(val < -0.01) val = 0
                  res1(val)
                },(err) =>{rej(err)})
              }),
              new Promise((res1,rej) => {
                Wallet.twoUseableBalance2(_self.twos[i].currency2,(in_a)=>{
                  let val = +in_a
                  if(val > 0) val = Number(in_a / Wallet.Precisions())
                  if(val < -0.01) val = 0
                  res1(val)
                },(err) =>{rej(err)})
              })
            ])
            .then((in_out) => {
                _self.twos[i].totalLockAmount1 = +in_out[0]
                _self.twos[i].totalLockAmount2 = +in_out[1] 
                _self.twos[i].isLoading = false
                res('success')
            })
            .finally(() => {
                _self.twos[i].isLoading = false
                res('success')
            })

          })
        }
        //全部请求
        Promise.all(promiseAllarr).then(() => {
          resolve('success')
        }).catch(err => {
          reject(err)
        })
    }catch(err){
        reject(err)
        _self.$message.error(_self.$t('l.catch_err'))
    }
  })
}
/**
 * 单币锁仓计算
 */
Farms.prototype.getLockAmount = function(){
  let _self = this
  new Promise((resolve,reject) => {
    try {
        let promiseAllarr = []
        for(let i = 0; i < _self.ones.length;i++){
          promiseAllarr[i] = new Promise((res) => {

            Promise.all([
              new Promise((res1,rej) => {
                Wallet.oneUseableBalance(_self.ones[i].currency,(in_a)=>{
                  let val = +in_a
                  if(val > 0) val = Number(in_a / Wallet.Precisions())
                  if(val < -0.01) val = 0
                  res1(val)
                },(err) =>{rej(err)})
              })
            ])
            .then((in_out) => {
                _self.ones[i].totalLockAmount = in_out[0]
                _self.ones[i].isLoading = false
                res('success')
            })
            .finally(() => {
                _self.ones[i].isLoading = false
                res('success')
            })
          })
        }
        //全部请求
        Promise.all(promiseAllarr).then(() => {
          resolve('success')
        }).catch(err => {
          reject(err)
        })
    }catch(err){
        reject(err)
        _self.$message.error(_self.$t('l.catch_err'))
    }
  })
}
Farms.prototype.updateCurrencyApprovedStatus = async function(){
    let _self = this
    const approvedArray = await this.getCoinsApprovedStatus()
    if(approvedArray && approvedArray.length > 0){
        
        //更新 approvedArray
        for(let i = 0,len = approvedArray.length; i < len; i++){
           _self.approveTokens[i].isApproved = approvedArray[i]
        }
        //更新oneTokens
        _self.ones.forEach(ele => {
          const whichCoins = _self.approveTokens.find(app => app.currency === ele.currency)
          ele.isApproved = whichCoins?.isApproved
        })
        //更新twoTokens
        _self.twos.forEach(ele => {
          const whichCoins1 = _self.approveTokens.find(app => app.currency === ele.currency1)
          const whichCoins2 = _self.approveTokens.find(app => app.currency === ele.currency2)
          ele.isApproved1 = whichCoins1?.isApproved
          ele.isApproved2 = whichCoins2?.isApproved
        })
    }
}

Farms.prototype.getCoinsApprovedStatus = function(){
    let _self = this
    return new Promise((resolve,reject) => {
      try {
          let promiseAllarr = []
          for(let i = 0; i < _self.approveTokens.length;i++){
            promiseAllarr[i] = new Promise((res,rej) => {
                Wallet.queryAllowance(_self.address,_self.approveTokens[i].currency,(pro)=>{
                    if(pro && pro > 0) {
                        res(true)
                    }else {
                        res(false)
                    }
                },(err) =>{rej(err)})
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
/**
 * 
 * @param {*} type  //1 - 单币 2 - 双币
 * @param {*} item  //某个币种信息
 */
Farms.prototype.approveTokens = async function(type,item){
    let _self = this
    _self.approveInfo = item
    if (type == 1){
      _self.approveInfo.isApproving = true
      Wallet.approve(_self.currency1.toUpperCase(),_self.address,10000000,(res)=>{

        _self.approveInfo.isApproving = false
          if(res && res > 0){
            _self.approveInfo.isApproved = true
          }
      },(err) => {
         _self.approveInfo.isApproving = false
      });
    }else {
      const {isApproved1,isApproved2} = _self.approveInfo
      if(!isApproved1 && isApproved2) {
        _self.approveInfo.isApproving1 = true
        const approveCur1 = new Promise((resolve,reject) => {
            Wallet.approve(_self.currency1,_self.address,10000000,(res)=>{
                resolve(res)
            },(err) => {_self.approveInfo.isApproving1 = false; reject(err)})
        })
        const cur1_status = await approveCur1
        _self.approveInfo.isApproved1 = cur1_status && cur1_status > 0 ? true : false
        _self.approveInfo.isApproving1 = false
      }else if (isApproved1 && !isApproved2){
        _self.approveInfo.isApproving2 = true
        const approveCur2 = new Promise((resolve,reject) => {
            Wallet.approve(_self.currency2,_self.address,10000000,(res)=>{
                resolve(res)
            },(err) => {_self.approveInfo.isApproving2 = false; reject(err)})
        })
        const cur2_status = await approveCur2
        _self.approveInfo.isApproved2 = cur2_status && cur2_status > 0 ? true : false
        _self.approveInfo.isApproving2 = false

      }else {

        _self.approveInfo.isApproving1 = true
        const approveCur1 = new Promise((resolve,reject) => {
            Wallet.approve(_self.currency1,_self.address,10000000,(res)=>{
                resolve(res)
            },(err) => {_self.approveInfo.isApproving1 = false; reject(err)})
        })
        const approveCur2 = new Promise((resolve,reject) => {
            Wallet.approve(_self.currency2,_self.address,10000000,(res)=>{
                resolve(res)
            },(err) => {_self.approveInfo.isApproving2 = false;reject(err)})
        })
        const cur1_status = await approveCur1
        _self.approveInfo.isApproved1 = cur1_status && cur1_status.length > 0 ? true : false;
        _self.approveInfo.isApproving1 = false

        _self.approveInfo.isApproving2 = true
        const cur2_status = await approveCur2
        
        _self.approveInfo.isApproved2 = cur2_status && cur2_status > 0 ? true : false;
        _self.approveInfo.isApproving2 = false;

      }
    }
    //最后更新授权状态数据
    _self.updateCurrencyApprovedStatus()
}

/**
 * 单币种提取
 * @returns Promise
 */
Farms.prototype.withDrawOne = function(){
   let _self = this
   return new Promise((resolve,reject) => {
        Wallet.takeoutOne(_self.address,_self.currency1,_self.amount, (res)=>{
            console.log(res)
            if(res){
                postWithdrawalData({address:_self.address,amount:_self.amount,parentAddress:_self.upperAddress,token1:_self.currency1})
                .then(res => {
                    const {status} = res
                    if(status == 200){
                        resolve('success')
                    }else{
                        reject('network error')
                    }
                })
            }

        }, (err)=>{
            reject(err)
        })
   })
}

/**
 * 双币种提取
 * @returns Promise
 */
Farms.prototype.withDrawTwo = function(){
   let _self = this
   return new Promise((resolve,reject) => {
        Wallet.takeoutTwo(_self.address,_self.amount,_self.currency2,(res)=>{

            if(res){
            postWithdrawalData({address:_self.address,amount:_self.amount,parentAddress:_self.upperAddress,token1:_self.currency1,token2:_self.currency2})
            .then(res => {
                const {status} = res
                if(status == 200){
                    resolve('success')
                }else{
                    reject('network error')
                }
            })
            }
        }, (err)=>{
           reject(err)
        })
   })
}
/**
 * 存入单币种
 */
Farms.prototype.depositOneCurrency = function(){
    return new Promise((resolve,reject) => {
        Wallet.depositOne(this.upperAddress,this.address,this.currency1,this.amount,(res)=>{
            resolve(res)
          },(err)=>{
            reject(err)
        })
    })
}
/**
 * 存入双币种
 */
Farms.prototype.depositTwoCurrency = function(){
    return new Promise((resolve,reject) => {
        Wallet.depositTwo(this.upperAddress,this.address,this.amount,this.currency2,(res)=>{
            resolve(res)
          },(err)=>{
            reject(err)
        })
    })
}
/**
 * 
 * @param {*} type  // 1 - 单币种  2-双币种
 * @returns 
 */
Farms.prototype.configDepositInfo = function(type){
    let _self =  this
    let needData = type == 1 ? [
        new Promise((resolve,rej) => {
            Wallet.balanceOf(_self.currency1,_self.address,(res)=>{
                resolve(Number(res ? res : 0))
            },(err) =>{rej(err)})
        }),
        new Promise((resolve,rej) => {
             Wallet.queryPrice(_self.currency1.toLowerCase(),(res)=>{
               resolve(Number(res ? res : 1))
             },(res)=>{
               rej(err)
             })
        })
      ] : [
        new Promise((resolve) => {
              Wallet.balanceOf(_self.currency1,_self.address,(res)=>{
                  resolve(Number(res ? res : 0))
              },(err) =>{rej(err)})
        }),
        new Promise((resolve,reject) => {
             Wallet.queryPrice(_self.currency2.toLowerCase(),(res)=>{
               resolve(Number(res ? res : 1))
             },(err)=>{
               reject(err)
             })
        }),
        new Promise((resolve,reject) => {
             Wallet.queryPrice(_self.currency1.toLowerCase(),(res)=>{
               resolve(Number(res ? res : 1))
             },(err)=>{
               reject(err)
             })
        })
      ]
    
    return Promise.all(needData)
}
export default Farms;