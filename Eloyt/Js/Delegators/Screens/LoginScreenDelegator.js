// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import { ActionConst, Actions } from 'react-native-router-flux'
// Essentials
import { Debug, LocalStorage, Utils } from '../../Factories'
import { AuthEnum, GeneralEnum } from '../../Enums'
import { ApiService } from '../../Services'
import { AccessToken, LoginManager } from 'react-native-fbsdk'

export default class LoginScreenDelegator extends Delegator {
  async componentDidMount () {
    Debug.Log('LoginScreenDelegator:componentDidMount')

    await LocalStorage.init(GeneralEnum.CATCHED_RECIPIENTS, [])
    await LocalStorage.init(GeneralEnum.CATCHED_MESSAGE, {})
    await LocalStorage.init(GeneralEnum.CATCHED_SETTINGS, {})

    //LoginManager.logOut()
    //await LocalStorage.unload(AuthEnum.LOGIN_STATUS)

    const facebookAccessToken = await AccessToken.getCurrentAccessToken()

    if (facebookAccessToken) {
      await this.doLogin(facebookAccessToken)

      return
    }

    await this.setState({waitingMain: false})
  }

  async pressFacebookLogin () {
    Debug.Log('LoginScreenDelegator:pressFacebookLogin')

    await this.setState({waitingMain: true})

    let facebookAccessToken = await AccessToken.getCurrentAccessToken()

    if (facebookAccessToken) {
      await this.doLogin(facebookAccessToken)

      return
    }

    try {
      const loginResult = await LoginManager.logInWithReadPermissions(AuthEnum.FB_LOGIN_PERMISSION)

      if (loginResult.isCancelled) {
        return await this.setState({waitingMain: false})
      }

      facebookAccessToken = await AccessToken.getCurrentAccessToken()

      await this.setState({waitingMain: true})

      await this.doLogin(facebookAccessToken)
    } catch (err) {
      Utils.alert(err.message)

      return await this.setState({waitingMain: false})
    }
  }

  async doLogin (facebookAccessTokenObject) {
    Debug.Log('LoginScreenDelegator:doLogin')

    await LocalStorage.save(AuthEnum.LOGIN_FB_ACCESS_TOKEN, facebookAccessTokenObject)

    const {accessToken: facebookAccessToken, userID: facebookUserId} = facebookAccessTokenObject

    try {
      // register User
      const getOrCreateRes = await ApiService.getOrCreateUser(facebookAccessToken, facebookUserId)

      // create AccessToken
      const apiAccessToken = await ApiService.generateAccessToken(getOrCreateRes.data.id)

      await LocalStorage.save(AuthEnum.LOGIN_API_ACCESS_TOKEN, apiAccessToken.tokenId)
      await LocalStorage.save(AuthEnum.LOGIN_STATUS, getOrCreateRes.data)

      if (!getOrCreateRes.data.isActivated) {
        Debug.Log('User Not Activated')

        // Show Complete Profile scene
        Actions.CompleteProfileScene({
          type: ActionConst.REPLACE,
        })

        return
      }

      const hasPermissionPageAppearedBefore = await LocalStorage.load(GeneralEnum.CATCHED_PERMISSION)

      if (hasPermissionPageAppearedBefore) {
        return Actions.HomeScene({
          type: ActionConst.REPLACE,
        })
      }

      // Show Permission Scene
      Actions.PermissionScene({
        type: ActionConst.REPLACE,
      })
    } catch (err) {
      Debug.Log('error', err)

      await this.setState({waitingMain: false})

      Utils.alert(err.message)
      //Utils.alert('Something went wrong!!!\nPlease try again.'.)
    }
  }
}
