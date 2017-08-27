// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import RadioButton from 'radio-button-react-native'
// Essentials
import { GenderEntityComponentStyles } from '../Styles'
import GenderEntityComponentDelegator from '../Delegators/Components/GenderEntityComponentDelegator'

export default class GenderEntity extends GenderEntityComponentDelegator {
  constructor (props) {
    super(props)

    this.state = props
  }

  render () {
    return (
      <View style={GenderEntityComponentStyles.rootContainer}>
        <Text style={GenderEntityComponentStyles.caption}>GENDER</Text>
        <View>
          <View style={GenderEntityComponentStyles.radioButtonContainer}>
            <RadioButton
              value="male"
              currentValue={this.state.value}
              outerCircleColor={this.state.value === 'male' ? '#ffffff' : '#7d7d7d'}
              outerCircleSize={24}
              outerCircleWidth={3}
              innerCircleColor="#ffffff"
              innerCircleSize={14}
              onPress={this.radioButtonOnPress.bind(this)}>
              <Text
                style={
                  [
                    GenderEntityComponentStyles.radioButtonText,
                    (this.state.value === 'male' ? GenderEntityComponentStyles.radioButtonTextSelected : {}),
                  ]
                }>
                MALE
              </Text>
            </RadioButton>
          </View>
          <View style={GenderEntityComponentStyles.radioButtonContainer}>
            <RadioButton
              value="other"
              currentValue={this.state.value}
              outerCircleColor={this.state.value === 'other' ? '#ffffff' : '#7d7d7d'}
              outerCircleSize={24}
              outerCircleWidth={3}
              innerCircleColor="#ffffff"
              innerCircleSize={14}
              onPress={this.radioButtonOnPress.bind(this)}>
              <Text
                style={
                  [
                    GenderEntityComponentStyles.radioButtonText,
                    (this.state.value === 'other' ? GenderEntityComponentStyles.radioButtonTextSelected : {}),
                  ]
                }>
                OTHER
              </Text>
            </RadioButton>
          </View>
        </View>
        <View>
          <View style={GenderEntityComponentStyles.radioButtonContainer}>
            <RadioButton
              value="female"
              currentValue={this.state.value}
              outerCircleColor={this.state.value === 'female' ? '#ffffff' : '#7d7d7d'}
              outerCircleSize={24}
              outerCircleWidth={3}
              innerCircleColor="#ffffff"
              innerCircleSize={14}
              onPress={this.radioButtonOnPress.bind(this)}>
              <Text
                style={
                  [
                    GenderEntityComponentStyles.radioButtonText,
                    (this.state.value === 'female' ? GenderEntityComponentStyles.radioButtonTextSelected : {}),
                  ]
                }>
                FEMALE
              </Text>
            </RadioButton>
          </View>
        </View>
      </View>
    )
  }
}

GenderEntity.propTypes = {
  onPress: PropTypes.func.isRequired,
  value: PropTypes.string,
}
