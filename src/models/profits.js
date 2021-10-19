import Wallet from '@/utils/Wallet.js';
function Profits(address){
    this.address = address || localStorage.getItem('walletAddress');
    this.dataSize = 0;
    this.records = [];
}


Profits.prototype.checkHasTiquData = function(){
    let _self = this
    return new Promise((resolve,reject) => {
      Wallet.queryTakeoutIncomeRecordSize(_self.address,(res) =>{
          let result = +res || 0
          _self.dataSize = result
          resolve(_self.dataSize)
      },(err) => {
          reject(err)
      })
    })
  }
Profits.prototype.getTiquRecord = function(start = 0, end = 1){
    let _self = this
    return new Promise((resolve,reject) => {
      try {
        let promiseRecordArr = [],resultRecordArr = [];
        let i = start;
        do {
          end = end > _self.dataSize ? _self.dataSize : end
          promiseRecordArr[i] = new Promise((res,rej) => {
              Wallet.queryTakeoutIncomeRecord(_self.address,i,(record) => {
                if(record){
                  resultRecordArr.push(record)
                  res(record)
                }else{
                  rej('error')
                }
              },(err) => {rej(err)})
          })
          ++i;

        } while (i < end);

        //全部请求,可能失败, finally接收
        Promise.all(promiseRecordArr).then((res) => {
          resolve(res)
          _self.records.push(...resultRecordArr)
          //这里过滤数据, 递归
          if(_self.dataSize > end){
            _self.getTiquRecord(end,end + 1)
          }
        })

      } catch (error) {
          reject(error)
      }
    })
}
Profits.prototype.checkHasIncomeData = function(){
    let _self = this
    return new Promise((resolve,reject) => {
      Wallet.queryIncomeSize(_self.address,(res) =>{
          let result = +res || 0
          _self.dataSize = result
          resolve(_self.dataSize)
      },(err) => {
          reject(err)
      })
    })
}
Profits.prototype.getProfitRecord = function(start = 0, end = 1){
    let _self = this
    return new Promise((resolve,reject) => {
      try {
        let promiseRecordArr = [],resultRecordArr = [];
        let i = start;
        do {
          end = end > _self.dataSize ? _self.dataSize : end
          console.log({address:_self.address,i})
          promiseRecordArr[i] = new Promise((res,rej) => {
              Wallet.incomeRecord(_self.address,i,(record) => {
                console.log({record,i})
                if(record){
                  resultRecordArr.push(record)
                  res(record)
                }else{
                  rej('error')
                }
              },(err) => {rej(err)})
          })
          ++i;

        } while (i < end);

        //全部请求,可能失败, finally接收
        Promise.all(promiseRecordArr).then((res) => {
          resolve(res)
          _self.records.push(...resultRecordArr)//takeoutTime
          _self.records.sort((a,b) => b?.time - a?.time)
          _self.records.sort((a,b) => b?.takeoutTime - a?.takeoutTime)
          //这里过滤数据, 递归
          if(_self.dataSize > end){
            _self.getProfitRecord(end,end + 1)
          }
        })

      } catch (error) {
          reject(error)
      }
    })
}
export default Profits