import React, { Component, PropTypes } from 'react';
import { View, Text, Image, Platform, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import * as CompleteProfileActions from './CompleteProfileActions';
import { LoginManager } from 'react-native-fbsdk';
import fluidBackground from '../../../../Assets/Images/fluid-background.jpg';
import pureLogo from '../../../../Assets/Images/pure-logo.png';
import { styles } from './CompleteProfileStyles';
import ImageEntity from '../../Misc/CompleteProfile/ImageEntity';
import InputTextBox from '../../Misc/CompleteProfile/InputTextBoxEntity';
import GenderEntity from '../../Misc/CompleteProfile/GenderEntity';
import BirthdateEntity from '../../Misc/CompleteProfile/BirthdateEntity';
import { Bars } from 'react-native-loader';
import { Actions, ActionConst } from 'react-native-router-flux';
import LocalStorage from '../../../Libraries/LocalStorage';
import Utils from '../../../Libraries/Utils';
import Api from '../../../Libraries/Api';

class CompleteProfileScene extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {completeProfileActions} = this.props;


    LocalStorage.load(LoginActionsConst.ON_SSO_USER_DATA)
      .then((ssoUserData) => {
        completeProfileActions.setUserLogin({
          ssoUserData,
        });

        this.firstName = ssoUserData.firstName;
        this.lastName  = ssoUserData.lastName;
        this.gender    = ssoUserData.gender;
        this.birthday  = ssoUserData.birthday;

        completeProfileActions.waiting(false);
      })
      .catch((error) => {
        LoginManager.logOut();

        Actions.login({
          type: ActionConst.REPLACE,
          error,
        });
      });
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  onNextButtonPress() {
    const {completeProfileActions, ssoUserData} = this.props;

    if (!this.firstName || !this.lastName || !this.gender || !this.birthday) {
      Utils.alert('All the fields are required.');

      return;
    }

    completeProfileActions.waiting(true);


    Api.requestUpdateProfile(ssoUserData._id, {
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        birthday: this.birthday,
      })
      .then((updatedUserRes) => {
        completeProfileActions.setUserLogin({ssoUserData: updatedUserRes.data});

        completeProfileActions.waiting(false);

        Utils.next().then(() => {
          Actions.areaOfInterests({
            type: ActionConst.REPLACE,
          });
        });
      })
      .catch(() => {
        completeProfileActions.waiting(false);
      });
  }

  postRender() {
    return (
      <View style={styles.rootMainPostContainer}>
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
                          this.props.ssoUserData._id,
                          this.props.ssoUserData.avatar
                        )}/>
              </View>
              <View style={styles.profileEntityContainer}>
                <InputTextBox
                  setTextRef={(textRefObj) => this.firstNameRef = textRefObj}
                  onChange={(text) => this.firstName = text}
                  default={this.props.ssoUserData.firstName}
                  caption="FIRST NAME"
                  name="firstname"
                  nextFocusObjectRef={() => this.lastNameRef.focus()}
                />
              </View>
              <View style={styles.profileEntityContainer}>
                <InputTextBox
                  setTextRef={(textRefObj) => this.lastNameRef = textRefObj}
                  onChange={(text) => this.lastName = text}
                  default={this.props.ssoUserData.lastName}
                  caption="LAST NAME"
                  name="lastname"
                />
              </View>
              <View style={styles.profileEntityContainer}>
                <GenderEntity
                  onPress={(genderValue) => this.gender = genderValue}
                  value={this.props.ssoUserData.gender.toLowerCase()}
                />
              </View>
              <View style={styles.profileEntityContainer}>
                <BirthdateEntity
                  onChange={(birthday) => this.birthday = birthday}
                  date={this.props.ssoUserData.birthday}/>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.nextButton} onPress={this.onNextButtonPress.bind(this)}>
            <Text style={styles.nextButtonCaption}>{'Save & Select Areas of Interest'.toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
    const {waiting} = this.props;

    return (
      <View style={styles.rootContainer}>
        <StatusBar
          backgroundColor={Platform.OS === 'ios' ? '#ffffff' : '#000000'}
          barStyle="light-content"
          hidden={false}
        />
        <Image source={fluidBackground} style={styles.backgroundImage}/>
        {this.handleLoading(waiting)}
        <View style={styles.rootMainContainer}>
          {this.props.ssoUserData ? this.postRender() : null}
        </View>
      </View>
    );
  }
}

CompleteProfileScene.propTypes = {
  completeProfileActions: PropTypes.object,
  waiting: PropTypes.bool,
  fbAccessToken: PropTypes.string,
  ssoUserData: PropTypes.object,
};

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
