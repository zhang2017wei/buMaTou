import  { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Input, ScrollView, Button } from '@tarojs/components'
import './bill.scss'
import Xhr from '/src/libs/xhr';
import EditPop from './editPop'

export default class Index extends Component {
  config = {
    navigationStyle: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      showPop: {
        status: false,
        type: null
      },
      showEdit: {
        status: false,
        indexF: null,
        data: null
      },
      totalMoney: 0,
      totalEarning: 0,
      positionNum: 0
    };
    this._windowHeight = Taro.getSystemInfoSync().windowHeight;
    this.popData = {
      time: null,
      name: '',
      number: null,
      priceBuy: 0,
      priceSell: 0
    }
    this.saveIndexF = -1;
    this.saveIndexC = -1;
  }

  componentWillMount () {

     this.onGetConfigList();
    // const {windowHeight} = Taro.getSystemInfoSync()
    console.log('windowHeight...', this._windowHeight)

    // const _list = Taro.getStorageSync('goodListData');
  }

  onGetConfigList() {
    Xhr.getJson('go/games/webconfig/detail?id=17').then((res) => {
      console.log('page data res', JSON.parse(res.detail.json_config))
      const _data = JSON.parse(res.detail.json_config)
      if(!_data) return this.onGetLocalData();
      Taro.setStorageSync('goodListData', _data.data);
      this.setState({
        listData: _data.data,
        // totalMoney: _data.totalMoney,
        totalEarning: _data.totalEarning
      }, () => {
        this.onSetBaseData()
      })
    })
  }

  onGetLocalData() {
    const _list = Taro.getStorageSync('goodListData');
    this.setState({
      listData: _list
    }, () => {
      this.onSetBaseData()
      this.onSaveData()
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onSaveData() {
    const {listData, totalMoney, totalEarning} = this.state;
    if(!listData || !listData.length) return
    const _list = Taro.getStorageSync('goodListData');
    let p1 = {
      data: _list || listData,
      // totalMoney: totalMoney,
      totalEarning: totalEarning
    }
    let param = {
      name: 'test',
      link: 'test',
      dev_link: 'test',
      start_time: 'test',
      end_time: 'test',
      id: 17,
      json_config: JSON.stringify(p1)
    }
    console.log('保存时候的数据。。。', p1)
    Xhr.postJson('go/games/webconfig/save', param)
  }

  async onDoSearch(val) {
    // const {listData} = this.state;
    const _list = Taro.getStorageSync('goodListData');
    if(!_list) return;
    if(!val){
      this.setState({
        listData: _list
      })
    }
    let ary = [];
    await _list.forEach((item) => {
      if(item.name.indexOf(val) > -1){
        ary.push(item)
      }
    })
    this.setState({
      listData: ary
    })
  }

  closePop(flag, type) {
    this.setState({
      showPop: {
        status: flag,
        type: type
      }
    })
  }

  async onUpdateFun(data, type) {
    if(type === 'buy') {
      if(data.priceBuy < 1) return
      return this.onAddItemFun(data);
    }
    // 卖出逻辑
    if(data.priceSell < 1) return
    let _list = this.state.listData;
    let _totalEarning = this.state.totalEarning
    _list[this.saveIndexF].number = parseInt(_list[this.saveIndexF].number) - 1;
    _list[this.saveIndexF].detail[this.saveIndexC].priceSell = data.priceSell;
    console.log(_totalEarning, parseInt(data.number), parseInt(data.priceSell))
    this.setState({
      listData: _list,
      totalEarning: _totalEarning + (parseInt(data.number) * (parseInt(data.priceSell) - parseInt(data.priceBuy)))
    }, () => {
      this.popData = {
        time: '',
        name: '',
        number: null,
        priceBuy: 0,
        priceSell: 0
      }
      this.closePop(false, null)
      //this.onSetBaseData()
      Taro.setStorageSync('goodListData', _list);
      this.saveIndexF = -1;
      this.saveIndexC = -1;
      this.onSaveData()
    })
  }

  async onAddItemFun(data) {
    let _list = this.state.listData;
    let _totalMoney = this.state.totalMoney;
    const self = this;
    let flag = false
    if(_list){
      await _list.forEach((item) => {
        /*判断持仓里面是否已经有该物品 若有则直接添加库存*/
        if(item.name === data.name){
          flag = true
          item.number = parseInt(item.number) + parseInt(data.number);
          item.time = new Date().getTime();
          for(var a=0; a<=data.number-1; a++){
            item.detail.unshift({
              number: 1,
              priceBuy: data.priceBuy,
              priceSell: data.priceSell,
            })
          }
          self.setState({
            listData: _list,
            totalMoney: _totalMoney + parseInt(data.number) * parseInt(data.priceBuy)
          }, () => {
            this.popData = {
              time: '',
              name: '',
              number: null,
              priceBuy: 0,
              priceSell: 0
            }
            this.closePop(false, null)
            Taro.setStorageSync('goodListData', _list);
            this.onSetBaseData()
            this.onSaveData();
          })
        }
      })
    }
    if(flag) return
    let param = {
      time: new Date().getTime(),
      name: data.name,
      number: data.number,
      detail: [
        {
          number: 1,
          priceBuy: data.priceBuy,
          priceSell: data.priceSell,
        }
      ]
    }
    if(data.number > 1) {
      for(var a=0; a<data.number-1; a++){
        param.detail.push({
          number: 1,
          priceBuy: data.priceBuy,
          priceSell: data.priceSell,
        })
      }
    }
    let ary = this.state.listData || [];
    ary.unshift(param)
    this.setState({
      listData: ary,
      totalMoney: _totalMoney + parseInt(data.number) * parseInt(data.priceBuy)
    }, () => {
      this.popData = {
        time: '',
        name: '',
        number: null,
        priceBuy: 0,
        priceSell: 0
      }
      this.closePop(false, null)
      this.onSaveData();
      this.onSetBaseData()
      Taro.setStorageSync('goodListData', ary);
    })
  }

  onManageFun(item, li, index, idx) {
    this.saveIndexF = index;
    this.saveIndexC = idx;
    const self = this;
    if(li.priceSell > 0) {
      // 删除
      Taro.showModal({
        title: '提示',
        content: `删除${item.name}已卖出记录？`,
        success: function (res) {
          if (res.confirm) {
            console.log('点击确定')
            let _list = self.state.listData;
            if(_list[self.saveIndexF].detail.length > 1){
              _list[self.saveIndexF].detail.splice(self.saveIndexC, 1)
            } else {
              _list.splice(self.saveIndexF, 1)
            }
            self.setState({
              listData: _list
            }, () => {
              Taro.setStorageSync('goodListData', _list);
              self.saveIndexF = -1;
              self.saveIndexC = -1;
              self.onSaveData();
              self.onSetBaseData()
            })
          } else if (res.cancel) {
            console.log('点击取消')
          }
        }
      })
    } else {
      // 卖出
      this.popData = {
        time: '',
        name: item.name,
        number: 1,
        priceBuy: li.priceBuy,
        priceSell: 0
      }
      this.closePop(true, 'sell')
    }
  }

  onSetBaseData() {
    const {listData} = this.state;
    let num1 = 0, num2 = 0, num3 = 0;
    listData.forEach((item) => {
      item.detail.forEach((li) => {
        let p1 = li.number * li.priceBuy;
        let p2 = li.priceSell > 0 ? li.priceSell - li.priceBuy : 0;
        let p3 = li.priceSell > 0 ? 0 : li.number * li.priceBuy;
        num1 = num1 + p1;
        num2 = num2 + p2;
        num3 = num3 + p3;
      })
    })
    console.log('持仓金额', num3)
    this.setState({
      totalMoney: num1,
      // totalEarning: num2,
      positionNum: num3
    })
  }

  isShowEditPop(flag, data, index) {
    this.setState({
      showEdit: {
        status: flag,
        data,
        indexF: index
      }
    })
  }

  async onUpdateEditFun(data) {
    console.log('2022年12月12日19:23:56。。。。', data)
    if(data === 'close') return this.isShowEditPop(false, null, null);
    this.onGetLocalData();
    this.isShowEditPop(false, null, null);
  }

  popContentFun() {
    const { showPop } = this.state;
    const _type = showPop.type;
    return (
      <View className={'popContainer'}>
        <View className={'popContent'}>
          <View className={'popTitle'}>
            {_type === 'buy' ? '添加库存' : '卖出'}
          </View>
          <View className={'listBox'}>
            <View className={'text1T'}>名称：</View>
            <Input
              className={'input'}
              onInput={(e)=>{
                this.popData.name = e.detail.value
              }}
              value={this.popData.name}
              style={{ height: '28px', width:'100%', fontSize: '14px', }}
              placeholderStyle="font-size:12px;color:#C8C2B8;line-height:14px;"
              placeholder={'输入物品名称'}
            />
          </View>
          <View className={'listBox'}>
            <View className={'text1T'}>数量：</View>
            <Input
              className={'input'}
              onInput={(e)=>{
                this.popData.number = e.detail.value
              }}
              type="text"
              maxlength="2"
              disabled={_type === 'sell'}
              value={_type === 'sell' ? 1 : this.popData.number}
              style={{ height: '28px', width:'100%', fontSize: '14px', }}
              placeholderStyle="font-size:12px;color:#C8C2B8;line-height:14px;"
              placeholder={'输入物品数量'}
            />
          </View>
          {
            _type === 'buy' ? (
              <View className={'listBox'}>
                <View className={'text1T'}>买入价：</View>
                <Input
                  className={'input'}
                  type={'number'}
                  onInput={(e)=>{
                    this.popData.priceBuy = e.detail.value
                  }}
                  style={{ height: '28px', width:'100%', fontSize: '14px', }}
                  placeholderStyle="font-size:12px;color:#C8C2B8;line-height:14px;"
                  placeholder={'输入买入价'}
                />
              </View>
            ) : (
              <View className={'listBox'}>
                <View className={'text1T'}>卖出价：</View>
                <Input
                  className={'input'}
                  type={'number'}
                  onInput={(e)=>{
                    this.popData.priceSell = e.detail.value
                  }}
                  style={{ height: '28px', width:'100%', fontSize: '14px', }}
                  placeholderStyle="font-size:12px;color:#C8C2B8;line-height:14px;"
                  placeholder={'输入卖出价'}
                />
              </View>
            )
          }
          <View className={'popBtnContent'}>
            <Button className='btn-max-w' size='mini' type='default' onClick={this.closePop.bind(this, false, null)}>取消</Button>
            <Button className='btn-max-w' size='mini' type='primary' onClick={this.onUpdateFun.bind(this, this.popData, _type)}>确定</Button>
          </View>
        </View>
      </View>
    )
  }

  render () {
    const {listData, showPop, totalMoney, totalEarning, positionNum, showEdit} = this.state;
    return (
      <View className='billContainer'>
        <View className={'bottomOptionContent'}>
          <View className={'btnContent'}>
            <View className={'optionDiv optionDiv1'}>
              <View className={'textTit'}>总资产</View>
              <View className={`number_n`}>
                {totalMoney}
                <Text className={'chiCN'}>(持仓：{positionNum})</Text>
              </View>
            </View>
            <View className={'optionDiv optionDiv2'}>
              <View className={'textTit'}>累计收益</View>
              <View className={`number_n ${totalEarning > 0 ? 'red' : (totalEarning < 0 ? 'green' : '')}`}>
                {totalEarning}
              </View>
            </View>
          </View>
        </View>
        <View className={'topContent'}>
          <View className={'searchBox'}>
            <Input
              className={'input'}
              onInput={(e)=>{
                this.onDoSearch(e.detail.value)
              }}
              style={{ height: '28px', width:'100%', fontSize: '14px', }}
              placeholderStyle="font-size:12px;color:#C8C2B8;line-height:14px;"
              placeholder={'输入物品名称'}
            />
          </View>
        </View>
        <View className={'tableTitle table'}>
          <View className={'comBox name'}>名称</View>
          <View className={'comBox number'}>库存</View>
          <View className={'comBox priceBuy'}>买入价</View>
          <View className={'comBox priceSell'}>卖出价</View>
          <View className={'comBox earnings'}>收益值</View>
          <View className={'comBox optionB'}>操作</View>
        </View>
        <View className={'tableContent'}>
          {listData && listData.length ? listData.map((item, index) => (
            <View className={`table`} key={`listKey_${index + 1}`}>
              <View className={`comBox name ${item.number === 0 ? 'opacityN' : ''}`}
                    onClick={this.isShowEditPop.bind(this, true, item, index)}>
                {item.name}
              </View>
              <View className={`comBox number ${item.number === 0 ? 'opacityN' : ''}`}
                    onClick={this.isShowEditPop.bind(this, true, item, index)}>
                {item.number}
              </View>
              <View className={'detailContent'}>
                {item.detail && item.detail.map((li, idx) => (
                  <View className={`detailLi ${li.priceSell > 0 ? 'detailLi2' : ''}`}
                        key={`liKey_${idx + 1}`}
                  >
                    <View className={'comBox priceBuy'}>{li.priceBuy}</View>
                    <View className={'comBox priceSell'}>{li.priceSell}</View>
                    <View className={`comBox earnings ${li.priceSell > 0 ? (li.priceSell - li.priceBuy > 0 ? 'red' : 'green')  : ''}`}>
                      {li.priceSell > 0 ? li.priceSell - li.priceBuy : 0}
                    </View>
                    <View className={'comBox optionB'}
                          onClick={this.onManageFun.bind(this, item, li, index, idx)}>
                      {li.priceSell > 0 ? '删除' : '卖出'}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )) : null}
        </View>

        <View className={'onUpdateBtn'} onClick={this.closePop.bind(this, true, 'buy')}>
          <Text>+</Text> 新增库存
        </View>

        {showPop.status ? this.popContentFun(): ''}
        {showEdit.status ? <EditPop editData={showEdit.data} indexF={showEdit.indexF} onUpdateEditFun={this.onUpdateEditFun.bind(this)}/> : ''}
      </View>
    )
  }
}
