import React, { Component } from 'react'
import { AppRegistry, StyleSheet, View } from 'react-native'
import { ActionConst, Actions, Router, Scene } from 'react-native-router-flux'
import { AuthEnum } from './Enums'
import { Debug, LocalStorage } from './Factories'
// Import Components Scenes Here
import LoginScreen, { LoginScreenKey, LoginScreenTitle } from './Screens/LoginScreen'
import CompleteProfileScreen, { CompleteProfileScreenKey, CompleteProfileScreenTitle } from './Screens/CompleteProfileScreen'
// import ConnectedAreaOfInterestsScene, {
//  AreaOfInterestsSceneKey,
//  AreaOfInterestsSceneTitle
// } from './Components/Scenes/AreaOfInterests/AreaOfInterestsScene'
import HomeScreen, { HomeScreenKey, HomeScreenTitle } from './Screens/HomeScreen'
// import ConnectedRecordScene, { RecordSceneKey, RecordSceneTitle } from './Components/Scenes/Record/RecordScene'
// import ConnectedPostingScene, { PostingSceneKey, PostingSceneTitle } from './Components/Scenes/Posting/PostingScene'
// import ConnectedUserProfileScene, { UserProfileSceneKey, UserProfileSceneTitle } from './Components/Scenes/UserProfile/UserProfileScene'

export default class IndexView extends Component {
  async isSignedIn () {
    Debug.Log('IndexView:isSignedIn')

    try {
      return await LocalStorage.load(AuthEnum.LOGIN_STATUS)
    } catch (e) {
      return false
    }
  }

  async RedirectToHomeSceneIfWereSignedIn () {
    Debug.Log('IndexView:RedirectToHomeSceneIfWereSignedIn')

    const isSignedIn = await this.isSignedIn()

    Debug.Log('IndexView:RedirectToHomeSceneIfWereSignedIn:LoginStatus:', isSignedIn)

    return true

    if (isSignedIn) {
      //if (!isSignedIn.isActivated) {
      //  Debug.Log('User Not Activated')
      //  // Show Complete Profile scene
      //  return Actions.CompleteProfileScene({
      //    type: ActionConst.REPLACE,
      //  })
      //}

      await Actions.HomeScene({
        type: ActionConst.REPLACE,
      })
    }
  }

  async RedirectToLoginSceneIfWereNotSignedIn () {
    Debug.Log('IndexView:CheckSignInStatus')

    const isSignedIn = await this.isSignedIn()

    Debug.Log('IndexView:CheckSignInStatus:LoginStatus:', isSignedIn)

    if (!isSignedIn) {
      LocalStorage.unload(AuthEnum.LOGIN_STATUS)

      await Actions.LoginScene({
        type: ActionConst.REPLACE,
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
          </Scene>
        </Router>
        {/*<Router>*/}
        {/*<Scene key='Root' hideNavBar>*/}
        {/* <Scene */}
        {/* hideNavBar */}
        {/* title={CompleteProfileSceneTitle} */}
        {/* key={CompleteProfileSceneKey} */}
        {/* component={CompleteProfileScene} */}
        {/* type={ActionConst.POP_AND_REPLACE} */}
        {/* /> */}
        {/* <Scene */}
        {/* hideNavBar */}
        {/* title={AreaOfInterestsSceneTitle} */}
        {/* key={AreaOfInterestsSceneKey} */}
        {/* component={ConnectedAreaOfInterestsScene} */}
        {/* type={ActionConst.POP_AND_REPLACE} */}
        {/* /> */}
        {/* <Scene */}
        {/* hideNavBar */}
        {/* title={HomeSceneTitle} */}
        {/* key={HomeSceneKey} */}
        {/* component={ConnectedHomeScene} */}
        {/* type={ActionConst.POP_AND_REPLACE} */}
        {/* /> */}
        {/* <Scene */}
        {/* hideNavBar */}
        {/* title={RecordSceneTitle} */}
        {/* key={RecordSceneKey} */}
        {/* component={ConnectedRecordScene} */}
        {/* type={ActionConst.PUSH_OR_POP} */}
        {/* direction='horizontal' */}
        {/* duration={300} */}
        {/* /> */}
        {/* <Scene */}
        {/* hideNavBar */}
        {/* title={PostingSceneTitle} */}
        {/* key={PostingSceneKey} */}
        {/* component={ConnectedPostingScene} */}
        {/* type={ActionConst.PUSH_OR_POP} */}
        {/* direction='horizontal' */}
        {/* duration={300} */}
        {/* /> */}
        {/* <Scene */}
        {/* hideNavBar */}
        {/* title={UserProfileSceneTitle} */}
        {/* key={UserProfileSceneKey} */}
        {/* component={ConnectedUserProfileScene} */}
        {/* type={ActionConst.PUSH_OR_POP} */}
        {/* direction='horizontal' */}
        {/* duration={300} */}
        {/* /> */}
        {/*</Scene>*/}
        {/*</Router>*/}
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
