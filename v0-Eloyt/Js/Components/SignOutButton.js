// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Delegator } from 'react-eloyt'
import { TouchableOpacity, View, Image } from 'react-native'
// Essentials
import { Assets } from '../Factories'
import { ButtonComponentStyles } from '../Styles'

export default class SignOutButton extends Delegator {
  render () {
    if (this.props.hide) {
      return <View style={ButtonComponentStyles.signOutButtonContainer} />
    }

    return (
      <View style={ButtonComponentStyles.signOutButtonContainer}>
        <TouchableOpacity {...this.props}>
          <View style={ButtonComponentStyles.signOutButton}>
            <Image source={Assets.SignOutIcon} style={ButtonComponentStyles.signOutButtonIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

SignOutButton.propTypes = {
  hide: PropTypes.bool,
  onPress: PropTypes.func,
}
