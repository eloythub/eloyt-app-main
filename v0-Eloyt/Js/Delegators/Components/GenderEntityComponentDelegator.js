// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'

export default class GenderEntityComponentDelegator extends Delegator {
  componentWillReceiveProps (props) {
    this.setState(props)
  }

  radioButtonOnPress (value) {
    this.setState({value})

    this.props.onPress(value)
  }
}
