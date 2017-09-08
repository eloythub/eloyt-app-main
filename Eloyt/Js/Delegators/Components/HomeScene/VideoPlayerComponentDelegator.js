// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
// Essentials
import { Debug, LocalStorage, Utils } from '../../../Factories'
import { ApiService } from '../../../Services'
import { AuthEnum } from '../../../Enums'

export default class VideoPlayerComponentDelegator extends Delegator {
  async componentDidMount () {
    Debug.Log(`VideoPlayerComponentDelegator:componentDidMount`)

    this.ssoUserData = await LocalStorage.load(AuthEnum.LOGIN_STATUS)

    await this.setState({
      waitingMain: false,
    })
  }

  async componentDidUpdate (props) {
    Debug.Log(`VideoPlayerComponentDelegator:componentDidUpdate`)

    if (props.forcePause !== this.props.forcePause) {
      await this.setState({})
    }
  }
}
