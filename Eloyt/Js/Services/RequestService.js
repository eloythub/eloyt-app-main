import path from 'path'
import { Service } from 'react-eloyt'
import { Debug, LocalStorage } from '../Factories'
import { ConfigsEnum, AuthEnum } from '../Enums'

export default class RequestService extends Service {
  static async dispatchRequest (url, method, bodyData) {
    Debug.Log(`RequestService:dispatchRequest`)

    let authenticationToken

    try {
      authenticationToken = await LocalStorage.load(AuthEnum.LOGIN_API_ACCESS_TOKEN)
    } catch (err) {}

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': `bearer ${authenticationToken}`
    }

    return new Promise(async (fulfill, reject) => {
      try {
        let response = await fetch(this.url(url), {
          headers,
          method: method,
          body: JSON.stringify(bodyData),
        })

        if (!response.ok) {
          return reject(await response.json())
        }

        fulfill(await response.json())
      } catch (err) {
        reject(err)
      }
    })
  }

  static dispatchRequestWithProgress (url, opts = {}, onProgress, afterSend) {
    Debug.Log(`RequestService:dispatchRequestWithProgress`)

    return new Promise((fulfill, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.open(opts.method || 'get', this.url(url))

      for (let k in opts.headers || {}) {
        xhr.setRequestHeader(k, opts.headers[k])
      }

      xhr.onload = e => fulfill(e.target)

      xhr.onerror = reject

      if (xhr.upload && onProgress) {
        xhr.upload.onprogress = onProgress // event.loaded / event.total * 100 ; //event.lengthComputable
      }

      xhr.send(opts.body)

      afterSend(xhr)
    })
  }

  static url (url) {
    Debug.Log(`RequestService:url`)

    return path.join(ConfigsEnum.API_BASE_URL[ConfigsEnum.NODE_ENV], url)
  }
}
