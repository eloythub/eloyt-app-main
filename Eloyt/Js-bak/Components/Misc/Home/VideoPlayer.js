import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, Dimensions, ScrollView, Modal } from 'react-native';
import Api from '../../../Libraries/Api';
import Utils from '../../../Libraries/Utils';
import LinearGradient from 'react-native-linear-gradient';
import { Bars } from 'react-native-loader';
import ProfileImage from './ProfileImage';
import RecordButton from './RecordButton';
import ActionButton from './ActionButton';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Camera from 'react-native-camera';
import Video from 'react-native-video';
import HashtagsView from './HashtagsView';
import { Actions, ActionConst } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';
import { BlurView } from 'react-native-blur';
import StatusBarSizeIOS from 'react-native-status-bar-size';

const {width} = Dimensions.get('window');

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoFilePath: null,
      videoLoaded: false,
      duration: null,
      currentTime: null,
      paused: false,
      isActionModalAppears: false,
      currentStatusBarHeight: 20 + StatusBarSizeIOS.currentHeight,
    };
  }

  componentDidMount() {
    const {video} = this.props;

    StatusBarSizeIOS.addEventListener('didChange', this.handleStatusBarSizeDidChange.bind(this));

    // TODO: temporary read from stream feed, later must be able to cache the video
    //if (Platform.OS === 'ios') {
      return this.setState({
        videoFilePath: Api.url(video.resourceUri),
        paused: false,
      });
    //}
    //
    //Files.downloadFile(video.resourceUri)
    //  .then(
    //    (videoFilePath) => {
    //      this.setState({
    //        videoFilePath,
    //        paused: false,
    //      });
    //    },
    //    (e) => {
    //      console.log(e);
    //      // TODO: show a toast later to video has being failed to load
    //      this.setState({
    //        videoFilePath: null,
    //      });
    //    }
    //  )
    //  .catch((e) => {
    //    console.log(e);
    //    // TODO: show a toast later to video has being failed to load
    //    this.setState({
    //      videoFilePath: null,
    //    });
    //  });
  }
  componentWillUnmount() {
    StatusBarSizeIOS.removeEventListener('didChange', this.handleStatusBarSizeDidChange.bind(this));
  }

  componentWillReceiveProps(props) {
    const {refreshProps, onNewVideoUploaded} = props;

    if ('uploadedVideoData' in refreshProps) {
      return onNewVideoUploaded(refreshProps.uploadedVideoData);
    }

    if ('startVideoAgain' in refreshProps) {
      Utils.wait(500).then(() => this.setState({
        paused: false,
      }));
    }
  }

  handleStatusBarSizeDidChange(currentStatusBarHeight) {
    this.setState({ currentStatusBarHeight });
  }

  like() {
    const {onLike, video} = this.props;

    this.setState({
      paused: false,
      isActionModalAppears: false,
    });

    return onLike(video);
  }

  dislike() {
    const {onDislike, video} = this.props;

    this.setState({
      paused: false,
      isActionModalAppears: false,
    });

    return onDislike(video);
  }

  skip() {
    const {onSkip, video} = this.props;

    this.setState({
      paused: false,
      isActionModalAppears: false,
    });

    return onSkip(video);
  }

  handleTouchAction(video) {
    this.setState({
      paused: true,
      isActionModalAppears: true,
    });
  }

  handleVideoLoad(data) {
    console.log('handle Video Load', data);
    const {duration} = data;

    this.setState({
      videoLoaded: true,
      duration,
    });
  }

  handleVideoLoadStart(data) {
    console.log('handle Video Load Start', data);
  }

  handleVideoEnd(data) {
    const {onSkip, video} = this.props;

    this.setState({
      paused: true,
    });

    // it suppose to skip the video
    return Utils.wait(2000).then(() => onSkip(video));
  }

  handleVideoBuffer(data) {
    console.log('handle Video Buffer', data);
  }

  handleVideoProgress(data) {
    console.log('handle Video Progress', data);
    const {currentTime} = data;

    this.setState({
      currentTime,
    });
  }

  handleVideoError(data) {
    console.log('handle Video Error', data);
  }

  handleThumbnail() {
    const {video, styles} = this.props;
    const {videoLoaded} = this.state;

    const thumbnailSource = {
      uri: Api.url(video.resourceThumbnailUri),
    };

    // Once video was downloaded and ready for preview
    if (!videoLoaded) {
      return <Image style={styles.videoThumbnailImage} source={thumbnailSource}/>;
    }
  }

  handleLoading() {
    const {styles} = this.props;
    const {videoLoaded} = this.state;

    // Once video was downloaded and ready for preview
    if (!videoLoaded) {
      return <View style={styles.loadingContainer}>
        <View style={styles.loading}>
          <Bars size={40} color="#ffffff"/>
        </View>
      </View>;
    }
  }

  handleVideo() {
    const {styles} = this.props;
    const {videoFilePath, paused} = this.state;

    // Once video was downloaded and ready for preview
    if (videoFilePath) {
      return <Video
        source={{uri: videoFilePath, mainVer: 1, patchVer: 0}}
        style={styles.video}
        muted={true}
        paused={paused}
        rate={paused ? 0 : 1}
        repeat={false}
        playInBackground={false}
        playWhenInactive={false}
        resizeMode='cover'
        onProgress={this.handleVideoProgress.bind(this)}
        onVideoProgress={this.handleVideoProgress.bind(this)}
        onLoadStart={this.handleVideoLoadStart.bind(this)}
        onVideoLoadStart={this.handleVideoLoadStart.bind(this)}
        onLoad={this.handleVideoLoad.bind(this)}
        onVideoLoad={this.handleVideoLoad.bind(this)}
        onEnd={this.handleVideoEnd.bind(this)}
        onVideoEnd={this.handleVideoEnd.bind(this)}
        onBuffer={this.handleVideoBuffer.bind(this)}
        onVideoBuffer={this.handleVideoBuffer.bind(this)}
        onError={this.handleVideoError.bind(this)}
        onVideoError={this.handleVideoError.bind(this)}
      />;
    }
  }

  async handleRecordButtonPress() {
    this.setState({
      paused: true,
    });

    const isAuths = await Utils.all([
      Camera.checkDeviceAuthorizationStatus(),
      Camera.checkVideoAuthorizationStatus(),
      Camera.checkAudioAuthorizationStatus(),
    ]);

    for (let isAuth of isAuths) {
      if (!isAuth) {
        return this.refs.toast.show(
          'We need your permission on Camera and Microphone in order to proceed',
          DURATION.LENGTH_LONG
        );
      }
    }

    return Actions.record({
      type: ActionConst.PUSH_OR_POP,
    });
  }

  handleUserProfilePress(userId) {
    this.setState({
      paused: true,
    });

    Actions.userProfile({
      type: ActionConst.PUSH_OR_POP,
      userId,
    });
  }

  render() {
    const {video, styles} = this.props;
    const {duration, currentTime, isActionModalAppears, currentStatusBarHeight} = this.state;

    return (
      <View style={styles.videoContainer}>
        <Modal
          visible={isActionModalAppears}
          transparent={true}
          animationType="slide"
          onRequestClose={() => this.setState({isActionModalAppears: false})}>
          <View>
            <TouchableWithoutFeedback onPress={() => this.setState({isActionModalAppears: false})}>
              <View style={styles.actionModalContainer}>
                <TouchableWithoutFeedback>
                  <BlurView blurType="light" overlayColor="#ffffff" blurAmount={10} style={styles.blurView}>
                    <ActionButton caption="Dislike" icon="dislike" onClick={() => this.dislike.bind(this)}/>
                    <ActionButton caption="Skip" icon="skip" onClick={this.skip.bind(this)}/>
                    <ActionButton caption="Like" icon="like" onClick={this.like.bind(this)}/>
                  </BlurView>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
        <TouchableWithoutFeedback onPressIn={this.handleTouchAction.bind(this, video)}>
          <View style={styles.videoThumbnailImageContainer}>
            {this.handleLoading()}
            {this.handleThumbnail()}
            {this.handleVideo()}
          </View>
        </TouchableWithoutFeedback>

        <View style={[
          styles.highlightBottomContainer,
          //{bottom: 60 - currentStatusBarHeight}
        ]}>
          <LinearGradient
            start={{x: 0, y: 1}} end={{x: 0, y: 0}}
            locations={[0, 0.2, 1]}
            colors={['#000', '#111', 'transparent']}
            style={styles.highlightBottom}>
            <Grid>
              <Col>
                <Grid>
                  {/*<Row style={{height: 10}}>*/}
                    {/*{*/}
                      {/*duration && currentTime <= duration*/}
                      {/*? <TimeFormat time={duration - currentTime} styles={styles}/>*/}
                      {/*: <TimeFormat time={0} styles={styles}/>*/}
                    {/*}*/}
                  {/*</Row>*/}
                  <Row style={{height: 70, width, flexDirection: 'column', justifyContent: 'flex-end'}}>
                    <Text style={styles.videoDescription}>{video.description}</Text>
                  </Row>
                  <Row>
                    <Grid>
                      <Col style={{width: 70, paddingLeft: 10}}>
                        <ProfileImage
                          avatar={video.user.avatarUri}
                          styles={styles}
                          onClick={this.handleUserProfilePress.bind(this, video.user.id)}/>
                      </Col>
                      <Col>
                        <Text style={styles.profileUserName}>{video.user.firstName}</Text>
                        <ScrollView>
                          <View>
                            <HashtagsView tags={video.hashtags} showOnlyText={true}/>
                          </View>
                        </ScrollView>
                      </Col>
                    </Grid>
                  </Row>
                </Grid>
              </Col>
              <Col style={
                {
                  width: 80,
                  marginTop: 30,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              }>
                <RecordButton onClick={this.handleRecordButtonPress.bind(this)} styles={styles}/>
              </Col>
            </Grid>
          </LinearGradient>
        </View>
        <Toast ref="toast"
               position="top"
               textStyle={StyleSheet.flatten(styles.toastText)}
               style={StyleSheet.flatten(styles.toast)}/>
      </View>
    );
  }
}

VideoPlayer.propTypes = {
  video: PropTypes.object,
  styles: PropTypes.object,
  refreshProps: PropTypes.object,
  onNewVideoUploaded: PropTypes.func,
  onLike: PropTypes.func,
  onDislike: PropTypes.func,
  onSkip: PropTypes.func,
};
