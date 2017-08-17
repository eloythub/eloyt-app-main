import * as PostingActionsConst from './PostingActionsConst';

export const setUserLogin = (data) => {
  return (dispatch) => {
    const {ssoUserData} = data;

    dispatch({
      type: PostingActionsConst.ON_POSTING_USER_LOGIN_DATA,
      data: {
        ssoUserData,
      },
    });
  };
};
