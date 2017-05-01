import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity, StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginActions from './LoginActions';
import TermsAndConditionLink from '../../Misc/TermsAndConditionLink';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import * as LoginActionsConst from './LoginActionsConst';
import { Row, Grid, Col } from 'react-native-easy-grid';
import fluidBackground from '../../../../Assets/Images/fluid-background.jpg';
import facebookLogo from '../../../../Assets/Images/facebook.png';
import pureLogo from '../../../../Assets/Images/pure-logo.png';
import { styles } from './LoginStyles';
import { Actions, ActionConst } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import FbGraphApi from '../../../Libraries/FbGraphApi';
import LocalStorage from '../../../Libraries/LocalStorage';
import Utils from '../../../Libraries/Utils';
import Api from '../../../Libraries/Api';
import Toast, { DURATION } from 'react-native-easy-toast';

const loginWithReadPermissions = [
  'public_profile',
  'email',
  'user_photos',
  'user_friends',
  'user_website',
  'user_about_me',
  'user_birthday',
  'user_likes',
  'user_location',
];

class LoginScene extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loginActions} = this.props;

    loginActions.waiting(true);

    LocalStorage.load(LoginActionsConst.ON_SSO_USER_DATA)
      .then((ssoData) => {
        if (!ssoData) {
          return loginActions.waiting(false);
        }

        AccessToken.getCurrentAccessToken().then(
          (data) => {
            if (!data) {
              return LoginManager.logInWithReadPermissions(loginWithReadPermissions)
                .then(
                  (result) => {
                    if (result.isCancelled) {
                      loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_CANCELED);

                      loginActions.waiting(false);

                      return;
                    }

                    this.doLogin();
                  },
                  (error) => {
                    loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_FAILED, error);

                    loginActions.waiting(false);
                  }
                )
                .catch(() => loginActions.waiting(false));
            }

            this.doLogin();
          })
          .catch(() => loginActions.waiting(false));
      })
      .catch(() => loginActions.waiting(false));

  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  doLogin() {
    const {loginActions} = this.props;

    loginActions.waiting(true);

    AccessToken.getCurrentAccessToken().then(
      (data) => {
        const accessToken = data.accessToken.toString();

        loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_SUCCEED, accessToken);


        FbGraphApi.getProfileId(accessToken)
          .then((fbUserId) => {
            Api.requestSsoLogin(accessToken, fbUserId)
              .then((ssoLoginResponse) => {
                loginActions.waiting(false);

                if (ssoLoginResponse.statusCode !== 200) {
                  return loginActions.onApiLogIn(LoginActionsConst.ON_SSO_LOGIN_FAILED);
                }

                const ssoUserData = ssoLoginResponse.data;

                loginActions.onApiLogIn(LoginActionsConst.ON_SSO_LOGIN_SUCCEED, ssoUserData);

                if (!ssoUserData.activated) {
                  // open the profile completion

                  loginActions.waiting(false);

                  return Actions.completeProfile({
                    type: ActionConst.REPLACE,
                  });
                }

                loginActions.waiting(false);

                return Actions.home({
                  type: ActionConst.REPLACE,
                });
              })
              .catch(error => {
                loginActions.onApiLogIn(LoginActionsConst.ON_SSO_LOGIN_FAILED, error);

                loginActions.waiting(false);

                this.refs.toast.show(error, DURATION.LENGTH_SHORT);
              });
          })
          .catch(error => {
            loginActions.onApiLogIn(LoginActionsConst.ON_SSO_LOGIN_FAILED, error);

            loginActions.waiting(false);
          });
      }
    );
  }

  onLoginPress() {
    const {loginActions} = this.props;

    loginActions.waiting(true);

    LoginManager.logOut();

    LoginManager.logInWithReadPermissions(loginWithReadPermissions)
      .then(
        (result) => {
          if (result.isCancelled) {
            loginActions.waiting(false);

            this.refs.toast.show('Canceled', DURATION.LENGTH_SHORT);

            return loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_CANCELED);
          }

          this.doLogin();
        },
        (error) => {
          loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_FAILED, error);

          loginActions.waiting(false);
        }
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
        <Grid style={styles.rootMainContainer}>
          <Row size={70}>
            <Grid>
              <Row size={40} style={styles.logoContainer}>
                <Image source={pureLogo} style={styles.pureLogo}/>
              </Row>
              <Row size={10} style={styles.companyNameContainer}>
                <Text style={styles.companyName}>ELOYT</Text>
              </Row>
              <Row size={50} style={styles.logoSloganContainer}>
                <Text style={styles.logoSlogan}>Make Networking Great Again</Text>
              </Row>
            </Grid>
          </Row>
          <Row size={30}>
            <View style={styles.loginField}>
              <Text style={styles.loginAndContinueWithText}>Signin & Continue With</Text>
              <TouchableOpacity onPress={this.onLoginPress.bind(this)}>
                <View style={styles.loginButtonContainer}>
                  <Grid>
                    <Col size={20} style={styles.loginButtonLogoWrapper}>
                      <Image source={facebookLogo} style={styles.loginButtonFacebookIcon}/>
                    </Col>
                    <Col size={80} style={styles.loginButtonTextWrapper}>
                      <Text style={styles.loginButtonText}>Facebook</Text>
                    </Col>
                  </Grid>
                </View>
              </TouchableOpacity>
              <TermsAndConditionLink />
            </View>
          </Row>
        </Grid>
        <Toast ref="toast"
               position="bottom"
               textStyle={StyleSheet.flatten(styles.toastText)}
               style={StyleSheet.flatten(styles.toast)}/>
      </View>
    );
  }
}

LoginScene.propTypes = {
  loginActions: PropTypes.object,
  accessToken: PropTypes.string,
  ssoUserData: PropTypes.object,
  waiting: PropTypes.bool,
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
