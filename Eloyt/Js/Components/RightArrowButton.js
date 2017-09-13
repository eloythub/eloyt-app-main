// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Delegator } from 'react-eloyt'
import { Image, TouchableOpacity, View } from 'react-native'
// Essentials
import { Assets } from '../Factories'
import { ButtonComponentStyles } from '../Styles'

export default class RightArrowButton extends Delegator {
  render () {
    if (this.props.hide) {
      return <View style={ButtonComponentStyles.rightArrowButtonContainer}/>
    }

    return (
      <View style={ButtonComponentStyles.rightArrowButtonContainer}>
        <TouchableOpacity {...this.props}>
          <View style={ButtonComponentStyles.rightArrowButton}>
            <Image source={Assets.RightArrowNoTailIcon} style={ButtonComponentStyles.rightArrowButtonIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

RightArrowButton.propTypes = {
  hide: PropTypes.bool,
  onPress: PropTypes.func,
}
