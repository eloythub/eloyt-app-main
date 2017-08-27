// Basics
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
// Essentials
import { TermsAndConditionLinkComponentStyles } from '../Styles'
import TermsAndConditionLinkComponentDelegator from '../Delegators/Components/TermsAndConditionLinkComponentDelegator'

export default class TermsAndConditionLink extends TermsAndConditionLinkComponentDelegator {
  render () {
    return (
      <View style={TermsAndConditionLinkComponentStyles.rootContainer}>
        <Text style={TermsAndConditionLinkComponentStyles.termsAndServicesText}>
          By Using This App You Agreed Our
        </Text>
        <Text>{' '}</Text>
        <TouchableOpacity onPress={this.openTermsLink.bind(this)}>
          <Text style={[
            TermsAndConditionLinkComponentStyles.termsAndServicesText,
            TermsAndConditionLinkComponentStyles.termsAndServicesLink
          ]}>Terms Of Services</Text>
        </TouchableOpacity>
      </View>
    )
  }
}