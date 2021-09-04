import axios from "./axios";
export const currencyMap = [
   {id:1,currency:'Libra',price:0,amount:0},
   {id:2,currency:'BTC',price:0,amount:0},
   {id:3,currency:'ETH',price:0,amount:0},
   {id:4,currency:'USDT',price:0,amount:0},
   {id:5,currency:'BNB',price:0,amount:0},
   {id:6,currency:'FIL',price:0,amount:0},

   {id:7,currency:'ADA',price:0,amount:0},
   {id:8,currency:'XRP',price:0,amount:0},
   {id:9,currency:'DOGE',price:0,amount:0},
   {id:10,currency:'DOT',price:0,amount:0},
   {id:11,currency:'SOL',price:0,amount:0},
   {id:12,currency:'UNI',price:0,amount:0},
   {id:13,currency:'BCH',price:0,amount:0},
   {id:14,currency:'LTC',price:0,amount:0},
   {id:15,currency:'LINK',price:0,amount:0},
   {id:16,currency:'EOS',price:0,amount:0}
]
export function getCurrencyIndex(currency){
   const item = currencyMap.find(ele => ele.currency == currency)
   return item?.id || -1
}
export function getCurrencyName(index){
   const item = currencyMap.find(ele => ele.id == index)
   return item?.currency || 'None'
}
export function getOneTokens(data){
   return new Promise((resolve,reject) => {
       axios.get('../../js/oneTokens.json',data,true)
       .then(res =>{
          resolve(res)
       })
       .catch((err) =>{
         reject(err)
       })
   })
}
export function getTwoTokens(data){
   return new Promise((resolve,reject) => {
       axios.get('../../js/twoTokens.json',data,true)
       .then(res =>{
          resolve(res)
       })
       .catch((err) =>{
         reject(err)
       })
   })
}
export function getPrice(data){
   return new Promise((resolve,reject) => {
       axios.get('/bian/querySymbloPriceV2',data)
       .then(res =>{
          resolve(res)
       })
       .catch((err) =>{
         reject(err)
       })
   })
}
export function getRate(data){
    return new Promise((resolve,reject) => {
        axios.post('/libar/queryMiningToken',data)
        .then(res =>{
           resolve(res)
        })
        .catch((err) =>{
          reject(err)
        })
    })
}
export function postWithdrawalData(data){
    return new Promise((resolve,reject) => {
       axios.post('/libar/addTokenOutRecord',data)
       .then(res => {
          resolve(res)
       })
       .catch((err) =>{
         reject(err)
       })
    })
}
export function postExchangeData(data){
    return new Promise((resolve,reject) => {
       axios.post('/libar/addExchangeRecord',data)
       .then(res => {
          resolve(res)
       })
       .catch((err) =>{
         reject(err)
       })
    })
}
export function queryExchangeRecords(data){
    return new Promise((resolve,reject) => {
       axios.post('/libar/queryExchangeRecord',data)
       .then(res => {
          resolve(res)
       })
       .catch((err) =>{
         reject(err)
       })
    })
}
export function queryWithdrawalRecords(data){
    return new Promise((resolve,reject) => {
       axios.post('/libar/queryTokenOutRecord',data)
       .then(res => {
          resolve(res)
       })
       .catch((err) =>{
         reject(err)
       })
    })
}