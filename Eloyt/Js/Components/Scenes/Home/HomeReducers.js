import * as HomeActionsConst from './HomeActionsConst';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import LocalStorage from '../../../Libraries/LocalStorage';

const DEFAULT_STATE = {
  ssoUserData: null,
  waiting: true,
};

const HomeReducers = (state = DEFAULT_STATE, {type, data}) => {
  switch (type) {
    case HomeActionsConst.ON_HOME_USER_LOGIN_DATA:
      if (data.ssoUserData) {
        LocalStorage.save(LoginActionsConst.ON_SSO_USER_DATA, data.ssoUserData);
      }

      return {
        ...state,
        ssoUserData: data.ssoUserData,
      };

    case HomeActionsConst.ON_HOME_SCENE_WAITING:
      return {
        ...state,
        waiting: data.waiting,
      };

    default:
      return state;
  }
};

export default HomeReducers;
