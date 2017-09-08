// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Delegator } from 'react-eloyt'
import { Image, TouchableOpacity, View } from 'react-native'
// Essentials
import { Assets } from '../Factories'
import { ButtonComponentStyles } from '../Styles'

export default class NotificationButton extends Delegator {
  render () {
    const {unreadMessages, hide} = this.props

    if (hide) {
      return <View style={ButtonComponentStyles.notificationButtonContainer}/>
    }

    return (
      <View style={ButtonComponentStyles.notificationButtonContainer}>
        <TouchableOpacity {...this.props}>
          <View style={ButtonComponentStyles.searchButton}>
            <Image source={Assets.NotificationIcon} style={ButtonComponentStyles.notificationButtonIcon}/>
            {unreadMessages ? <View style={ButtonComponentStyles.newMessagesIcon}/> : null}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

NotificationButton.propTypes = {
  hide: PropTypes.bool,
  onPress: PropTypes.func,
  unreadMessages: PropTypes.bool,
}
