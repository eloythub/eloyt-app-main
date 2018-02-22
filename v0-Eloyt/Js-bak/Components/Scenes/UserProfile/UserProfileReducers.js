import * as UserProfileActionsConst from './UserProfileActionsConst';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import LocalStorage from '../../../Libraries/LocalStorage';

const DEFAULT_STATE = {
  ssoUserData: null,
};

const UserProfileReducers = (state = DEFAULT_STATE, {type, data}) => {
  switch (type) {
    case UserProfileActionsConst.ON_USER_PROFILE_USER_LOGIN_DATA:
      if (state.ssoUserData !== data.ssoUserData) {
        LocalStorage.save(LoginActionsConst.ON_SSO_USER_DATA, data.ssoUserData);
      }

      return {
        ...state,
        ssoUserData: data.ssoUserData,
      };

    default:
      return state;
  }
};

export default UserProfileReducers;
