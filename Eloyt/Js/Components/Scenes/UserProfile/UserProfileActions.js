import * as UserProfileActionsConst from './UserProfileActionsConst';
import Api from '../../../Libraries/Api';

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
