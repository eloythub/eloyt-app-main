import React, { Component, PropTypes } from 'react';
import { View, Image, Platform, StatusBar, ScrollView, Text, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Bars } from 'react-native-loader';
import * as UserProfileActions from './UserProfileActions';
import { styles } from './UserProfileStyles';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import * as UserProfileActionsConst from './UserProfileActionsConst';
import { Actions, ActionConst } from 'react-native-router-flux';
import { LoginManager } from 'react-native-fbsdk';
import moment from 'moment';
import LocalStorage from '../../../Libraries/LocalStorage';
import Api from '../../../Libraries/Api';
import Utils from '../../../Libraries/Utils';
import fluidBackground from '../../../../Assets/Images/fluid-background.jpg';
import emailImage from '../../../../Assets/Images/email-icon.png';
import birthdateImage from '../../../../Assets/Images/birthdate-icon.png';
import SettingsButton from '../../Misc/UserProfile/SettingsButton';
import BackButton from '../../Misc/Record/BackButton';
import ImageEntity from '../../Misc/CompleteProfile/ImageEntity';
import HashtagsView from '../../Misc/Home/HashtagsView';
import CheckButton from '../../Misc/Posting/CheckButton';
import CancelButton from '../../Misc/Posting/CancelButton';
import InputTextBox from '../../Misc/CompleteProfile/InputTextBoxEntity';
import GenderEntity from '../../Misc/CompleteProfile/GenderEntity';
import BirthdateEntity from '../../Misc/CompleteProfile/BirthdateEntity';
import InterestsEntity from '../../Misc/Posting/InterestsEntity';

const {width}  = Dimensions.get('window');

class UserProfileScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUserProfile: false,
      ssoUserData: null,
      userProfile: null,
      isEditMode: false,
      editWaiting: false,
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

          this.editFirstName = userProfileRequested.firstName;
          this.editLastName = userProfileRequested.lastName;
          this.editGender = userProfileRequested.gender;
          this.editBirthday = userProfileRequested.birthday;
          this.editHashtags = userProfileRequested.hashtags;
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
    this.setState({isEditMode: true});
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

  handleSaveButtonPress() {
    const {userProfileActions} = this.props;
    const {userProfile} = this.state;

    if (
      !this.editFirstName ||
      !this.editLastName ||
      !this.editGender ||
      !this.editBirthday ||
      this.editHashtags.length < 3
    ) {
      Utils.alert('Something is Missing.\nPlease Make Every Section\'s being filled and chosen Minimum 3 tags');

      return;
    }

    this.setState({
      editWaiting: true,
    });

    Api.requestUpdateProfile(userProfile._id, {
        firstName: this.editFirstName,
        lastName: this.editLastName,
        gender: this.editGender,
        birthday: this.editBirthday,
        hashtags: this.editHashtags,
      })
      .then((updatedUserRes) => {
        userProfileActions.setUserLogin({ssoUserData: updatedUserRes.data});

        this.setState({
          userProfile: updatedUserRes.data,
          isEditMode: false,
          editWaiting: false,
        });
      })
      .catch(() => {
        this.setState({
          editWaiting: false,
        });
      });
  }

  handleDiscardButtonPress() {
    this.setState({isEditMode: false});
  }

  postRender() {
    const {userProfile, loggedInUserProfile, isEditMode} = this.state;

    var birthday = moment(userProfile.birthday);

    return <View style={styles.rootMainPostContainer}>
      {
        !isEditMode
          ? <View style={styles.profileEntitiesContainer}>
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
                      <Text style={styles.descriptiveText}>{birthday.format('Y/MMM/DD')}</Text>
                    </View>
                    : null
                }
                <View style={[styles.profileEntityContainer, styles.discriptiveContainer, styles.aboutMe]}>
                  <Text style={styles.descriptiveText}>{userProfile.aboutMe}</Text>
                </View>
                <View style={[styles.profileEntityContainer, styles.discriptiveContainer, styles.hashtags]}>
                  <View>
                    <HashtagsView tags={userProfile.hashtags} width={width - 50} opacity={1}/>
                  </View>
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
          : null
      }
      {this.postRenderEdit()}
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

  postRenderEditLoading(show) {
    if (show) {
      return <Bars size={14} color="#ffffff"/>;
    }
  }

  postRenderEdit() {
    const {isEditMode, editWaiting, userProfile} = this.state;

    return <Modal
      visible={isEditMode}
      transparent={true}
      animationType="slide"
      onRequestClose={() => this.setState({isEditMode: false})}>
      <View style={styles.rootMainModalContainer}>
        <View style={styles.topSection}>
          <CancelButton onClick={this.handleDiscardButtonPress.bind(this)} hidden={editWaiting} styles={styles}/>
          {this.postRenderEditLoading(editWaiting)}
          <CheckButton onClick={this.handleSaveButtonPress.bind(this)} hidden={editWaiting} styles={styles}/>
        </View>
        <View style={styles.rootMainPostContainer}>
          <View style={styles.profileEntitiesContainer}>
            <ScrollView>
              <View style={styles.profileEntityContainer}>
                <InputTextBox
                  setTextRef={(textRefObj) => this.editFirstNameRef = textRefObj}
                  onChange={(text) => this.editFirstName = text}
                  default={userProfile.firstName}
                  caption="FIRST NAME"
                  name="firstname"
                  nextFocusObjectRef={() => this.lastNameRef.focus()}
                />
              </View>
              <View style={styles.profileEntityContainer}>
                <InputTextBox
                  setTextRef={(textRefObj) => this.editLastNameRef = textRefObj}
                  onChange={(text) => this.editLastName = text}
                  default={userProfile.lastName}
                  caption="FIRST NAME"
                  name="firstname"
                />
              </View>
              <View style={styles.profileEntityContainer}>
                <GenderEntity
                  onPress={(genderValue) => this.editGender = genderValue}
                  value={userProfile.gender.toLowerCase()}
                />
              </View>
              <View style={styles.profileEntityContainer}>
                <BirthdateEntity
                  onChange={(birthday) => this.editBirthday = birthday}
                  date={userProfile.birthday}/>
              </View>
              <View style={styles.profileEntityContainer}>
                <InterestsEntity onChange={(hashtags) => this.editHashtags = hashtags} defaultSelected={userProfile.hashtags}/>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>;
  }

  render() {
    const {ssoUserData} = this.props;
    const {loggedInUserProfile, userProfile, isEditMode} = this.state;

    return <View style={styles.rootContainer}>
      <StatusBar
        backgroundColor={Platform.OS === 'ios' ? '#ffffff' : '#000000'}
        barStyle="light-content"
        hidden={false}/>
      <Image source={fluidBackground} style={styles.backgroundImage}/>
      <View style={styles.rootMainContainer}>
        <View style={styles.topSection}>
          <BackButton hidden={isEditMode} onClick={this.handleBackButtonPress.bind(this)} styles={styles}/>
          <SettingsButton onClick={this.handleSettingsButtonPress.bind(this)}
                          styles={styles}
                          hidden={!loggedInUserProfile || isEditMode}/>
        </View>
        {
          ssoUserData && userProfile
          ? this.postRender()
          : this.postRenderLoading(!userProfile)
        }
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
