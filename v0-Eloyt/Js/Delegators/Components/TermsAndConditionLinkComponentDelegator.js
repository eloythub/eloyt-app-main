// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import { Alert, Linking } from 'react-native'
// Essentials
import { ConfigsEnum } from '../../Enums'

export default class TermsAndConditionLinkComponentDelegator extends Delegator {
  openTermsLink () {
    const url = `${ConfigsEnum.WEBSITE_BASE_URL}/terms`

    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        Alert.alert('You need to review : ' + url)
      } else {
        return Linking.openURL(url)
      }
    })
  }
}
