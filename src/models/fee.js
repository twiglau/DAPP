/**
 * 计算转出手续费
 * 1. 存入时间 > 30天后, 赎回需要扣除手续费 2%;
 * 2. 存入时间 <= 30天,赎回需要扣除手续费 5%;
 * 
 * 1. 对应取出币种
 * 2. 入口: 根据输入数量 amount,币种 currency1, currency2
 * 3. 出口: fee1, fee2.
 * 
 * 
 */
import Farms from './farms';
import Wallet from '@/utils/Wallet.js';
const feeRateDayIn30 = 0.05;
const feeRateDayOut30 = 0.02;

function Fees(address,amount1,amount2){
  Farms.call(this,address) //属性
  this.amount1 = amount1 || 0;
  this.amount2 = amount2 || 0;
  this.fee1 = 0;
  this.fee2 = 0;
  this.realGet1 = 0;//实际上得到币种1
  this.realGet2 = 0;//实际上得到币种2

  this.oneRecords = [];//单币种存入记录
  this.twoRecords = [];//双币种存入记录
}

Fees.prototype = new Farms() //方法
Fees.prototype.constructor = Fees

Fees.prototype.calculateOne = function(){
    let _self = this
    //1.对记录排序
    _self.oneRecords.sort((a,b) => b.depositTime - a.depositTime)
    let nowTime = new Date().getTime()/1000
    //4、扣除订单中的可用数量 (计算手续费)
    let out = 0;
    for(let i=0;i<_self.oneRecords.length;i++){
        
        if(out < _self.amount1*Wallet.Precisions()){
            let i_use = _self.oneRecords[i].useableAmount;
            if(out + i_use < _self.amount1*Wallet.Precisions()){
                //没有完成需要计算下一笔 
                out += i_use;
                //计算手续费
                if(nowTime - _self.oneRecords[i].depositTime <= 2592000){//小于30天 
                    _self.fee1 += i_use*feeRateDayIn30/Wallet.Precisions();
                }else{
                    _self.fee1 += i_use*feeRateDayOut30/Wallet.Precisions();
                }
            }else{
                //需转出数量
                let needOut = _self.amount1*Wallet.Precisions() - out;
                out += needOut;
                //计算手续费
                if(nowTime - _self.oneRecords[i].depositTime <= 2592000){//小于30天 
                    _self.fee1 += needOut*feeRateDayIn30/Wallet.Precisions();
                }else{
                    _self.fee1 += needOut*feeRateDayOut30/Wallet.Precisions();
                }
            }
        }else{
            break;
        }
    }
    _self.realGet1 = _self.amount - _self.fee1;
}

Fees.prototype.calculateTwo = function(){
    let _self = this
    _self.twoRecords.sort((a,b) => b.depositTime - a.depositTime)
    let nowTime = new Date().getTime()/1000
    //4、扣除订单中的可用数量 (计算手续费)
    let out1 = 0;
    let out2 = 0;
    for(let i=0;i<_self.twoRecords.length;i++){
        
        if(out2 < _self.amount2*Wallet.Precisions()){
            let i_use_1 = _self.twoRecords[i].useableAmount1;
            let i_use_2 = _self.twoRecords[i].useableAmount2;
            if(out2 + i_use_2 < _self.amount2*Wallet.Precisions()){
                //没有完成需要计算下一笔 
                out1 += i_use_1;
                out2 += i_use_2;
                //计算手续费
                if(nowTime - _self.twoRecords[i].depositTime <= 2592000){//小于30天 
                    _self.fee1 += i_use_1*feeRateDayIn30/Wallet.Precisions();
                    _self.fee2 += i_use_2*feeRateDayIn30/Wallet.Precisions();
                }else{
                    _self.fee1 += i_use_1*feeRateDayOut30/Wallet.Precisions();
                    _self.fee2 += i_use_2*feeRateDayOut30/Wallet.Precisions();
                }
            }else{
                //已完成 
                let needOut1 = _self.amount1*Wallet.Precisions() - out1;
                let needOut2 = _self.amount2*Wallet.Precisions() - out2;
                out1 += needOut1;
                out2 += needOut2;
                //计算手续费
                if(nowTime - _self.twoRecords[i].depositTime <= 2592000){//小于30天 
                    _self.fee1 += needOut1*feeRateDayIn30/Wallet.Precisions();
                    _self.fee2 += needOut2*feeRateDayIn30/Wallet.Precisions();
                }else{
                    _self.fee1 += needOut1*feeRateDayOut30/Wallet.Precisions();
                    _self.fee2 += needOut2*feeRateDayOut30/Wallet.Precisions();
                }
                break;
            }
        }else{
            break;
        }
    }
    _self.realGet1 = _self.amount1 - _self.fee1;
    _self.realGet2 = _self.amount2 - _self.fee2;
}

export default Fees

