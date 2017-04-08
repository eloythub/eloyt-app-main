import React, { Component, PropTypes } from 'react';
import { View, Text, Platform, StatusBar} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as HomeActions from './HomeActions';
import { styles } from './HomeStyles';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import { Actions, ActionConst } from 'react-native-router-flux';
import { LoginManager } from 'react-native-fbsdk';
import LocalStorage from '../../../Libraries/LocalStorage';
import VideoManager  from '../../../Components/Misc/Home/VideoManager';

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
    const {producedData} = this.props;

    return (
      <View style={styles.rootMainPostContainer}>
        <VideoManager
          {...this.props}
          {...{producedData}}
          styles={styles}/>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <StatusBar
          backgroundColor={Platform.OS === 'ios' ? '#ffffff' : '#000000'}
          barStyle="light-content"
          hidden={false}/>
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
  producedData: PropTypes.object,
};

const mapStateToProps = (state) => {
  const {HomeReducers} = state;

  const {ssoUserData} = HomeReducers;

  return {
    HomeReducers,
    ssoUserData,
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
