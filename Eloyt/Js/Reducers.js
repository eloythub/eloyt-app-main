import { combineReducers } from 'redux';
// Import Components Scenes Reducers here
import Routes from './Routes';
import LoginReducers from './Components/Scenes/Login/LoginReducers';
import CompleteProfileReducers from './Components/Scenes/CompleteProfile/CompleteProfileReducers';
import AreaOfInterestsReducers from './Components/Scenes/AreaOfInterests/AreaOfInterestsReducers';
import HomeReducers from './Components/Scenes/Home/HomeReducers';
import RecordReducers from './Components/Scenes/Record/RecordReducers';

export default combineReducers({
  Routes,
  LoginReducers,
  CompleteProfileReducers,
  AreaOfInterestsReducers,
  HomeReducers,
  RecordReducers,
});
