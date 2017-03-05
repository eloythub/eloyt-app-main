import * as LoginActionsConst from './LoginActionsConst';

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
