import * as LoginActionsConst from './LoginActionsConst';
import LocalStorage from '../../../Libraries/LocalStorage';

const DEFAULT_STATE = {
  accessToken: null,
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
        apiUser: null,
      };

    case LoginActionsConst.ON_FACEBOOK_LOGIN_SUCCEED:
      LocalStorage.save(LoginActionsConst.ON_FACEBOOK_ACCESS_TOKEN, data.response);

      return {
        ...state,
        accessToken: data.response,
      };

    case LoginActionsConst.ON_SSO_LOGIN_SUCCEED:
      LocalStorage.save(LoginActionsConst.ON_SSO_USER_DATA, data.apiUser);

      return {
        ...state,
        apiUser: data.apiUser,
      };

    default:
      return state;
  }
};

export default LoginReducers;
