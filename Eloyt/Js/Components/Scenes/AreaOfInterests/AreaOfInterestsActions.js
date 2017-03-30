import * as AreaOfInterestsActionsConst from './AreaOfInterestsActionsConst';

export const setUserLogin = (data) => {
  return (dispatch) => {
    const {ssoUserData} = data;

    dispatch({
      type: AreaOfInterestsActionsConst.ON_AREA_OF_INTERESTS_USER_LOGIN_DATA,
      data: {
        ssoUserData,
      },
    });
  };
};

export const waiting = (waiting) => {
  return (dispatch) => {
    dispatch({
      type: AreaOfInterestsActionsConst.ON_AREA_OF_INTERESTS_SCENE_WAITING,
      data: {
        waiting,
      },
    });
  };
};

export const toggleInterest = (data) => {
  return dispatch => dispatch({
    type: AreaOfInterestsActionsConst.TOGGLE_INTEREST_ACTION,
    data,
  });
};

export const setSelectedInterest = (hashtags) => {
  return dispatch => dispatch({
    type: AreaOfInterestsActionsConst.SET_SELECTED_INTEREST,
    data: {
      hashtags,
    },
  });
};
