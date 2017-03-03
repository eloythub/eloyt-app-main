import * as LoginActionsConst from './LoginActionsConst';

const DEFAULT_STATE = {
  count: 0,
};

const LoginReducers = (state = DEFAULT_STATE, {type, payload, data}) => {
  switch (type) {
    case LoginActionsConst.LOGIN_SUCCESS:
      console.log(state);
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};

export default LoginReducers;
