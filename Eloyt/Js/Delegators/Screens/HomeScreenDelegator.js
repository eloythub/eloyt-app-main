// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
// Essentials

export default class HomeScreenDelegator extends Delegator {
  async onMainSwiperIndexChanged (index) {
    if (index !== 1) {
      await this.forcePauseSnap()
    } else {
      await this.releaseForcePauseSnap()
    }
  }

  async onPlayerSnapSwiperIndexChanged (index) {
    if (index !== 0) {
      await this.forcePauseSnap()
    } else {
      await this.releaseForcePauseSnap()
    }

    await this.setState({
      mainSwiperScrollEnable: index !== 1 // index 1 represents the snap component
    })
  }

  async onSnapStarted () {
    await this.setState({
      mainSwiperScrollEnable: false,
      playerSnapScrollEnable: false
    })
  }

  async onSnapEnded () {
    await this.setState({
      mainSwiperScrollEnable: false,
      playerSnapScrollEnable: true
    })
  }

  async onSnapClose () {
    await this.setState({
      mainSwiperScrollEnable: false,
      playerSnapScrollEnable: true,
      forcePause: false
    })

    this.refs.playerSnapSwiperRef.scrollBy(-1, true)
  }

  async moveSceneToNotificationScene () {
    this.forcePauseSnap()

    this.refs.mainSnapSwiperRef.scrollBy(-1, true)
  }

  async moveSceneToSearchScene () {
    this.forcePauseSnap()

    this.refs.mainSnapSwiperRef.scrollBy(1, true)
  }

  async moveSceneToRecordScene () {
    this.forcePauseSnap()

    this.refs.playerSnapSwiperRef.scrollBy(1, true)
  }

  async forcePauseSnap () {
    await this.setState({
      forcePause: true
    })
  }

  async releaseForcePauseSnap () {
    await this.setState({
      forcePause: false
    })
  }
}
