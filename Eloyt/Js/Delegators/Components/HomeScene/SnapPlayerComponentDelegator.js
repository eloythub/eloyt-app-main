// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import { Debug } from '../../../Factories'

export default class SnapPlayerComponentDelegator extends Delegator {
  async onLoadStart () {
    Debug.Log(`SnapPlayerComponentDelegator:onLoadStart`)

    if (this.props.onVideoLoadingStarted) {
      this.props.onVideoLoadingStarted()
    }

    await this.setState({
      waitingMain: true
    })
  }

  async onLoad () {
    Debug.Log(`SnapPlayerComponentDelegator:onLoad`)

    if (this.props.onVideoStartPlaying) {
      this.props.onVideoStartPlaying()
    }

    await this.setState({
      waitingMain: false
    })
  }

  async onEnd (data) {
    Debug.Log(`SnapPlayerComponentDelegator:onEnd`)

    if (this.props.onVideoEnded) {
      this.props.onVideoEnded(data)
    }
  }

  async onError (err) {
    Debug.Log(`SnapPlayerComponentDelegator:onError`, err)

    if (this.props.onVideoError) {
      this.props.onVideoError(err)
    }
  }
}
