import axios from "./axios";
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