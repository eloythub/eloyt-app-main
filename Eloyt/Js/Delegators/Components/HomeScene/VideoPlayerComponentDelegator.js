// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
// Essentials
import { Debug, LocalStorage } from '../../../Factories'
import { AuthEnum } from '../../../Enums'

export default class VideoPlayerComponentDelegator extends Delegator {
  async componentDidMount () {
    Debug.Log(`VideoPlayerComponentDelegator:componentDidMount`)

    this.ssoUserData = await LocalStorage.load(AuthEnum.LOGIN_STATUS)

    await this.setState({
      waitingMain: false,
    })
  }

  async componentWillReceiveProps (props) {
    Debug.Log(`VideoPlayerComponentDelegator:componentWillReceiveProps`)

    if (props.forcePause !== this.props.forcePause) {
      await this.setState({})
    }
  }

  async openProfile (userId) {
    Debug.Log(`VideoPlayerComponentDelegator:openProfile > ${userId}`)

    this.props.openProfile(userId)
  }

  async closeProfile () {
    Debug.Log(`VideoPlayerComponentDelegator:closeProfile`)

    this.props.closeProfile(userId)
  }
}
