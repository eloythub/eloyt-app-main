import { Service } from 'react-eloyt'
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

export default class FacebookService extends Service {
  static getProfileData (accessToken) {
    log(`FacebookService:getProfileData`)

    return new Promise((fulfill, reject) => {
      const fields = [
        'id',
        'email',
        'name',
        'gender',
        'first_name',
        'last_name',
        'friends',
        'picture',
        'about',
        'birthday',
        'likes',
        'location',
      ]

      const infoRequest = new GraphRequest(
        `/me?fields=${fields.join(',')}`,
        {
          version: 'v2.8',
          accessToken: accessToken,
        },
        (error, result) => {
          if (error) {
            return reject(error)
          }

          fulfill(result)
        },
      )

      new GraphRequestManager().addRequest(infoRequest).start()
    })
  }
}
