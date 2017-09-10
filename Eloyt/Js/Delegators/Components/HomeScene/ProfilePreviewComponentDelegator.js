// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import { LoginManager } from 'react-native-fbsdk'
import { ActionConst, Actions } from 'react-native-router-flux'
// Essentials
import { Debug, LocalStorage, Utils } from '../../../Factories'
import { ApiService } from '../../../Services'
import { AuthEnum, ProfileEnum } from '../../../Enums'

export default class ProfilePreviewComponentDelegator extends Delegator {
  async componentDidMount () {
    Debug.Log(`ProfilePreviewComponentDelegator:componentDidMount`)

    const {profilePreviewUserId} = this.props

    this.ssoUserData = await LocalStorage.load(AuthEnum.LOGIN_STATUS)

    if (!profilePreviewUserId) {
      return await this.setState({
        mainWaiting: false,
      })
    }

    try {
      this.requestedProfileData = (await ApiService.getProfile(profilePreviewUserId)).data
    } catch (err) {
      console.log(err)

      this.props.closeProfile()

      Utils.alert('Something went wrong!!!\nPlease try again.')
    }

    let mode = ProfileEnum.MODE_PREVIEW_GUESS

    if (this.ssoUserData.id === this.requestedProfileData.id) {
      mode = ProfileEnum.MODE_PREVIEW_MASTER
    }

    await this.setState({
      mode,
      mainWaiting: false,
    })
  }

  async componentWillReceiveProps(props) {
    if (props.profilePreviewUserId !== this.props.profilePreviewUserId) {
      await this.setState({})
    }

    if (props.isUpdated !== this.props.isUpdated) {
      await this.setState({
        mainWaiting: true
      })

      await this.componentDidMount()
    }
  }

  onCloseButton () {
    this.props.closeProfile()
  }

  async onSignOutButton () {
    LoginManager.logOut()

    await LocalStorage.unload(AuthEnum.LOGIN_STATUS)
    await LocalStorage.unload(AuthEnum.LOGIN_API_ACCESS_TOKEN)
    await LocalStorage.unload(AuthEnum.LOGIN_FB_ACCESS_TOKEN)

    Actions.LoginScene({
      type: ActionConst.REPLACE,
    })
  }

  onUpdateButton () {
    this.props.updateProfile()
  }
}
