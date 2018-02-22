import { combineReducers } from 'redux'
// Import Components Scenes Reducers here
import Routes from './Routes'
import LoginReducers from './Components/Scenes/Login/LoginReducers'
import CompleteProfileReducers from './Components/Scenes/CompleteProfile/CompleteProfileReducers'
import AreaOfInterestsReducers from './Components/Scenes/AreaOfInterests/AreaOfInterestsReducers'
import HomeReducers from './Components/Scenes/Home/HomeReducers'
import RecordReducers from './Components/Scenes/Record/RecordReducers'
import PostingReducers from './Components/Scenes/Posting/PostingReducers'
import UserProfileReducers from './Components/Scenes/UserProfile/UserProfileReducers'

export default combineReducers({
  Routes,
  LoginReducers,
  CompleteProfileReducers,
  AreaOfInterestsReducers,
  HomeReducers,
  RecordReducers,
  PostingReducers,
  UserProfileReducers
})
