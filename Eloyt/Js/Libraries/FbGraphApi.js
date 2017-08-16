import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { apiEnv, apiBaseUrl } from '../../app.json';

export const RequestMethodType = {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
  put: 'PUT',
  patch: 'PATCH',
};

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
];

const {log} = console

export default class FbGraphApi {
  static getProfileData(accessToken) {
    log(`FbGraphApi:getProfileData`)

    return new Promise((fulfill, reject) => {
      const infoRequest = new GraphRequest(
        `/me?fields=${fields.join(',')}`,
        {
          version: 'v2.8',
          accessToken: accessToken,
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          fulfill(result);
        },
      );

      new GraphRequestManager().addRequest(infoRequest).start();
    });
  }

  static getProfileId(accessToken) {
    log(`FbGraphApi:getProfileId`)

    return new Promise((fulfill, reject) => {
      const infoRequest = new GraphRequest(
        `/me?fields=id`,
        {
          version: 'v2.8',
          accessToken: accessToken,
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          fulfill(result.id);
        },
      );

      new GraphRequestManager().addRequest(infoRequest).start();
    });
  }
}
