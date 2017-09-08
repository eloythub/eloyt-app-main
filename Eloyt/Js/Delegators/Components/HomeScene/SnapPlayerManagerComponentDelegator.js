// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import { Debug } from '../../../Factories'
import { ApiService } from '../../../Services'

export default class SnapPlayerManagerComponentDelegator extends Delegator {
  async componentDidMount () {
    await this.feedUpTheQueue()
  }

  async feedUpTheQueue () {
    Debug.Log('SnapPlayerManagerComponentDelegator:feedUpTheQueue')

    const producedResources = await ApiService.fetchProducedResources()


    const {snapQueue} = this.state

    producedResources.map((producedResource) => {
      snapQueue.push(producedResource)
    })

    const currentSnap = snapQueue[0]

    snapQueue.splice(0, 1)

    const waitingMain = currentSnap ? false : true

    await this.setState({
      snapQueue,
      currentSnap,
      waitingMain,
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
}
