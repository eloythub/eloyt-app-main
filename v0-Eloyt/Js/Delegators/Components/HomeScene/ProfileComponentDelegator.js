// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'

export default class ProfileComponentDelegator extends Delegator {
  async componentWillReceiveProps(props) {
    if (props.profilePreviewUserId !== this.props.profilePreviewUserId) {
      await this.setState({})
    }
  }

  async updateProfile () {
    await this.setState({
      isUpdated: false
    })

    this.refs.profileSwiperRef.scrollBy(1, true)
  }

  async discardUpdateProfile (isUpdated) {
    await this.setState({
      isUpdated: isUpdated ? true: false
    })

    this.refs.profileSwiperRef.scrollBy(-1, true)
  }
}
