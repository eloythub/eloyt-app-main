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

      this.xhrRequestWithProgress = new XMLHttpRequest()

      this.xhrRequestWithProgress.open(RequestEnum.TYPE.POST, this.url(url))

      for (let k in opts.headers || {}) {
        this.xhrRequestWithProgress.setRequestHeader(k, opts.headers[k])
      }

      if (authenticationToken) {
        this.xhrRequestWithProgress.setRequestHeader('authorization', `bearer ${authenticationToken}`)
      }

      this.xhrRequestWithProgress.onload = (e) => {
        const response = e.target

        if (response.status !== 200) {
          return reject(response.status)
        }

        fulfill(e.target)
      }

      this.xhrRequestWithProgress.onerror = reject

      if (this.xhrRequestWithProgress.upload && onProgress) {
        this.xhrRequestWithProgress.upload.onprogress = onProgress // event.loaded / event.total * 100 ; //event.lengthComputable
      }

      this.xhrRequestWithProgress.send(opts.body)

      if (afterSend) {
        afterSend(this.xhrRequestWithProgress)
      }
    })
  }

  static abortRequestWithProgress () {
    if (this.xhrRequestWithProgress) {
      this.xhrRequestWithProgress.abort()
    }
  }

  static dispatchCancelableRequest (url, method, opts = {}, afterSend) {
    Debug.Log(`RequestService:dispatchRequestWithProgress`)

    return new Promise(async (fulfill, reject) => {
      let authenticationToken

      try {
        authenticationToken = await LocalStorage.load(AuthEnum.LOGIN_API_ACCESS_TOKEN)
      } catch (err) {
      }

      this.xhrCancelableRequest = new XMLHttpRequest()

      this.xhrCancelableRequest.open(method, this.url(url, opts.query ? opts.query : null))

      if (opts.query) {
        delete opts.query
      }

      for (let k in opts.headers || {}) {
        this.xhrCancelableRequest.setRequestHeader(k, opts.headers[k])
      }

      if (authenticationToken) {
        this.xhrCancelableRequest.setRequestHeader('authorization', `bearer ${authenticationToken}`)
      }

      this.xhrCancelableRequest.onload = (e) => {
        const response = e.target

        if (response.status !== 200) {
          return reject(response.status)
        }

        fulfill(e.target)
      }

      this.xhrCancelableRequest.onerror = reject

      this.xhrCancelableRequest.send(opts.body)

      if (afterSend) {
        afterSend(this.xhrCancelableRequest)
      }
    })
  }

  static abortCancelableRequest () {
    if (this.xhrCancelableRequest) {
      this.xhrCancelableRequest.abort()
    }
  }

  static url (url, query) {
    Debug.Log(`RequestService:url`)

    let baseUrlObject

    switch (this.service) {
      case 'api':
        baseUrlObject = ConfigsEnum.API_BASE_URL
        break
      case 'com':
        baseUrlObject = ConfigsEnum.COM_BASE_URL
        break
    }

    if (query) {
      query = Object.keys(query)
        .map((key) => {
          return `${esc(key)}=${esc(query[key])}`
        })
        .join('&')

      return `${path.join(baseUrlObject[ConfigsEnum.NODE_ENV], url)}?${query}`
    }

    return path.join(baseUrlObject[ConfigsEnum.NODE_ENV], url)
  }
}
