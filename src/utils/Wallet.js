// 智能合约地址
import Vue from "vue";
import notification from 'ant-design-vue/es/notification'

const libraIndex=1;
const btcIndex=2;
const ethIndex=3;
const usdtIndex=4;
const bnbIndex=5;
const filIndex=6;
//new
const adaId=7;
const xrpId=8;
const dogeId=9;
const dotId=10;
const solId=11;
const uniId=12;
const bchId=13;
const ltcId=14;
const linkId=15;
const eosId=16;

const systemPrecisions=100000000;

const _tokensContractAddress = "0xcD18d0Bd276CfAd5A10A903793ae964Dfee5b2c9";
const _recordContractAddress = "0x05491dE7e53Bb3e8a38Dfbff5982026CeF938176";
const _contractAddress = "0x38Ca3326863FFda84f239980dFEdc41DE897e604";
const _priceContractAddress='0xE06432b1390828bC00429bc09262DF484066aE7D';

const _contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "cIndex",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "award",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "bnbPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "btcPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "dayDividendAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_upper",
                "type": "address"
            },
            {
                "internalType": "uint8",
                "name": "_cIndex",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "depositOne",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_upper",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount1",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "_c2Index",
                "type": "uint8"
            }
        ],
        "name": "depositTwo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "dividendRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "downsMap",
        "outputs": [
            {
                "internalType": "address",
                "name": "downAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ethPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_upper",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "exchange",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "exchangeMap",
        "outputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "usdtAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "libAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feeRateDayIn30",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feeRateDayOut30",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "filPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "currIndex",
                "type": "uint256"
            }
        ],
        "name": "getThePrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "ia_map",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "takeout",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "todayDividend",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "todayShareAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "todayGlobalAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "incomeRecord",
        "outputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "fromAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "latestDividendTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "libraPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "oneOrderMap",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "currencyIndex",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "totalAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "useableAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "takeoutAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "depositTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "precision",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "queryDepositUserSize",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_from",
                "type": "address"
            }
        ],
        "name": "queryDownsSize",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_from",
                "type": "address"
            }
        ],
        "name": "queryExchangeSize",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_from",
                "type": "address"
            }
        ],
        "name": "queryIncomeSize",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_from",
                "type": "address"
            }
        ],
        "name": "queryOnesSize",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_from",
                "type": "address"
            }
        ],
        "name": "queryTwosSize",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "recommendMap",
        "outputs": [
            {
                "internalType": "address",
                "name": "upperAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "hasDeducted",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "takeoutIncome",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "_currencyIndex",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "takeoutOne",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount1",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "_currency2Index",
                "type": "uint8"
            }
        ],
        "name": "takeoutTwo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_a",
                "type": "uint256"
            }
        ],
        "name": "tlip",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "twoOrderMap",
        "outputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "uint8",
                "name": "currency1Index",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "totalAmount1",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "useableAmount1",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "takeoutAmount1",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "currency2Index",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "totalAmount2",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "useableAmount2",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "takeoutAmount2",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "depositTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "users",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const _recordContractABI=[
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "adaFeeAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "adaPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "bchFeeAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "bchPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "bnbFeeAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "bnbPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "btcFeeAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "btcPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "dogeFeeAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "dogePrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "dotFeeAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "dotPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "eosFeeAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "eosPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ethFeeAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ethPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "feeRecord",
        "outputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint8",
                "name": "currencyIndex",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "feeAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "filFeeAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "filPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "incomeRecord",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "incomeType",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "fromAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "addr",
                "type": "address"
            }
        ],
        "name": "init",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "internalAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "libraDestroyAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "libraFee1",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "libraPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "linkFeeAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "linkPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ltcFeeAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ltcPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneAdaTakeoutAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneAdaTotalAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneBchTakeoutAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneBchTotalAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneBnbTakeoutAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneBnbTotalAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneBtcTakeoutAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneBtcTotalAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneDogeTakeoutAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneDogeTotalAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneDotTakeoutAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneDotTotalAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneEosTakeoutAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneEosTotalAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneEthTakeoutAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneEthTotalAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "oneFee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneLinkTakeoutAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneLinkTotalAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneLtcTakeoutAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneLtcTotalAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneSolTakeoutAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneSolTotalAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneUniTakeoutAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneUniTotalAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneUsdtTakeoutAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneUsdtTotalAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneXrpTakeoutAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oneXrpTotalAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "precision",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "queryFeeBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_from",
                "type": "address"
            }
        ],
        "name": "queryIncomeSize",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "currencyIndex",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "saveDepositOneRecord",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount1",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "currencyIndex2",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "name": "saveDepositTwoRecord",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint8",
                "name": "currencyId",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "feeAmount",
                "type": "uint256"
            }
        ],
        "name": "saveFee1",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "destroyAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "currencyId",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "feeAmount",
                "type": "uint256"
            }
        ],
        "name": "saveFee2",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_type",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_userAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_fromAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_incomeAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_time",
                "type": "uint256"
            }
        ],
        "name": "saveIncome",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint8",
                "name": "currencyIndex",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "fee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
            }
        ],
        "name": "saveTakeoutOneRecord",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "receivedAmount",
                "type": "uint256"
            }
        ],
        "name": "saveTakeoutRecord",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount1",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "fee1",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "currencyIndex2",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "fee2",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
            }
        ],
        "name": "saveTakeoutTwoRecord",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "solFeeAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "solPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "takeoutIncomeMap",
        "outputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "receivedAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "takeoutTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "addr",
                "type": "address"
            }
        ],
        "name": "takeoutIncomeRecordSize",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "currencyId",
                "type": "uint8"
            }
        ],
        "name": "totalOneUseableByCurrency",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "currencyId",
                "type": "uint8"
            }
        ],
        "name": "totalTwoUseable1ByCurrency",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "currencyId",
                "type": "uint8"
            }
        ],
        "name": "totalTwoUseable2ByCurrency",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalUseable",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "currencyId",
                "type": "uint8"
            }
        ],
        "name": "totalUseableByCurrency",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoAdaTakeout",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoAdaTotal",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoBchTakeout",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoBchTotal",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoBnbTakeout",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoBnbTotal",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoBtcTakeout",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoBtcTotal",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoDogeTakeout",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoDogeTotal",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoDotTakeout",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoDotTotal",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoEosTakeout",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoEosTotal",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoEthTakeout",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoEthTotal",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "twoFee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoFilTakeout",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoFilTotal",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoLinkTakeout",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoLinkTotal",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoLtcTakeout",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoLtcTotal",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoSolTakeout",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoSolTotal",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoUniTakeout",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoUniTotal",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoUsdtTakeout",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoUsdtTotal",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoXrpTakeout",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twoXrpTotal",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "libraAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount2",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "uniFeeAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "uniPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "usdtFeeAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "userOneTakeoutMap",
        "outputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "uint8",
                "name": "currencyIndex",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "takeoutAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "feeAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "takeoutTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "addr",
                "type": "address"
            }
        ],
        "name": "userOneTakeoutSize",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "userTwoTakeoutMap",
        "outputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "uint8",
                "name": "currency1Index",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "takeoutAmount1",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "fee1Amount",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "currency2Index",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "takeoutAmount2",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "fee2Amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "takeoutTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "addr",
                "type": "address"
            }
        ],
        "name": "userTwoTakeoutSize",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "xrpFeeAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "xrpPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const _priceContractABI=[
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "teamBalance",
                "type": "uint256"
            }
        ],
        "name": "getLevelRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "levelRate",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "floor",
                "type": "uint256"
            }
        ],
        "name": "getFloorRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "rate",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "currIndex",
                "type": "uint256"
            }
        ],
        "name": "getThePrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
/////////////////////////////////////////////////////////////////////////////币安测试网测试 - start
const ethContractAddress = '0x44BAd5d45e9486454a0FF1c255396C4272590d73';
const bnbContractAddress = '0xE0d9BEF8C1800733598032b4922cf16584cef010';
const btcContractAddress = '0x29cCf34548bd9120685Ad80fE15C7Be461801a57';
const usdtContractAddress = '0x106F04642B9c62Ea1A2Bc50fadF0897E32fAcD6c';
const filContractAddress = '0xEbdDdd143d18865164F6353F09aB595eB76C6153';
const libraContractAddress = '0xE21e5CA7985E1ED751D4396246a4BFc56656A055';
/////////////////////////////////////////////////////////////////////////////币安测试网测试 - end

const ethContractABI=[
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burnFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            },
            {
                "name": "_extraData",
                "type": "bytes"
            }
        ],
        "name": "approveAndCall",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "initialSupply",
                "type": "uint256"
            },
            {
                "name": "tokenName",
                "type": "string"
            },
            {
                "name": "tokenSymbol",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Burn",
        "type": "event"
    }
];
const bnbContractABI=[
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burnFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            },
            {
                "name": "_extraData",
                "type": "bytes"
            }
        ],
        "name": "approveAndCall",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "initialSupply",
                "type": "uint256"
            },
            {
                "name": "tokenName",
                "type": "string"
            },
            {
                "name": "tokenSymbol",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Burn",
        "type": "event"
    }
];
const btcContractABI=[
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burnFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            },
            {
                "name": "_extraData",
                "type": "bytes"
            }
        ],
        "name": "approveAndCall",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "initialSupply",
                "type": "uint256"
            },
            {
                "name": "tokenName",
                "type": "string"
            },
            {
                "name": "tokenSymbol",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Burn",
        "type": "event"
    }
];
const usdtContractABI=[
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burnFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            },
            {
                "name": "_extraData",
                "type": "bytes"
            }
        ],
        "name": "approveAndCall",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "initialSupply",
                "type": "uint256"
            },
            {
                "name": "tokenName",
                "type": "string"
            },
            {
                "name": "tokenSymbol",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Burn",
        "type": "event"
    }
];
const filContractABI=[
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burnFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            },
            {
                "name": "_extraData",
                "type": "bytes"
            }
        ],
        "name": "approveAndCall",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "initialSupply",
                "type": "uint256"
            },
            {
                "name": "tokenName",
                "type": "string"
            },
            {
                "name": "tokenSymbol",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Burn",
        "type": "event"
    }
];
const libraContractABI=[
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burnFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            },
            {
                "name": "_extraData",
                "type": "bytes"
            }
        ],
        "name": "approveAndCall",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "initialSupply",
                "type": "uint256"
            },
            {
                "name": "tokenName",
                "type": "string"
            },
            {
                "name": "tokenSymbol",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Burn",
        "type": "event"
    }
];
function Precisions(){
    return systemPrecisions //  PrecisionsObj.find(ele => ele.coin === currency.toUpperCase()).precision;
}
function initWallet(callback){
    //判断用户是否安装MetaMask钱包插件
    if (typeof window.ethereum === "undefined") {
        //没安装MetaMask钱包进行弹框提示
        notification.error({
            message: 'Error',
            description:"Looks like you need a Dapp browser to get started."
        })
    } else {
        //如果用户安装了MetaMask，你可以要求他们授权应用登录并获取其账号
        window.ethereum.enable().catch(function (reason) {
            //如果用户拒绝了登录请求
            if (reason === "User rejected provider access") {
                // 用户拒绝登录后执行语句；
            } else {
                // 本不该执行到这里，但是真到这里了，说明发生了意外
                notification.error({
                    message: 'Error',
                    description:"There was an issue signing you in."
                })
            }
        }).then(function (accounts) {
            //如果用户同意了登录请求，你就可以拿到用户的账号
            var currentProvider = window.web3.currentProvider;
            // var Web3 = window.web3js.getWeb3();
            window.web3 = new Vue.prototype.Web3();
            window.web3.setProvider(currentProvider);
            // console.log('地址列表', accounts)
            //这里返回用户钱包地址
            callback(accounts[0]);
        });
    }
}

function approve(currency,address,value, callback,errorCallback) {
    //授权
    currency = currency.toUpperCase();
    let contractAddress;
    let abi;
    if(currency == "ETH"){
        contractAddress=ethContractAddress;
        abi=ethContractABI;
    }else if(currency == "BNB"){
        contractAddress=bnbContractAddress;
        abi=bnbContractABI;
    }else if(currency == "BTC"){
        contractAddress=btcContractAddress;
        abi=btcContractABI;
    }else if(currency == "USDT"){
        contractAddress=usdtContractAddress;
        abi=usdtContractABI;
    }else if(currency == "FIL"){
        contractAddress=filContractAddress;
        abi=filContractABI;
    }else if(currency == "LIBRA"){
        contractAddress=libraContractAddress;
        abi=libraContractABI;
    }else {
        errorCallback(false);
        return;
    }

    let contract = new window.web3.eth.Contract(abi, contractAddress);
    contract.methods.approve(_tokensContractAddress,value+"000000000000000000")
        // .call()
        .send({from: address})
        .then((res) => {
            const {status} = res
            if(status){
                notification.success({
                    message: 'Success',
                    description:currency + ' approve success'
                })
                callback(res)
            }else {
                notification.error({
                    message: 'Error',
                    description:currency + " approve fail"
                })
            }
        })
        .catch((err) => {
            console.log(err);
            errorCallback(err);
            notification.error({
                message: 'Error',
                description:currency + err.message || "fail"
            })
        });
}

/***
 * 查授权额度
 * @param address
 */
function queryAllowance(account,currency,callback,errorCallback){
    getContract(_contractABI, _contractAddress,(contract)=>{
        contract.methods.allowance(getCurrencyIndex(currency),account)
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}

function balanceOf(currency,address,callback,errorCallback) {
    //授权
    currency = currency.toUpperCase();
    let contractAddress;
    let contractABI;
    if(currency == "ETH"){
        contractAddress=ethContractAddress;
        contractABI=ethContractABI;
    }else if(currency == "BNB"){
        contractAddress=bnbContractAddress;
        contractABI=bnbContractABI;
    }else if(currency == "BTC"){
        contractAddress=btcContractAddress;
        contractABI=btcContractABI;
    }else if(currency == "USDT"){
        contractAddress=usdtContractAddress;
        contractABI=usdtContractABI;
    }else if(currency == "FIL"){
        contractAddress=filContractAddress;
        contractABI=filContractABI;
    }else if(currency == "LIBRA"){
        contractAddress=libraContractAddress;
        contractABI=libraContractABI;
    }else {
        errorCallback(false);
    }

    getContract(contractABI, contractAddress,(contract)=>{
        contract.methods.balanceOf(address)
            .call()
            .then((res) => {
                let balance = Number(res)/Number("1000000000000000000");
                callback(balance);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}

//兑换
function exchange(upperAddress,account,amount,callback,errorCallback){
    if (amount == null || Number(amount) <= 0){
        errorCallback("amount error");
        return;
    }
    if (upperAddress == undefined || upperAddress == null || upperAddress==""){
        alert("No parent address")
        return;
    }
    getContract(_contractABI, _contractAddress,(contract)=>{
        const data = contract.methods
            .exchange(
                upperAddress,
                Number(amount)*systemPrecisions
            ).encodeABI();
        sendTransfer(account, data, 0x0, callback, errorCallback)
    });
}

//存入单币种
function depositOne(upperAddress,account,currency,amount,callback,errorCallback){
    if (amount == null || Number(amount) <= 0){
        errorCallback("amount error");
        return;
    }
    if (upperAddress == undefined || upperAddress == null || upperAddress==""){
        alert("没有上级地址！")
        return;
    }

    getContract(_contractABI, _contractAddress,(contract)=>{
        const data = contract.methods
            .depositOne(
                upperAddress,
                getCurrencyIndex(currency),
                Number(amount)*systemPrecisions
            ).encodeABI();
        sendTransfer(account, data, 0x0, callback, errorCallback)
    });
}

//存入双币种
function depositTwo(upperAddress,account,_amount1,currency2,callback,errorCallback){
    if (_amount1 == null || Number(_amount1) <= 0){
        errorCallback("amount error");
        return;
    }
    if (upperAddress == undefined || upperAddress == null || upperAddress==""){
        alert("没有上级地址！")
        return;
    }
    getContract(_contractABI, _contractAddress,(contract)=>{
        const data = contract.methods
            .depositTwo(
                upperAddress,
                Number(_amount1)*systemPrecisions,
                getCurrencyIndex(currency2),
            ).encodeABI();
        sendTransfer(account, data, 0x0, callback, errorCallback)
    });
}

//取出单币种
function takeoutOne(account,currency,amount, callback, errorCallback){
    if (amount == null || Number(amount) <= 0){
        errorCallback("amount error");
        return;
    }
    getContract(_contractABI, _contractAddress,(contract)=>{
        const data = contract.methods
            .takeoutOne(
                getCurrencyIndex(currency),
                Number(amount)*systemPrecisions,
            ).encodeABI();
        sendTransfer(account, data, 0x0, callback, errorCallback);
    });
}
//取出双币种
function takeoutTwo(account,amount1,currency2,callback, errorCallback){
    if (amount1 == null || Number(amount1) <= 0){
        errorCallback("amount error");
        return;
    }
    getContract(_contractABI, _contractAddress,(contract)=>{
        const data = contract.methods
            .takeoutTwo(
                Number(amount1)*systemPrecisions,
                getCurrencyIndex(currency2),
            ).encodeABI();
        sendTransfer(account, data, 0x0, callback, errorCallback);
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1币种存入记录
 */
function oneDepositOrder(address,index,callback,errorCallback) {
    getContract(_contractABI, _contractAddress,(contract)=>{
        contract.methods.oneOrderMap(address,index)
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}
/**
 * 2币种存入记录
 */
function twoDepositOrder(address,index,callback,errorCallback) {
    getContract(_contractABI, _contractAddress,(contract)=>{
        contract.methods.twoOrderMap(address,index)
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}

/***
 * 币种锁仓金额(单币种区+双币种区)
 * @param currency
 * @param callback
 */
function totalUseableBalance(currency,callback,errorCallback) {
    currency=currency.toUpperCase();
    getContract(_recordContractABI, _recordContractAddress,(contract)=>{
        contract.methods.totalUseableByCurrency(getCurrencyIndex(currency))
            .call()
            .then((res) => {
                callback(res);
            }).catch((err) => {
            errorCallback(err);
        });
    });
}
/***
 * 币种锁仓金额(单币种区)
 * @param currency
 * @param callback
 */
function oneUseableBalance(currency,callback,errorCallback) {
    currency=currency.toUpperCase();
    getContract(_recordContractABI, _recordContractAddress,(contract)=>{
        contract.methods.totalOneUseableByCurrency(getCurrencyIndex(currency))
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}
/***
 * 币种锁仓金额(双币种区)
 * @param currency
 * @param callback
 */
function twoUseableBalance1(currency,callback,errorCallback) {
    currency=currency.toUpperCase();
    getContract(_recordContractABI, _recordContractAddress,(contract)=>{
        contract.methods.totalTwoUseable1ByCurrency(getCurrencyIndex(currency))
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}

/***
 * 币种锁仓金额(双币种区)
 * @param currency
 * @param callback
 */
function twoUseableBalance2(currency,callback,errorCallback) {
    currency=currency.toUpperCase();
    getContract(_recordContractABI, _recordContractAddress,(contract)=>{
        contract.methods.totalTwoUseable2ByCurrency(getCurrencyIndex(currency))
            .call()
            .then((res) => {
                callback(res);
            }).catch((err) => {
            errorCallback(err);
        });
    });
}

/***
 * 我的收益
 * @param address
 * @param index
 * @param callback
 */
function incomeAccount(address,callback,errorCallback) {
    getContract(_contractABI, _contractAddress,(contract)=>{
        contract.methods.ia_map(address)
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                console.log({err});
                errorCallback(err);
            });
    })
}
/***
 * 收益记录
 * @param address
 * @param index
 * @param callback
 */
function incomeRecord(address,index,callback,errorCallback) {
    getContract(_contractABI, _contractAddress,(contract)=>{
        contract.methods.incomeRecord(address,index)
            .call()
            .then((res) => {
                console.log({'profits':res})
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}

/***
 * 取出收益
 * @param amount
 */
function takeoutIncome(account,amount, callback, errorCallback){
    if (amount == null || Number(amount) <= 0){
        errorCallback("amount error");
        return;
    }
    if(amount.parseInt <= 0){
        return;
    }
    getContract(_contractABI, _contractAddress,(contract)=>{
        const data = contract.methods
            .takeoutIncome(
                Number(amount)*systemPrecisions,
            ).encodeABI();
        sendTransfer(account, data, 0x0, callback, errorCallback);
    });
}

/***
 * 查上级
 * @param account
 * @param callback
 */
function queryUpUser(account,callback,errorCallback) {
    getContract(_contractABI, _contractAddress,(contract)=>{
        contract.methods.recommendMap(account)
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}

/***
 * 查下级
 * @param account
 * @param callback
 */
function queryDownUser(account,index,callback,errorCallback) {
    getContract(_contractABI, _contractAddress,(contract)=>{
        contract.methods.downsMap(account,index)
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}

/***
 * 单币种存入总笔数
 * @param callback
 * @param errorCallback
 */
function queryOnesSize(address,callback,errorCallback) {
    getContract(_contractABI, _contractAddress,(contract)=>{
        contract.methods.queryOnesSize(address)
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}

/***
 * 双币种存入总笔数
 * @param callback
 * @param errorCallback
 */
function queryTwosSize(address,callback,errorCallback) {
    getContract(_contractABI, _contractAddress,(contract)=>{
        contract.methods.queryTwosSize(address)
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}
/***
 * 我的 !!!"直接"!!! 下级 人数
 * @param callback
 * @param errorCallback
 */
function queryDownsSize(address,callback,errorCallback) {
    getContract(_contractABI, _contractAddress,(contract)=>{
        contract.methods.queryDownsSize(address)
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}
/***
 * 我兑换了多少笔
 * @param callback
 * @param errorCallback
 */
function queryExchangeSize(address,callback,errorCallback) {
    getContract(_contractABI, _contractAddress,(contract)=>{
        contract.methods.queryExchangeSize(address)
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}
/**
 * 我的收入记录笔数
 * @param callback
 * @param errorCallback
 */
function queryIncomeSize(address,callback,errorCallback) {
    getContract(_contractABI, _contractAddress,(contract)=>{
        contract.methods.queryIncomeSize(address)
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}
/**
 * 总共有多少人存
 * @param callback
 * @param errorCallback
 */
function queryDepositUserSize(callback,errorCallback) {
    getContract(_contractABI, _contractAddress,(contract)=>{
        contract.methods.queryDepositUserSize()
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}

/**
 * 取出收益记录
 * @param callback
 * @param errorCallback
 */
function queryTakeoutIncomeRecord(address,index,callback,errorCallback) {
    getContract(_recordContractABI, _recordContractAddress,(contract)=>{
        contract.methods.takeoutIncomeMap(address,index)
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}

function queryTakeoutIncomeRecordSize(address,callback,errorCallback) {
    getContract(_recordContractABI, _recordContractAddress,(contract)=>{
        contract.methods.takeoutIncomeRecordSize(address)
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}

/***
 * 查销毁Libra数量
 * @param callback
 * @param errorCallback
 */
function queryLibraDestroyAmount(callback,errorCallback) {
    getContract(_recordContractABI, _recordContractAddress,(contract)=>{
        contract.methods.libraDestroyAmount()
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}

/***
 * 查手续费总金额
 * @param callback
 * @param errorCallback
 */
function queryFeeBalance(callback,errorCallback) {
    getContract(_recordContractABI, _recordContractAddress,(contract)=>{
        contract.methods.queryFeeBalance()
            .call()
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                errorCallback(err);
            });
    });
}

function queryPrice(currency,callback,errorCallback) {
    const cId = getCurrencyIndex(currency);
    if(cId==usdtIndex){
        callback(1);
    }else if(cId==libraIndex){
        //从主合约获取
        getContract(_contractABI, _contractAddress,(contract)=>{
            contract.methods.libraPrice()
                .call()
                .then((res) => {
                    callback(Number(res)/100000000.0);
                })
                .catch((err) => {
                    errorCallback(err);
                });
        });
    }else{
        //从价格合约获取
        getContract(_priceContractABI, _priceContractAddress,(contract)=>{
            contract.methods.getThePrice(cId)
                .call()
                .then((res) => {
                    callback(Number(res)/100000000.0);
                })
                .catch((err) => {
                    errorCallback(err);
                });
        });
    }
}

/**
 * 发送交易
 * @param {Object} account 用户地址
 * @param {Object} data 数据
 * @param {Object} value 转账金额
 * @param {Object} callback 返回hash
 * @param {Object} errorCallBack 返回的错误
 */
function sendTransfer(account, data, value, callback, errorCallBack) {
    // estimateGas获取交易的 gas 用量
    const params = {
        from: account,
        to: _contractAddress,
        data: data,
        value: value,
    };
    window.web3.eth.estimateGas(params, function (error1, gaslimit) {
        if (error1) {
            errorCallBack(error1);
        } else {
            // gasprice获取当前gas价格
            window.web3.eth.getGasPrice(function (error2, gasPrice) {
                if (error2) {
                    errorCallBack(error2);
                } else {
                    gaslimit -= -10000;
                    let params = [
                        {
                            gasPrice: gasPrice,
                            gasLimit: gaslimit,
                            from: account,
                            to: _contractAddress,
                            data: data,
                            value: value,
                        },
                    ];
                    //ethereum.sendAsync方法发送以太币、调用智能合约：
                    window.ethereum.sendAsync(
                        {
                            method: "eth_sendTransaction",
                            params: params,
                            from: account,
                        },
                        function (error, hash) {
                            if (error) {
                                // alert(error.message);
                                errorCallBack(error.message);
                            } else {
                                callback(hash);
                            }
                        }
                    );
                    //监听MetaMask的事件
                    window.ethereum.on('accountsChanged', function (accounts) {
                        console.log(accounts[0])
                    })
                }
            });
        }
    });
}


function test() {
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    _contract.methods.libraTotalAmount().call()
        .then((res) => {
            alert("测试结果  ："+res);
        })
        .catch((err) => {

            console.log('获取失败：', err);
        });
}

// function transferIn(account,amount1,callback, errorCallback){
//     const _contract = new window.web3.eth.Contract(_testNewContractABI, _testNewContractAddress);
//     const data = _contract.methods.testTransfer().encodeABI();
//     transferBasis(account,data, amount1, callback, errorCallback);
// }
//转平台币
// function transferBasis(account, data, value, callback, errorCallBack) {
//     value = '0x'+(Number(value)*Number("1000000000000000000")).toString(16);
//     alert("开始："+value);
//     // estimateGas获取交易的 gas 用量
//     const params = {
//         from: account,
//         to: _testNewContractAddress,
//         data: data,
//         value: value,
//     };
//     window.web3.eth.estimateGas(params, function (error1, gaslimit) {
//         if (error1) {
//             errorCallBack(error1);
//         } else {
//             // gasprice获取当前gas价格
//             window.web3.eth.getGasPrice(function (error2, gasPrice) {
//                 if (error2) {
//                     errorCallBack(error2);
//                 } else {
//                     gaslimit -= -10000;
//                     let params = [
//                         {
//                             gasPrice: gasPrice,
//                             gasLimit: gaslimit,
//                             from: account,
//                             to: _testNewContractAddress,
//                             data: data,
//                             value: value,
//                         },
//                     ];
//                     alert("参数： "+JSON.stringify(params))
//                     //ethereum.sendAsync方法发送以太币、调用智能合约：
//                     window.ethereum.sendAsync(
//                         {
//                             method: "eth_sendTransaction",
//                             params: params,
//                             from: account,
//                         },
//                         function (error, hash) {
//                             if (error) {
//                                 // alert(error.message);
//                                 errorCallBack(error.message);
//                             } else {
//                                 callback(hash);
//                             }
//                         }
//                     );
//                     //监听MetaMask的事件
//                     window.ethereum.on('accountsChanged', function (accounts) {
//                         console.log(accounts[0])
//                     })
//                 }
//             });
//         }
//     });
// }

//获取合约
function getContract(abi, address,callback) {
    const _contract = new window.web3.eth.Contract(abi, address);
    if (_contract==undefined){
        console.log("初始化钱包");
        initWallet((res)=>{
            localStorage.setItem("walletAddress",res);
            callback(_contract);
        })
    }else {
        callback(_contract);
    }
}
function getCurrencyIndex(currency) {
    currency=currency.toUpperCase();
    if (currency=="LIBRA"){
        return libraIndex;
    }else if (currency=="BTC"){
        return btcIndex;
    }else if (currency=="ETH"){
        return ethIndex;
    }else if (currency=="USDT"){
        return usdtIndex;
    }else if (currency=="BNB"){
        return bnbIndex;
    }else if (currency=="FIL"){
        return filIndex;
    }else if (currency=="ADA"){
        return adaId;
    }else if (currency=="XRP"){
        return xrpId;
    }else if (currency=="DOGE"){
        return dogeId;
    }else if (currency=="DOT"){
        return dotId;
    }else if (currency=="SOL"){
        return solId;
    }else if (currency=="UNI"){
        return uniId;
    }else if (currency=="BCH"){
        return bchId;
    }else if (currency=="LTC"){
        return ltcId;
    }else if (currency=="LINK"){
        return linkId;
    }else if (currency=="EOS"){
        return eosId;
    }
}

function testTransfer(account,to,amount,callback,errorCallback){
    getContract(_contractABI, _contractAddress,(contract)=>{
        const data = contract.methods
            .testTransfer(
                to,
                Number(amount)
            ).encodeABI();
        sendTransfer(account, data, 0x0, callback, errorCallback)
    });
}

//导出相应的方法
export default {
    initWallet,
    approve,
    exchange,
    depositOne,
    depositTwo,
    takeoutOne,
    takeoutTwo,
    queryAllowance,
    balanceOf,
    oneDepositOrder,
    twoDepositOrder,
    incomeAccount,
    takeoutIncome,
    queryUpUser,
    queryDownUser,
    test,
    Precisions,
    incomeRecord,
    queryOnesSize,
    queryTwosSize,
    queryDownsSize,
    queryExchangeSize,
    queryIncomeSize,
    queryDepositUserSize,
    totalUseableBalance,
    oneUseableBalance,
    twoUseableBalance1,
    twoUseableBalance2,
    queryTakeoutIncomeRecord,
    queryTakeoutIncomeRecordSize,
    queryPrice,
    queryFeeBalance,
    queryLibraDestroyAmount,
    testTransfer,
}
