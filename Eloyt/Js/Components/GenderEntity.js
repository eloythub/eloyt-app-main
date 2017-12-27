// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, Dimensions } from 'react-native'
import RadioButton from 'radio-button-react-native'
// Essentials
import { GenderEntityComponentStyles } from '../Styles'
import GenderEntityComponentDelegator from '../Delegators/Components/GenderEntityComponentDelegator'

const {width} = Dimensions.get('window')

export default class GenderEntity extends GenderEntityComponentDelegator {
  constructor (props) {
    super(props)

    this.state = props
  }

  radioButton (value, caption) {
    return (
      <View style={GenderEntityComponentStyles.radioButtonContainer}>
        <RadioButton
          value={value}
          currentValue={this.state.value}
          outerCircleColor={this.state.value === value ? '#ffffff' : '#7d7d7d'}
          outerCircleSize={24}
          outerCircleWidth={3}
          innerCircleColor="#ffffff"
          innerCircleSize={14}
          onPress={this.radioButtonOnPress.bind(this)}>
          <Text
            style={
              [
                GenderEntityComponentStyles.radioButtonText,
                (this.state.value === value ? GenderEntityComponentStyles.radioButtonTextSelected : {}),
              ]
            }>
            {caption.toUpperCase()}
          </Text>
        </RadioButton>
      </View>
    )
  }

  render () {
    const {widthOffset = 60} = this.props

    return (
      <View style={[
        GenderEntityComponentStyles.rootContainer,
        {
          width: width - widthOffset
        }
      ]}>
        <Text style={GenderEntityComponentStyles.caption}>GENDER:</Text>
        <View>
          {this.radioButton('male', 'male')}
          {this.radioButton('other', 'other')}
        </View>
        <View>
          {this.radioButton('female', 'female')}
          {this.radioButton(null, 'not now')}
        </View>
      </View>
    )
  }
}

GenderEntity.propTypes = {
  onPress: PropTypes.func.isRequired,
  value: PropTypes.string,
  widthOffset: PropTypes.number,
}
