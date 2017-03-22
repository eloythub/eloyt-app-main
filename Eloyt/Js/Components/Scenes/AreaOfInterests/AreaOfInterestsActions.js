import * as AreaOfInterestsActionsConst from './AreaOfInterestsActionsConst';

export const toggleInterest = (data) => {
  return dispatch => dispatch({
    type: AreaOfInterestsActionsConst.TOGGLE_INTEREST_ACTION,
    data,
  });
};
