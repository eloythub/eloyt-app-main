// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'

export default class BirthdateEntityComponentDelegator extends Delegator {
  componentWillReceiveProps (props) {
    this.setState(props)
  }
}
