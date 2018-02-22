// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Delegator } from 'react-eloyt'
import { Image, TouchableOpacity, View } from 'react-native'
// Essentials
import { Assets } from '../Factories'
import { ButtonComponentStyles } from '../Styles'

export default class LeftArrowButton extends Delegator {
  render () {
    if (this.props.hide) {
      return <View style={ButtonComponentStyles.leftArrowButtonContainer}/>
    }

    return (
      <View style={ButtonComponentStyles.leftArrowButtonContainer}>
        <TouchableOpacity {...this.props}>
          <View style={ButtonComponentStyles.leftArrowButton}>
            <Image source={Assets.LeftArrowNoTailIcon} style={ButtonComponentStyles.leftArrowButtonIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

LeftArrowButton.propTypes = {
  hide: PropTypes.bool,
  onPress: PropTypes.func,
}
