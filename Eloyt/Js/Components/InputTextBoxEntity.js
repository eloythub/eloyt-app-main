// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, TextInput, View } from 'react-native'
// Essentials
import { InputTextBoxEntityComponentStyles } from '../Styles'
import InputTextBoxEntityComponentDelegator from '../Delegators/Components/InputTextBoxEntityComponentDelegator'

const {width} = Dimensions.get('window')

export default class InputTextBoxEntity extends InputTextBoxEntityComponentDelegator {
  constructor (props) {
    super(props)

    this.state = props
  }
  render () {
    const {
            placeholderColor = '#7d7d7d',
            autoCapitalize   = 'words',
            widthOffset      = 60,
            fontSize         = 18,
            height           = 50,
            multiline        = false,
            returnKeyType    = 'next',
            numberOfLines,
            maxLength,
            caption,
            default: defaultText,
          } = this.props

    return (
      <View style={[
        InputTextBoxEntityComponentStyles.rootContainer,
        {
          borderBottomColor: placeholderColor,
          width: width - widthOffset
        }
      ]}>
        <TextInput
          ref='textRefObj'
          style={[
            InputTextBoxEntityComponentStyles.inputBox,
            {
              fontSize,
              height,
            }
          ]}
          editable={true}
          autoCapitalize={autoCapitalize}
          placeholder={caption}
          placeholderTextColor={placeholderColor}
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
          value={this.state.text}
          defaultValue={defaultText}
          {...{
            numberOfLines,
            maxLength,
            multiline,
            returnKeyType,
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
  placeholderColor: PropTypes.string,
  autoCapitalize: PropTypes.string,
  widthOffset: PropTypes.number,
  fontSize: PropTypes.number,
  returnKeyType: PropTypes.string,
}
