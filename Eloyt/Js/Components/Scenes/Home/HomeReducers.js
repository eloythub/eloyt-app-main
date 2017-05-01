import * as HomeActionsConst from './HomeActionsConst';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import LocalStorage from '../../../Libraries/LocalStorage';

const DEFAULT_STATE = {
  ssoUserData: null,
  isTutorialWatched: null,
  producedData: [],
};

const HomeReducers = (state = DEFAULT_STATE, {type, data}) => {
  let producedData = state.producedData;

  switch (type) {
    case HomeActionsConst.ON_HOME_USER_LOGIN_DATA:
      if (state.ssoUserData !== data.ssoUserData) {
        LocalStorage.save(LoginActionsConst.ON_SSO_USER_DATA, data.ssoUserData);
      }

      return {
        ...state,
        ssoUserData: data.ssoUserData,
      };

    case HomeActionsConst.ON_HOME_IS_TUTORIAL_WATCHED:
      if (state.isTutorialWatched !== data.isTutorialWatched) {
        LocalStorage.save(HomeActionsConst.ON_HOME_IS_TUTORIAL_WATCHED, data.isTutorialWatched);
      }

      return {
        ...state,
        isTutorialWatched: data.isTutorialWatched,
      };

    case HomeActionsConst.ON_HOME_FETCH_PRODUCED_DATA_SUCCESS:
      producedData = data.reverse().concat(producedData);

      return {
        ...state,
        producedData,
      };

    case HomeActionsConst.ON_HOME_FETCH_PRODUCED_DATA_FAIL:
      return {
        ...state,
        producedData: null,
      };

    case HomeActionsConst.ON_HOME_VIDEO_LIKE_SUCCESS:
      producedData.splice(-1, 1);

      return {
        ...state,
        producedData,
      };

    case HomeActionsConst.ON_HOME_VIDEO_SKIP_SUCCESS:
      producedData.splice(-1, 1);

      return {
        ...state,
        producedData,
      };

    case HomeActionsConst.ON_HOME_SCENE_WAITING:
      return {
        ...state,
        waiting: data.waiting,
      };

    default:
      return state;
  }
};

export default HomeReducers;
