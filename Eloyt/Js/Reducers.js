import { combineReducers } from 'redux';
// Import Components Scenes Reducers here
import Routes from './Routes';
import LoginReducers from './Components/Scenes/Login/LoginReducers';

export default combineReducers({
  Routes,
  LoginReducers,
});
