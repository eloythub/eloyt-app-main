// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
// Essentials
import { Debug } from '../../../../Factories'
import { ApiService } from '../../../../Services'

export default class RecipientsListComponentDelegator extends Delegator {
  componentWillReceiveProps (props) {
    this.setState({})
  }

  openProfile (user) {
    this.props.openProfile(user)
  }

  async onRefresh () {
    await this.setState({refreshing: true})

    await this.props.loadRecipients(true)
  }
}
