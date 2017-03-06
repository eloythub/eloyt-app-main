import * as LoginActionsConst from './LoginActionsConst';

const DEFAULT_STATE = {
  accessToken: null,
};

const LoginReducers = (state = DEFAULT_STATE, {type, data}) => {
  switch (type) {
    case LoginActionsConst.ON_FACEBOOK_LOGOUT_ACTION:
      return {
        ...state,
        accessToken: null,
      };
    case LoginActionsConst.ON_FACEBOOK_LOGIN_SUCCEED:
      return {
        ...state,
        accessToken: data.response,
      };
    case LoginActionsConst.ON_FACEBOOK_LOGIN_FAILED:
      return {
        ...state,
        accessToken: null,
      };
    case LoginActionsConst.ON_FACEBOOK_LOGIN_CANCELED:
      return {
        ...state,
        accessToken: null,
      };
    default:
      return state;
  }
};

export default LoginReducers;
