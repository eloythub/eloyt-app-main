import React from 'react'
import { Text, View } from 'react-native'
import { Input, Item, Label } from 'native-base'
import inputStyle from './inputStyle'

export default class TransparentInput extends React.Component {
  render () {
    return (
      <View style={inputStyle.inputWrapper}>
        <Item stackedLabel>
          {this.props.title && <Label style={inputStyle.label}>{this.props.title.toUpperCase()}:</Label>}
          <Input style={inputStyle.input} {...this.props} keyboardAppearance="dark"/>
        </Item>
      </View>
    )
  }
}
