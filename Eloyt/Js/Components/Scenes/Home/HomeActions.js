import * as HomeActionsConst from './HomeActionsConst';

export const setUserLogin = (data) => {
  return (dispatch) => {
    const {ssoUserData} = data;

    dispatch({
      type: HomeActionsConst.ON_HOME_USER_LOGIN_DATA,
      data: {
        ssoUserData,
      },
    });
  };
};

export const waiting = (waiting) => {
  return (dispatch) => {
    dispatch({
      type: HomeActionsConst.ON_HOME_SCENE_WAITING,
      data: {
        waiting,
      },
    });
  };
};
