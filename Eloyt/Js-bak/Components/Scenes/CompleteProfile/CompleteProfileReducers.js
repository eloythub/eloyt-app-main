import * as CompleteProfileActionsConst from './CompleteProfileActionsConst';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import LocalStorage from '../../../Libraries/LocalStorage';

const DEFAULT_STATE = {
  ssoUserData: null,
  waiting: true,
};

const CompleteProfileReducers = (state = DEFAULT_STATE, {type, data}) => {
  switch (type) {
    case CompleteProfileActionsConst.ON_COMPLETE_PROFILE_USER_LOGIN_DATA:
      if (data.ssoUserData) {
        LocalStorage.save(LoginActionsConst.ON_SSO_USER_DATA, data.ssoUserData);
      }

      return {
        ...state,
        ssoUserData: data.ssoUserData,
      };

    case CompleteProfileActionsConst.ON_COMPLETE_PROFILE_SCENE_WAITING:
      return {
        ...state,
        waitingMain: data.waitingMain,
      };

    default:
      return state;
  }
};

export default CompleteProfileReducers;
