// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
// Essentials

export default class HomeScreenDelegator extends Delegator {
  async onPlayerSnapSwiperIndexChanged (index) {
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
}
