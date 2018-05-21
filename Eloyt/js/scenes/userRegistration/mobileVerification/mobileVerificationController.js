import React from 'react'
import Controller from '../../../libs/controller'
import {log} from '../../../libs/logs'

export default class MobileVerificationController extends Controller {
  onCheckCode () {
    log('onPress', 'onCheckCode')

    this.navigate('navigate', 'ProfileInfo')
  }
}
