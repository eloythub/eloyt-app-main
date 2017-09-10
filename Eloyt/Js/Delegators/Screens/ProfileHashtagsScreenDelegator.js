// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import { ActionConst, Actions } from 'react-native-router-flux'
// Essentials
import { Debug, LocalStorage, Utils } from '../../Factories'
import { ApiService } from '../../Services'
import { AuthEnum, GeneralEnum } from '../../Enums'

export default class ProfileHashtagsScreenDelegator extends Delegator {
  async componentDidMount () {
    Debug.Log(`ProfileHashtagsScreenDelegator:componentDidMount`)

    this.ssoUserData = await LocalStorage.load(AuthEnum.LOGIN_STATUS)

    let hashtags

    try {
      hashtags = await ApiService.getAllHashtags()
    } catch (err) {
      Utils.alert('Something went wrong!!!\nPlease try again.')

      Debug.Log(err)

      Actions.CompleteProfileScene({
        type: ActionConst.REPLACE,
      })

      return
    }

    this.hashtags = hashtags.data

    await this.setState({
      waitingMain: false,
      selectedHashtags: this.ssoUserData.hashtags || []
    })
  }

  async doneButtonPress () {
    Debug.Log(`ProfileHashtagsScreenDelegator:doneButtonPress`)

    await this.setState({waitingNext: true})

    const {selectedHashtags} = this.state

    if (selectedHashtags.length < GeneralEnum.PROFILE_HASHTAGS_LIMIT_MIN) {
      Utils.alert(`There is a limit on selected areas.\nMinimum ${GeneralEnum.PROFILE_HASHTAGS_LIMIT_MIN}`)

      return await this.setState({waitingNext: false})
    }

    if (selectedHashtags.length > GeneralEnum.PROFILE_HASHTAGS_LIMIT_MAX) {
      Utils.alert(`There is a limit on selected areas.\nMaximum ${GeneralEnum.PROFILE_HASHTAGS_LIMIT_MAX}`)

      return await this.setState({waitingNext: false})
    }

    try {
      const ids = selectedHashtags.map((hashtag) => hashtag.id)

      await ApiService.updateProfileHashtags(ids)

      const activatedUser = await ApiService.activateUser(ids)

      await LocalStorage.save(AuthEnum.LOGIN_STATUS, activatedUser.data)

      Actions.HomeScene({
        type: ActionConst.REPLACE,
      })
    } catch (err) {
      Debug.Log(err)

      Utils.alert('Something went wrong!!!\nPlease try again.')

      await this.setState({waitingNext: false})
    }
  }
}
