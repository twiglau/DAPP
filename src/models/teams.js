
import Wallet from '@/utils/Wallet.js';
import {currencyMap } from '@/utils/api';
import Deposits from '@/models/deposits';
import Profits from '@/models/profits';

/**
 * team 下 每条线的信息
 * @param {*} line 
 * @param {*} ones 
 * @param {*} twos 
 * @param {*} profits 
 * @param {*} currencys 
 * @param {*} proformanceValue 
 * @param {*} profitValue 
 */
function Aline(line,ones,twos,profits,currencys,proformanceValue,profitValue,address){
    this.line = line || 0
    this.ones = ones || []
    this.twos = twos || []
    this.profits = profits || []
    this.currencys = currencys || currencyMap
    this.proformanceValue = proformanceValue || 0
    this.profitValue = profitValue || 0
    this.address = address
} 

Aline.prototype.calculateDetail = function(item_address){
    let _self = this
    return new Promise(async(resolve,reject) => {
        try{

            //存入信息
            let item_deposit = new Deposits(item_address)
            const oneCount = await item_deposit.checkHasMyLockData()
            
            if(oneCount > 0){
                const oneRecord = await item_deposit.getMyLockAmount(0,oneCount)
                if(oneRecord && oneRecord.length > 0){
                    _self.ones.push(...oneRecord)
                }
            }
            //3.2
            const twoCount = await item_deposit.checkHasMyPairLockData()
            if(twoCount > 0){
                const twoRecord = await item_deposit.getMyPairLockAmount(0,twoCount)
                if(twoRecord && twoRecord.length > 0){
                    _self.twos.push(...twoRecord)
                }
            }
            //3.3
            let item_profit = new Profits(item_address)
            const profitCount = await item_profit.checkHasIncomeData()
            if(profitCount > 0){
                const profitRecord = await item_profit.getProfitRecord(0,profitCount)
                if(profitRecord && profitRecord.length > 0){
                    _self.profits.push(...profitRecord)
                }
            }

            let newLine = new Aline(_self.line,_self.ones,_self.twos,_self.profits,_self.currencys,_self.proformanceValue,_self.profitValue,_self.address)
            resolve(newLine)
        }catch(err){
            reject(err)
        }
    })
}

Aline.prototype.calculateData = async function(){
    let _self = this;
    return new Promise((resolve,reject) => {
        try{
            //2.1. 双币记录计算,币的数量 存入 currencys
            _self.currencys.forEach(ele => ele.amount = 0) // 清零
            _self.proformanceValue = 0
            _self.profitValue = 0

            for(let i = 0,len = _self.twos.length; i < len; i++){
                let item = _self.twos[i];
                for(let j = 0,len_j = _self.currencys.length; j < len_j; j++){
                    
                    let currency = _self.currencys[j];
                    if(item.currency1Index == currency.id){
                        _self.currencys[j].amount += Number(item.useableAmount1) / Wallet.Precisions()
                    }
                    if(item.currency2Index == currency.id){
                        _self.currencys[j].amount += Number(item.useableAmount2) / Wallet.Precisions()
                    }
                }
            }

            //2.2. 单币记录计算,币的数量 存入 currencys
            for(let i = 0, len = _self.ones.length; i < len; i++){
                let item = _self.ones[i]
                for(let j = 0,len_j = _self.currencys.length; j < len_j; j++){
                    
                    let currency = _self.currencys[j];
                    if(item.currencyIndex == currency.id){
                        _self.currencys[j].amount += Number(item.useableAmount) / Wallet.Precisions()
                        console.log({'ones':true,currency:_self.currencys[j].currency,amount:_self.currencys[j].amount})
                    }
                }
            }

            //3. 收益数量
            let libra_profit_amount = _self.profits.reduce((prev,item) => {
                                                    return prev + Number(item.amount)/Wallet.Precisions()
                                                },0)
            
            //4. 某条线的团队业绩
            for(let i = 0,len = _self.currencys.length; i<len;i++){
                let item = _self.currencys[i]
                let rValue = item.price * item.amount
                _self.proformanceValue += rValue
            }

            //5. 某条线团队收益
            _self.profitValue = libra_profit_amount * _self.currencys[0].price; 
            let newLine = new Aline(_self.line,_self.ones,_self.twos,_self.profits,_self.currencys,_self.proformanceValue,_self.profitValue,_self.address)
            
            resolve(newLine)

        }catch(err){
            reject(err)
        }
    })
    
}

function Teams(address){
    this.address = address  || localStorage.getItem('walletAddress');
    this.TeamLines = [] // aline 数组
    this.totalProfit = 0
    this.todayProfit = 0
    this.teamPeople = 0
    this.teamProformance = 0
    this.needTeamProfor = 13*Math.pow(10,5)
    this.teamProfit = 0
    this.leftLevel = 'LV1'
    this.level = 'LV2'
    this.enjoyRatio = '3%'
    this.rightLevel = 'LV3'
    this.status = null
    this.currencyInfos = currencyMap

    this.teamSearching = false
    this.teamLoading = false
}

Teams.prototype.getCoinsPrice = function(){
    let _self = this
    let promiseCoinRequestArray = _self.currencyInfos.map(ele => {
        return new Promise((resolve,reject) => {
             Wallet.queryPrice(ele.currency.toLowerCase(),res =>{
               resolve(Number(res ? res : 1))
             },err =>{ resolve(0)})
        })
    })
    return Promise.all(promiseCoinRequestArray)
}
Teams.prototype.checkNodeCount = async function(address){
    
    return new Promise((resolve,reject) => {
        Wallet.queryDownsSize(address,(res) =>{
          resolve(res)
        },(err) => {
          reject(err)
        })
    })
}

Teams.prototype.getNodeTeamDown = function(address,start = 0, end = 1,total = 1){
    let _self = this
    return new Promise((resolve,reject) => {
      try {
        let promiseDownArr = [],resultDownArr = [];
        let i = start;
        end = end > total ? total : end
        do {
          promiseDownArr[i] = new Promise((res,rej) => {
              Wallet.queryDownUser(address,i,(info) => {
                if(info){
                  resultDownArr.push(info)
                  res(info)
                }else{
                  rej('error')
                }
              },(err) => {rej(err)})
          })
          ++i;

        } while (i < end);

        Promise.all(promiseDownArr)
        .then((res) => {
          resolve(res)
          //这里过滤数据, 递归,或者 total == end 时,不用递归
          if(resultDownArr.length == end && total > end){
            _self.getTeamDown(end,end + 1)
          }
        })
        .catch((err) => { reject(err)})
      } catch (error) {
          reject(error)
      }
    })
}

Teams.prototype.searchNode = async function(address,searchCallBack){
    let _self = this
    const total_a = await _self.checkNodeCount(address)
    const total_num = +total_a || 0
    _self.teamPeople += total_num
    if(total_num > 0){
        //1. 直接下级数量大于0, 取决于有多少个 aline
        const info = await _self.getNodeTeamDown(address,0,total_num,total_num)
        _self.TeamLines = info.map((ele,index) => {
            let currencys = _self.currencyInfos.map(ele => {
                let item = Object.assign({},ele);item.amount = 0;
                return item
            }) // 不能直接引用 currencyInfos, 浅拷贝, 共享数据
            let aline = new Aline(index,[],[],[],currencys,0,0,ele.downAddress)
            return aline
        })
        for(let i = 0, len = _self.TeamLines.length;i<len;i++){
            let aline = _self.TeamLines[i]
            await _self.calculateTeamInfo_whichLine(aline.address,true,aline, async () => {

                console.log({'信息更新':_self.TeamLines})
                for(let i = 0,len = _self.TeamLines.length; i < len; i++){
                    let aline = _self.TeamLines[i]
                    let calc_aline = await aline.calculateData()
                    _self.TeamLines[i] = calc_aline
                }
                
                _self.teamProfit = _self.TeamLines.reduce((prev,item) => {
                    return prev + item.profitValue
                },0);
                if(_self.TeamLines.length < 2){
                    _self.teamProformance = 0
                }else {
                    let tPromans = _self.TeamLines.map(ele => ele.proformanceValue)
                    tPromans.sort(function(a,b){return a - b;});
                    tPromans.pop();
                    
                    _self.teamProformance = tPromans.reduce((prev,item) => {
                        return prev + item
                    },0)
                }
                _self.teamSearching = false
                _self.teamLoading = false
                searchCallBack()
            })
        }

    }else {
        //无下级
        _self.teamLoading = false
        _self.teamSearching = false
        _self.teamProformance = 0
        _self.teamProfit = 0
    }
}

Teams.prototype.calculateTeamInfo_whichLine = async function(address,isTop,aline,callback) {
    let _self = this
    //0. 
    if(isTop){ //顶级节点
      //计算
      let req_line = await aline.calculateDetail(address)
      //计算后,更新TeamLines
      let index = +aline.line
      _self.TeamLines[index] = req_line
    }
    //1. 获得 address 下直接数量
    const total_a = await _self.checkNodeCount(address)
    _self.teamPeople += Number(total_a)
    const total_num = +total_a
    if(total_num > 0){
      //2. 获得 address 下直推下级的地址信息, 获得团队人数
      const info_a = await _self.getNodeTeamDown(address,0,total_num,total_num)
      
      //3. 根据下级地址获得存入记录: 单币记录,双币记录,  返利记录 --> 计算团队业绩,  团队总收益
      if(!info_a || info_a.length == 0) {
          return
      }
      for(let i = 0,len = info_a.length; i < len; i++){
        //3.1 待优化. 定时器线程
        let item = info_a[i]
        let item_address = item.downAddress
        let req_line = await aline.calculateDetail(item_address)
        console.log({'NODE':req_line,'ADDRESS':item_address})
        //计算后,更新TeamLines
        let index = +aline.line
        _self.TeamLines[index] = req_line
        callback()
        let nextLayer_whichAddress = info_a[i].downAddress
        if(nextLayer_whichAddress && nextLayer_whichAddress.length > 0 && address.toLowerCase() !== nextLayer_whichAddress.toLowerCase()){
          //3.4 --> 节点地址往下递归
          _self.calculateTeamInfo_whichLine(nextLayer_whichAddress,false,aline,callback)
        }
      }

    }else {
        callback()
    }
}



  export default Teams;