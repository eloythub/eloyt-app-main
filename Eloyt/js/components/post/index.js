import React from 'react'
import { View, Text } from 'react-native'
import postStyle from './postStyle'
import commonStyle from '../../styles/commonStyle'
import NormalWrapper from '../wrapper/normal'

export default class Post extends React.Component {
  rowCounts = 3

  componentWillMount () {
    this.rowCounts = this.getRandomCount(1, 5)
  }

  getRandomCount (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
  }

  renderWaiting () {
    return (
      <View style={postStyle.waitingWrapper}>
        <View style={[commonStyle.container, {flexDirection: 'row'}]}>
          <View style={postStyle.waitingMockedProfilePicture}/>
          <View style={commonStyle.margin5}/>
          <View style={[postStyle.waitingMockedText, {marginTop: 12}]}/>
        </View>
        <View style={commonStyle.container}>
          {
            '1'.repeat(this.rowCounts).split(1).map((_, key) => {
              return <View key={key} style={[postStyle.waitingMockedText, commonStyle.marginTop5]}/>
            })
          }
        </View>
      </View>
    )
  }

  renderPost () {
    const {isWaiting = false} = this.props

    if (isWaiting) {
      return this.renderWaiting()
    }

    //return (
    //
    //)
  }

  render () {
    return (
      <NormalWrapper style={{marginBottom: 5}}>
        {this.renderPost()}
      </NormalWrapper>
    )
  }
}
