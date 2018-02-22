import React, { Component, PropTypes } from 'react';
import { View, Text, Image, Platform, TouchableOpacity, StatusBar, ScrollView, Alert } from 'react-native';
import { Bars } from 'react-native-loader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AreaOfInterestsActions from './AreaOfInterestsActions';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import fluidBackground from '../../../../Assets/Images/fluid-background.jpg';
import pureLogo from '../../../../Assets/Images/pure-logo.png';
import { styles } from './AreaOfInterestsStyles';
import { Actions, ActionConst } from 'react-native-router-flux';
import { LoginManager } from 'react-native-fbsdk';
import InterestEntity from '../../Misc/AreaOfInterests/InterestEntity';
import { listOfInterests } from '../../../../default.json';
import LocalStorage from '../../../Libraries/LocalStorage';
import Utils from '../../../Libraries/Utils';
import Api from '../../../Libraries/Api';

class AreaOfInterestsScene extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {areaOfInterestsActions} = this.props;

    LocalStorage.load(LoginActionsConst.ON_SSO_USER_DATA)
      .then((ssoUserData) => {
        areaOfInterestsActions.setSelectedInterest(ssoUserData.hashtags);

        Utils.next().then(() => {
          areaOfInterestsActions.setUserLogin({
            ssoUserData,
          });

          areaOfInterestsActions.waiting(false);
        });
      })
      .catch((error) => {
        LoginManager.logOut();

        Actions.login({
          type: ActionConst.REPLACE,
        });
      });
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  onSaveButtonPress() {
    const {areaOfInterestsActions, ssoUserData, selectedInterests} = this.props;

    areaOfInterestsActions.waiting(true);

    if (selectedInterests.length < 3) {
      areaOfInterestsActions.waiting(false);

      Utils.alert('Minimum 3 Categories are required .');

      return;
    }

    Api.requestUpdateProfile(ssoUserData.id, {
        hashtags: selectedInterests,
        activated: true,
      })
      .then((updatedUserRes) => {
        areaOfInterestsActions.setUserLogin({ssoUserData: updatedUserRes.data});

        areaOfInterestsActions.waiting(false);

        Utils.next().then(() => {
          Actions.home({
            type: ActionConst.REPLACE,
          });
        });
      })
      .catch(() => {
        areaOfInterestsActions.waiting(false);
      });
  }

  postRender() {
    const {areaOfInterestsActions, selectedInterests} = this.props;

    return (
      <View style={styles.rootMainPostContainer}>
        <View style={styles.logoContainer}>
          <Image source={pureLogo} style={styles.pureLogo}/>
          <Text style={styles.sceneTitle}>{'Area of Interest'.toUpperCase()}</Text>
        </View>
        <View style={styles.interestsCountContainer}>
          <Text style={styles.interestsCount}>{selectedInterests.length} </Text>
          <Text style={styles.interestsCountDescription}>
            Item{selectedInterests.length > 1 ? 's' : ''} {selectedInterests.length > 1 ? 'have' : 'has'}
            been selected</Text>
        </View>
        <View style={styles.profileEntitiesContainer}>
          <ScrollView>
            <View style={styles.entitiesContainer}>
              {
                listOfInterests.map((interestItem) => {
                  return (
                    <InterestEntity
                      key={interestItem.hashtag}
                      defaultSelected={selectedInterests.indexOf(interestItem.hashtag) >= 0}
                      title={interestItem.title}
                      onPress={
                          (selected) => {
                            areaOfInterestsActions.toggleInterest({
                              hashtag: interestItem.hashtag,
                              selected,
                            });
                          }
                        }
                    />
                  );
                })
              }
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.nextButton} onPress={this.onSaveButtonPress.bind(this)}>
            <Text style={styles.saveButtonCaption}>{'Save & Go Networking'.toUpperCase()}</Text>
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

AreaOfInterestsScene.propTypes = {
  AreaOfInterestsReducers: PropTypes.object,
  areaOfInterestsActions: PropTypes.object,
  selectedInterests: PropTypes.array,
  ssoUserData: PropTypes.object,
  waiting: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {AreaOfInterestsReducers} = state;

  const {selectedInterests, ssoUserData, waiting} = AreaOfInterestsReducers;

  return {
    AreaOfInterestsReducers,
    selectedInterests,
    ssoUserData,
    waitingMain,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    areaOfInterestsActions: bindActionCreators(AreaOfInterestsActions, dispatch),
  };
};

const ConnectedAreaOfInterestsScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(AreaOfInterestsScene);

export const AreaOfInterestsSceneKey   = 'areaOfInterests';
export const AreaOfInterestsSceneTitle = 'Area Of Interests';

export default ConnectedAreaOfInterestsScene;
