// Basics
import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import Swiper from 'react-native-swiper'
// Essentials
import { MessagesNotificationsComponentStyles } from '../../Styles'
import RecipientsListComponent from '../../Components/HomeScreen/MessagesNotifications/RecipientsListComponent'
import MessagesNotificationsComponentDelegator from '../../Delegators/Components/HomeScene/MessagesNotificationsComponentDelegator'
import LeftArrowButton from '../../Components/LeftArrowButton'
import RightArrowButton from '../../Components/RightArrowButton'
import NotificationButton from '../../Components/NotificationButton'
import MessagesButton from '../../Components/MessagesButton'

export default class MessagesNotificationsComponent extends MessagesNotificationsComponentDelegator {
  constructor (props) {
    super(props)

    this.state = {
      newNotifications: [],
      newMessages: [],
      selectedRecipientUserId: null,
      swiperScrollEnable: false,
    }

    this.messageNotificationSwiper = {
      ref: 'messageNotificationSwiperRef',
      index: 0,
      loop: false,
      bounces: false,
      autoplay: false,
      horizontal: true,
      loadMinimal: true,
      showsButtons: false,
      showsPagination: false,
    }
  }

  renderRecipients () {
    return (
      <View style={MessagesNotificationsComponentStyles.rootContainer}>
        <View style={MessagesNotificationsComponentStyles.notificationContainer}/>
        <View style={MessagesNotificationsComponentStyles.messageContainer}>
          <RecipientsListComponent openProfile={this.openMessage.bind(this)}
                                   onPressGoNeworking={this.onCloseButton.bind(this)}
                                   onPressSnap={() => {
                                   }}
                                   recipients={this.ssoUserData ? [this.ssoUserData] : []}/>
        </View>
      </View>
    )
  }

  renderMessages () {

    return (
      <View style={MessagesNotificationsComponentStyles.rootContainer}>
        <Text>User Message</Text>
      </View>
    )
  }

  render () {
    const {newNotifications, newMessages, swiperScrollEnable} = this.state

    return (
      <Swiper onIndexChanged={this.swiperIndexChanged.bind(this)}
              {...this.messageNotificationSwiper}
              {...{
                scrollEnabled: swiperScrollEnable
              }}>
        <View style={MessagesNotificationsComponentStyles.rootNonFlexContainer}>
          {this.renderRecipients()}
          <View style={MessagesNotificationsComponentStyles.topSection}>
            <MessagesButton hide={newMessages.length === 0} unread={newMessages.length}/>
            <NotificationButton hide={newNotifications.length === 0} unread={newNotifications.length}/>
            <RightArrowButton onPress={this.onCloseButton.bind(this)}/>
          </View>
        </View>
        <View style={MessagesNotificationsComponentStyles.rootNonFlexContainer}>
          {this.renderMessages()}
          <View style={MessagesNotificationsComponentStyles.topSection}>
            <LeftArrowButton onPress={this.onBackButton.bind(this)}/>
          </View>
        </View>
      </Swiper>
    )
  }
}

MessagesNotificationsComponent.propTypes = {
  onClose: PropTypes.func,
  openProfile: PropTypes.func,
}
