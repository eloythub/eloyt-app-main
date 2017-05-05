import * as LoginActionsConst from './LoginActionsConst';
import LocalStorage from '../../../Libraries/LocalStorage';

const DEFAULT_STATE = {
  accessToken: null,
  ssoUserData: null,
};

const LoginReducers = (state = DEFAULT_STATE, {type, data}) => {
  switch (type) {
    case LoginActionsConst.ON_FACEBOOK_LOGOUT_ACTION:
    case LoginActionsConst.ON_FACEBOOK_LOGIN_FAILED:
    case LoginActionsConst.ON_FACEBOOK_LOGIN_CANCELED:
    case LoginActionsConst.ON_SSO_LOGIN_FAILED:
      LocalStorage.unload(LoginActionsConst.ON_FACEBOOK_ACCESS_TOKEN);
      LocalStorage.unload(LoginActionsConst.ON_SSO_USER_DATA);

      return {
        ...state,
        accessToken: null,
        ssoUserData: null,
      };

    case LoginActionsConst.ON_FACEBOOK_LOGIN_SUCCEED:
      LocalStorage.save(LoginActionsConst.ON_FACEBOOK_ACCESS_TOKEN, data.response);

      return {
        ...state,
        accessToken: data.response,
      };

    case LoginActionsConst.ON_SSO_LOGIN_SUCCEED:
    case LoginActionsConst.ON_LOGIN_USER_LOGIN_DATA:
      LocalStorage.save(LoginActionsConst.ON_SSO_USER_DATA, data.ssoUserData);

      return {
        ...state,
        ssoUserData: data.ssoUserData,
      };

    default:
      return state;
  }
};

export default LoginReducers;
