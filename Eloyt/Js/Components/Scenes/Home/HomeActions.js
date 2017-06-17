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

export const setTutorialWatched = (data) => {
  return (dispatch) => {
    const {isTutorialWatched} = data;

    dispatch({
      type: HomeActionsConst.ON_HOME_IS_TUTORIAL_WATCHED,
      data: {
        isTutorialWatched,
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

export const newVideoUploaded = (uploadedVideoData) => {
  return (dispatch) => dispatch({
    type: HomeActionsConst.ON_HOME_NEW_VIDEO_UPLOADED_SUCCESS,
    data: {uploadedVideoData},
  });
};

export const likeVideo = (userId, video) => {
  return (dispatch) => dispatch({
    type: HomeActionsConst.ON_HOME_VIDEO_LIKE_SUCCESS,
    data: {video},
  });
};

export const dislikeVideo = (userId, video) => {
  return (dispatch) => dispatch({
    type: HomeActionsConst.ON_HOME_VIDEO_DISLIKE_SUCCESS,
    data: {video},
  });
};

export const skipVideo = (userId, video) => {
  return (dispatch) => dispatch({
    type: HomeActionsConst.ON_HOME_VIDEO_SKIP_SUCCESS,
    data: {video},
  });
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
