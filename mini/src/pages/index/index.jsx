import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Bill from  '../bill/bill'

export default class Index extends Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }


  render() {
    return (
      <View className={'indexPage'}>
        <Bill/>
      </View>
    )
  }
}
