// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Delegator } from 'react-eloyt'
import { Image, TouchableOpacity, View } from 'react-native'
// Essentials
import { Assets } from '../Factories'
import { ButtonComponentStyles } from '../Styles'

export default class MoreButton extends Delegator {
  render () {
    if (this.props.hide) {
      return <View style={ButtonComponentStyles.moreButtonContainer}/>
    }

    return (
      <View style={ButtonComponentStyles.moreButtonContainer}>
        <TouchableOpacity {...this.props}>
          <View style={ButtonComponentStyles.moreButton}>
            <Image source={Assets.MoreIcon} style={ButtonComponentStyles.moreButtonIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

MoreButton.propTypes = {
  hide: PropTypes.bool,
  onPress: PropTypes.func,
}
