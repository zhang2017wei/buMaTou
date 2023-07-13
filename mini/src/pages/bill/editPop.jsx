import  { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Input, ScrollView, Button } from '@tarojs/components'
import './editPop.scss'

export default class EditPop extends Component {
  config = {
    navigationStyle: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      popData: this.props.editData
    };
    console.log(this.props)
  }

  componentWillMount () {

  }

  closePop() {
    if(this.props.onUpdateEditFun) return this.props.onUpdateEditFun('close')
  }
  onDeleteLi(index) {
    let _popData = this.state.popData;
    _popData.detail.splice(index, 1)
    this.setState({
      popData: _popData
    })
  }
  onDeleteData() {
    const _index = this.props.indexF;
    const self = this;
    Taro.showModal({
      title: '提示',
      content: `该操作将删除库存，是否继续？`,
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定');
          let _list = Taro.getStorageSync('goodListData');
          _list.splice(_index, 1);
          Taro.setStorageSync('goodListData', _list);
          self.doFarFun();
        } else if (res.cancel) {
          console.log('点击取消')
        }
      }
    })
  }
  onUpdateFun() {
    const {popData} = this.state;
    const _indexF = this.props.indexF;
    let _list = Taro.getStorageSync('goodListData');
    _list[_indexF] = popData;
    console.log('onUpdateFun...', _list);
    Taro.setStorageSync('goodListData', _list);
    this.doFarFun();
  }

  doFarFun() {
    if(this.props.onUpdateEditFun) return this.props.onUpdateEditFun('update')
  }

  render () {
    const {popData} = this.state;
    return (
      <View className={'popContainer'}>
        <View className={'popContent'}>
          <View className={'popTitle'}>
            编辑物品
            <View className={'close'} onClick={this.closePop.bind(this)}>x</View>
          </View>
          <View className={'listBox'}>
            <View className={'text1T'}>名称：</View>
            <Input
              className={'input'}
              onInput={(e)=>{
                popData.name = e.detail.value
              }}
              value={popData.name}
              style={{ height: '28px', width:'100%', fontSize: '14px', }}
              placeholderStyle="font-size:12px;color:#C8C2B8;line-height:14px;"
              placeholder={'输入物品名称'}
            />
          </View>
          <View className={'tdContent'}>
            <View className={'tdLi'}>买入价</View>
            <View className={'tdLi'}>卖出价</View>
            <View className={'tdLi'}>操作</View>
          </View>
          <View className={'LiContainer'}>
            {
              popData.detail.map((item, index) => (
                <View className={'liContent'} key={`liKey_${index + 1}`}>
                  <View className={'tdLi'}>
                    <Input
                      className={'input'}
                      onInput={(e)=>{
                        item.priceBuy = e.detail.value
                      }}
                      type={'number'}
                      value={item.priceBuy}
                      style={{ height: '28px', fontSize: '14px', }}
                      placeholderStyle="font-size:12px;color:#C8C2B8;line-height:14px;"
                      placeholder={'输入物品买入价'}
                    />
                  </View>
                  <View className={'tdLi'}>
                    <Input
                      className={'input'}
                      type={'number'}
                      onInput={(e)=>{
                        item.priceSell = e.detail.value
                      }}
                      value={item.priceSell}
                      style={{ height: '28px', fontSize: '14px', }}
                      placeholderStyle="font-size:12px;color:#C8C2B8;line-height:14px;"
                      placeholder={'输入物品卖出价'}
                    />
                  </View>
                  <View className={'tdLi'}>
                    <Button
                      className='btn-max-w'
                      size='mini'
                      type='default'
                      disabled={popData.detail && popData.detail.length === 1}
                      onClick={this.onDeleteLi.bind(this, index)}>
                      删除
                    </Button>
                  </View>
                </View>
              ))
            }
          </View>
          <View className={'popBtnContent'}>
            <Button className='btn-max-w' size='mini' type='default' onClick={this.onDeleteData.bind(this, false, null)}>删除</Button>
            <Button className='btn-max-w' size='mini' type='primary' onClick={this.onUpdateFun.bind(this)}>保存</Button>
          </View>
        </View>
      </View>
    )
  }
}
