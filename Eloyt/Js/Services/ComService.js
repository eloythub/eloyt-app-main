import RequestService from './RequestService'
import { Debug } from '../Factories'
import { RequestEnum } from '../Enums'

export default class ComService extends RequestService {
  static service = 'com'

  /*
   * Push Notification
   */
  static async pushNotificationTokenRegister (token) {
    Debug.Log(`ComService:registerToken`)

    const data = {
      token,
      deviceType: 'apple'
    }

    return await this.dispatchRequest('/push-notification/token/register', RequestEnum.TYPE.POST, data)
  }
}
