import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AreaOfInterestsActions from './AreaOfInterestsActions';
import fluidBackground from '../../../../Assets/Images/fluid-background.jpg';
import pureLogo from '../../../../Assets/Images/pure-logo.png';
import { styles } from './AreaOfInterestsStyles';
import { Actions, ActionConst } from 'react-native-router-flux';
import { LoginManager } from 'react-native-fbsdk';
import InterestEntity from '../../Misc/AreaOfInterests/InterestEntity';

class AreaOfInterestsScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedInterests: [],
      listOfInterests: [
        {
          hashtag: 'art_and_design',
          title: 'Art & Design',
        },
        {
          hashtag: 'fashion',
          title: 'Fashion',
        },
        {
          hashtag: 'human_resources',
          title: 'Human Resources',
        },
        {
          hashtag: 'technology',
          title: 'Technology',
        },
        {
          hashtag: 'social_media',
          title: 'Social Media',
        },
        {
          hashtag: 'freelancing',
          title: 'Freelancing',
        },
        {
          hashtag: 'education',
          title: 'Education',
        },
      ],
    };
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  componentDidMount() {
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  onSaveButtonPress() {
    LoginManager.logOut();

    Actions.login({
      type: ActionConst.REPLACE,
    });
  }

  render() {
    const {areaOfInterestsActions, AreaOfInterestsReducers} = this.props;

    const {selectedInterests} = AreaOfInterestsReducers;

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
            <Text style={styles.sceneTitle}>{'Area of Interest'.toUpperCase()}</Text>
          </View>
          <View style={styles.interestsCountContainer}>
            <Text style={styles.interestsCount}>{selectedInterests.length}</Text>
            <Text style={styles.interestsCountDescription}> Items is selected</Text>
          </View>
          <View style={styles.profileEntitiesContainer}>
            <ScrollView>
              <View style={styles.entitiesContainer}>
                {
                  this.state.listOfInterests.map((interestItem) => {
                    return (
                      <InterestEntity
                        key={interestItem.hashtag}
                        defaultSelected={false}
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
      </View>
    );
  }
}

AreaOfInterestsScene.propTypes = {
  areaOfInterestsActions: PropTypes.object,
  selectedInterests: PropTypes.array,
};

const mapStateToProps = (state) => {
  const {AreaOfInterestsReducers} = state;

  return {
    AreaOfInterestsReducers,
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
