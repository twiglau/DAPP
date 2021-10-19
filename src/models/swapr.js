import Wallet from '@/utils/Wallet.js';
function Swapr(address) {
    this.address = address || (localStorage.getItem("walletAddress") || '')
    this.oneSize = 0;
    this.records = [];
}

Swapr.prototype.querySize = function(){
    let _self = this
    return new Promise((resolve,reject) => {
      Wallet.queryExchangeRecordSize(_self.address,(res) =>{
          _self.oneSize = +res || 0
          if(_self.oneSize > 0) _self.getRecords()
          resolve(_self.oneSize)
      },(err) => {
          reject(err)
      })
    })
}

Swapr.prototype.getRecords = function(start = 0, end = 1){
    let _self = this
    return new Promise((resolve,reject) => {
      try {
        let promiseMyLockArr = [],resultLockArr = [];
        let i = start;
        end = end > _self.oneSize ? _self.oneSize : end
        do {
          promiseMyLockArr[i] = new Promise((res,rej) => {
              Wallet.exchangeRecord(_self.address,i,(record) => {
                
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
          _self.records.sort((a,b) => b.time - a.time)

          //格式化数据 0-ETH  1-BNB 3-BTC 4-USDT
          //返回  1libra.   2btc. 3eth.  4usdt.  5bnb.  6fil
          //这里过滤数据, 递归
          if(end < _self.oneSize){
            _self.getRecords(end,end + 1)
          }

        })

      } catch (error) {
          reject(error)
      }
    })
}
export default Swapr
