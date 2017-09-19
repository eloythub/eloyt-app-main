// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import { GiftedChat } from 'react-native-gifted-chat'
// Essentials
import { Debug, LocalStorage } from '../../../Factories'
import { AuthEnum } from '../../../Enums'

export default class MessagesNotificationsComponentDelegator extends Delegator {
  async componentDidMount () {
    Debug.Log(`MessagesNotificationsComponentDelegator:componentDidMount`)

    this.ssoUserData = await LocalStorage.load(AuthEnum.LOGIN_STATUS)

    this.setState({})
  }

  async componentWillReceiveProps (props) {
    Debug.Log(`MessagesNotificationsComponentDelegator:componentWillReceiveProps`)

    this.setState({})
  }

  async swiperIndexChanged (index) {
    Debug.Log(`MessagesNotificationsComponentDelegator:swiperIndexChanged`)

    this.setState({swiperScrollEnable: index > 0})
  }

  async onCloseButton () {
    Debug.Log(`MessagesNotificationsComponentDelegator:onCloseButton`)

    this.props.onClose()
  }

  async openMessage (selectedRecipientUserId) {
    Debug.Log(`MessagesNotificationsComponentDelegator:openMessage`)

    await this.setState({selectedRecipientUserId})

    this.refs.messageNotificationSwiperRef.scrollBy(1)

    await this.refs.chatboxRef.focusTextInput()
  }

  async onBackButton () {
    Debug.Log(`MessagesNotificationsComponentDelegator:onBackButton`)

    this.refs.messageNotificationSwiperRef.scrollBy(-1)
  }

  async onSendMessage (messages) {
    Debug.Log(`MessagesNotificationsComponentDelegator:onSendMessage`)

    console.log(messages)

    await this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    await this.refs.chatboxRef.focusTextInput()
  }

}
