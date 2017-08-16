import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as LoginActions from './LoginActions'
import TermsAndConditionLink from '../../Misc/TermsAndConditionLink'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import * as LoginActionsConst from './LoginActionsConst'
import { Col, Grid, Row } from 'react-native-easy-grid'
import fluidBackground from '../../../../Assets/Images/fluid-background.jpg'
import facebookLogo from '../../../../Assets/Images/facebook.png'
import pureLogo from '../../../../Assets/Images/pure-logo.png'
import { styles } from './LoginStyles'
import { ActionConst, Actions } from 'react-native-router-flux'
import { Bars } from 'react-native-loader'
import FbGraphApi from '../../../Libraries/FbGraphApi'
import LocalStorage from '../../../Libraries/LocalStorage'
import Utils from '../../../Libraries/Utils'
import Api from '../../../Libraries/Api'
import Toast, { DURATION } from 'react-native-easy-toast'

const { log, error } = console
const loginWithReadPermissions = [
  'public_profile',
  'email',
  'user_photos',
  'user_friends',
  'user_website',
  'user_about_me',
  'user_birthday',
  'user_likes',
  'user_location',
]

class LoginScene extends Component {
  constructor (props) {
    log(`LoginScene:constructor`)

    super(props)

    this.state = {
      waiting: true,
    }

  }

  async componentDidMount () {
    log(`LoginScene:componentDidMount`)

    const {loginActions} = this.props
    let ssoData

    try {
      ssoData = await LocalStorage.load(LoginActionsConst.ON_SSO_USER_DATA)
    } catch (err) {
      error(err)

      return await this.setState({waiting: false})
    }

    if (!ssoData) {
      return await this.setState({waiting: false})
    }

    const accessTokenData = await AccessToken.getCurrentAccessToken()

    if (accessTokenData) {
      return await this.doLogin()
    }

    try {
      const loginResult = await LoginManager.logInWithReadPermissions(loginWithReadPermissions)

      if (loginResult.isCancelled) {
        await loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_CANCELED)

        return await this.setState({waiting: false})
      }

      await this.doLogin()
    } catch (err) {
      loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_FAILED, err)

      return await this.setState({waiting: false})
    }
  }

  async doLogin () {
    log(`LoginScene:doLogin`)

    const {toast} = this.refs
    const {loginActions} = this.props
    let { accessToken } = await AccessToken.getCurrentAccessToken()

    await this.setState({waiting: true})

    accessToken = accessToken.toString()

    await loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_SUCCEED, accessToken)

    let fbUserId

    try {
      fbUserId = await FbGraphApi.getProfileId(accessToken)
    } catch (err) {
      await loginActions.onApiLogIn(LoginActionsConst.ON_SSO_LOGIN_FAILED, err)

      toast.show(`Login Failed!!! Eloyt was't able to fetch from Facebook, Please try again`, DURATION.LENGTH_SHORT)

      return await this.setState({waiting: false})
    }

    try {
      const {data: ssoUserData} = await Api.requestSsoLogin(accessToken, fbUserId)

      console.log('SSO Result: ', ssoUserData)

      await loginActions.onApiLogIn(LoginActionsConst.ON_SSO_LOGIN_SUCCEED, ssoUserData)

      if (!ssoUserData.activated) {
        // Show Complete Profile scene
        return Actions.completeProfile({
          type: ActionConst.REPLACE,
        })
      }

      // Show Home Scene
      Actions.home({
        type: ActionConst.REPLACE,
      })
    } catch (err) {
      await loginActions.onApiLogIn(LoginActionsConst.ON_SSO_LOGIN_FAILED, err)

      await this.setState({waiting: false})

      console.log('SSO Error: ', err)

      toast.show(err.error, DURATION.LENGTH_SHORT)
    }
  }

  async onLoginPress () {
    log(`LoginScene:onLoginPress`)

    const {toast} = this.refs
    const {loginActions} = this.props

    await this.setState({waiting: true})

    LoginManager.logOut()

    try {
      const loginResult = await LoginManager.logInWithReadPermissions(loginWithReadPermissions)

      if (loginResult.isCancelled) {
        await loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_CANCELED)

        toast.show('Canceled', DURATION.LENGTH_SHORT)

        return await this.setState({waiting: false})
      }

      await this.doLogin()
    } catch (err) {
      loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_FAILED, err)

      return await this.setState({waiting: false})
    }
  }

  handleLoading (show) {
    if (show) {
      return <View style={styles.loadingContainer}>
        <View style={styles.loading}>
          <Bars size={40} color="#ffffff"/>
        </View>
      </View>
    }
  }

  render () {
    const {waiting} = this.state

    return (
      <View style={styles.rootContainer}>
        <StatusBar
          backgroundColor={Platform.OS === 'ios' ? '#ffffff' : '#000000'}
          barStyle="light-content"
          hidden={false}
        />
        <Image source={fluidBackground} style={styles.backgroundImage}/>
        <Grid style={styles.rootMainContainer}>
          <Row size={70}>
            <Grid>
              <Row size={40} style={styles.logoContainer}>
                <Image source={pureLogo} style={styles.pureLogo}/>
              </Row>
              <Row size={10} style={styles.companyNameContainer}>
                <Text style={styles.companyName}>ELOYT</Text>
              </Row>
              <Row size={50} style={styles.logoSloganContainer}>
                <Text style={styles.logoSlogan}>MAKING NETWORKING</Text>
                <Text style={styles.logoSlogan}>GREAT AGAIN</Text>
              </Row>
            </Grid>
          </Row>
          <Row size={30}>
            <View style={styles.loginField}>
              <Text style={styles.loginAndContinueWithText}>Signin & Continue With</Text>
              <TouchableOpacity onPress={this.onLoginPress.bind(this)}>
                <View style={styles.loginButtonContainer}>
                  <Grid>
                    <Col size={20} style={styles.loginButtonLogoWrapper}>
                      <Image source={facebookLogo} style={styles.loginButtonFacebookIcon}/>
                    </Col>
                    <Col size={80} style={styles.loginButtonTextWrapper}>
                      <Text style={styles.loginButtonText}>Facebook</Text>
                    </Col>
                  </Grid>
                </View>
              </TouchableOpacity>
              <TermsAndConditionLink />
            </View>
          </Row>
        </Grid>
        {this.handleLoading(waiting)}
        <Toast ref="toast"
               position="bottom"
               textStyle={StyleSheet.flatten(styles.toastText)}
               style={StyleSheet.flatten(styles.toast)}/>
      </View>
    )
  }
}

LoginScene.propTypes = {
  loginActions: PropTypes.object,
  accessToken: PropTypes.string,
  ssoUserData: PropTypes.object,
}

const mapStateToProps = (state) => {
  const {LoginReducers} = state

  return LoginReducers
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginActions: bindActionCreators(LoginActions, dispatch),
  }
}

const ConnectedLoginScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScene)

export const LoginSceneKey   = 'login'
export const LoginSceneTitle = 'login'

export default ConnectedLoginScene
