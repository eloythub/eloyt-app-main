import RequestService from './RequestService'
import { Debug } from '../Factories'
import { RequestEnum } from '../Enums'

export default class ApiService extends RequestService {
  /*
   * Auth
   */
  static async generateAccessToken (userId) {
    Debug.Log(`ApiService:getOrCreateUser`)

    const data = {
      userId,
    }

    return await this.dispatchRequest('/auth/token/generate', RequestEnum.TYPE.POST, data)
  }

  /*
   * Users
   */

  static async getOrCreateUser (accessToken, facebookUserId) {
    Debug.Log(`ApiService:getOrCreateUser`)

    const data = {
      accessToken,
      facebookUserId,
    }

    return await this.dispatchRequest('/users/create-or-get', RequestEnum.TYPE.PUT, data)
  }

  static async updateProfile (attributes) {
    Debug.Log(`ApiService:requestUpdateProfile`)

    const data = {
      attributes
    }

    return await this.dispatchRequest('/users/profile-update', RequestEnum.TYPE.POST, data)
  }

  static async activateUser () {
    Debug.Log(`ApiService:requestUpdateProfile`)

    return await this.dispatchRequest('/users/activate', RequestEnum.TYPE.POST)
  }

  static async getProfile (userId) {
    Debug.Log(`ApiService:getProfile`)

    return await this.dispatchRequest(`/users/${userId}`, RequestEnum.TYPE.GET)
  }

  /*
   * Hashtags
   */
  static async getAllHashtags () {
    Debug.Log(`ApiService:getAllHashtags`)

    return await this.dispatchRequest('/hashtags', RequestEnum.TYPE.GET)
  }

  static async updateProfileHashtags (ids) {
    Debug.Log(`ApiService:requestUpdateProfile`)

    const data = {
      ids
    }

    return await this.dispatchRequest('/hashtags/update/user', RequestEnum.TYPE.POST, data)
  }

  /*
   * Stream
   */
  static async uploadSnap (snapObject, description, selectedHashtags, onProgress, afterSend) {
    Debug.Log(`ApiService:uploadSnap`)

    const hashtagsSlugs = selectedHashtags.map((hashtag) => hashtag.slug).join(',')

    console.log('upload payload:', snapObject.path, description, hashtagsSlugs)

    const body = new FormData()

    body.append('description', description)
    body.append('hashtags', hashtagsSlugs)
    body.append('file', {
      uri: snapObject.path,
      type: 'image/mov',
      name: 'file',
    })

    return await this.dispatchRequestWithProgress('/stream/upload/video', {body}, onProgress, afterSend)
  }

  static abortSnap () {
    this.abortDispatchedRequestWithProgress()
  }

  static async requestReactToVideo (userId, video, reactType) {
    Debug.Log(`ApiService:requestReactToVideo`)

    const {id: resourceId, user: {id: resourceOwnerUserId}} = video

    return await this.dispatchRequest(`/stream/${userId}/${resourceId}/${resourceOwnerUserId}/${reactType}`, RequestEnum.TYPE.POST)
  }

  static async fetchProducedResources (offset = 0, limit= 50) {
    Debug.Log(`ApiService:fetchProducedResources`)

    const producedResources = await this.dispatchRequest(`/stream/produce`, RequestEnum.TYPE.GET, {
      offset:0,
      limit:50
    })

    return producedResources.data
  }

  static async fetchProducedResourcesById (resourceId) {
    Debug.Log(`ApiService:fetchProducedResourcesById`)

    return await this.dispatchRequest(`/stream/produce/${resourceId}`, RequestEnum.TYPE.GET)
  }
}
