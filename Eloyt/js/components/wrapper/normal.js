import React from 'react'
import { View } from 'react-native'
import wrapperStyle from './wrapperStyle'

export default class NormalWrapper extends React.Component {
  render () {
    return (
      <View style={wrapperStyle.normalWrapper}>
        {this.props.children}
      </View>
    )
  }
}
