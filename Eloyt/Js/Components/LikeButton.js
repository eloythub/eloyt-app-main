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
      return <View style={ButtonComponentStyles.likeButtonContainer}/>
    }

    return (
      <View style={ButtonComponentStyles.likeButtonContainer}>
        <TouchableOpacity {...this.props}>
          <View style={ButtonComponentStyles.likeButton}>
            <Image source={Assets.LikeIcon} style={ButtonComponentStyles.likeButtonIcon}/>
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
