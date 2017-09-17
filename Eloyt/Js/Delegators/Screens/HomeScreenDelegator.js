// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
// Essentials
import { Debug, Utils } from '../../Factories'

export default class HomeScreenDelegator extends Delegator {
  async componentDidMount () {
    // there is a fucking bug here, investigate more on it and fix it
    await Utils.next()
    await this.refs.mainSnapSwiperRef.scrollBy(1, true)
  }

  async onMainSwiperIndexChanged (index) {
    Debug.Log(`HomeScreenDelegator:onMainSwiperIndexChanged`)

    if (index !== 1) {
      await this.forcePauseSnap()

      await this.setState({
        focusOnSearchField: false
      })
    } else {
      await this.releaseForcePauseSnap()
    }

    // focus on textbox on search field
    if (index === 2) {
      await this.setState({
        focusOnSearchField: true
      })
    }
  }

  async onPlayerSnapSwiperIndexChanged (index) {
    Debug.Log(`HomeScreenDelegator:onPlayerSnapSwiperIndexChanged`)

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
    Debug.Log(`HomeScreenDelegator:onSnapStarted`)

    await this.setState({
      mainSwiperScrollEnable: false,
      playerSnapScrollEnable: false
    })
  }

  async onSnapEnded () {
    Debug.Log(`HomeScreenDelegator:onSnapEnded`)

    await this.setState({
      mainSwiperScrollEnable: false,
      playerSnapScrollEnable: true
    })
  }

  async onSnapClose () {
    Debug.Log(`HomeScreenDelegator:onSnapClose`)

    await this.setState({
      mainSwiperScrollEnable: false,
      playerSnapScrollEnable: true,
      forcePause: false
    })

    this.refs.playerSnapSwiperRef.scrollBy(-1, true)
  }

  async moveSceneToNotificationScene () {
    Debug.Log(`HomeScreenDelegator:moveSceneToNotificationScene`)

    this.forcePauseSnap()

    this.refs.mainSnapSwiperRef.scrollBy(-1, true)
  }

  async moveSceneToSearchScene () {
    Debug.Log(`HomeScreenDelegator:moveSceneToSearchScene`)

    this.forcePauseSnap()

    this.refs.mainSnapSwiperRef.scrollBy(1, true)
  }

  async moveSceneToRecordScene () {
    Debug.Log(`HomeScreenDelegator:moveSceneToRecordScene`)

    this.forcePauseSnap()

    this.refs.playerSnapSwiperRef.scrollBy(1, true)
  }

  async moveSceneToVideoPlayerFromSearch () {
    Debug.Log(`HomeScreenDelegator:moveSceneToVideoPlayerFromSearch`)

    this.refs.mainSnapSwiperRef.scrollBy(-1, true)

    await this.setState({
      focusOnSearchField: false
    })
  }

  async moveSceneToVideoPlayerFromMessagesNotifications () {
    Debug.Log(`HomeScreenDelegator:moveSceneToVideoPlayerFromMessagesNotifications`)

    this.refs.mainSnapSwiperRef.scrollBy(1, true)
  }

  async forcePauseSnap () {
    Debug.Log(`HomeScreenDelegator:forcePauseSnap`)

    await this.setState({
      forcePause: true
    })
  }

  async releaseForcePauseSnap () {
    Debug.Log(`HomeScreenDelegator:releaseForcePauseSnap`)

    await this.setState({
      forcePause: false
    })
  }

  async openProfile (userId) {
    Debug.Log(`HomeScreenDelegator:openProfile > userId: `, userId)

    await this.setState({
      forcePause: true,
      isUserProfileModalAppears: true,
      profilePreviewUserId: userId,
    })
  }

  async closeProfile () {
    Debug.Log(`HomeScreenDelegator:closeProfile`)

    await this.setState({
      forcePause: this.refs.mainSnapSwiperRef.index !== 1,
      isUserProfileModalAppears: false,
      profilePreviewUserId: null,
    })
  }
}
