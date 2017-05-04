import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Navigator } from 'react-native';
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
import ConnectedHomeScene, { HomeSceneKey, HomeSceneTitle } from './Components/Scenes/Home/HomeScene';
import ConnectedRecordScene, { RecordSceneKey, RecordSceneTitle } from './Components/Scenes/Record/RecordScene';
import ConnectedPostingScene, { PostingSceneKey, PostingSceneTitle } from './Components/Scenes/Posting/PostingScene';

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
    <Scene
      hideNavBar={true}
      title={HomeSceneTitle}
      key={HomeSceneKey}
      component={ConnectedHomeScene}
      type={ActionConst.POP_AND_REPLACE}
    />
    <Scene
      hideNavBar={true}
      title={RecordSceneTitle}
      key={RecordSceneKey}
      component={ConnectedRecordScene}
      type={ActionConst.PUSH_OR_POP}
      direction="horizontal"
      duration={300}
    />
    <Scene
      hideNavBar={true}
      title={PostingSceneTitle}
      key={PostingSceneKey}
      component={ConnectedPostingScene}
      type={ActionConst.PUSH_OR_POP}
      direction="horizontal"
      duration={300}
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
      <View style={styles.appContainer}>
        <Provider store={store}>
          <ConnectedRouter scenes={Scenes}/>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

AppRegistry.registerComponent('Eloyt', () => IndexView);
