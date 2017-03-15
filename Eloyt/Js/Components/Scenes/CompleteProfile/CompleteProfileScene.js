import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CompleteProfileActions from './CompleteProfileActions';
import { Row, Grid, Col } from 'react-native-easy-grid';
import fluidBackground from '../../../../Assets/Images/fluid-background.jpg';
import pureLogo from '../../../../Assets/Images/pure-logo.png';
import { styles } from './CompleteProfileStyles';
import { Actions, ActionConst } from 'react-native-router-flux';
import { LoginManager } from 'react-native-fbsdk';

class CompleteProfileScene extends Component {
  componentDidMount() {
    const {completeProfileActions} = this.props;
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <StatusBar
          backgroundColor={Platform.OS === 'ios' ? '#ffffff' : '#000000'}
          barStyle="light-content"
          hidden={false}
        />
        <Image source={fluidBackground} style={styles.backgroundImage}/>
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
            </View>
          </Row>
        </Grid>
      </View>
    );
  }
}

CompleteProfileScene.propTypes = {};

const mapStateToProps = (state) => {
  const {CompleteProfileReducers} = state;

  return CompleteProfileReducers;
};

const mapDispatchToProps = (dispatch) => {
  return {
    completeProfileActions: bindActionCreators(CompleteProfileActions, dispatch),
  };
};

const ConnectedCompleteProfileScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompleteProfileScene);

export const CompleteProfileSceneKey   = 'completeProfile';
export const CompleteProfileSceneTitle = 'Complete Profile';

export default ConnectedCompleteProfileScene;
