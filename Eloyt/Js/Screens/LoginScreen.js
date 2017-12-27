// Basics
import React from 'react'
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
// Essentials
import { CommonStyles, LoginScreenStyles, WaitingComponentStyles } from '../Styles'
import { Assets, Debug, Utils } from '../Factories'
import LoginScreenDelegator from '../Delegators/Screens/LoginScreenDelegator'
// Components
import TermsAndConditionLink from '../Components/TermsAndConditionLink'
// Modules
import { Col, Grid, Row } from 'react-native-easy-grid'
import { Bars } from 'react-native-loader'

export default class LoginScreen extends LoginScreenDelegator {
  constructor (props) {
    Debug.Log(`LoginScreen:constructor`)

    super(props)

    this.state = {
      waitingMain: true
    }
  }

  renderWaiting (show) {
    if (!show) {
      return
    }

    return <View style={WaitingComponentStyles.mainWaitingContainer}>
      <View style={WaitingComponentStyles.mainWaiting}>
        <Bars size={30} color="#ffffff"/>
      </View>
    </View>
  }

  render () {
    const {waitingMain} = this.state

    return (
      <View style={LoginScreenStyles.rootContainer}>
        <StatusBar
          backgroundColor={Utils.isIOS() ? '#ffffff' : '#000000'}
          barStyle="light-content"
          hidden={false}
        />
        <Image source={Assets.FluidBackground} style={CommonStyles.backgroundImage}/>
        <Grid style={LoginScreenStyles.rootMainContainer}>
          <Row size={70}>
            <Grid>
              <Row size={40} style={LoginScreenStyles.logoContainer}>
                <Image source={Assets.PureLogo} style={LoginScreenStyles.pureLogo}/>
              </Row>
              <Row size={10} style={LoginScreenStyles.companyNameContainer}>
                <Text style={LoginScreenStyles.companyName}>ELOYT</Text>
              </Row>
              <Row size={50} style={LoginScreenStyles.logoSloganContainer}>
                <Text style={LoginScreenStyles.logoSlogan}>MAKING NETWORKING</Text>
                <Text style={LoginScreenStyles.logoSlogan}>GREAT AGAIN</Text>
              </Row>
            </Grid>
          </Row>
          <Row size={30}>
            <View style={LoginScreenStyles.loginField}>
              <Text style={LoginScreenStyles.loginAndContinueWithText}>Signing & Continue With</Text>
              <TouchableOpacity onPress={this.pressFacebookLogin.bind(this)}>
                <View style={LoginScreenStyles.loginButtonContainer}>
                  <Grid>
                    <Col size={20} style={LoginScreenStyles.loginButtonLogoWrapper}>
                      <Image source={Assets.FacebookLogo} style={LoginScreenStyles.loginButtonFacebookIcon}/>
                    </Col>
                    <Col size={80} style={LoginScreenStyles.loginButtonTextWrapper}>
                      <Text style={LoginScreenStyles.loginButtonText}>Facebook</Text>
                    </Col>
                  </Grid>
                </View>
              </TouchableOpacity>
              <TermsAndConditionLink />
            </View>
          </Row>
        </Grid>

        {this.renderWaiting(waitingMain)}

      </View>
    )
  }
}

export const LoginScreenKey = 'LoginScene'
