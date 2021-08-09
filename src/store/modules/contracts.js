// import Stake from '../../contracts/StakingPools.json';
// import addresses from "../../contracts/addresses.json";

// import ERC20 from '../../contracts/ERC20Token.json'
// import Oracle from '../../contracts/oracle.json'
// import Dao from '../../contracts/daoPools.json'

// import NFT from '../../contracts/NFT.json';
const state = {
  Nftabi: null,
  NftAddress: null,
  l1MintPrice: 20,
  l2MintPrice: 40,
  NFTMintTokenAbi: null,
  NFTMintTokenAddress: null,
  StakeAbi: null,
  stakeAddress: null,
  unit256Max: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  ERC20Abi: null,
  mintTokenAddress: null,   //发行的代币的地址 HDL
  oracleAbi: null,
  oracleAddress: null,
  daoAbi: null,
};

const getters = {
  getMaxUint256(state) {
    return state.unit256Max
  },
  getNftabi(state) {
    return state.Nftabi;
  },
  getNftAddress(state) {
    return state.NftAddress;
  },
  getNFTMintTokenAbi() {
    return state.NFTMintTokenAbi;
  },
  getNFTMintTokenAddress(state) {
    return state.NFTMintTokenAddress
  },
  getL1MintPrice(state) {
    return state.l1MintPrice
  },
  getL2MintPrice(state) {
    return state.l2MintPrice
  },
  getStakeAbi(state) {
    return state.StakeAbi;
  },
  getStakeAddress(state) {
    return state.stakeAddress;
  },
  getERC20Abi(state) {
    return state.ERC20Abi;
  },
  getMintTokenAddress(state) {
    return state.mintTokenAddress
  },
  getOracleAbi(state) {
    return state.oracleAbi;
  },
  getOracleAddress(state) {
    return state.oracleAddress
  },
  getDaoAbi(state) {
    return state.daoAbi;
  }
};

const actions = {
  storeStakeAbi({commit}) {
    commit("setStakeAbi", '');//Stake.abi
  },
  storeStakeAddress({ commit, rootState }) {
    let chainIdDec = parseInt(rootState.accounts.chainId);
    let stakeAddress = '' // addresses.StakingPools[chainIdDec];
    commit("setStakeAddress", stakeAddress);
  },
  storeNftabi({commit}) {
    commit("setNftabi", '');//NFT.abi
  },
  storeNftAddress({ commit, rootState }) {
    let chainIdDec = parseInt(rootState.accounts.chainId);
    let NftAddress = '';// addresses.NFTPools[chainIdDec];
    commit("setNftAddress", NftAddress);
  },
  storeNFTMintTokenAbi({commit}) {
    commit("setNFTMintTokenAbi", '');//ERC20.abi
  },
  storeNFTMintTokenAddress({commit,rootState}) {
    let chainIdDec = parseInt(rootState.accounts.chainId);
    let address = '' // addresses.NFTMintToken[chainIdDec];
    commit("setNFTMintTokenAddress", address);
  },
  storeERC20Abi({commit}) {
    commit("setERC20Abi", '');//ERC20.abi
  },
  storeMintTokenAddress({commit,rootState}) {
    let chainIdDec = parseInt(rootState.accounts.chainId ? rootState.accounts.chainId : rootState.accounts.mainChainID);
    let address = '' //addresses.MintToken[chainIdDec];
    commit("setMintTokenAddress", address);
  },
  storeOracleAbi({commit}) {
    commit("setOracleAbi", '');//Oracle.abi
  },
  storeOracleAddress({commit,rootState}) {
    let chainIdDec = parseInt(rootState.accounts.chainId ? rootState.accounts.chainId : rootState.accounts.mainChainID);
    let address = '' // addresses.oracle[chainIdDec];
    commit("setOracleAddress", address);
  },
  storeDaoAbi({commit}) {
    commit("setDaoAbi", '');//Dao.abi
  },
};

const mutations = {
  setStakeAbi(state, abi) {
    state.StakeAbi = abi;
  },
  setStakeAddress(state, address) {
    state.stakeAddress = address;
  },
  setNftabi(state, abi) {
    state.Nftabi = abi;
  },
  setNftAddress(state, address) {
    state.NftAddress = address;
  },
  setNFTMintTokenAbi(state, abi) {
    state.NFTMintTokenAbi = abi;
  },
  setNFTMintTokenAddress(state,address) {
    state.NFTMintTokenAddress = address;
  },
  setERC20Abi(state, abi) {
    state.ERC20Abi = abi;
  },
  setMintTokenAddress(state,address) {
    state.mintTokenAddress = address;
  },
  setOracleAbi(state, abi) {
    state.oracleAbi = abi;
  },
  setOracleAddress(state,address) {
    state.oracleAddress = address;
  },
  setDaoAbi(state, abi) {
    state.daoAbi = abi;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
