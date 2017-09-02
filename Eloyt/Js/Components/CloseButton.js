// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Delegator } from 'react-eloyt'
import { TouchableOpacity, View, Image } from 'react-native'
// Essentials
import { Assets } from '../Factories'
import { ButtonComponentStyles } from '../Styles'

export default class CloseButton extends Delegator {
  render () {
    if (this.props.hide) {
      return <View style={ButtonComponentStyles.cancelButtonContainer} />
    }

    return (
      <View style={ButtonComponentStyles.cancelButtonContainer}>
        <TouchableOpacity {...this.props}>
          <View style={ButtonComponentStyles.cancelButton}>
            <Image source={Assets.CancelIcon} style={ButtonComponentStyles.cancelButtonIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

CloseButton.propTypes = {
  hide: PropTypes.bool,
  onPress: PropTypes.func,
}
