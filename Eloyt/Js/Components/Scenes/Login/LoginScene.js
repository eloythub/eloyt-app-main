import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginActions from './LoginActions';
import TermsAndConditionLink from '../../Misc/TermsAndConditionLink';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import * as LoginActionsConst from './LoginActionsConst';
import { Row, Grid, Col } from 'react-native-easy-grid';
import facebookLogo from '../../../../Assets/Images/facebook.png';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#1e89e7',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
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
    borderColor: '#ffffff',
    borderStyle: 'solid',
    borderRadius: 3,
    paddingTop: 4,
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
    color: '#ffffff',
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'HelveticaNeue-Thin',
    paddingRight: 10,
    paddingTop: 1,
  },
  loginButtonFacebookIcon: {
    width: 28,
    height: 28,
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
        <Grid>
          <Row size={70}>
            <Text>
              {this.props.accessToken}
            </Text>
          </Row>
          <Row size={30}>
            <View style={styles.loginField}>
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
