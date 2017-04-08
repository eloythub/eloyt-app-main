import * as HomeActionsConst from './HomeActionsConst';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import LocalStorage from '../../../Libraries/LocalStorage';

const DEFAULT_STATE = {
  ssoUserData: null,
  producedData: null,
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

    case HomeActionsConst.ON_HOME_FETCH_PRODUCED_DATA_SUCCESS:
      return {
        ...state,
        producedData: data,
      };

    case HomeActionsConst.ON_HOME_FETCH_PRODUCED_DATA_FAIL:
      return {
        ...state,
        producedData: null,
      };

    default:
      return state;
  }
};

export default HomeReducers;
