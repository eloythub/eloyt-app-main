// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Delegator } from 'react-eloyt'
import { Image, TouchableOpacity, View } from 'react-native'
// Essentials
import { Assets } from '../Factories'
import { ButtonComponentStyles } from '../Styles'

export default class DislikeButton extends Delegator {
  render () {
    if (this.props.hide) {
      return <View style={ButtonComponentStyles.dislikeButtonContainer}/>
    }

    return (
      <View style={ButtonComponentStyles.dislikeButtonContainer}>
        <TouchableOpacity {...this.props}>
          <View style={ButtonComponentStyles.dislikeButton}>
            <Image source={Assets.DislikeIcon} style={ButtonComponentStyles.dislikeButtonIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

DislikeButton.propTypes = {
  hide: PropTypes.bool,
  onPress: PropTypes.func,
}
