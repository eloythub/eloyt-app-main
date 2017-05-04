import * as PostingActionsConst from './PostingActionsConst';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import LocalStorage from '../../../Libraries/LocalStorage';

const DEFAULT_STATE = {
  ssoUserData: null,
};

const PostingReducers = (state = DEFAULT_STATE, {type, data}) => {
  switch (type) {
    case PostingActionsConst.ON_POSTING_USER_LOGIN_DATA:
      if (data.ssoUserData) {
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

export default PostingReducers;
