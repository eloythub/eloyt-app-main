import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import * as CompleteProfileActions from './CompleteProfileActions';
import fluidBackground from '../../../../Assets/Images/fluid-background.jpg';
import pureLogo from '../../../../Assets/Images/pure-logo.png';
import { styles } from './CompleteProfileStyles';
import ImageEntity from '../../Misc/CompleteProfile/ImageEntity';
import InputTextBox from '../../Misc/CompleteProfile/InputTextBoxEntity';
import GenderEntity from '../../Misc/CompleteProfile/GenderEntity';
import BirthdateEntity from '../../Misc/CompleteProfile/BirthdateEntity';
import { Actions, ActionConst } from 'react-native-router-flux';
import LocalStorage from '../../../Libraries/LocalStorage';
import Api from '../../../Libraries/Api';

class CompleteProfileScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fbAccessToken: null,
      ssoUserData: null,
    };
  }

  componentDidMount() {
    const {completeProfileActions} = this.props;

    LocalStorage.all([
        LoginActionsConst.ON_FACEBOOK_ACCESS_TOKEN,
        LoginActionsConst.ON_SSO_USER_DATA,
    ])
      .then((values) => {
        const [fbAccessToken, ssoUserData] = values;

        this.setState({
          fbAccessToken,
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

  onNextButtonPress() {
    Actions.areaOfInterests({
      type: ActionConst.REPLACE,
    });
  }

  render() {
    if (!this.state.fbAccessToken) {
      return (<View style={styles.rootContainer}></View>);
    }

    return (
      <View style={styles.rootContainer}>
        <StatusBar
          backgroundColor={Platform.OS === 'ios' ? '#ffffff' : '#000000'}
          barStyle="light-content"
          hidden={false}
        />
        <Image source={fluidBackground} style={styles.backgroundImage}/>
        <View style={styles.rootMainContainer}>
          <View style={styles.logoContainer}>
            <Image source={pureLogo} style={styles.pureLogo}/>
            <Text style={styles.sceneTitle}>{'Complete Your Profile'.toUpperCase()}</Text>
          </View>
          <View style={styles.profileEntitiesContainer}>
            <ScrollView>
              <View style={styles.entitiesContainer}>
                <View style={styles.profileEntityContainer}>
                  <ImageEntity
                    imageUrl={Api.getProfileAvatar(
                      this.state.ssoUserData._id,
                      this.state.ssoUserData.avatar
                    )}/>
                </View>
                <View style={styles.profileEntityContainer}>
                  <InputTextBox
                    setTextRef={
                      (textRefObj) => this.firstNameRef = textRefObj
                    }
                    caption="FIRST NAME"
                    name="firstname"
                    nextFocusObjectRef={() => this.lastNameRef.focus()}
                  />
                </View>
                <View style={styles.profileEntityContainer}>
                  <InputTextBox
                    setTextRef={
                      (textRefObj) => this.lastNameRef = textRefObj
                    }
                    caption="LAST NAME"
                    name="lastname"
                  />
                </View>
                <View style={styles.profileEntityContainer}>
                  <GenderEntity
                    onPress={
                      (genderValue) => this.gender = genderValue
                    }
                  />
                </View>
                <View style={styles.profileEntityContainer}>
                  <BirthdateEntity
                  />
                </View>
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.nextButton} onPress={this.onNextButtonPress.bind(this)}>
              <Text style={styles.nextButtonCaption}>{'Save & Select Areas of Interest'.toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
