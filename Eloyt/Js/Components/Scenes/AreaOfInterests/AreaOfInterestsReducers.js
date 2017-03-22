import * as AreaOfInterestsActionsConst from './AreaOfInterestsActionsConst';

const DEFAULT_STATE = {
  selectedInterests: [],
};

const AreaOfInterestsReducers = (state = DEFAULT_STATE, {type, data}) => {
  switch (type) {
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

    default:
      return state;
  }
};

export default AreaOfInterestsReducers;
