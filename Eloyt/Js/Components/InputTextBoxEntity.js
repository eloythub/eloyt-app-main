// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { TextInput, View } from 'react-native'
// Essentials
import { InputTextBoxEntityComponentStyles } from '../Styles'
import InputTextBoxEntityComponentDelegator from '../Delegators/Components/InputTextBoxEntityComponentDelegator'

export default class InputTextBoxEntity extends InputTextBoxEntityComponentDelegator {
  constructor (props) {
    super(props)

    this.state = props
  }

  render () {
    return (
      <View style={InputTextBoxEntityComponentStyles.rootContainer}>
        <TextInput
          ref='textRefObj'
          style={InputTextBoxEntityComponentStyles.inputBox}
          editable={true}
          multiline={false}
          autoCapitalize="words"
          placeholder={this.state.caption}
          placeholderTextColor="#7d7d7d"
          underlineColorAndroid="transparent"
          enablesReturnKeyAutomatically={true}
          keyboardAppearance="dark"
          onChangeText={
            (text) => {
              this.setState({text})

              this.props.onChange(text)
            }
          }
          onSubmitEditing={() => this.props.nextFocusObjectRef ? this.props.nextFocusObjectRef() : null}
          returnKeyType="next"
          value={this.state.text}
          defaultValue={this.state.default}
        />
      </View>
    )
  }
}

InputTextBoxEntity.propTypes = {
  setTextRef: PropTypes.func,
  name: PropTypes.string,
  default: PropTypes.string,
  caption: PropTypes.string,
  onChange: PropTypes.func,
  nextFocusObjectRef: PropTypes.func,
}
