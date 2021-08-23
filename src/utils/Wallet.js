// 智能合约地址
import Vue from "vue";
import notification from 'ant-design-vue/es/notification'

const libraIndex=1;
const btcIndex=2;
const ethIndex=3;
const usdtIndex=4;
const bnbIndex=5;
const filIndex=6;
const systemPrecisions=100000000;

const PrecisionsObj = [
    {coin:'LIBRA',precision:Math.pow(10,18)},
    {coin:'USDT',precision:Math.pow(10,18)},
    {coin:'ETH',precision:Math.pow(10,18)},
    {coin:'BNB',precision:Math.pow(10,18)},
    {coin:'BTC',precision:Math.pow(10,18)},
    {coin:'FIL',precision:Math.pow(10,18)}
]

//币
const tokensContractAddress = "0x53F5b20E09e31Cb54C90FA47DFF2e9dF8cac5919";
// const _contractAddress = '0x7ac13B3aEe65616eb16729Da45D8204E8871Fce0';
//币安测试链   0xd583631d0aC918637449E462708BC51eC4351c17
const _contractAddress = '0xee0f4F9C2F2cd5e6a30670d1609572cA8664F5c6';
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
//记录        0x1b8511C5Cf76E28177C51116AcE5D3ca1B8a595E
const _recordContractAddress = '0x93aa7d47B40AceF04789C21AB2cD704104888213';
const _recordContractABI=[
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
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
        "inputs": [],
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
        "inputs": [],
        "name": "twoFee1",
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
        "name": "twoFee2",
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
function Precisions(currency){
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
    alert(currency+"     "+address+"      "+value);
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
    contract.methods.approve(tokensContractAddress,value+"000000000000000000")
        // .call()
        .send({from: address})
        .then((res) => {
            const {status} = res
            if(status){
                notification.success({
                    message: 'Success',
                    description:currency + '授权成功'
                })
                callback(res)
            }else {
                notification.error({
                    message: 'Error',
                    description:currency + "授权发生错误"
                })
            }
        })
        .catch((err) => {
            console.log(err);
            errorCallback(err);
            notification.error({
                message: 'Error',
                description:currency + err.message || "失败"
            })
        });
}

/***
 * 查授权额度
 * @param address
 */
function queryAllowance(account,currency,callback,errorCallback){
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    _contract.methods.allowance(getCurrencyIndex(currency),account)
        .call()
        .then((res) => {
            callback(res);
        })
        .catch((err) => {
            errorCallback(err);
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

    let contract = new window.web3.eth.Contract(contractABI, contractAddress);
    contract.methods.balanceOf(address)
        .call()
        .then((res) => {
            let balance = Number(res)/Number("1000000000000000000");
            callback(balance);
        })
        .catch((err) => {
            errorCallback(err);
        });
}

//兑换
function exchange(upperAddress,account,amount,callback,errorCallback){

    if (upperAddress == undefined || upperAddress == null || upperAddress==""){
        alert("没有上级地址！"+(Number(amount)*systemPrecisions))
        upperAddress="0x7a48b32AF1E124B6C6D94809126bdEbB8a5a4E13";
    }
    console.log("本人地址："+account);
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    const data = _contract.methods
        .exchange(
            upperAddress,
            Number(amount)*systemPrecisions
        ).encodeABI();
    sendTransfer(account, data, 0x0, callback, errorCallback)
}

//存入单币种
function depositOne(upperAddress,account,currency,amount,callback,errorCallback){
    if (upperAddress == undefined || upperAddress == null || upperAddress==""){
        alert("没有上级地址！")
        upperAddress="0x7a48b32AF1E124B6C6D94809126bdEbB8a5a4E13";
    }
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    const data = _contract.methods
        .depositOne(
            upperAddress,
            getCurrencyIndex(currency),
            Number(amount)*systemPrecisions
        ).encodeABI();
    sendTransfer(account, data, 0x0, callback, errorCallback)
}

//存入双币种
function depositTwo(upperAddress,account,_amount1,currency2,callback,errorCallback){
    if (upperAddress == undefined || upperAddress == null || upperAddress==""){
        alert("没有上级地址！")
        upperAddress="0x7a48b32AF1E124B6C6D94809126bdEbB8a5a4E13";
    }
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    const data = _contract.methods
        .depositTwo(
            upperAddress,
            Number(_amount1)*systemPrecisions,
            getCurrencyIndex(currency2),
        ).encodeABI();
    sendTransfer(account, data, 0x0, callback, errorCallback)
}

//取出单币种
function takeoutOne(account,currency,amount, callback, errorCallback){
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    const data = _contract.methods
        .takeoutOne(
            getCurrencyIndex(currency),
            Number(amount)*systemPrecisions,
        ).encodeABI();
    sendTransfer(account, data, 0x0, callback, errorCallback);
}
//取出双币种
function takeoutTwo(account,amount1,currency2,callback, errorCallback){
    console.log("上级地址："+account);
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    const data = _contract.methods
        .takeoutTwo(
            Number(amount1)*systemPrecisions,
            getCurrencyIndex(currency2),
        ).encodeABI();
    sendTransfer(account, data, 0x0, callback, errorCallback);
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

/**
 * 1币种存入记录
 */
function oneDepositOrder(address,index,callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    _contract.methods.oneOrderMap(address,index)
        .call()
        .then((res) => {
            callback(res);
        })
        .catch((err) => {
            errorCallback(err);
        });
}
/**
 * 2币种存入记录
 */
function twoDepositOrder(address,index,callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    _contract.methods.twoOrderMap(address,index)
        .call()
        .then((res) => {
            callback(res);
        })
        .catch((err) => {
            errorCallback(err);
        });
}

/***
 * 币种锁仓金额(单币种区+双币种区)
 * @param currency
 * @param callback
 */
function totalUseableBalance(currency,callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_recordContractABI, _recordContractAddress);
    currency=currency.toUpperCase();
    _contract.methods.totalUseableByCurrency(getCurrencyIndex(currency)).call().then((res) => { callback(res); }).catch((err) => { errorCallback(err); });
}
/***
 * 币种锁仓金额(单币种区)
 * @param currency
 * @param callback
 */
function oneUseableBalance(currency,callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_recordContractABI, _recordContractAddress);
    currency=currency.toUpperCase();
    _contract.methods.totalOneUseableByCurrency(getCurrencyIndex(currency)).call().then((res) => { callback(res); }).catch((err) => { errorCallback(err); });
}
/***
 * 币种锁仓金额(双币种区)
 * @param currency
 * @param callback
 */
function twoUseableBalance1(currency,callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_recordContractABI, _recordContractAddress);
    currency=currency.toUpperCase();
    _contract.methods.totalTwoUseable1ByCurrency(getCurrencyIndex(currency)).call().then((res) => { callback(res); }).catch((err) => { errorCallback(err); });
}

/***
 * 币种锁仓金额(双币种区)
 * @param currency
 * @param callback
 */
function twoUseableBalance2(currency,callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_recordContractABI, _recordContractAddress);
    currency=currency.toUpperCase();
    _contract.methods.totalTwoUseable2ByCurrency(getCurrencyIndex(currency))
        .call()
        .then((res) => {
            callback(res);
        }).catch((err) => {
            errorCallback(err);
        });
}

/***
 * 我的收益
 * @param address
 * @param index
 * @param callback
 */
function incomeAccount(address,callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    _contract.methods.ia_map(address)
        .call()
        .then((res) => {
            callback(res);
        })
        .catch((err) => {
            console.log({err});
            errorCallback(err);
        });
}
/***
 * 收益记录
 * @param address
 * @param index
 * @param callback
 */
function incomeRecord(address,index,callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    _contract.methods.incomeRecord(address,index)
        .call()
        .then((res) => {
            console.log({'profits':res})
            callback(res);
        })
        .catch((err) => {
            errorCallback(err);
        });
}

/***
 * 取出收益
 * @param amount
 */
function takeoutIncome(account,amount, callback, errorCallback){
    if(amount.parseInt <= 0){
        return;
    }
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    const data = _contract.methods
        .takeoutIncome(
            Number(amount)*systemPrecisions,
        ).encodeABI();
    sendTransfer(account, data, 0x0, callback, errorCallback);
}

/***
 * 查上级
 * @param account
 * @param callback
 */
function queryUpUser(account,callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    _contract.methods.recommendMap(account)
        .call()
        .then((res) => {
            callback(res);
        })
        .catch((err) => {
            errorCallback(err);
        });
}

/***
 * 查下级
 * @param account
 * @param callback
 */
function queryDownUser(account,index,callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    _contract.methods.downsMap(account,index)
        .call()
        .then((res) => {
            callback(res);
        })
        .catch((err) => {
            errorCallback(err);
        });
}

/***
 * 单币种存入总笔数
 * @param callback
 * @param errorCallback
 */
function queryOnesSize(address,callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    _contract.methods.queryOnesSize(address)
        .call()
        .then((res) => {
            callback(res);
        })
        .catch((err) => {
            errorCallback(err);
        });
}

/***
 * 双币种存入总笔数
 * @param callback
 * @param errorCallback
 */
function queryTwosSize(address,callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    _contract.methods.queryTwosSize(address)
        .call()
        .then((res) => {
            callback(res);
        })
        .catch((err) => {
            errorCallback(err);
        });
}
/***
 * 我的 !!!"直接"!!! 下级 人数
 * @param callback
 * @param errorCallback
 */
function queryDownsSize(address,callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    _contract.methods.queryDownsSize(address)
        .call()
        .then((res) => {
            callback(res);
        })
        .catch((err) => {
            errorCallback(err);
        });
}
/***
 * 我兑换了多少笔
 * @param callback
 * @param errorCallback
 */
function queryExchangeSize(address,callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    _contract.methods.queryExchangeSize(address)
        .call()
        .then((res) => {
            callback(res);
        })
        .catch((err) => {
            errorCallback(err);
        });
}
/**
 * 我的收入记录笔数
 * @param callback
 * @param errorCallback
 */
function queryIncomeSize(address,callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    _contract.methods.queryIncomeSize(address)
        .call()
        .then((res) => {
            callback(res);
        })
        .catch((err) => {
            errorCallback(err);
        });
}
/**
 * 总共有多少人存
 * @param callback
 * @param errorCallback
 */
function queryDepositUserSize(callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_contractABI, _contractAddress);
    _contract.methods.queryDepositUserSize()
        .call()
        .then((res) => {
            callback(res);
        })
        .catch((err) => {
            errorCallback(err);
        });
}

/**
 * 取出收益记录
 * @param callback
 * @param errorCallback
 */
function queryTakeoutIncomeRecord(address,index,callback,errorCallback) {
    const _contract = new window.web3.eth.Contract(_recordContractABI, _recordContractAddress);
    _contract.methods.takeoutIncomeMap(address,index)
        .call()
        .then((res) => {
            callback(res);
        })
        .catch((err) => {
            errorCallback(err);
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
    }
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
}
