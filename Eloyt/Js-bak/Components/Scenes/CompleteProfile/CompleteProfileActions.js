import * as CompleteProfileActionsConst from './CompleteProfileActionsConst';

export const setUserLogin = (data) => {
  return (dispatch) => {
    const {ssoUserData} = data;

    dispatch({
      type: CompleteProfileActionsConst.ON_COMPLETE_PROFILE_USER_LOGIN_DATA,
      data: {
        ssoUserData,
      },
    });
  };
};

export const waiting = (waiting) => {
  return (dispatch) => {
    dispatch({
      type: CompleteProfileActionsConst.ON_COMPLETE_PROFILE_SCENE_WAITING,
      data: {
        waitingMain,
      },
    });
  };
};
