import React from 'react'
import Controller from '../../libs/controller'
import {log} from '../../libs/logs'

export default class LoginController extends Controller {
  onPressSignInByFacebook () {
    log('onPress', 'onPressSignInByFacebook')

    this.navigate('replace', 'Username')
  }

  onPressSignInByGoogle () {
    log('onPress', 'onPressSignInByGoogle')
  }

  onPressTermsAndConditions () {
    log('onPress', 'onPressTermsAndConditions')
  }

  onPressPrivacyPolicy () {
    log('onPress', 'onPressPrivacyPolicy')
  }
}
