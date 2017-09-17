// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
// Essentials
import { Debug, LocalStorage } from '../../../../Factories'
import { AuthEnum } from '../../../../Enums'

export default class RecipientsListComponentDelegator extends Delegator {
  componentWillReceiveProps (props) {
    this.setState({})
  }

  openProfile (userId) {
    this.props.openProfile(userId)
  }
}
