// Basics
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
// Essentials
import { MessagesNotificationsComponentStyles } from '../../Styles'
import MessagesNotificationsComponentDelegator from '../../Delegators/Components/HomeScene/MessagesNotificationsComponentDelegator'
import RightArrowButton from '../../Components/RightArrowButton'
import NotificationButton from '../../Components/NotificationButton'
import MessagesButton from '../../Components/MessagesButton'

export default class MessagesNotificationsComponent extends MessagesNotificationsComponentDelegator {
  constructor (props) {
    super(props)

    this.state = {
      newNotifications: [{}],
      newMessages: [{}]
    }
  }

  renderMessagesNotifications () {
    return (
      <View/>
    )
  }

  render () {
    const {newNotifications, newMessages} = this.state

    return (
      <View style={MessagesNotificationsComponentStyles.rootNonFlexContainer}>
        {this.renderMessagesNotifications()}
        <View style={MessagesNotificationsComponentStyles.topSection}>
          <MessagesButton hide={newMessages.length === 0} unread={newMessages.length}/>
          <NotificationButton hide={newNotifications.length === 0} unread={newNotifications.length}/>
          <RightArrowButton onPress={this.onCloseButton.bind(this)}/>
        </View>
      </View>
    )
  }
}

MessagesNotificationsComponent.propTypes = {
  onClose: PropTypes.func,
  openProfile: PropTypes.func,
}
