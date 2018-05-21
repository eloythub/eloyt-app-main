import React from 'react'
import { View } from 'react-native'
import wrapperStyle from './wrapperStyle'

export default class NormalWrapper extends React.Component {
  render () {
    return (
      <View {...this.props} style={[wrapperStyle.normalWrapper, this.props.style || {}]}>
        {this.props.children}
      </View>
    )
  }
}
