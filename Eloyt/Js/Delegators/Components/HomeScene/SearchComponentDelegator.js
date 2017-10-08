// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
// Essentials
import { LocalStorage, Debug } from '../../../Factories'
import { ApiService } from '../../../Services'
import { AuthEnum } from '../../../Enums'

export default class SearchComponentDelegator extends Delegator {
  async componentDidMount () {
    Debug.Log(`SearchComponentDelegator:componentDidMount`)

    const {profilePreviewUserId} = this.props

    this.ssoUserData = await LocalStorage.load(AuthEnum.LOGIN_STATUS)
  }

  async componentWillReceiveProps (props) {
    Debug.Log(`SearchComponentDelegator:componentWillReceiveProps`)

    if (!!props.focusOnSearchField) {
      this.serachRef.focus()
    }
  }

  async onCloseButton () {
    Debug.Log(`SearchComponentDelegator:onCloseButton`)

    this.props.onClose()
  }

  async onSearchQueryChange (searchQuery) {
    Debug.Log(`SearchComponentDelegator:onSearchQueryChange`)

    await this.setState({searchQuery})

    ApiService.abortRequest()

    if (!searchQuery || searchQuery.length < 3) {
      return await this.setState({searchWaiting:false, searchResults: []})
    }

    await this.setState({searchWaiting:true})

    const searchResponse = await ApiService.search(searchQuery)

    const searchResults = JSON.parse(searchResponse.response).data

    await this.setState({searchWaiting:false, searchResults})
  }

  async openProfile(userId) {
    Debug.Log(`SearchComponentDelegator:openProfile`)

    this.props.openProfile(userId)
  }
}
