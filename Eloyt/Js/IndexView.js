import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Scene } from 'react-native-router-flux';
import Reducers from 'Eloyt/Js/Reducers';
// Import Components Scenes Here
import LoginScene, { LoginSceneKey, LoginSceneTitle } from 'Eloyt/Js/Components/Scenes/Login/LoginScene';

// Connect Components Scenes Here
const ConnectedLoginScene = connect()(LoginScene);

const ConnectedRouter = connect()(Router);
const middleware      = [];
const store           = compose(
  applyMiddleware(...middleware)
)(createStore)(Reducers);

export default class IndexView extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter>

          <Scene key="root">
            <Scene
              title={LoginSceneTitle}
              key={LoginSceneKey}
              component={ConnectedLoginScene}
              initial
            />

          </Scene>
        </ConnectedRouter>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Eloyt', () => IndexView);