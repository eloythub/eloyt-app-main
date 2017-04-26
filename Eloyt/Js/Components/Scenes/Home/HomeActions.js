import * as HomeActionsConst from './HomeActionsConst';
import Api from '../../../Libraries/Api';

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

export const fetchProducedResources = (args = {}) => {
  return (dispatch) => {
    return Api.fetchProducedResources(args)
      .then(
        (data) => dispatch({
          type: HomeActionsConst.ON_HOME_FETCH_PRODUCED_DATA_SUCCESS,
          data,
        }),
        (error) => dispatch({
          type: HomeActionsConst.ON_HOME_FETCH_PRODUCED_DATA_FAIL,
          error,
        })
      );
  };
};

export const likeVideo = (video) => {
  // TODO: Send request to the api for like

  return (dispatch) => dispatch({
    type: HomeActionsConst.ON_HOME_VIDEO_LIKE_SUCCESS,
    data: {video},
  });
};

export const skipVideo = (video) => {
  // TODO: Send request to the api for skip

  return (dispatch) => dispatch({
    type: HomeActionsConst.ON_HOME_VIDEO_SKIP_SUCCESS,
    data: {video},
  });
};
