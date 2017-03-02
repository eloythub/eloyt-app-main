import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Scene, Actions } from 'react-native-router-flux';
import Reducers from './Reducers';
// Import Components Scenes Here
import LoginScene, { LoginSceneKey, LoginSceneTitle } from './Components/Scenes/Login/LoginScene';

// Connect Components Scenes Here
const ConnectedLoginScene = connect()(LoginScene);

const Scenes = Actions.create(
  <Scene key="root">
    <Scene
      hideNavBar={true}
      title={LoginSceneTitle}
      key={LoginSceneKey}
      component={ConnectedLoginScene}
      initial
    />
  </Scene>
);

const ConnectedRouter = connect()(Router);
const middleware      = [];
const store           = compose(
  applyMiddleware(...middleware)
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