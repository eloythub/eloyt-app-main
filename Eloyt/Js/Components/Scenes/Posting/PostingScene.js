import React, { Component, PropTypes } from 'react';
import { View, Text, StatusBar, ScrollView, Modal, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PostingActions from './PostingActions';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import * as PostingActionsConst from '../Posting/PostingActionsConst';
import { styles } from './PostingStyles';
import { Actions, ActionConst } from 'react-native-router-flux';
import { LoginManager } from 'react-native-fbsdk';
import Api from '../../../Libraries/Api';
import Utils from '../../../Libraries/Utils';
import LocalStorage from '../../../Libraries/LocalStorage';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CheckButton from '../../Misc/Posting/CheckButton';
import ReTryButton from '../../Misc/Posting/ReTryButton';
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
      uploadedVideoData: null,
      uploadProgress: 0,
      uploadStatus: PostingActionsConst.UPLOAD_IN_PROGRESS,
    };

    this.description = '';
    this.interests = [];
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

  handleDiscardPosting() {
    // TODO: stop uploading and then close the modal

    this.setState({postingModalVisible: false});
  }

  handleBackButtonPress() {
    Actions.pop();
  }

  startUploading() {
    const {recordedVideo, PostingReducers: {ssoUserData}} = this.props;

    const data = new FormData();

    data.append('userId', ssoUserData.id);
    data.append('description', this.description);
    data.append('hashtags', this.interests.join(','));
    data.append('geoLocationLatitude', 13.7191658); // latitude
    data.append('geoLocationLongitude', 100.5387086); // longitude
    data.append('file', {
      uri: recordedVideo.path,
      type: 'image/mov',
      name: 'file',
    });

    Api.postWithProgress(
      '/stream/upload/video',
      {
        method: 'post',
        body: data,
      },
      this.uploadProgress.bind(this),
      (xhr) => this.xhr = xhr
    ).then(async (res) => {
      if (res.status !== 200) {
        return this.setState({
          uploadStatus: PostingActionsConst.UPLOAD_FAIL,
          uploadProgress: 1,
        });
      }

      const video = JSON.parse(res.responseText);

      this.setState({
        uploadStatus: PostingActionsConst.UPLOAD_SUCCESSFUL,
        uploadProgress: 1,
        uploadedVideoData: video,
      });
    }, () => {
      this.setState({
        uploadStatus: PostingActionsConst.UPLOAD_FAIL,
        uploadProgress: 1,
      });
    });
  }

  uploadProgress(progressEvent) {
    this.setState({
      uploadProgress: progressEvent.loaded / progressEvent.total,
    });
  }

  handlePostButtonPress() {
    if (this.description && this.interests.length >= 3 && this.interests.length <= 5) {
      this.setState({
        postingModalVisible: true,
        uploadStatus: PostingActionsConst.UPLOAD_IN_PROGRESS,
        uploadProgress: 0,
      });

      return Utils.wait(500).then(() => this.startUploading());
    }

    let validationMessage = [];

    if (!this.description) {
      validationMessage.push('description');
    }

    if (!(this.interests.length >= 3 && this.interests.length <= 5)) {
      validationMessage.push('3 up to 5 categories');
    }

    Utils.alert(`Don't forget to add ${validationMessage.join(', \n')}.`);
  }

  handleReTryButtonPress() {
    this.setState({
      postingModalVisible: true,
      uploadStatus: PostingActionsConst.UPLOAD_IN_PROGRESS,
      uploadProgress: 0,
    });

    return Utils.wait(500).then(() => this.startUploading());
  }

  handleUploadIsDoneButtonPress() {
    const { uploadedVideoData } = this.state;

    Actions.home({
      type: ActionConst.PUSH_OR_POP,
      refresh: {
        refreshProps: {startVideoAgain: true, uploadedVideoData},
      },
    });
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  render() {
    const {postingModalVisible, uploadProgress, uploadStatus} = this.state;

    let uploadProgressValue = uploadProgress;

    if (uploadProgressValue < 0) {
      uploadProgressValue  = 0;
    }

    let progressColor = '#FF9800';

    switch (uploadStatus) {
      case PostingActionsConst.UPLOAD_SUCCESSFUL:
        progressColor = '#00cb76';
        break;
      case PostingActionsConst.UPLOAD_FAIL:
        progressColor = '#f44336';
        break;
      case PostingActionsConst.UPLOAD_IN_PROGRESS:
        progressColor = '#FF9800';
        break;
    }

    const progressValue = parseInt(uploadProgressValue * 100);

    return (
      <View style={styles.rootContainer}>
        <StatusBar hidden={true}/>

        <Modal
          visible={postingModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => this.setState({postingModalVisible: false})}>
          <View style={styles.rootPopUpContainer}>
            <View style={styles.topSection}>
              {
                uploadStatus === PostingActionsConst.UPLOAD_FAIL ||
                uploadStatus === PostingActionsConst.UPLOAD_IN_PROGRESS
                  ? <CancelButton onClick={this.handleDiscardPosting.bind(this)} styles={styles}/>
                  : <View style={{flex: 1}}/>
              }
              {
                uploadStatus === PostingActionsConst.UPLOAD_FAIL
                  ? <ReTryButton onClick={this.handleReTryButtonPress.bind(this)} styles={styles}/>
                  : null
              }
              {
                uploadStatus === PostingActionsConst.UPLOAD_SUCCESSFUL
                  ? <CheckButton onClick={this.handleUploadIsDoneButtonPress.bind(this)} styles={styles}/>
                  : null
              }
            </View>

            <View style={styles.postingProgressContainer}>
              <AnimatedCircularProgress
                size={width - 50}
                rotation={0}
                width={10}
                fill={progressValue}
                backgroundColor="#000000"
                tintColor={progressColor}
                style={styles.progressBarObject}>
                {
                  (fill) => (
                    <Text style={styles.progressBar}>
                      { parseInt(fill) }
                    </Text>
                  )
                }
              </AnimatedCircularProgress>
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
  recordedVideo: PropTypes.object,
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
