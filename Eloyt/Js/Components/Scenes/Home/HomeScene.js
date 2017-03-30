import React, { Component, PropTypes } from 'react';
import { View, Text, Image, Platform, TouchableOpacity, StatusBar, ScrollView, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as HomeActions from './HomeActions';
import { styles } from './HomeStyles';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import fluidBackground from '../../../../Assets/Images/fluid-background.jpg';
import { Actions, ActionConst } from 'react-native-router-flux';
import { LoginManager } from 'react-native-fbsdk';
import LocalStorage from '../../../Libraries/LocalStorage';
import Utils from '../../../Libraries/Utils';
import Api from '../../../Libraries/Api';

class HomeScene extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {homeActions} = this.props;

    LocalStorage.load(LoginActionsConst.ON_SSO_USER_DATA)
      .then((ssoUserData) => {
        homeActions.setUserLogin({
          ssoUserData,
        });

        homeActions.waiting(false);
      })
      .catch(() => {
        LoginManager.logOut();

        Actions.login({
          type: ActionConst.REPLACE,
        });
      });
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  postRender() {
    return (
      <View style={styles.rootMainPostContainer}>
        <Text>Home Page</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <StatusBar
          backgroundColor={Platform.OS === 'ios' ? '#ffffff' : '#000000'}
          barStyle="light-content"
          hidden={false}
        />
        <Image source={fluidBackground} style={styles.backgroundImage}/>
        <Spinner visible={this.props.waiting}/>
        <View style={styles.rootMainContainer}>
          {this.props.ssoUserData ? this.postRender() : null}
        </View>
      </View>
    );
  }
}

HomeScene.propTypes = {
  HomeReducers: PropTypes.object,
  homeActions: PropTypes.object,
  ssoUserData: PropTypes.object,
  waiting: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {HomeReducers} = state;

  const {ssoUserData, waiting} = HomeReducers;

  return {
    HomeReducers,
    ssoUserData,
    waiting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    homeActions: bindActionCreators(HomeActions, dispatch),
  };
};

const ConnectedHomeScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScene);

export const HomeSceneKey   = 'home';
export const HomeSceneTitle = 'Home';

export default ConnectedHomeScene;
