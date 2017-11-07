// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, View } from 'react-native'
// Essentials
import { TermsAndConditionLinkComponentStyles } from '../Styles'
import TermsAndConditionLinkComponentDelegator from '../Delegators/Components/TermsAndConditionLinkComponentDelegator'

export default class TermsAndConditionLink extends TermsAndConditionLinkComponentDelegator {
  render () {
    return (
      <View style={TermsAndConditionLinkComponentStyles.rootContainer}>
        {
          !this.props.showOnlyLink
            ? (
              <View>
                <Text style={TermsAndConditionLinkComponentStyles.termsAndServicesText}>
                  By Using This App You Agreed Our
                </Text>
                <Text>{' '}</Text>
              </View>
            )
            : null
        }
        <TouchableOpacity onPress={this.openTermsLink.bind(this)}>
          <Text style={[
            TermsAndConditionLinkComponentStyles.termsAndServicesText,
            TermsAndConditionLinkComponentStyles.termsAndServicesLink,
            this.props.linkStyle || {}
          ]}>{this.props.linkText || 'Terms Of Services'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

TermsAndConditionLink.propTypes = {
  showOnlyLink: PropTypes.bool,
  linkText: PropTypes.string,
  linkStyle: PropTypes.any
}
