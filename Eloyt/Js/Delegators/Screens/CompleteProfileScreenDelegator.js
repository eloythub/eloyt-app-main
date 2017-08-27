// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
// Essentials
import { Utils, Debug, LocalStorage } from '../../Factories'
import { AuthEnum } from '../../Enums'
import { ApiService } from '../../Services'


export default class CompleteProfileScreenDelegator extends Delegator {
  async componentDidMount () {
    Debug.Log(`CompleteProfileScreenDelegator:componentDidMount`)

    this.ssoUserData = await LocalStorage.load(AuthEnum.LOGIN_STATUS)

    this.username    = this.ssoUserData.username
    this.firstName   = this.ssoUserData.firstName
    this.lastName    = this.ssoUserData.lastName
    this.gender      = this.ssoUserData.gender
    this.dateOfBirth = this.ssoUserData.dateOfBirth

    await this.setState({waitingMain: false})
  }

  async onNextButtonPress () {
    Debug.Log(`CompleteProfileScreen:onNextButtonPress`)

    const {ssoUserData} = this

    if (!this.username || !this.firstName || !this.lastName || !this.gender || !this.dateOfBirth) {
      Utils.alert('All the fields are required.')

      return
    }

    await this.setState({waitingNext: true})

    try {
      const username = this.username.replace(/\W/g, '') // strip any non alphanumeric chars from username

      const updatedUsed = await ApiService.requestUpdateProfile({
          username,
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender,
          dateOfBirth: this.dateOfBirth,
        })
      console.log(updatedUsed)

      await LocalStorage.save(AuthEnum.LOGIN_STATUS, updatedUsed.data)

      Actions.ProfileHashtagsScene({
        type: ActionConst.REPLACE,
      })
    } catch (err) {
      Debug.Log(err)

      Utils.alert('Something went wrong!\nPlease try again later.')
    } finally {
      await this.setState({waitingNext: false})
    }
  }
}
