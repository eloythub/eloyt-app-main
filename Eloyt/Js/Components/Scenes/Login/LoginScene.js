import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
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

class LoginScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waiting: false,
    };
  }

  componentDidMount() {
    const {loginActions} = this.props;

    this.setState({
      waiting: true,
    });

    AccessToken.getCurrentAccessToken().then(
      (data) => {
        if (data) {
          loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_SUCCEED, data.accessToken.toString());

          this.setState({
            waiting: false,
          });

          // open the profile completion
          setTimeout(() => {
            Actions.completeProfile({
              type: ActionConst.REPLACE,
            });
          }, 0);

          return;
        }

        this.setState({
          waiting: false,
        });
      }
    );
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  onLoginPress() {
    const {loginActions} = this.props;

    this.setState({
      waiting: true,
    });

    LoginManager.logOut();

    LoginManager.logInWithReadPermissions([
      'public_profile',
      'email',
      'user_photos',
      'user_friends',
      'user_website',
      'user_about_me',
      'user_birthday',
      'user_likes',
      'user_location',
    ]).then(
      (result) => {
        if (result.isCancelled) {
          loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_CANCELED);

          return;
        }

        AccessToken.getCurrentAccessToken().then(
          (data) => {
            loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_SUCCEED, data.accessToken.toString());

            this.setState({
              waiting: false,
            });

            // open the profile completion
            setTimeout(() => {
              Actions.completeProfile({
                type: ActionConst.REPLACE,
              });
            }, 0);
          }
        );
      },
      (error) => {
        loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_FAILED, error);
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
        <Spinner visible={this.state.waiting}/>
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
