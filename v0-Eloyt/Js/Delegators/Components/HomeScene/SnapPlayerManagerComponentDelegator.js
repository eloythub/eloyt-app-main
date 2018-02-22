// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import { GeneralEnum } from '../../../Enums'
import { Debug } from '../../../Factories'
import { ApiService } from '../../../Services'

export default class SnapPlayerManagerComponentDelegator extends Delegator {
  async componentDidMount () {
    if (!this.paginationCheckpoint) {
      this.paginationCheckpoint = 0

      await this.feedUpTheQueue()
    }
  }

  async feedUpTheQueue () {
    Debug.Log('SnapPlayerManagerComponentDelegator:feedUpTheQueue')

    await this.setState({
      waitingMain: true
    })

    let producedResources

    try {
      producedResources = await ApiService.fetchProducedResources(
        this.paginationCheckpoint,
        GeneralEnum.SNAP_QUEUE_FEEDER_LENGTH
      )
    } catch (err) {
      // show some error or something later
      console.log(err.message)
    }

    await this.setState({
      waitingMain: false
    })

    if (!producedResources) {
      return
    }

    let {snapQueue} = this.state

    producedResources.map((producedResource) => {
      snapQueue.push(producedResource)
    })

    let currentSnap = null

    // check if queue is empty after fetching from server, change pagination flag to 0 and start over
    if (snapQueue.length === 0) {
      this.paginationCheckpoint = 0

      return await this.setState({
        snapQueue,
        currentSnap
      })
    }

    this.paginationCheckpoint += snapQueue.length - 1

    currentSnap = snapQueue.shift()

    await this.setState({
      snapQueue,
      currentSnap
    })
  }

  async searchAgain () {
    Debug.Log('SnapPlayerManagerComponentDelegator:searchAgain')

    await this.setState({waitingMain: true})

    await this.feedUpTheQueue()

    await this.setState({
      waitingMain: false,
    })
  }

  async loadNextSnapFromQueue () {
    Debug.Log('SnapPlayerManagerComponentDelegator:loadNextSnapFromQueue')

    const {snapQueue} = this.state

    // when queue get's empty
    if (snapQueue.length === 0) {
      return await this.feedUpTheQueue()
    }

    const currentSnap = snapQueue.shift()

    console.log(currentSnap)

    await this.setState({
      snapQueue,
      currentSnap,
      waitingMain: currentSnap ? false : true,
    })
  }

  async appendSnapToQueue (uploadedSnap) {
    Debug.Log('SnapPlayerManagerComponentDelegator:appendSnapToQueue', uploadedSnap)

    const {snapQueue} = this.state

    snapQueue.unshift(uploadedSnap)

    await this.setState({
      snapQueue
    })

    this.loadNextSnapFromQueue()
  }

  async onSkipTheSnap () {
    Debug.Log('SnapPlayerManagerComponentDelegator:onSkipTheSnap')

    const { currentSnap } = this.state

    // disable sending request for skip video
    //ApiService.skipVideo(currentSnap.id)

    this.loadNextSnapFromQueue()
  }

  async onLikeTheSnap (message) {
    Debug.Log('SnapPlayerManagerComponentDelegator:onLikeTheSnap')

    const { currentSnap } = this.state

    ApiService.likeVideo(currentSnap.id)

    console.log(message)
    if (message) {
      ApiService.sendMessage(currentSnap.videoOwner.id, 'text', message)
    }

    await this.loadNextSnapFromQueue()
  }

  async onDislikeTheSnap (message) {
    Debug.Log('SnapPlayerManagerComponentDelegator:onDislikeTheSnap')

    const { currentSnap } = this.state

    ApiService.dislikeVideo(currentSnap.id)

    if (message) {
      ApiService.sendMessage(currentSnap.videoOwner.id, 'text', message)
    }

    this.loadNextSnapFromQueue()
  }
}
