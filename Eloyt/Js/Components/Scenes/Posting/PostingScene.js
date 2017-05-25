import React, { Component, PropTypes } from 'react';
import { View, Text, StatusBar, ScrollView, Modal, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PostingActions from './PostingActions';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import { styles } from './PostingStyles';
import { Actions, ActionConst } from 'react-native-router-flux';
import { LoginManager } from 'react-native-fbsdk';
import LocalStorage from '../../../Libraries/LocalStorage';
import PercentageCircle from 'react-native-percentage-circle';
import BackButton from '../../Misc/Record/BackButton';
import CancelButton from '../../Misc/Posting/CancelButton';
import PostingButton from '../../Misc/Posting/PostingButton';
import InputTextBox from '../../Misc/Posting/InputTextBoxEntity';
import InterestsEntity from '../../Misc/Posting/InterestsEntity';

const {width} = Dimensions.get('window');

class PostingScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postingModalVisible: false,
    };
  }

  componentDidMount() {
    const {postingActions} = this.props;

    LocalStorage.load(LoginActionsConst.ON_SSO_USER_DATA)
      .then((ssoUserData) => {
        postingActions.setUserLogin({
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

  handleStopPosting() {
    // TODO: stop uploading and then close the modal

    this.setState({postingModalVisible: false});
  }

  handleBackButtonPress() {
    Actions.pop();
  }

  handlePostButtonPress() {
    this.setState({postingModalVisible: true});

    alert(this.interests[0], this.interests[1]);
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  render() {
    const {postingModalVisible} = this.state;

    return (
      <View style={styles.rootContainer}>
        <StatusBar hidden={true}/>

        <Modal
          visible={postingModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => this.setState({postingModalVisible: false})}>
          <View style={styles.rootMainContainer}>
            <View style={styles.topSection}>
              <CancelButton onClick={this.handleStopPosting.bind(this)} styles={styles}/>
            </View>

            <View style={styles.postingProgressContainer}>
              <PercentageCircle radius={width - 220}
                                percent={50}
                                borderWidth={10}
                                textStyle={styles.progressBar}
                                color="#00cb76"
                                innerColor="#000000"
                                bgcolor="transparent"/>
            </View>
          </View>
        </Modal>

        <View style={styles.rootMainContainer}>
          <View style={styles.topSection}>
            <BackButton onClick={this.handleBackButtonPress.bind(this)} styles={styles}/>
            <Text style={styles.sceneTitle}>{PostingSceneTitle}</Text>
            <PostingButton onClick={this.handlePostButtonPress.bind(this)} styles={styles}/>
          </View>

          <View style={styles.postingEntitiesContainer}>
            <View style={styles.entitiesContainer}>
              <View style={styles.postingEntityContainer}>
                <InputTextBox
                  setTextRef={(textRefObj) => this.descriptionRef = textRefObj}
                  onChange={(text) => this.description = text}
                  caption="DESCRIPTION"
                  name="description"
                />
                <ScrollView>
                  <InterestsEntity onChange={
                    (interests) => this.interests = interests
                  }/>
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

PostingScene.propTypes = {
  PostingReducers: PropTypes.object,
  postingActions: PropTypes.object,
  ssoUserData: PropTypes.object,
};

const mapStateToProps = (state) => {
  const {PostingReducers} = state;

  const {ssoUserData} = PostingReducers;

  return {
    PostingReducers,
    ssoUserData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postingActions: bindActionCreators(PostingActions, dispatch),
  };
};

const ConnectedPostingScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostingScene);

export const PostingSceneKey   = 'posting';
export const PostingSceneTitle = 'Posting';

export default ConnectedPostingScene;
