import * as AreaOfInterestsActionsConst from './AreaOfInterestsActionsConst';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import LocalStorage from '../../../Libraries/LocalStorage';

const DEFAULT_STATE = {
  ssoUserData: null,
  waiting: true,
  selectedInterests: [],
};

const AreaOfInterestsReducers = (state = DEFAULT_STATE, {type, data}) => {
  switch (type) {
    case AreaOfInterestsActionsConst.ON_AREA_OF_INTERESTS_USER_LOGIN_DATA:
      if (data.ssoUserData) {
        LocalStorage.save(LoginActionsConst.ON_SSO_USER_DATA, data.ssoUserData);
      }

      return {
        ...state,
        ssoUserData: data.ssoUserData,
      };

    case AreaOfInterestsActionsConst.ON_AREA_OF_INTERESTS_SCENE_WAITING:
      return {
        ...state,
        waitingMain: data.waitingMain,
      };

    case AreaOfInterestsActionsConst.TOGGLE_INTEREST_ACTION:
      let selectedInterests = state.selectedInterests;

      if (data.selected) {
        if (selectedInterests.indexOf(data.hashtag) === -1) {
          selectedInterests.push(data.hashtag);
        }
      } else {
        if (selectedInterests.indexOf(data.hashtag) > -1) {
          selectedInterests.splice(selectedInterests.indexOf(data.hashtag), 1);
        }
      }

      return {
        ...state,
        selectedInterests,
      };

    case AreaOfInterestsActionsConst.SET_SELECTED_INTEREST:
      return {
        ...state,
        selectedInterests: data.hashtags,
      };

    default:
      return state;
  }
};

export default AreaOfInterestsReducers;
