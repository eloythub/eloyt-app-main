// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'

export default class InputTextBoxEntityComponentDelegator extends Delegator {
  componentDidMount () {
    const {setTextRef} = this.props

    if (typeof setTextRef === 'function') {
      setTextRef(this.refs.textRefObj)
    }
  }

  componentWillReceiveProps (props) {
    this.setState(props)
  }
}
