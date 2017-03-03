import * as LoginActionsConst from './LoginActionsConst';

export const login = () => {
  return dispatch => dispatch({
    type: LoginActionsConst.LOGIN_SUCCESS,
  });
};
