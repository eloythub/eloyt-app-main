import * as LoginActionsConst from './LoginActionsConst';
import LocalStorage from '../../../Libraries/LocalStorage';
import FbGraphApi from '../../../Libraries/FbGraphApi';

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
export const onApiLogIn = (type, apiUser) => {
  return (dispatch) => {
      dispatch({
        type,
        data: {
          apiUser,
        },
      });
  };
};
