import * as RecordActionsConst from './RecordActionsConst';

export const setUserLogin = (data) => {
  return (dispatch) => {
    const {ssoUserData} = data;

    dispatch({
      type: RecordActionsConst.ON_RECORD_USER_LOGIN_DATA,
      data: {
        ssoUserData,
      },
    });
  };
};
