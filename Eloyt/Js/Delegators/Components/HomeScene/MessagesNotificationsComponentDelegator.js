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
  }

  async componentWillReceiveProps (props) {
    Debug.Log(`MessagesNotificationsComponentDelegator:componentWillReceiveProps`)
  }

  async onCloseButton () {
    Debug.Log(`MessagesNotificationsComponentDelegator:onCloseButton`)

    this.props.onClose()
  }
}
