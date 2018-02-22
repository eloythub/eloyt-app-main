// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Image, Text, TouchableOpacity, View } from 'react-native'
// Essentials
import { Assets } from '../Factories'
import { ButtonComponentStyles } from '../Styles'
import MessagesComponentDelegator from '../Delegators/Components/MessagesComponentDelegator'

export default class MessagesButton extends MessagesComponentDelegator {
  render () {
    const {unread, hide} = this.props

    if (hide) {
      return <View style={ButtonComponentStyles.messagesButtonContainer}/>
    }

    const unreadCount = unread > 99 ? '+99' : unread

    return (
      <View style={ButtonComponentStyles.messagesButtonContainer}>
        <TouchableOpacity {...this.props}>
          <View style={ButtonComponentStyles.searchButton}>
            <Image source={Assets.MessagesIcon} style={ButtonComponentStyles.messagesButtonIcon}/>
            {
              unread
                ?
                <View style={[
                  ButtonComponentStyles.newMessagesIcon,
                  unread < 10 ? {minWidth: 20} : {}
                ]}>
                  <Text style={ButtonComponentStyles.newMessagesText}>{unreadCount}</Text>
                </View>
                : null
            }
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

MessagesButton.propTypes = {
  hide: PropTypes.bool,
  onPress: PropTypes.func,
  unread: PropTypes.number,
}
