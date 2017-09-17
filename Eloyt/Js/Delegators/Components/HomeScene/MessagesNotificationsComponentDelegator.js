// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
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
  }

  async onBackButton () {
    Debug.Log(`MessagesNotificationsComponentDelegator:onBackButton`)

    this.refs.messageNotificationSwiperRef.scrollBy(-1)
  }
}
