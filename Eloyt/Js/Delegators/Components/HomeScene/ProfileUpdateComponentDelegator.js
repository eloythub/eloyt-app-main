// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
// Essentials
import { Debug, LocalStorage, Utils } from '../../../Factories'
import { ApiService } from '../../../Services'
import { AuthEnum, ProfileEnum, GeneralEnum } from '../../../Enums'

export default class ProfileUpdateComponentDelegator extends Delegator {
  async componentDidMount () {
    Debug.Log(`ProfileUpdateComponentDelegator:componentDidMount`)

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

      Utils.alert('Something went wrong!!!\nPlease try again.')

      this.onCloseButton()
    }

    this.firstName   = this.requestedProfileData.firstName
    this.lastName    = this.requestedProfileData.lastName
    this.gender      = this.requestedProfileData.gender
    this.dateOfBirth = this.requestedProfileData.dateOfBirth
    this.aboutMe     = this.requestedProfileData.aboutMe
    this.hashtags    = this.requestedProfileData.hashtags

    let mode = ProfileEnum.MODE_PREVIEW_GUESS

    if (this.ssoUserData.id === this.requestedProfileData.id) {
      mode = ProfileEnum.MODE_PREVIEW_MASTER
    }

    await this.setState({
      mode,
      mainWaiting: false,
    })
  }

  async componentWillReceiveProps (props) {
    if (props.profilePreviewUserId !== this.props.profilePreviewUserId) {
      await this.setState({})
    }
  }

  onCloseButton () {
    this.props.discard()
  }

  async onSaveButton () {
    if (!this.firstName || !this.lastName || !this.gender || !this.dateOfBirth || !this.aboutMe) {
      return Utils.alert('All the fields are required.')
    }

    if (this.hashtags.length < GeneralEnum.PROFILE_HASHTAGS_LIMIT_MIN) {
      return Utils.alert(`There is a limit on selected areas.\nMinimum ${GeneralEnum.PROFILE_HASHTAGS_LIMIT_MIN}`)
    }

    if (this.hashtags.length > GeneralEnum.PROFILE_HASHTAGS_LIMIT_MAX) {
      return Utils.alert(`There is a limit on selected areas.\nMaximum ${GeneralEnum.PROFILE_HASHTAGS_LIMIT_MAX}`)
    }

    await this.setState({mainWaiting: true})

    try {
      const updatedUsed = await ApiService.updateProfile({
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        dateOfBirth: this.dateOfBirth,
        aboutMe: this.aboutMe,
      })

      await LocalStorage.save(AuthEnum.LOGIN_STATUS, updatedUsed.data)

      const ids = this.hashtags.map((hashtag) => hashtag.id)

      await ApiService.updateProfileHashtags(ids)

      await this.setState({mainWaiting: false})

      this.props.discard(true)
    } catch (err) {
      Debug.Log(err)

      Utils.alert('Something went wrong!\nPlease try again later.')

      await this.setState({mainWaiting: false})
    }
  }

  notImplementedFeature () {
    Utils.alert('This feature has not implemented yet!!!')
  }
}
