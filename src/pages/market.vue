<template>
  <div class="market">
    <a-spin class="global_loading" tip="loading" :spinning="spinStatus" size="large">
      <div class="team-amount">
        <svg-icon icon-class="team_top_icon" class="team-icon"></svg-icon>
        <div class="amount-item">
          <span>{{$t('l.t_tolp')}}</span><span>LBR</span><span><countTo :endVal='team.totalProfit' :duration='3000' :decimals="2"></countTo></span>
        </div>
        <div class="amount-item">
          <span>{{$t('l.t_todayp')}}</span><span>LBR</span><span><countTo :endVal='team.todayProfit' :duration='3000' :decimals="2"></countTo></span>
        </div>
      </div>
      <div class="team-level">

        <div class="level-desc">
          <span>{{$t('l.t_level')}}</span>
          <span :style="[{color:team.status === $t('l.l_completed')? '#43318C':'#9C9C9C'}]">{{team.status}}</span>
        </div>
        <div class="level">
            <div class="line-docr">
              <div class="line" :style="[{background:team.leftLevel ? '#43318C':'white'}]"></div>
              <div class="line" :style="[{background:team.rightLevel ? '#43318C':'white'}]"></div>
            </div>
            <div class="level-item" style="justify-content: flex-start;" >
              <div @click="leftTeamClick"><svg-icon v-show="team.leftLevel" icon-class="left_icon"></svg-icon></div>
              <span v-show="team.leftLevel" style="left:5px">{{team.leftLevel}}</span>
            </div>
            <div class="level-item" style="justify-content: center;">
              <svg-icon class="team-level-icon" :icon-class="team.level + '_icon'"></svg-icon>
            </div>
            <div class="level-item" style="justify-content: flex-end;" >
              <div @click="rightTeamClick"><svg-icon v-show="team.rightLevel" icon-class="right_icon" ></svg-icon></div>
              <span v-show="team.rightLevel" style="right:5px">{{team.rightLevel}}</span>
            </div>
        </div>
        <div class="team-level-desc-nor">
          {{$t('l.t_desc')}}
        </div>
        <div class="team-level-amount"><countTo :endVal='team.needTeamProfor' :duration='1000' :decimals="2" prefix="$"></countTo></div>
        <div class="team-level-desc">
          {{$t('l.t_desc1')}}{{team.enjoyRatio}}
        </div>
        <a-button size="default" class="invite-btn" @click="handleCopyLink">{{$t('l.l_invite')}}</a-button>
      </div>
      <div class="team-level">
        <div class="level-desc">
          <span>{{$t('l.t_info')}}</span>
          <span>
            <a-input-search :loading="searching" :allowClear="true" :placeholder="$t('l.l_teamlink')" @search="onSearchTeam">
              <a-button slot="enterButton" >
                <svg-icon  icon-class="search_icon" style="width:16px;height:16px;"></svg-icon>
              </a-button>
            </a-input-search>
    </span>
        </div>
        <div class="team-wrap">
        <a-spin class="team_loading" tip="loading" :spinning="teamSearching" size="large">
        <div class="team-info">
            <div class="info-item">
              <svg-icon icon-class="team_icon_01"></svg-icon>
              <span>{{$t('l.t_num')}}</span>
              <span><countTo :endVal='team.teamPeople' :duration='1000'></countTo></span>
            </div>
            <div class="info-item">
              <svg-icon icon-class="team_icon_02"></svg-icon>
              <span>{{$t('l.t_ttt')}}</span>
              <span><countTo :endVal='team.teamProformance' :duration='1000' :decimals="2"></countTo></span>
            </div>
            <div class="info-item">
              <svg-icon icon-class="team_icon_03"></svg-icon>
              <span>{{$t('l.t_tre')}}</span>
              <span><countTo :endVal='team.teamProfit' :duration='1000' :decimals="2"></countTo></span>
            </div>
        </div>
        </a-spin>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import Wallet from '@/utils/Wallet.js';
import countTo from 'vue-count-to';
export default {
  name: "Market",
  components: {
    countTo,
  },
  data() {
    return {
      currentHref: window.location.origin+window.location.pathname,
      spinStatus:false,
      walletAddress:'',
      inviteAddress:'',
      isSearchData:false,
      team:{
        totalProfit:0,
        todayProfit:0,
        teamPeople:0,
        teamProformance:0,
        needTeamProfor:13*Math.pow(10,5),
        teamProfit:0,
        leftLevel:'LV1',
        level:'LV2',
        enjoyRatio:'3%',
        rightLevel:'LV3',
        status:this.$t('l.l_unfinished'),
      },
      currentTeam:{
        teamPeople:0,
        teamProformance:0,
        teamProfit:0,
      },
      layers:0,
      teamLevels:[
        {level:'LV1',value:Math.pow(10,5),ratio:'2%'},
        {level:'LV2',value:13*Math.pow(10,5),ratio:'3%'},
        {level:'LV3',value:19*Math.pow(10,5),ratio:'4%'},
        {level:'LV4',value:27*Math.pow(10,5),ratio:'5%'},
        {level:'LV5',value:81*Math.pow(10,5),ratio:'6%'},
        {level:'LV6',value:243*Math.pow(10,5),ratio:'7%'},
        {level:'LV7',value:729*Math.pow(10,5),ratio:'8%'},
      ],
      curLevelIndex:2,
      coins:[
        {key:1,coin:'Libra',price:1},
        {key:2,coin:'BTC',price:1},
        {key:3,coin:'ETH',price:1},
        {key:4,coin:'USDT',price:1},
        {key:5,coin:'BNB',price:1},
        {key:6,coin:'FIL',price:1},
      ],
      searching:false,
      teamSearching:false,
    }
  },
  computed: {
  },
  methods: {
    //{"0":"4","1":"0xFaC462928525FAEA834d8000796B7843f822AF1d",
//"2":"10000000000","3":"10000000000","4":"0","5":"1629387212",
//"currencyIndex":"4","userAddress":"0xFaC462928525FAEA834d8000796B7843f822AF1d",
//"totalAmount":"10000000000","useableAmount":"10000000000","takeoutAmount":"0",
//"depositTime":"1629387212"}

//{"0":"0xFaC462928525FAEA834d8000796B7843f822AF1d","1":"1","2":"10000000000",
//"3":"10000000000","4":"0","5":"5","6":"94449209",
//"7":"94449209","8":"0","9":"1629389428",
//"userAddress":"0xFaC462928525FAEA834d8000796B7843f822AF1d",
//"currency1Index":"1","totalAmount1":"10000000000",
//"useableAmount1":"10000000000","takeoutAmount1":"0",
//"currency2Index":"5","totalAmount2":"94449209","useableAmount2":"94449209",
//"takeoutAmount2":"0","depositTime":"1629389428"}
   onSearchTeam(value){
      console.log({searchValue:value})
      let _self = this
      if(!value){
          this.team.teamProfit = this.currentTeam.teamProfit;
          this.team.teamProformance = this.currentTeam.teamProformance;
          this.team.teamPeople = this.currentTeam.teamPeople;
          return
      } 
      let genrateAddr = this.$emptyAddress()
      if(value && value.length < genrateAddr.length){
        this.$message.error({content:this.$t('l.l_enterrightaddress'),top:`300px`})
        return
      }
      this.isSearchData = true
      this.searching = true
      this.teamSearching = true
      setTimeout(async ()=>{
        _self.removeInfo() //搜索前移除信息
        await _self.calculateTeamInfo(value,true);
        _self.teamSearching = false
      },);

   },
   async calculateTeamPerformance(){
      let _self = this;
      const layers_two_storeage = localStorage.getItem('TWO-RECORD')
      const layers_two_Record = JSON.parse(layers_two_storeage) || []
      const layers_one_storeage = localStorage.getItem('ONE-RECORD')
      const layers_one_Record = JSON.parse(layers_one_storeage) || []
      const layers_profit_storeage = localStorage.getItem('PROFIT-RECORD')
      const layers_profit_Record = JSON.parse(layers_profit_storeage) || []
      //2.1. Libra 数量
      // 1libra.   2btc. 3eth.  4usdt.  5bnb.  6fil
      var libra_amount = 0, btc_amount_two = 0,eth_amount_two = 0,
      usdt_amount_two = 0,bnb_amount_two = 0,fil_amount_two = 0;
      for(let i = 0,len = layers_two_Record.length; i < len; i++){
        let item = layers_two_Record[i]
        if(item.currency1Index == 1){
           libra_amount += Number(item.useableAmount1) / Wallet.Precisions()
        }
        if(item.currency2Index == 2){
          btc_amount_two += Number(item.useableAmount2) / Wallet.Precisions()
        }
        if(item.currency2Index == 3){
          eth_amount_two += Number(item.useableAmount2) / Wallet.Precisions()
        }
        if(item.currency2Index == 4){
          usdt_amount_two += Number(item.useableAmount2) / Wallet.Precisions()
        }
        if(item.currency2Index == 5){
          bnb_amount_two += Number(item.useableAmount2) / Wallet.Precisions()
        }
        if(item.currency2Index == 6){
          fil_amount_two += Number(item.useableAmount2) / Wallet.Precisions()
        }
      }

      //1.2. BTC 数量
      var btc_amount_one = 0, eth_amount_one = 0, usdt_amount_one = 0,
      bnb_amount_one = 0, fil_amount_one = 0;
      for(let i = 0, len = layers_one_Record.length; i < len; i++){
        let item = layers_one_Record[i]
        if(item.currencyIndex == 1){
           libra_amount += Number(item.useableAmount) / Wallet.Precisions()
        }
        if(item.currencyIndex == 2){
          btc_amount_one += Number(item.useableAmount) / Wallet.Precisions()
        }
        if(item.currencyIndex == 3){
          eth_amount_one += Number(item.useableAmount) / Wallet.Precisions()
        }
        if(item.currencyIndex == 4){
          usdt_amount_one += Number(item.useableAmount) / Wallet.Precisions()
        }
        if(item.currencyIndex == 5){
          bnb_amount_one += Number(item.useableAmount) / Wallet.Precisions()
        }
        if(item.currencyIndex == 6){
          fil_amount_one += Number(item.useableAmount) / Wallet.Precisions()
        }
      }
      
      // 2 + 1
      let btc_amount = btc_amount_two + btc_amount_one;
      let eth_amount = eth_amount_two + eth_amount_one;
      let usdt_amount = usdt_amount_two + usdt_amount_one;
      let bnb_amount = bnb_amount_two + bnb_amount_one;
      let fil_amount = fil_amount_two + fil_amount_one;   

      //3. Libra 收益数量
      let libra_profit_amount = layers_profit_Record.reduce((prev,item) => {
                                                return prev + Number(item.amount)/Wallet.Precisions()
                                            },0)
      console.log({libra_amount,btc_amount,eth_amount,usdt_amount,bnb_amount,fil_amount,libra_profit_amount})
      if(_self.coins[1].price < 3){
         const res = await _self.getCoinsPrice();
         //更新价格
         res.forEach((ele,index) => {
           _self.coins[index].price = (+ele || 1)
         })
      }
      //团队业绩
      _self.team.teamProformance = libra_amount * _self.coins[0].price +
                                  btc_amount * _self.coins[1].price + 
                                  eth_amount * _self.coins[2].price +
                                  usdt_amount * _self.coins[3].price +
                                  bnb_amount * _self.coins[4].price +
                                  fil_amount * _self.coins[5].price;
      

      //团队收益
      _self.team.teamProfit = libra_profit_amount * _self.coins[0].price;  
      if(!_self.isSearchData){
        _self.currentTeam.teamProformance = _self.team.teamProformance + 0
        _self.currentTeam.teamProfit = _self.team.teamProfit + 0
      }
      //检查完成状态
      this.checkTeam()
    },
    leftTeamClick(){
      //减一
      this.curLevelIndex -= 1;
      let level =  `LV${this.curLevelIndex}`
      this.team.level = level
      this.checkTeam()
    },
    rightTeamClick(){
      //加一
      this.curLevelIndex += 1;
      let level = `LV${this.curLevelIndex}`
      this.team.level = level
      this.checkTeam()
    },
    checkTeam(){
      const {teamProformance,level} = this.team
      console.log({level})
      if(level == this.teamLevels[0].level){
        this.team.needTeamProfor = this.teamLevels[0].value
        this.team.enjoyRatio = this.teamLevels[0].ratio
        this.team.leftLevel = null
        this.team.level = 'LV1'
        this.team.rightLevel = 'LV2'
        this.team.status = teamProformance < this.teamLevels[0].value ? this.$t('l.l_unfinished') : this.$t('l.l_completed')
      }else if (level == this.teamLevels[1].level){
        this.team.needTeamProfor = this.teamLevels[1].value
        this.team.enjoyRatio = this.teamLevels[1].ratio
        this.team.leftLevel = 'LV1'
        this.team.level = 'LV2'
        this.team.rightLevel = 'LV3'
        this.team.status = teamProformance < this.teamLevels[1].value ? this.$t('l.l_unfinished') : this.$t('l.l_completed')
      }else if (level == this.teamLevels[2].level){
        this.team.needTeamProfor = this.teamLevels[2].value
        this.team.enjoyRatio = this.teamLevels[2].ratio
        this.team.leftLevel = 'LV2'
        this.team.level = 'LV3'
        this.team.rightLevel = 'LV4'
        this.team.status = teamProformance < this.teamLevels[2].value ? this.$t('l.l_unfinished') : this.$t('l.l_completed')
      }else if (level == this.teamLevels[3].level){
        this.team.needTeamProfor = this.teamLevels[3].value
        this.team.enjoyRatio = this.teamLevels[3].ratio
        this.team.leftLevel = 'LV3'
        this.team.level = 'LV4'
        this.team.rightLevel = 'LV5'
        this.team.status = teamProformance < this.teamLevels[3].value ? this.$t('l.l_unfinished') : this.$t('l.l_completed')
      }else if (level == this.teamLevels[4].level){
        this.team.needTeamProfor = this.teamLevels[4].value
        this.team.enjoyRatio = this.teamLevels[4].ratio
        this.team.leftLevel = 'LV4'
        this.team.level = 'LV5'
        this.team.rightLevel = 'LV6'
        this.team.status = teamProformance < this.teamLevels[4].value ? this.$t('l.l_unfinished') : this.$t('l.l_completed')
      }else if (level == this.teamLevels[5].level){
        this.team.needTeamProfor = this.teamLevels[5].value
        this.team.enjoyRatio = this.teamLevels[5].ratio
        this.team.leftLevel = 'LV5'
        this.team.level = 'LV6'
        this.team.rightLevel = 'LV7'
        this.team.status = teamProformance < this.teamLevels[5].value ? this.$t('l.l_unfinished') : this.$t('l.l_completed')
      }else if (level == this.teamLevels[6].level){
        this.team.needTeamProfor = this.teamLevels[6].value
        this.team.enjoyRatio = this.teamLevels[6].ratio
        this.team.leftLevel = 'LV6'
        this.team.level = 'LV7'
        this.team.rightLevel = null
        this.team.status = teamProformance < this.teamLevels[6].value ? this.$t('l.l_unfinished') : this.$t('l.l_completed')
      }
    },
    async getCoinsPrice(){
      let _self = this
      let promiseCoinRequestArray = this.coins.map(ele => {
          return new Promise((resolve,reject) => {
               Wallet.queryPrice(ele.coin.toLowerCase(),res =>{
                 resolve(Number(res ? res : 1))
               },err =>{ reject(err)})
          })
      })
      return Promise.all(promiseCoinRequestArray)
    },
    async calculateTeamInfo(address,isTop) {
      let _self = this
      //-1. 打印地址
      console.log({'layer-show':this.layers,address})
      //0. 
      if(isTop){ //本人自己
        //----------------
      }
      //1. 获得 address 下直接数量
      const total_a = await _self.checkNodeCount(address)
      console.log({address,total_a,a:'直接数量'})
      _self.team.teamPeople += Number(total_a)
      if(!_self.isSearchData){
        _self.currentTeam.teamPeople = _self.team.teamPeople + 0
      }
      const total_num = +total_a
      if(total_num > 0){
        //2. 获得 address 下直推下级的地址信息, 获得团队人数
        const info_a = await _self.getNodeTeamDown(address,0,total_num,total_num)
        console.log({address,info_a,a:'团队地址详情'})
        //3. 根据下级地址获得存入记录: 单币记录,双币记录,  返利记录 --> 计算团队业绩,  团队总收益
        if(!info_a || info_a.length == 0) {
            _self.searching = false
            return
        }

        _self.layers++; //层数
        //3.x
        for(let i = 0,len = info_a.length; i < len; i++){
          
          //3.1
          setTimeout(async function(i){
              let item = info_a[i]
              const item_address = item.downAddress
              const oneCount = await _self.checkHasMyLockData(item_address)
              if(oneCount > 0){
                const oneRecord = await _self.getMyLockAmount(item_address,0,oneCount,oneCount)
                console.log({item_address,oneRecord,a: i + 'MyLockData'})
                if(oneRecord && oneRecord.length > 0){
                  const oneStr = localStorage.getItem('ONE-RECORD')
                  const historyOneRecord = JSON.parse(oneStr) || []
                  historyOneRecord.push(...oneRecord)
                  localStorage.setItem('ONE-RECORD',JSON.stringify(historyOneRecord))
                }
              }
              //3.2
              const twoCount = await _self.checkHasMyPairLockData(item_address)
              console.log({item_address,twoCount,a: i + 'checkHasMyPairLockData'})
              if(twoCount > 0){
                const twoRecord = await _self.getMyPairLockAmount(item_address,0,twoCount,twoCount)
                console.log({item_address,twoRecord,a: i + 'MyPairLock'})
                if(twoRecord && twoRecord.length > 0){
                    const twoStr = localStorage.getItem('TWO-RECORD')
                    const historyTwoRecord = JSON.parse(twoStr) || []
                    historyTwoRecord.push(...twoRecord)
                    localStorage.setItem('TWO-RECORD',JSON.stringify(historyTwoRecord))
                }
              }
              //3.3
              const profitCount = await _self.checkHasIncomeData(item_address)
              console.log({item_address,profitCount,a: i + 'checkHasIncomeData'})
              if(profitCount > 0){
                const profitRecord = await _self.getProfitRecord(item_address,0,profitCount,profitCount)
                console.log({item_address,profitRecord,a: i + 'getProfitRecord'})
                if(profitRecord && profitRecord.length > 0){
                    const profitStr = localStorage.getItem('PROFIT-RECORD')
                    const historyProfitRecord = JSON.parse(profitStr) || []
                    historyProfitRecord.push(...profitRecord)
                    localStorage.setItem('PROFIT-RECORD',JSON.stringify(historyProfitRecord))
                }
              }
              _self.calculateTeamPerformance()
          }.bind(_self),0,i)
          let nextLayer_whichAddress = info_a[i].downAddress
          if(nextLayer_whichAddress && nextLayer_whichAddress.length > 0 && address.toLowerCase() !== nextLayer_whichAddress.toLowerCase()){
            //3.4 --> 节点地址往下递归
            _self.calculateTeamInfo(nextLayer_whichAddress,false)
          }
        }
  
      }else{
        if(_self.searching){
          //正在查找团队信息
          _self.$message.error(_self.$t('l.l_noTeamBelowInfo'))
          _self.team.teamProfit = 0;
          _self.team.teamProformance = 0;
          _self.searching = false
        }
      }
    },
    /**
     * 节点 address 直推下级 所有数量
     */
    async checkNodeCount(address){
      let _self = this
      return new Promise((resolve,reject) => {
          Wallet.queryDownsSize(address,(res) =>{
            resolve(res)
          },(err) => {
            reject(err)
          })
      })
    },

    /**
     * 节点 address 下级信息
     * "upperAddress":"0x678B95f105c414A5A6014Db225930b1B0fd93f88",
     * "userAddress":"0x678B95f105c414A5A6014Db225930b1B0fd93f88",
     * "hasDeducted":true}
     */
    async getNodeTeamDown(address,start = 0, end = 1,total = 1){
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
            _self.$message.error(_self.$t('l.catch_err'))
        }
      })
    },
    async getIncomeData(){
      let _self = this
      _self.walletAddress = localStorage.getItem("walletAddress") || '';
      new Promise((resolve) => {
          Wallet.incomeAccount(_self.walletAddress,(res)=>{
             resolve(res)
          })
      })
    },
    //2币判断
    async checkHasMyPairLockData(address){
      let _self = this
      return new Promise((resolve,reject) => {
          Wallet.queryTwosSize(address,(res) =>{
              resolve(+res || 0)
          },(err) => {
              reject(err)
          })

      })
    },
    //1币判断
    async checkHasMyLockData(address){
      let _self = this
      return new Promise((resolve,reject) => {
        Wallet.queryOnesSize(address,(res) =>{
            resolve(+res || 0) 
        },(err) => {
            reject(err)
        })
      })
    },
    //2币记录
    async getMyPairLockAmount(address,start = 0,end = 1,twoSize = 1){
      let _self = this
      return new Promise((resolve,reject) => {
        try {
          let promiseMyLockArr = [],resultLockArr = [];
          let i = start;
          end = end > twoSize ? twoSize : end
          do {
            promiseMyLockArr[i] = new Promise((res,rej) => {
                Wallet.twoDepositOrder(address,i,(record) => {
                  if(record){
                    resultLockArr.push(record)
                    res(record)
                  }else{
                    rej('error')
                  }
                },(err) => {rej(err)})
            })
            ++i;

          } while (i < end);

          //全部请求可能失败, finally接收
          Promise.all(promiseMyLockArr)
          .then((res) => {
            resolve(res)
            //这里过滤数据, 递归
            if(end < twoSize){
              _self.getMyPairLockAmount(address,end,end + 1,twoSize)
            }
          })
          .catch((err) => {reject(err)})
        } catch (error) {
            reject(error)
        }
      })
    },
    //1币记录
    async getMyLockAmount(address,start = 0, end = 1,oneSize){
      let _self = this
      return  new Promise((resolve,reject) => {
        try {
          let promiseMyLockArr = [],resultLockArr = [];
          let i = start;
          end = end > oneSize ? oneSize : end
          do {
            promiseMyLockArr[i] = new Promise((res,rej) => {
                Wallet.oneDepositOrder(address,i,(record) => {
                  
                  if(record){
                    resultLockArr.push(record)
                    res(record)
                  }else{
                    rej('error')
                  }
                },(err) => {rej(err)})
            })
            ++i;

          } while (i < end);

          //全部请求,可能失败
          Promise.all(promiseMyLockArr).then((res) => {
            
            resolve(res)
            //格式化数据 0-ETH  1-BNB 3-BTC 4-USDT
            //这里过滤数据, 递归
            if(end < oneSize){
              _self.getMyLockAmount(address,end,end + 1,oneSize)
            }

          })
          .catch((err) => {
            reject(err)
          })
        } catch (error) {
            reject(error)
        }
      })
    },
    //返利判断
    async checkHasIncomeData(address){
      let _self = this
      return new Promise((resolve,reject) => {
        Wallet.queryIncomeSize(address,(res) =>{
            resolve(+res || 0) 
        },(err) => {
            reject(err)
        })
      })
    },
    //返利记录
    async getProfitRecord(address,start = 0, end = 1,dataSize = 1){
      let _self = this
      return new Promise((resolve,reject) => {
        try {
          let promiseRecordArr = [],resultRecordArr = [];
          let i = start;
          do {
            end = end > dataSize ? dataSize : end
            promiseRecordArr[i] = new Promise((res,rej) => {
                Wallet.incomeRecord(address,i,(record) => {
                  if(record){
                    resultRecordArr.push(record)
                    res(record)
                  }else{
                    rej('error')
                  }
                },err => rej(err))
            })
            ++i;

          } while (i < end);

          //全部请求,可能失败, finally接收
          Promise.all(promiseRecordArr).then((res) => {
            resolve(res)
            //这里过滤数据, 递归
            if(dataSize > end){
              _self.getProfitRecord(end,end + 1)
            }
          })
          .catch((err) => {
            reject(err)
          })

        } catch (error) {
            reject(error)
        }
      })
    },
    handleCopyLink() {

      this.walletAddress = localStorage.getItem("walletAddress") || '';
      if(!this.walletAddress) {
        this.$message.error(this.$t('l.error_tips_unconnect'))
        return
      }
      this.$copyText(this.currentHref+'#/market?address='+this.walletAddress).then( () => {
        this.$message.success('复制成功')
      }, function () {
        this.$message.error('复制失败,请重试！')
      })
    },
    removeInfo(){
      this.team.teamPeople = 0
      localStorage.removeItem('ONE-RECORD')
      localStorage.removeItem('TWO-RECORD')
      localStorage.removeItem('PROFIT-RECORD')

    },
  },
  created() {
  },
  async mounted() {
      let _self = this
      _self.walletAddress = localStorage.getItem("walletAddress") || '';
      let inviteAddress = _self.$route.query.address
      if(inviteAddress && inviteAddress.length > 0) { _self.$setCookie('inviteAddress',inviteAddress,30 * 24 * 60 * 60)}
      _self.inviteAddress = _self.$getCookie('inviteAddress')
      
      setTimeout(async ()=>{
        if(!_self.walletAddress) return
         _self.removeInfo() //清除信息
         await _self.calculateTeamInfo(_self.walletAddress,true);
         const res = await _self.getCoinsPrice();
        //更新价格
        res.forEach((ele,index) => {
          _self.coins[index].price = (+ele || 1)
        })
      },);
      const res = await _self.getIncomeData()
      if(res){
          const {
            total,  //总收益
            takeout, //总取出
            todayDividend,//今日分红
            todayShareAmount,//今日分享收益
            todayGlobalAmount//今日全球算力
                } = res
          _self.team.totalProfit = total || 0
          _self.team.todayProfit = (+todayDividend || 0) + (+todayShareAmount || 0) + (+todayGlobalAmount || 0)
      }

  },
  beforeDestroy(){
    this.removeInfo()
  },
  destroyed() {
  }
}
</script>

<style scoped lang="less">
.team-wrap {
  width: 100%;
}
.team-amount {
  display: flex;
  align-items: center;
  margin: 0px auto;
  max-width: 1200px;
  width: 100%;
  border-radius: 20px;
  background: #43318C;
  height: 126px;
  position: relative;
  overflow: hidden;
}
.team-icon {
  width:64px;
  height: 48px;
  position: absolute;
  bottom:-21px;
  left:50%;
  transform: translateX(-50%);
}
.amount-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}
.amount-item span:nth-of-type(3) {
  color: white;
  font-size: 16px;
  font-weight: bold;
}

.team-level {
  margin: 0 auto;
  margin-top: 30px;
  padding: 20px;
  border-radius: 20px;
  max-width: 1200px;
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.level {
  margin: 0px 30px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.line-docr {
  position:absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  left: 0;

  display: flex;
}
.line-docr .line {
  width: 50%;
  height: 3px;
  background: #43318C;
}
.level-desc {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.level-desc span:nth-child(1) {
  color: #000;
  font-size: 16px;
  font-weight: 500;
  flex: 1;
}
.level-desc span:nth-child(2) {
  color: #9c9c9c;
  font-size: 14px;
  flex: 1;
  margin-right: 0px;
  text-align: right;
}
/deep/.ant-input {
    background-color: #f1f1f1;
    border: 1px solid transparent;
    border-radius: 4px;
}
/deep/.ant-btn {
    background-color: #f1f1f1;
    border: 1px solid transparent;
    border-color: transparent;
}
/deep/.ant-btn-primary {
    color: #43318C;
}
.level-item {
  flex: 1;
  display: flex;
  position: relative;
}
.level-item span {
  position:absolute;
  top: 100%;
}
.level-item .svg-icon {
   width: 32px;
   height: 32px;
}
.level-item .team-level-icon {
  width: 80px;
  height: 80px;
}
.team-level-desc-nor {
  margin-top: 24px;
  font-size: 14px;
  color: #9c9c9c;
}
.team-level-amount {
  margin: 10px 0px;
  font-size: 18px;
  font-weight: bold;
  color: #43318C;
}
.team-level-desc {
  font-size: 14px;
  text-align: center;
  color: #000;
}
.invite-btn {
  margin-top: 24px;
  width: 148px;
  height: 40px;
  color: white;
  background: #000;
}
.team-info {
  display: flex;
  align-items: center;
  width: 100%;
}
.info-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color:#9c9c9c;
  text-align: center;
}
.info-item .svg-icon {
  width: 32px;
  height: 32px;
}
.info-item span:nth-of-type(1) {
  color: #9c9c9c;
  font-size: 14px;
  margin: 10px 0px 1px 0px;
}
.info-item span:nth-of-type(2) {
  color: #000;
  font-size: 16px;
}

@media (max-width: 768px) {
  .team-amount,.team-level {
    border-radius: 0px;
  }
  .team-info {
    margin-top:15px;
  }
  .team-level {
    margin-top: 0px;
  }
}
</style>
<style>
  .global_loading.ant-spin-nested-loading > div > .ant-spin {
    width: 100%;height: 100vh;
    position: fixed!important;
    top: 0!important;
    bottom: 0!important;
    left: 0!important;
    right: 0!important;
    z-index: 99999!important;
    max-height: 10000px!important;
    background-color: rgba(255,255,255,.6);
  }
</style>