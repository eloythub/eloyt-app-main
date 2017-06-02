import React, { Component, PropTypes } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Bars } from 'react-native-loader';
import * as UserProfileActions from './UserProfileActions';
import { styles } from './UserProfileStyles';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import * as UserProfileActionsConst from './UserProfileActionsConst';
import { Actions, ActionConst } from 'react-native-router-flux';
import { LoginManager } from 'react-native-fbsdk';
import LocalStorage from '../../../Libraries/LocalStorage';

class UserProfileScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refresh: null,
    };
  }

  componentDidMount() {
    const {userProfileActions} = this.props;

    LocalStorage.all([LoginActionsConst.ON_SSO_USER_DATA, UserProfileActionsConst.ON_USER_PROFILE_USER_LOGIN_DATA])
      .then(([ssoUserData, isTutorialWatched]) => {
        userProfileActions.setUserLogin({
          ssoUserData,
        });

        userProfileActions.setTutorialWatched({
          isTutorialWatched,
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
    return <View style={styles.rootMainPostContainer}>
    </View>;
  }

  handleLoading(show) {
    if (show) {
      return <View style={styles.loadingContainer}>
        <View style={styles.loading}>
          <Bars size={40} color="#ffffff"/>
        </View>
      </View>;
    }
  }

  render() {
    const {ssoUserData} = this.props;

    return <View style={styles.rootContainer}>
      <StatusBar
        backgroundColor={Platform.OS === 'ios' ? '#ffffff' : '#000000'}
        barStyle="light-content"
        hidden={false}/>
      {this.handleLoading(false)}
      <View style={styles.rootMainContainer}>
        {ssoUserData ? this.postRender() : null}
      </View>
    </View>;
  }
}

UserProfileScene.propTypes = {
  UserProfileReducers: PropTypes.object,
  userProfileActions: PropTypes.object,
  ssoUserData: PropTypes.object,
};

const mapStateToProps = (state) => {
  const {UserProfileReducers} = state;

  const {ssoUserData} = UserProfileReducers;

  return {
    UserProfileReducers,
    ssoUserData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userProfileActions: bindActionCreators(UserProfileActions, dispatch),
  };
};

const ConnectedUserProfileScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileScene);

export const UserProfileSceneKey   = 'profile';
export const UserProfileSceneTitle = 'Profile';

export default ConnectedUserProfileScene;
