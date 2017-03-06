import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginActions from './LoginActions';
import TermsAndConditionLink from '../../Misc/TermsAndConditionLink';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import * as LoginActionsConst from './LoginActionsConst';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

class LoginScene extends Component {
  componentDidMount() {
    const {loginActions} = this.props;

    AccessToken.getCurrentAccessToken().then(
      (data) => {
        if (data) {
          loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_SUCCEED, data.accessToken.toString());
        }
      }
    );
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  onLoginFinished(error, result) {
    const {loginActions} = this.props;

    if (error) {
      loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_FAILED, result.error);
    }

    if (result.isCancelled) {
      loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_CANCELED);
    }

    AccessToken.getCurrentAccessToken().then(
      (data) => {
        loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_SUCCEED, data.accessToken.toString());
      }
    );
  }

  render() {
    //const {routes}       = this.context;
    const {loginActions} = this.props;

    return (
      <View style={styles.rootContainer}>
        <LoginButton
          publishPermissions={['publish_actions']}
          onLoginFinished={this.onLoginFinished.bind(this)}
          onLogoutFinished={loginActions.onFacebookLogOut}/>
        <Text>token: {this.props.accessToken}</Text>

        <TermsAndConditionLink />
      </View>
    );
  }
}

LoginScene.propTypes = {
  loginActions: PropTypes.object,
  accessToken: PropTypes.string,
};

const mapStateToProps = (state) => {
  const {LoginReducers} = state;

  return LoginReducers;
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginActions: bindActionCreators(LoginActions, dispatch),
  };
};

const ConnectedLoginScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScene);

export const LoginSceneKey   = 'login';
export const LoginSceneTitle = 'login';

export default ConnectedLoginScene;
