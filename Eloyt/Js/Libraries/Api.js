import { apiEnv, apiBaseUrl } from '../../app.json';

export const RequestMethodType = {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
  put: 'PUT',
  patch: 'PATCH',
};

class Api {
  request(url, method, bodyData) {
    return new Promise(async(fulfill, reject) => {
      await fetch(this.url(url), {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authentication': '', // TODO: implement this later for security
        },
        body: JSON.stringify(bodyData),
      })
        .then((response) => response.json())
        .then((responseData) => fulfill(responseData))
        .catch((error) => reject(error.message));
    });
  }

  postWithProgress(url, opts = {}, onProgress, afterSend) {
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

  url(url) {
    return apiBaseUrl[apiEnv] + url;
  }

  resourceStreamUrl(userId, resourceType, resourceId) {
    return this.url(`/stream/${userId}/${resourceType}/${resourceId}`);
  }
}

export default new Api;
