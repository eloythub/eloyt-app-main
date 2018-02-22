// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Delegator } from 'react-eloyt'
import { Image, TouchableOpacity, View } from 'react-native'
// Essentials
import { Assets } from '../Factories'
import { ButtonComponentStyles } from '../Styles'

export default class SendButton extends Delegator {
  render () {
    if (this.props.hide) {
      return <View style={ButtonComponentStyles.cancelButtonContainer}/>
    }

    return (
      <View style={ButtonComponentStyles.okButtonContainer}>
        <TouchableOpacity {...this.props}>
          <View style={ButtonComponentStyles.okButton}>
            <Image source={Assets.OkIcon} style={ButtonComponentStyles.okButtonIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

SendButton.propTypes = {
  hide: PropTypes.bool,
  onPress: PropTypes.func,
}
