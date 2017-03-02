import { ActionConst } from 'react-native-router-flux';

const DEFAULT_STATE = {scene: {}};

const Routes = (state = DEFAULT_STATE, {type, scene}) => {
  switch (type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionConst.FOCUS:
      return {
        ...state,
        scene,
      };
    default:
      return state;
  }
};

export default Routes;
