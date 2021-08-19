import Web3Modal from "web3modal";
import { ethers } from "ethers";

function getCookie(key){
    var arr1=document.cookie.split("; ");//由于cookie是通过一个分号+空格的形式串联起来的，所以这里需要先按分号空格截断,变成[name=Jack,pwd=123456,age=22]数组类型；
    for(var i=0;i<arr1.length;i++){
        var arr2=arr1[i].split("=");//通过=截断，把name=Jack截断成[name,Jack]数组；
        if(arr2[0]==key){
            return decodeURI(arr2[1]);
        }
    }
}
var lan = 'zh-CN';
if (getCookie('pipipSwapLanguage') == 'en') {
  lan = 'en-US';
}else if (getCookie('pipipSwapLanguage') == 'zh') {
  lan = 'zh-CN';
}else if (getCookie('pipipSwapLanguage') == 'ko') {
  lan = 'ko';
}
const state = {
  isMobile: document.body.clientWidth < 768 ? true : false,
  showDrawer: false,
  langType: lan,
  activeAccount: null,
  chainId: null,
  chainName: null,
  isConnected: false,
  providerW3m: null, // this is "provider" from Web3Modal
  dataUpdateTime: 10, //页面数据刷新时间
  mainChainID: 56,
  isMainChainID: true,
};

const getters = {
  getIsMobile(state){
    return state.isMobile
  },
  getIsMainChainID(state) {
    return state.isMainChainID
  },
  getShowDrawer(state) {
    return state.showDrawer
  },
  getLangType(state) {
    return state.langType
  },
  getDataUpdateTime(state) {
    return state.dataUpdateTime;
  },
  getActiveAccount(state) {
    return state.activeAccount;
  },
  getChainId(state) {
    return state.chainId;
  },
  getChainName(state) {
    return state.chainName;
  },
  isUserConnected(state) {
    return state.isConnected;
  }
};

const actions = {

  async initWeb3Modal({ commit }) {
    const providerOptions = {};
    setTimeout(async () => {
      // This will get deprecated soon. Setting it to false removes a warning from the console.
      window.ethereum && (window.ethereum.autoRefreshOnNetworkChange = false);
      // if the user is flagged as already connected, automatically connect back to Web3Modal
      if (localStorage.getItem('isConnected') === "true" && window.ethereum) {
        const w3mObject = new Web3Modal({
          cacheProvider: true, // optional
          providerOptions // required
        });
        let providerW3m = await w3mObject.connect();
        if(window.ethereum) {
          commit("setIsConnected", true);
          commit("setActiveAccount", window.ethereum.selectedAddress || window.ethereum.address);
          commit("setChainData", window.ethereum.chainId);
          commit("setEthersProvider", providerW3m);
          actions.fetchActiveBalance({ commit });
        }
        commit("setWeb3ModalInstance", w3mObject);
      }
    },500)
  },

  async connectWeb3Modal({ commit }) {
    commit("setIsConnected", true);
    location.reload()
    // if(state.web3Modal) {
    //   commit("setActiveAccount", window.ethereum.selectedAddress || window.ethereum.address);
    //   commit("setChainData", window.ethereum.chainId);
    //   commit("setEthersProvider", providerW3m);
    //   actions.fetchActiveBalance({ commit });
    // }else {
    //   commit("setIsConnected", true);
    //   await actions.initWeb3Modal({commit})
    // }
  },

  async disconnectWeb3Modal({ commit }) {
    commit("setIsConnected", false);
    commit("disconnectWallet");
  },

  async ethereumListener({ commit }) {

    if(window.ethereum){
      window.ethereum.on('accountsChanged', (accounts) => {
        if (state.isConnected) {
          commit("setActiveAccount", accounts[0]);
          commit("setEthersProvider", state.providerW3m);
          location.reload()
          actions.fetchActiveBalance({ commit });
        }
      });
  
      window.ethereum.on('chainChanged', (chainId) => {
        commit("setChainData", chainId);
        commit("setEthersProvider", state.providerW3m);
        location.reload()
      });
    }

  },
  async getMainChainID({commit,rootState}) {
    //判断本地有没有存储钱包登录状态，
    //如果登录过就先走钱包自动登录，然后判断主链
    //如果没有登录过，则用MetaMask连接，然后判断主链
    setTimeout(async () => {
      if(window.ethereum) {
        commit('setIsMainChainID',parseInt(window.ethereum.chainId) == rootState.accounts.mainChainID)
        // if(window.ethereum.chainId && rootState.accounts.providerEthers) {
        // }else {
        //   await rootState.accounts.web3Modal.connect()
        //   commit('setIsMainChainID',parseInt(window.ethereum.chainId) == rootState.accounts.mainChainID)
        // }
      } 
    },600)
  }
};

const mutations = {

  async disconnectWallet(state) {
    state.activeAccount = null;
    state.activeBalance = 0;
    state.providerEthers = null;
    if (state.providerW3m.close && state.providerW3m !== null) {
      await state.providerW3m.close();
    }
    state.providerW3m = null;
    await state.web3Modal.clearCachedProvider();
    location.reload() // redirect to the Main page
  },

  setDrawer(state,status) {
    state.showDrawer = status
  },
  setLangType(state,type) {
    state.langType = type
  },
  setActiveAccount(state, selectedAddress) {
    state.activeAccount = selectedAddress;
  },

  setActiveBalance(state, balance) {
    state.activeBalance = balance;
  },

  setChainData(state, chainId) {
    state.chainId = chainId;
    switch(chainId) {
      case "0x1":
        state.chainName = "Mainnet";
        break;
      case "0x2a":
        state.chainName = "Kovan";
        break;
      case "0x3":
        state.chainName = "Ropsten";
        break;
      case "0x4":
        state.chainName = "Rinkeby";
        break;
      case "0x5":
        state.chainName = "Goerli";
        break;
      case "0x100":
          state.chainName = "HecoTest";
          break;  
      case "0x539": // 1337 (often used on localhost)
      case "0x1691": // 5777 (default in Ganache)
      default:
        state.chainName = "Localhost";
        break;
    }
  },

  setIsMainChainID(state,isBool) {
    state.isMainChainID = isBool
  },

  async setEthersProvider(state, providerW3m) {
    state.providerW3m = providerW3m;
    state.providerEthers = new ethers.providers.Web3Provider(providerW3m);
  },

  setIsConnected(state, isConnected) {
    state.isConnected = isConnected;
    // add to persistent storage so that the user can be logged back in when revisiting website
    localStorage.setItem('isConnected', isConnected);
  },

  setWeb3ModalInstance(state, w3mObject) {
    state.web3Modal = w3mObject;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
