import LocalStorage from './localStorage'

export default class Service {
  static requestMethods = {
    get: 'GET',
    post: 'POST',
    delete: 'DELETE',
    put: 'PUT',
    patch: 'PATCH',
  }

  static async request (method, url, data, extraHeaders) {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...extraHeaders
    }

    try {
      const authentication = await LocalStorage.load(LocalStorage.keys.authentication)

      headers = Object.assign({
        'authorization': `bearer ${authentication['access_token']}`
      }, headers)
    } catch (err) {
    }

    const body = JSON.stringify(data)

    return new Promise(async (fulfill, reject) => {
      try {
        let success = true

        let response = await fetch(this.url(
          url,
          method === Service.requestMethods.get ? data : null
        ), {
          headers,
          method: method,
          body: method !== Service.requestMethods.get ? body : null,
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

  static url (url, query) {
    if (query) {
      query = Object.keys(query)
        .map((key) => {
          return `${esc(key)}=${esc(query[key])}`
        })
        .join('&')

      return `${url}?${query}`
    }

    return url
  }

  static async getRequest (url, data, headers) {
    return await this.request(Service.requestMethods.get, url, data, headers)
  }

  static async postRequest (url, data, headers) {
    return await this.request(Service.requestMethods.post, url, data, headers)
  }
}
