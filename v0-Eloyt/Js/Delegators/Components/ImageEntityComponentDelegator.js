// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'

export default class ImageEntityComponentDelegator extends Delegator {
  componentWillReceiveProps(props) {
    this.setState(props);
  }
}
