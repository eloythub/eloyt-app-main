// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import { Debug } from '../../Factories'

export default class SnapButtonComponentDelegator extends Delegator {
  startSnapping() {
    Debug.Log('SnapButtonComponentDelegator:startSnapping')

    this.props.onSnapStarted()
  }

  finishSnapping () {
    Debug.Log('SnapButtonComponentDelegator:finishSnapping')

    this.props.onSnapEnded()
  }
}
