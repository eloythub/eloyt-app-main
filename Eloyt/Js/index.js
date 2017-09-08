import React, { Component } from 'react'
import { AppRegistry, StyleSheet, View } from 'react-native'
import { ActionConst, Actions, Router, Scene } from 'react-native-router-flux'
import { AuthEnum } from './Enums'
import { Debug, LocalStorage } from './Factories'
import { ApiService } from './Services'
// Import Components Scenes Here
import LoginScreen, { LoginScreenKey, LoginScreenTitle } from './Screens/LoginScreen'
import CompleteProfileScreen, {
  CompleteProfileScreenKey,
  CompleteProfileScreenTitle
} from './Screens/CompleteProfileScreen'
import ProfileHashtagsScreen, {
  ProfileHashtagsScreenKey,
  ProfileHashtagsScreenTitle
 } from './Screens/ProfileHashtagsScreen'
import HomeScreen, { HomeScreenKey, HomeScreenTitle } from './Screens/HomeScreen'

export default class IndexView extends Component {
  async isSignedIn () {
    Debug.Log('IndexView:isSignedIn')

    try {
      let ssoUserData = await LocalStorage.load(AuthEnum.LOGIN_STATUS)

      if (ssoUserData) {
        let userProfile = await ApiService.getProfile(ssoUserData.id)

        if (userProfile.statusCode === 401) {
          const apiAccessToken = await ApiService.generateAccessToken(ssoUserData.id)

          await LocalStorage.save(AuthEnum.LOGIN_API_ACCESS_TOKEN, apiAccessToken.tokenId)

          userProfile = await ApiService.getProfile(ssoUserData.id)
        }

        await LocalStorage.save(AuthEnum.LOGIN_STATUS, userProfile.data)
      }

      return ssoUserData
    } catch (e) {
      return false
    }
  }

  async RedirectToHomeSceneIfWereSignedIn () {
    Debug.Log('IndexView:RedirectToHomeSceneIfWereSignedIn')

    const isSignedIn = await this.isSignedIn()

    Debug.Log('IndexView:RedirectToHomeSceneIfWereSignedIn:LoginStatus:', isSignedIn)

    if (isSignedIn) {
      await Actions.HomeScene({
        type: ActionConst.REPLACE
      })
    }
  }

  async RedirectToLoginSceneIfWereNotSignedIn () {
    Debug.Log('IndexView:CheckSignInStatus')

    const isSignedIn = await this.isSignedIn()

    if (!isSignedIn) {
      LocalStorage.unload(AuthEnum.LOGIN_STATUS)

      await Actions.LoginScene({
        type: ActionConst.REPLACE
      })
    }
  }

  render () {
    return (
      <View style={styles.appContainer}>
        <Router>
          <Scene hideNavBar>
            <Scene
              initial
              key={LoginScreenKey}
              title={LoginScreenTitle}
              component={LoginScreen}
              onEnter={this.RedirectToHomeSceneIfWereSignedIn.bind(this)}
            />
            <Scene
              key={HomeScreenKey}
              title={HomeScreenTitle}
              component={HomeScreen}
              onEnter={this.RedirectToLoginSceneIfWereNotSignedIn.bind(this)}
            />
            <Scene
              key={CompleteProfileScreenKey}
              title={CompleteProfileScreenTitle}
              component={CompleteProfileScreen}
              onEnter={this.RedirectToLoginSceneIfWereNotSignedIn.bind(this)}
            />
            <Scene
              key={ProfileHashtagsScreenKey}
              title={ProfileHashtagsScreenTitle}
              component={ProfileHashtagsScreen}
              onEnter={this.RedirectToLoginSceneIfWereNotSignedIn.bind(this)}
            />
          </Scene>
        </Router>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  }
})

AppRegistry.registerComponent('Eloyt', () => IndexView)
