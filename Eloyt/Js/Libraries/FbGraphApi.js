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

class FbGraphApi {
  request() {
    const infoRequest = new GraphRequest(
      `/me?fields=${fields.join(',')}`,
      {
        version: 'v2.8',
        accessToken: this.accessToken,
      },
      (error, result) => {
        if (error) {
          console.log('Error fetching data: ', error);
        } else {
          console.log('Success fetching data: ', result);
        }
      },
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  }
}

export default new FbGraphApi;
