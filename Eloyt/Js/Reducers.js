import { combineReducers } from 'redux';
// Import Components Scenes Reducers here
import Routes from './Routes';
import LoginReducer from './Components/Scenes/Login/LoginReducer';

const Reducers = combineReducers({
  Routes,
  LoginReducer,
});

export default Reducers;

export const getRouters      = ({Routes}) => Routes;
export const getLoginReducer = ({LoginReducer}) => LoginReducer;
