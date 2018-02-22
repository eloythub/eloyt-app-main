// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Image, Text, TouchableOpacity, View } from 'react-native'
// Essentials
import { Assets } from '../Factories'
import { ButtonComponentStyles } from '../Styles'
import NotificationComponentDelegator from '../Delegators/Components/NotificationComponentDelegator'

export default class NotificationButton extends NotificationComponentDelegator {
  render () {
    const {unread, hide} = this.props

    if (hide) {
      return <View style={ButtonComponentStyles.notificationButtonContainer}/>
    }

    const unreadCount = unread > 99 ? '+99' : unread

    return (
      <View style={ButtonComponentStyles.notificationButtonContainer}>
        <TouchableOpacity {...this.props}>
          <View style={ButtonComponentStyles.searchButton}>
            <Image source={Assets.NotificationIcon} style={ButtonComponentStyles.notificationButtonIcon}/>
            {
              unread
                ?
                <View style={ButtonComponentStyles.newNotificationsIcon}>
                  <Text style={ButtonComponentStyles.newNotificationsText}>{unreadCount}</Text>
                </View>
                : null
            }
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

NotificationButton.propTypes = {
  hide: PropTypes.bool,
  onPress: PropTypes.func,
  unread: PropTypes.number,
}
