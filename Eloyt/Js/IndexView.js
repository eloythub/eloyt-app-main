import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import Reducers from './Reducers';
// Import Components Scenes Here
import ConnectedLoginScene, { LoginSceneKey, LoginSceneTitle } from './Components/Scenes/Login/LoginScene';
import ConnectedCompleteProfileScene, {
  CompleteProfileSceneKey,
  CompleteProfileSceneTitle,
} from './Components/Scenes/CompleteProfile/CompleteProfileScene';
import ConnectedAreaOfInterestsScene, {
  AreaOfInterestsSceneKey,
  AreaOfInterestsSceneTitle,
} from './Components/Scenes/AreaOfInterests/AreaOfInterestsScene';

const Scenes = Actions.create(
  <Scene key="root">
    <Scene
      hideNavBar={true}
      title={LoginSceneTitle}
      key={LoginSceneKey}
      component={ConnectedLoginScene}
      initial
    />
    <Scene
      hideNavBar={true}
      title={CompleteProfileSceneTitle}
      key={CompleteProfileSceneKey}
      component={ConnectedCompleteProfileScene}
      type={ActionConst.POP_AND_REPLACE}
    />
    <Scene
      hideNavBar={true}
      title={AreaOfInterestsSceneTitle}
      key={AreaOfInterestsSceneKey}
      component={ConnectedAreaOfInterestsScene}
      type={ActionConst.POP_AND_REPLACE}
    />
  </Scene>
);

const ConnectedRouter = connect()(Router);
const store           = compose(
  applyMiddleware(thunk)
)(createStore)(Reducers);

export default class IndexView extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter scenes={Scenes}/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Eloyt', () => IndexView);
