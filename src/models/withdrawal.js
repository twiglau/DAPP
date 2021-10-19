import Wallet from '@/utils/Wallet.js';
function Withdrawal(address) {
    this.address = address || (localStorage.getItem("walletAddress") || '')
    this.oneSize = 0;
    this.twoSize = 0;
    this.records = [];
}

Withdrawal.prototype.checkWithdrawalOneData = function(){
    let _self = this
    return new Promise((resolve,reject) => {
      Wallet.queryOneTakeoutSize(_self.address,(res) =>{
          _self.oneSize = +res || 0
          if(_self.oneSize > 0) _self.getWithdrawalOne()
          resolve(_self.oneSize)
      },(err) => {
          reject(err)
      })
    })
}

Withdrawal.prototype.getWithdrawalOne = function(start = 0, end = 1){
    let _self = this
    return new Promise((resolve,reject) => {
      try {
        let promiseMyLockArr = [],resultLockArr = [];
        let i = start;
        end = end > _self.oneSize ? _self.oneSize : end
        do {
          promiseMyLockArr[i] = new Promise((res,rej) => {
              Wallet.queryOneTakeoutRecord(_self.address,i,(record) => {
                
                if(record){
                  resultLockArr.push(record)
                  res(record)
                }else{
                  rej('error')
                }
              },(err) => {rej(err)})
          })
          ++i;

        } while (i < end);

        //全部请求,可能失败, finally接收
        Promise.all(promiseMyLockArr).then((res) => {
          resolve(res)
          _self.records.push(...resultLockArr)
          _self.records.sort((a,b) => a?.depositTime - b?.depositTime)

          //格式化数据 0-ETH  1-BNB 3-BTC 4-USDT
          //返回  1libra.   2btc. 3eth.  4usdt.  5bnb.  6fil
          //这里过滤数据, 递归
          if(end < _self.oneSize){
            _self.getWithdrawalOne(end,end + 1)
          }

        })

      } catch (error) {
          reject(error)
      }
    })
  }


Withdrawal.prototype.checkWithdrawalTwoData = function(){
    let _self = this
    return new Promise((resolve,reject) => {
        Wallet.queryTwosSize(_self.address,(res) =>{
            _self.twoSize = +res || 0
            if(_self.twoSize > 0) _self.getWithdrawalTwo()
            resolve(_self.twoSize)
        },(err) => {
            reject(err)
        })
    })
}
Withdrawal.prototype.getWithdrawalTwo = function(start = 0,end = 1){
    let _self = this
    return new Promise((resolve,reject) => {
      try {
        let promiseMyLockArr = [],resultLockArr = [];
        let i = start;
        end = end > _self.twoSize ? _self.twoSize : end
        do {
          promiseMyLockArr[i] = new Promise((res,rej) => {
              Wallet.queryTwoTakeoutRecord(_self.address,i,(record) => {
                if(record){
                  resultLockArr.push(record)
                  res(record)
                }else{
                  rej('error')
                }
              },(err) => {rej(err)})
          })
          ++i;

        } while (i < end);

        //全部请求可能失败, finally接收
        Promise.all(promiseMyLockArr)
        .then((res) => {
          resolve(res)
          // TODO: 放入定时器后, 需要清除lockAmount,防止累加
          _self.records.push(...resultLockArr)
          _self.records.sort((a,b) => a?.depositTime - b?.depositTime)
          //这里过滤数据, 递归
          if(end < _self.twoSize){
            _self.getWithdrawalTwo(end,end + 1)
          }
        })
      } catch (error) {
          reject(error)
      }
    })
}

export default Withdrawal;
