import RequestService from './RequestService'
import { Debug } from '../Factories'
import { RequestEnum } from '../Enums'

export default class ApiService extends RequestService {
  static async getOrCreateUser (accessToken, facebookUserId) {
    Debug.Log(`ApiService:getOrCreateUser`)

    const data = {
      accessToken,
      facebookUserId,
    }

    return await this.dispatchRequest('/users/create-or-get', RequestEnum.TYPE.PUT, data)
  }

  static async generateAccessToken (userId) {
    Debug.Log(`ApiService:getOrCreateUser`)

    const data = {
      userId,
    }

    return await this.dispatchRequest('/auth/token/generate', RequestEnum.TYPE.POST, data)
  }

  static async requestUpdateProfile (attributes) {
    Debug.Log(`ApiService:requestUpdateProfile`)

    const data = {
      attributes
    }

    return await this.dispatchRequest('/users/profile-update', RequestEnum.TYPE.POST, data)
  }

  static async requestGetProfile (userId) {
    Debug.Log(`ApiService:requestGetProfile`)

    return await this.dispatchRequest(`/users/${userId}`, RequestEnum.TYPE.GET)
  }

  static async requestReactToVideo (userId, video, reactType) {
    Debug.Log(`ApiService:requestReactToVideo`)

    const {id: resourceId, user: {id: resourceOwnerUserId}} = video

    return await this.dispatchRequest(`/stream/${userId}/${resourceId}/${resourceOwnerUserId}/${reactType}`, RequestEnum.TYPE.POST)
  }

  static async fetchProducedResources (userId, offset = 50) {
    Debug.Log(`ApiService:fetchProducedResources`)

    return await this.dispatchRequest(`/stream/produce/${userId}/${offset}`, RequestEnum.TYPE.GET)
  }

  static async fetchProducedResourcesById (resourceId) {
    Debug.Log(`ApiService:fetchProducedResourcesById`)

    return await this.dispatchRequest(`/stream/produce/${resourceId}`, RequestEnum.TYPE.GET)
  }
}
