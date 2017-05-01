import { apiEnv, apiBaseUrl } from '../../app.json';

export const RequestMethodType = {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
  put: 'PUT',
  patch: 'PATCH',
};

export default class Api {
  static request(url, method, bodyData) {
    return new Promise(async(fulfill, reject) => {
      await fetch(this.url(url), {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          //'Authentication': '', // TODO: implement this later for security
        },
        body: JSON.stringify(bodyData),
      })
        .then((response) => response.json())
        .then((responseData) => fulfill(responseData))
        .catch((error) => reject(error.message));
    });
  }

  static postWithProgress(url, opts = {}, onProgress, afterSend) {
    return new Promise((fulfill, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(opts.method || 'get', this.url(url));

      for (let k in opts.headers || {}) {
        xhr.setRequestHeader(k, opts.headers[k]);
      }

      xhr.onload = e => fulfill(e.target);

      xhr.onerror = reject;

      if (xhr.upload && onProgress) {
        xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
      }

      xhr.send(opts.body);

      afterSend(xhr);
    });
  }

  static url(url) {
    return apiBaseUrl[apiEnv] + url;
  }

  static resourceStreamUrl(userId, resourceType, resourceId) {
    return this.url(`/stream/${userId}/${resourceType}/${resourceId}`);
  }

  static requestSsoLogin(token, userId) {
    const data = {
      credentials: {
        token,
        userId,
      },
    };

    return new Promise(async(fulfill, reject) => {
      return this.request('/users/create-or-get', RequestMethodType.put, data)
        .then((res) => fulfill(res))
        .catch((error) => reject(error));
    });
  }

  static getProfileAvatar(userId, avatarResourceId) {
    return this.resourceStreamUrl(userId, 'avatar', avatarResourceId);
  }

  static requestUpdateProfile(userId, attributes) {
    const data = {
      credentials: {
        userId,
        attributes,
      },
    };

    return new Promise(async(fulfill, reject) => {
      return this.request('/users/profile-update', RequestMethodType.post, data)
        .then((res) => fulfill(res))
        .catch((error) => reject(error));
    });
  }

  static fetchProducedResources(userId, offset = 20) {
    return new Promise(async(fulfill, reject) => {
      return this.request(`/stream/produce/${userId}/${offset}`, RequestMethodType.get)
        .then(
          (res) => {
            if (res.statusCode !== 200) {
              return reject(res);
            }

            fulfill(res.data);
          },
          (error) => reject(error)
        );
    });
  }
}
