// Basics
import React from 'react'
import { Image, Text, View, Dimensions, KeyboardAvoidingView } from 'react-native'
import {ifIphoneX} from 'react-native-iphone-x-helper'
import PropTypes from 'prop-types'
import Swiper from 'react-native-swiper'
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat'
import emojiUtils from 'emoji-utils'

// Essentials
import { Assets, Style } from '../../Factories'
import SlackMessage from '../../Components/SlackMessage'
import InputToolbar from '../../Components/InputToolbar'
import { ButtonComponentStyles, MessagesNotificationsComponentStyles } from '../../Styles'
import RecipientsListComponent from '../../Components/HomeScreen/MessagesNotifications/RecipientsListComponent'
import MessagesNotificationsComponentDelegator from '../../Delegators/Components/HomeScene/MessagesNotificationsComponentDelegator'
import LeftArrowButton from '../../Components/LeftArrowButton'
import RightArrowButton from '../../Components/RightArrowButton'
import NotificationButton from '../../Components/NotificationButton'
import MessagesButton from '../../Components/MessagesButton'
import ProfileAvatar from '../../Components/ProfileAvatar'

const {height} = Dimensions.get('window')

export default class MessagesNotificationsComponent extends MessagesNotificationsComponentDelegator {
  constructor (props) {
    super(props)

    this.state = {
      newNotifications: [],
      newMessages: [],
      selectedRecipientUser: null,
      swiperScrollEnable: false,
      messages: [],
      refreshing: false,
      recipientsList: [],
      keyboardHeight: 0
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
    const {onSnapButton} = this.props
    const {recipientsList, refreshing} = this.state

    return (
      <View style={MessagesNotificationsComponentStyles.rootContainer}>
        <View style={MessagesNotificationsComponentStyles.notificationContainer}/>
        <View style={MessagesNotificationsComponentStyles.messageContainer}>
          <RecipientsListComponent openProfile={this.openMessage.bind(this)}
                                   onPressGoNeworking={this.onCloseButton.bind(this)}
                                   onPressSnap={onSnapButton.bind(this)}
                                   refreshing={refreshing}
                                   loadRecipients={this.loadRecipients.bind(this)}
                                   recipients={this.ssoUserData ? recipientsList || [] : []}/>
        </View>
      </View>
    )
  }

  renderMessageBox(props) {
    const { currentMessage: { text: currText } } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      };
    }

    return (
      <SlackMessage {...props} messageTextStyle={messageTextStyle} />
    );
  }

  renderMessages () {
    const {messages, recipientsList, keyboardHeight} = this.state

    if (!recipientsList || !this.ssoUserData) {
      return
    }

    const user = {
      _id: this.ssoUserData.id,
      avatar: this.ssoUserData.cloudAvatarUrl
    }

    return (
      <View style={MessagesNotificationsComponentStyles.rootContainer}>
        <GiftedChat ref="chatboxRef"
                    messages={messages}
                    onSend={this.onSendMessage.bind(this)}
                    user={user}
                    showUserAvatar={true}
                    onPressAvatar={(avatarUser) => this.openProfile({id: avatarUser._id})}
                    placeholder="MESSAGE"
                    placeholderTextColor="#ffffff"
                    loadEarlier={false}
                    isLoadingEarlier={false}
                    renderAvatarOnTop={true}
                    containerStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      position: 'absolute',
                      bottom: 0
                    }}
                    textInputProps={{
                      keyboardAppearance: 'dark',
                      autoCapitalize: 'none',
                      keyboardType: 'twitter'
                    }}
                    renderMessage={this.renderMessageBox}
                    isAnimated={true}
                    keyboardShouldPersistTaps="handled"
                    renderInputToolbar={(props) => {
                      delete props['containerStyle']

                      return (
                        <View style={{
                          position: 'relative',
                          height: props.composerHeight + 11
                        }}>
                          <InputToolbar textInputStyle={Style.reverseStyleObject(MessagesNotificationsComponentStyles.textInputStyle)}
                                        containerStyle={{
                                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                          position: 'absolute',
                                          bottom: 0
                                        }}
                                        {...props} />
                        </View>
                      )
                    }}
                    renderSend={(props) => {
                      return (
                        <Send onSend={props.onSend.bind(this)}
                              containerStyle={{
                                width: 45,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                paddingTop: 0,
                                paddingBottom: 0,
                                marginLeft: 5,
                                height: props.composerHeight + 10
                              }}
                              label={props.label}
                              text={props.text}>
                          <Image source={Assets.SendIcon} style={ButtonComponentStyles.sendButtonIcon}/>
                        </Send>
                      )
                    }}
        />
      </View>
    )
  }

  render () {
    const {newNotifications, newMessages, swiperScrollEnable, selectedRecipientUser} = this.state

    return (
      <Swiper onIndexChanged={this.swiperIndexChanged.bind(this)}
              keyboardShouldPersistTaps="handled"
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
            <View style={MessagesNotificationsComponentStyles.topSectionUserInfo}>
              {
                selectedRecipientUser
                  ? <Text style={MessagesNotificationsComponentStyles.topUsername}>
                  @{selectedRecipientUser.username}
                </Text>
                  : null
              }
            </View>
            <View style={MessagesNotificationsComponentStyles.topSectionUserAvatar}>
              {
                selectedRecipientUser
                  ? <ProfileAvatar size={33}
                                   imageUrl={selectedRecipientUser.cloudAvatarUrl}
                                   onPress={this.openProfile.bind(this, selectedRecipientUser)}/>
                  : null
              }
            </View>
          </View>
        </View>
      </Swiper>
    )
  }
}

MessagesNotificationsComponent.propTypes = {
  onClose: PropTypes.func,
  onSnapButton: PropTypes.func,
  openProfile: PropTypes.func,
  notificationUpdated: PropTypes.func,
}
