import { apiBaseUrl, apiEnv } from '../../app.json'

export const RequestMethodType = {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
  put: 'PUT',
  patch: 'PATCH',
};

const {log} = console

export default class Api {
  static request(url, method, bodyData) {
    log(`Api:request`)

    return new Promise(async(fulfill, reject) => {
      try {
        let response = await fetch(this.url(url), {
          method: method,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authentication': '', // TODO: implement this later for security
          },
          body: JSON.stringify(bodyData),
        })

        if (!response.ok) {
          return reject(await response.json())
        }

        fulfill(await response.json())
      } catch(err) {
        reject(err)
      }
    });
  }

  static postWithProgress(url, opts = {}, onProgress, afterSend) {
    log(`Api:postWithProgress`)

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
    log(`Api:url`)

    return apiBaseUrl[apiEnv] + url;
  }

  static resourceStreamUrl(userId, resourceType, resourceId) {
    log(`Api:resourceStreamUrl`)

    return this.url(`/stream/${userId}/${resourceType}/${resourceId}`);
  }

  static requestSsoLogin(accessToken, facebookUserId) {
    log(`Api:requestSsoLogin`)

    const data = {
      accessToken,
      facebookUserId,
    };

    return new Promise(async(fulfill, reject) => {
      return this.request('/users/create-or-get', RequestMethodType.put, data)
        .then((res) => fulfill(res))
        .catch((error) => reject(error));
    });
  }

  static getProfileAvatar(userId, avatarResourceId) {
    log(`Api:getProfileAvatar`)

    return this.resourceStreamUrl(userId, 'avatar', avatarResourceId);
  }

  static requestUpdateProfile(userId, attributes) {
    log(`Api:requestUpdateProfile`)

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

  static requestGetProfile(userId) {
    log(`Api:requestGetProfile`)

    return new Promise(async(fulfill, reject) => {
      return this.request(`/users/${userId}`, RequestMethodType.get)
        .then((res) => fulfill(res))
        .catch((error) => reject(error));
    });
  }

  static requestReactToVideo(userId, video, reactType) {
    log(`Api:requestReactToVideo`)

    const {id: resourceId, user: {id: resourceOwnerUserId}} = video;

    return new Promise((fulfill, reject) => {
      return this.request(`/stream/${userId}/${resourceId}/${resourceOwnerUserId}/${reactType}`, RequestMethodType.post)
        .then((res) => fulfill(res))
        .catch((error) => reject(error));
    });
  }

  static fetchProducedResources(userId, offset = 50) {
    log(`Api:fetchProducedResources`)

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

  static fetchProducedResourcesById(resourceId) {
    log(`Api:fetchProducedResourcesById`)

    return new Promise(async(fulfill, reject) => {
      return this.request(`/stream/produce/${resourceId}`, RequestMethodType.get)
        .then(
          (res) => {
            if (res.statusCode !== 200) {
              return reject(res);
            }

            return fulfill(res.data);
          },
          (error) => reject(error)
        );
    });
  }
}
