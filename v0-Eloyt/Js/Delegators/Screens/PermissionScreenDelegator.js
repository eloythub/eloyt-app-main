// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import Camera from 'react-native-camera'
import { ActionConst, Actions } from 'react-native-router-flux'
// Essentials
import { Debug, LocalStorage, Utils } from '../../Factories'
import { AuthEnum, GeneralEnum } from '../../Enums'

const {geolocation} = navigator

export default class PermissionScreenDelegator extends Delegator {
  nextSlide () {
    this.refs.swiperRef.scrollBy(1)
  }

  async process () {
    await Camera.checkDeviceAuthorizationStatus()
    await Utils.next()
    await Camera.checkAudioAuthorizationStatus()
    await Utils.next()
    await Camera.checkVideoAuthorizationStatus()
    await Utils.next()
    await geolocation.requestAuthorization()
    await Utils.next()
    await LocalStorage.save(GeneralEnum.CATCHED_PERMISSION, true)

    await Utils.wait(1000)

    Actions.HomeScene({
      type: ActionConst.REPLACE,
    })
  }
}
