// Basics
import React from 'react'
import { Image, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import Swiper from 'react-native-swiper'
import { GiftedChat, InputToolbar, Send, Bubble } from 'react-native-gifted-chat'
// Essentials
import { Assets, Style } from '../../Factories'
import { ButtonComponentStyles, MessagesNotificationsComponentStyles } from '../../Styles'
import RecipientsListComponent from '../../Components/HomeScreen/MessagesNotifications/RecipientsListComponent'
import MessagesNotificationsComponentDelegator from '../../Delegators/Components/HomeScene/MessagesNotificationsComponentDelegator'
import LeftArrowButton from '../../Components/LeftArrowButton'
import RightArrowButton from '../../Components/RightArrowButton'
import NotificationButton from '../../Components/NotificationButton'
import MessagesButton from '../../Components/MessagesButton'
import ProfileAvatar from '../../Components/ProfileAvatar'

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
      recipientsList: []
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
                                   recipients={this.ssoUserData ? recipientsList : []}/>
        </View>
      </View>
    )
  }

  renderMessages () {
    const {messages, recipientsList} = this.state

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
                    textInputProps={{
                      keyboardAppearance: 'dark',
                      autoCapitalize: 'none',
                      keyboardType: 'twitter'
                    }}
                    renderBubble={(bubbleProps) => {
                      const customProps = {
                        wrapperStyle: {
                          left: MessagesNotificationsComponentStyles.chatBubbleWrapperLeft,
                          right: MessagesNotificationsComponentStyles.chatBubbleWrapperRight
                        },
                        textStyle: {
                          left: MessagesNotificationsComponentStyles.chatBubbleTextLeft,
                        },
                        linkStyle: {
                          left: MessagesNotificationsComponentStyles.chatBubbleLinkLeft,
                        }
                      }

                      return <Bubble {...bubbleProps} {...customProps}/>
                    }}
                    isAnimated={true}
                    keyboardShouldPersistTaps="handled"
                    renderInputToolbar={(inputToolbarProps) => {
                      return (
                        <InputToolbar containerStyle={MessagesNotificationsComponentStyles.composerContainer}
                                      textInputStyle={MessagesNotificationsComponentStyles.textInputStyle}
                                      {...inputToolbarProps} />
                      )
                    }}
                    renderSend={(props) => {
                      return (
                        <Send textStyle={props.textStyle}
                              onSend={props.onSend.bind(this)}
                              label={props.label}
                              text={props.text}
                              containerStyle={Object.assign({
                                  height: props.composerHeight + 10
                                },
                                Style.reverseStyleObject(ButtonComponentStyles.sendButtonContainer),
                              )}>
                          <View style={Object.assign({
                              height: props.composerHeight + 10
                            },
                            Style.reverseStyleObject(ButtonComponentStyles.sendButtonContainer),
                          )}>
                            <Image source={Assets.SendIcon} style={ButtonComponentStyles.sendButtonIcon}/>
                          </View>
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
                  {selectedRecipientUser.username}
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
  doLoadRecipiets: PropTypes.bool,
  onSnapButton: PropTypes.func,
  openProfile: PropTypes.func,
}
