import path from 'path'
import { Service } from 'react-eloyt'
import { Debug, LocalStorage } from '../Factories'
import { AuthEnum, ConfigsEnum, RequestEnum } from '../Enums'

const esc = encodeURIComponent

export default class RequestService extends Service {
  static xhr = null

  static async dispatchRequest (url, method, data) {
    Debug.Log(`RequestService:dispatchRequest > ${url}`)

    let authenticationToken

    try {
      authenticationToken = await LocalStorage.load(AuthEnum.LOGIN_API_ACCESS_TOKEN)
    } catch (err) {
    }

    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }

    if (authenticationToken) {
      headers = Object.assign({
        'authorization': `bearer ${authenticationToken}`
      }, headers)
    }

    const body = JSON.stringify(data)

    return new Promise(async (fulfill, reject) => {
      try {
        let success = true

        let response = await fetch(this.url(
          url,
          method === RequestEnum.TYPE.GET ? data : null
        ), {
          headers,
          method: method,
          body: method !== RequestEnum.TYPE.GET ? body : null,
        }).then(async (res) => {
          if (!res.ok) {
            success = false
          }

          return await res.json()
        })

        success ? fulfill(response) : reject(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  static dispatchRequestWithProgress (url, opts = {}, onProgress, afterSend) {
    Debug.Log(`RequestService:dispatchRequestWithProgress`)

    return new Promise(async (fulfill, reject) => {
      let authenticationToken

      try {
        authenticationToken = await LocalStorage.load(AuthEnum.LOGIN_API_ACCESS_TOKEN)
      } catch (err) {
      }

      this.xhr = new XMLHttpRequest()

      this.xhr.open(RequestEnum.TYPE.POST, this.url(url))

      for (let k in opts.headers || {}) {
        this.xhr.setRequestHeader(k, opts.headers[k])
      }

      if (authenticationToken) {
        this.xhr.setRequestHeader('authorization', `bearer ${authenticationToken}`)
      }

      this.xhr.onload = (e) => {
        const response = e.target

        if (response.status !== 200) {
          return reject(response.status)
        }

        fulfill(e.target)
      }

      this.xhr.onerror = reject

      if (this.xhr.upload && onProgress) {
        this.xhr.upload.onprogress = onProgress // event.loaded / event.total * 100 ; //event.lengthComputable
      }

      this.xhr.send(opts.body)

      if (afterSend) {
        afterSend(this.xhr)
      }
    })
  }

  static abortDispatchedRequestWithProgress () {
    if (this.xhr) {
      this.xhr.abort()
    }
  }

  static url (url, query) {
    Debug.Log(`RequestService:url`)

    if (query) {
      query = Object.keys(query)
        .map((key) => {
          return `${esc(key)}=${esc(query[key])}`
        })
        .join('&')

      return `${path.join(ConfigsEnum.API_BASE_URL[ConfigsEnum.NODE_ENV], url)}?${query}`
    }

    return path.join(ConfigsEnum.API_BASE_URL[ConfigsEnum.NODE_ENV], url)
  }
}
