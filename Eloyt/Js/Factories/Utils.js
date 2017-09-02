import { Factory } from 'react-eloyt'
import { Alert, AlertIOS, Platform } from 'react-native'

export default class Utils extends Factory {
  static getPlatform () {
    return Platform.OS
  }

  static isIOS () {
    return Utils.getPlatform() === 'ios'
  }

  static isAndroid () {
    return Utils.getPlatform() === 'android'
  }

  static alert (message) {
    let alertObj = Alert

    if (Platform.OS === 'ios') {
      alertObj = AlertIOS
    }

    alertObj.alert(message)
  }
}