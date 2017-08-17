import * as UserProfileActionsConst from './UserProfileActionsConst';
import * as LoginActionsConst from '../Login/LoginActionsConst';

export const setUserLogin = (data) => {
  return (dispatch) => {
    const {ssoUserData} = data;

    dispatch({
      type: UserProfileActionsConst.ON_USER_PROFILE_USER_LOGIN_DATA,
      data: {
        ssoUserData,
      },
    });
  };
};

export const onFacebookLogOut = () => {
  return dispatch => dispatch({
    type: LoginActionsConst.ON_FACEBOOK_LOGOUT_ACTION,
  });
};

