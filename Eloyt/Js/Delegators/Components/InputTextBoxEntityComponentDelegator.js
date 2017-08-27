// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'

export default class InputTextBoxEntityComponentDelegator extends Delegator {
  componentDidMount () {
    this.props.setTextRef(this.refs.textRefObj)
  }

  componentWillReceiveProps (props) {
    this.setState(props)
  }
}
