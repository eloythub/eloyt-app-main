import React from 'react'
import { View, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { Button } from 'native-base'
import commonStyle from '../../styles/commonStyle'
import commonAssets from '../../styles/commonAssets'
import appStyle from './loginStyle'
import LoginController from './loginController'

export default class LoginScene extends LoginController  {
  static navigationOptions = {
    header: null
  }

  render () {
    return (
      <View style={commonStyle.splashBackgroundView}>
        <Image source={commonAssets.background} style={commonStyle.backgroundImage}/>

        <View style={appStyle.logoWrapper}>
          <Image source={commonAssets.logo} style={commonStyle.logo}/>
        </View>
        <View style={appStyle.appNameWrapper}>
          <Text style={appStyle.appNameText}>Eloyt</Text>
        </View>
        <SafeAreaView style={commonStyle.footerWrapper}>
          <View style={appStyle.buttonsSection}>
            <Button block small style={commonStyle.buttonFacebook} onPress={this.onPressSignInByFacebook.bind(this)}>
              <Text style={commonStyle.buttonFacebookText}>Sign in by Facebook</Text>
            </Button>
            <Button block small style={commonStyle.buttonGoogle} onPress={this.onPressSignInByGoogle.bind(this)}>
              <Text style={commonStyle.buttonGoogleText}>Sign in by Google</Text>
            </Button>
          </View>
          <View style={appStyle.termsSection}>
            <Text style={appStyle.termsText}>
              By creating an account you agree to out
            </Text>
            <Text style={appStyle.termsText}>
              <TouchableOpacity style={appStyle.termsTextWithLink} onPress={this.onPressTermsAndConditions.bind(this)}>
                <Text style={appStyle.termsLink}>Terms & Conditions</Text>
              </TouchableOpacity>
              {' and '}
              <TouchableOpacity style={appStyle.termsTextWithLink} onPress={this.onPressPrivacyPolicy.bind(this)}>
                <Text style={appStyle.termsLink}>Privacy Policy</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </SafeAreaView>
      </View>
    )
  }
}
