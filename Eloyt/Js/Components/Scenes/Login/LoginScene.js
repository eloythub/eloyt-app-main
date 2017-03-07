import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginActions from './LoginActions';
import TermsAndConditionLink from '../../Misc/TermsAndConditionLink';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import * as LoginActionsConst from './LoginActionsConst';
import { Row, Grid, Col } from 'react-native-easy-grid';
import loginFluidBackground from '../../../../Assets/Images/login-fluid-background.jpg';
import facebookLogo from '../../../../Assets/Images/facebook.png';
import pureLogo from '../../../../Assets/Images/pure-logo.png';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#455a64',
  },
  rootMainContainer: {
    flex: 1,
    backgroundColor: 'rgba(69,90,100,0.8)',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
  },
  loginField: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
  },
  loginButtonContainer: {
    width: 250,
    height: 40,
    borderWidth: 2,
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderStyle: 'solid',
    borderRadius: 3,
    paddingTop: 4,
    marginBottom: 10,
  },
  loginButtonLogoWrapper: {
    alignItems: 'center',
  },
  loginButtonTextWrapper: {
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4d6fa9',
    fontFamily: 'OpenSans',
    paddingRight: 10,
    paddingTop: 1,
  },
  loginButtonFacebookIcon: {
    width: 28,
    height: 28,
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  pureLogo: {
    width: 90,
    height: 104.93,
    alignItems: 'center',
  },
  companyNameContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  companyName: {
    color: '#ffffff',
    fontFamily: 'OpenSans',
    fontSize: 40,
    fontWeight: 'bold',
  },
  logoSloganContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  logoSlogan: {
    color: '#ffffff',
    fontFamily: 'OpenSans',
    fontWeight: 'normal',
    fontSize: 20,
    paddingTop: 10,
  },
  loginAndContinueWithText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'OpenSans',
    marginTop: 30,
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

  onLoginPress() {
    const {loginActions} = this.props;
    LoginManager.logOut();

    LoginManager.logInWithReadPermissions(['email', 'user_friends', 'user_photos']).then(
      (result) => {
        if (result.isCancelled) {
          loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_CANCELED);

          return;
        }

        AccessToken.getCurrentAccessToken().then(
          (data) => {
            loginActions.onFacebookLogIn(LoginActionsConst.ON_FACEBOOK_LOGIN_SUCCEED, data.accessToken.toString());
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
        <Image source={loginFluidBackground} style={styles.backgroundImage}/>
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
