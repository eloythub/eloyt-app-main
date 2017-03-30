import * as LoginActionsConst from './LoginActionsConst';

// Facebook
export const onFacebookLogOut = () => {
  return dispatch => dispatch({
    type: LoginActionsConst.ON_FACEBOOK_LOGOUT_ACTION,
  });
};

export const onFacebookLogIn = (type, response) => {
  return dispatch => dispatch({
    type,
    data: {
      response,
    },
  });
};

// Api
export const onApiLogIn = (type, ssoUserData) => {
  return (dispatch) => {
    dispatch({
      type,
      data: {
        ssoUserData,
      },
    });
  };
};

export const setUserLogin = (data) => {
  return (dispatch) => {
    const {ssoUserData} = data;

    dispatch({
      type: LoginActionsConst.ON_LOGIN_USER_LOGIN_DATA,
      data: {
        ssoUserData,
      },
    });
  };
};

export const waiting = (waiting) => {
  return (dispatch) => {
    dispatch({
      type: LoginActionsConst.ON_LOGIN_SCENE_WAITING,
      data: {
        waiting,
      },
    });
  };
};
