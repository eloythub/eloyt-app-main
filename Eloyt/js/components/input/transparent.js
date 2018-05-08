import React from 'react'
import { Text, View } from 'react-native'
import { Input, Item, Label } from 'native-base'
import inputStyle from './inputStyle'

export default class InputComponent extends React.Component {
  render () {
    return (
      <View style={inputStyle.inputWrapper}>
        <Item stackedLabel>
          {this.props.placeholder && <Label style={inputStyle.input}>{this.props.placeholder.toUpperCase()}:</Label>}
          <Input style={inputStyle.input}/>
        </Item>
      </View>
    )
  }
}
