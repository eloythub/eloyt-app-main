// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import { ActionConst, Actions } from 'react-native-router-flux'
import { Debug, Utils } from '../../../Factories'
import { GeneralEnum } from '../../../Enums'

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

    const {onSkipTheSnap} = this.props

    if (this.props.onVideoEnded) {
      this.props.onVideoEnded(data)
    }

    await Utils.wait(500)

    onSkipTheSnap()
  }

  async onError (err) {
    Debug.Log(`SnapPlayerComponentDelegator:onError`, err)

    if (this.props.onVideoError) {
      this.props.onVideoError(err)
    }
  }

  onPressAction () {
    Debug.Log(`SnapPlayerComponentDelegator:onPressAction`)

    this.refs.detailsActionsSwiperRef.scrollBy(1, true)
  }

  onPressBackToDetailSlide () {
    Debug.Log(`SnapPlayerComponentDelegator:onPressBackToDetailSlide`)

    this.refs.detailsActionsSwiperRef.scrollBy(-1, true)
  }

  async onPressInOnVideo () {
    Debug.Log(`SnapPlayerComponentDelegator:onPressInOnVideo`)

    const now = new Date().getTime()

    this.lastTapOnScreen = now

    await this.setState({
      pause: true
    })
  }

  async onPressOutOnVideo () {
    Debug.Log(`SnapPlayerComponentDelegator:onPressOutOnVideo`)

    const now = new Date().getTime()

    // check if it's a quick tap, go to next video just in case
    if (this.lastTapOnScreen && (now - this.lastTapOnScreen) < GeneralEnum.QUICK_PRESS_DELAY) {
      return this.props.onSkipTheSnap()
    }

    await this.setState({
      pause: false
    })
  }

  async onDetailsActionsSwiperIndexChanged (index) {
    Debug.Log(`SnapPlayerComponentDelegator:onDetailsActionsSwiperIndexChanged`)

    await this.setState({
      pause: index === 1
    })
  }

  async onPressLike () {
    Debug.Log(`SnapPlayerComponentDelegator:onPressLike`)

    await this.props.onLikeTheSnap(this.directQuickMessage)

    this.refs.detailsActionsSwiperRef.scrollBy(-1, true)
  }

  async onPressDislike () {
    Debug.Log(`SnapPlayerComponentDelegator:onPressDislike`)

    await this.props.onDislikeTheSnap(this.directQuickMessage)

    this.refs.detailsActionsSwiperRef.scrollBy(-1, true)
  }

  openProfile (userId) {
    Debug.Log(`SnapPlayerComponentDelegator:navigateToProfileScene > ${userId}`)

    this.props.openProfile(userId)
  }
}
