import axios from 'axios'
import Qs from 'qs'
import GT from './config'
const baseUrl =  GT.baseUrl
let filter = {
  post: 'data',
  get: 'params'
};
//设置全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    let config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);
    
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;
    
    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }
    
    // Increase the retry count
    config.__retryCount += 1;
    
    // Create new promise to handle exponential backoff
    let backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});

const request = (url, options,baseUrl,noBaseUrl) => {
  return new Promise((resolve, reject) => {
    let api = url
    //[filter[options.method]]
    axios({
      url: noBaseUrl ? api : baseUrl + api,
      method: options.method,
      params: options.data,
      processData: false,
      header: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(({data}) => {
      resolve(data)
    }).catch(err => reject(err))
  })
}

const get = (url, options = {},noBaseUrl = false) => {
  return request(url, {
    method: 'get',
    data: options
  }, baseUrl,noBaseUrl)
}

const post = (url, options,noBaseUrl = false) => {
  return request(url, {
    method: 'post',
    data:options
  }, baseUrl,noBaseUrl)
}

export default {
  get,
  post
}
