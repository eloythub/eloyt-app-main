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
    const {numberOfLines, maxLength, height, multiline = false} = this.state

    return (
      <View style={InputTextBoxEntityComponentStyles.rootContainer}>
        <TextInput
          ref='textRefObj'
          style={[
            InputTextBoxEntityComponentStyles.inputBox,
            {
              height: height || 50
            }
          ]}
          editable={true}
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
          {...{
            numberOfLines,
            maxLength,
            multiline,
          }}
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
  numberOfLines: PropTypes.number,
  maxLength: PropTypes.number,
  height: PropTypes.number,
  multiline: PropTypes.bool,
}
