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
      LocalStorage.unload(LoginActionsConst.ON_FACEBOOK_LOGIN_SUCCEED);

      return {
        ...state,
        accessToken: null,
      };

    case LoginActionsConst.ON_FACEBOOK_LOGIN_SUCCEED:
      LocalStorage.save(LoginActionsConst.ON_FACEBOOK_LOGIN_SUCCEED, data.response);

      return {
        ...state,
        accessToken: data.response,
      };

    default:
      LocalStorage.load(LoginActionsConst.ON_FACEBOOK_LOGIN_SUCCEED).then((accessTokenData) => {
        //console.log(accessTokenData);
      });

      return state;
  }
};

export default LoginReducers;
