import React, { Component, PropTypes } from 'react';
import { View, Image, Platform, StatusBar, ScrollView, Text, TouchableOpacity } from 'react-native';
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
import Api from '../../../Libraries/Api';
import Utils from '../../../Libraries/Utils';
import fluidBackground from '../../../../Assets/Images/fluid-background.jpg';
import SettingsButton from '../../Misc/UserProfile/SettingsButton';
import BackButton from '../../Misc/Record/BackButton';
import ImageEntity from '../../Misc/CompleteProfile/ImageEntity';
import moment from 'moment';
import emailImage from '../../../../Assets/Images/email-icon.png';
import birthdateImage from '../../../../Assets/Images/birthdate-icon.png';

class UserProfileScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUserProfile: false,
      ssoUserData: null,
      userProfile: null,
    };
  }

  componentDidMount() {
    const {userProfileActions, userId: userIdProp} = this.props;

    let userId = userIdProp;

    LocalStorage.all([LoginActionsConst.ON_SSO_USER_DATA, UserProfileActionsConst.ON_USER_PROFILE_USER_LOGIN_DATA])
      .then(async([ssoUserData]) => {
        userProfileActions.setUserLogin({
          ssoUserData,
        });


        if (!userId) {
          userId = ssoUserData._id;
        }

        const requestGetProfile          = await Api.requestGetProfile(ssoUserData._id);
        const requestGetProfileRequested = await Api.requestGetProfile(userId);

        if (requestGetProfile.statusCode && requestGetProfileRequested.statusCode ) {
          const {data: userProfile} = requestGetProfile;
          const {data: userProfileRequested} = requestGetProfileRequested;

          this.setState({
            ssoUserData,
            loggedInUserProfile: userProfile._id === userProfileRequested._id,
            userProfile: userProfileRequested,
          });
        }
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

  handleBackButtonPress() {
    Actions.pop({
      refresh: {
        refreshProps: {startVideoAgain: true},
      },
    });
  }

  handleSettingsButtonPress() {
    // TODO: open the scene for edit profile
  }

  onSignoutButtonPress() {
    const {userProfileActions} = this.props;

    LoginManager.logOut();

    userProfileActions.onFacebookLogOut();

    Utils.next().then(() => {
      Actions.login({
        type: ActionConst.POP_AND_REPLACE,
      });
    });
  }

  postRender() {
    const {userProfile, loggedInUserProfile} = this.state;

    var birthday = moment(userProfile.birthday);
    console.log(userProfile.birthday);

    return <View style={styles.rootMainPostContainer}>
      <View style={styles.profileEntitiesContainer}>
        <ScrollView>
          <View style={styles.entitiesContainer}>
            <View style={styles.profileEntityContainer}>
              <ImageEntity imageUrl={Api.getProfileAvatar(userProfile._id, userProfile.avatar)}/>
            </View>
            <View style={styles.profileEntityContainer}>
              <Text style={styles.fullNameText}>{userProfile.firstName} {userProfile.lastName}</Text>
            </View>
            <View style={[styles.profileEntityContainer, styles.discriptiveContainer]}>
              <Image source={emailImage} style={styles.emailImage}/>
              <Text style={styles.descriptiveText}>{userProfile.email}</Text>
            </View>
            {
              userProfile.birthday
                ? <View style={[styles.profileEntityContainer, styles.discriptiveContainer]}>
                  <Image source={birthdateImage} style={styles.birthdateImage}/>
                  <Text style={styles.descriptiveText}>{birthday.format('Y-MMM-DD')}</Text>
                </View>
                : null
            }
            <View style={styles.profileEntityContainer}>
              <Text style={styles.descriptiveText}>{userProfile.aboutMe}</Text>
            </View>
          </View>
        </ScrollView>
        {
          loggedInUserProfile
            ? <TouchableOpacity style={styles.logoutButton} onPress={this.onSignoutButtonPress.bind(this)}>
              <Text style={styles.logoutButtonCaption}>{'Signout'.toUpperCase()}</Text>
            </TouchableOpacity>
            : null
        }
      </View>
    </View>;
  }

  postRenderLoading(show) {
    if (show) {
      return <View style={styles.rootMainPostContainer}>
        <View style={styles.loadingContainer}>
          <View style={styles.loading}>
            <Bars size={40} color="#ffffff"/>
          </View>
        </View>
      </View>;
    }
  }

  render() {
    const {ssoUserData} = this.props;
    const {loggedInUserProfile, userProfile} = this.state;

    return <View style={styles.rootContainer}>
      <StatusBar
        backgroundColor={Platform.OS === 'ios' ? '#ffffff' : '#000000'}
        barStyle="light-content"
        hidden={false}/>
      <Image source={fluidBackground} style={styles.backgroundImage}/>
      <View style={styles.rootMainContainer}>
        <View style={styles.topSection}>
          <BackButton onClick={this.handleBackButtonPress.bind(this)} styles={styles}/>
          <SettingsButton onClick={this.handleSettingsButtonPress.bind(this)}
                          styles={styles}
                          hidden={!loggedInUserProfile}/>
        </View>
        {ssoUserData && userProfile ? this.postRender() : this.postRenderLoading(!userProfile)}
      </View>
    </View>;
  }
}

UserProfileScene.propTypes = {
  UserProfileReducers: PropTypes.object,
  userProfileActions: PropTypes.object,
  ssoUserData: PropTypes.object,
  userId: PropTypes.string,
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

export const UserProfileSceneKey   = 'userProfile';
export const UserProfileSceneTitle = 'Profile';

export default ConnectedUserProfileScene;
