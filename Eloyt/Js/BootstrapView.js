import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Scene, Actions } from 'react-native-router-flux';
import reducers from 'Eloyt/Js/Reducers';
// Import Components Scenes Here
import LoginScene, { LoginSceneKey } from 'Eloyt/Js/Components/Scenes/Login/LoginScene';

// Connect Components Scenes Here
const connectedLoginScene = connect()(LoginScene);

// Aggregate Scenes Here
const scenes = Actions.create(
  <Scene key="root">
    <Scene key={LoginSceneKey} component={connectedLoginScene}/>
  </Scene>
);

const connectedRouter = connect()(Router);
const middleware      = [];
const store           = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);

export default class BootstrapView extends Component {
  render() {
    return (
      <Provider store={store}>
        <connectedRouter scenes={scenes}/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Eloyt', () => BootstrapView);