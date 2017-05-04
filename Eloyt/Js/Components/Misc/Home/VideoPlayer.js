import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native';
import Api from '../../../Libraries/Api';
import Utils from '../../../Libraries/Utils';
import Files from '../../../Libraries/Files';
import LinearGradient from 'react-native-linear-gradient';
import { Pulse } from 'react-native-loader';
import ProfileImage from './ProfileImage';
import RecordButton from './RecordButton';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Camera from 'react-native-camera';
//import Video from 'react-native-video';
import TimeFormat from './TimeFormat';
import { Actions, ActionConst } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoFilePath: null,
      videoLoaded: false,
      duration: null,
      currentTime: null,
      paused: false,
    };
  }

  componentWillMount() {
    const {video} = this.props;

    // TODO: temporary read from stream feed, later must be able to cache the video
    //if (Platform.OS === 'ios') {
      return this.setState({
        videoFilePath: Api.url(video.resourceUri),
      });
    //}
    //
    //Files.downloadFile(video.resourceUri)
    //  .then(
    //    (videoFilePath) => {
    //      this.setState({
    //        videoFilePath,
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

  like(video) {
    const {onLike} = this.props;

    return onLike(video);
  }

  skip(video) {
    const {onSkip} = this.props;

    return onSkip(video);
  }

  handleTouchAction(video, proxy) {
    const {onSkip, onLike} = this.props;

    const {nativeEvent: {pageX: touchedPositionx}} = proxy;
    const {width: pageWidth} = Dimensions.get('window');

    // if the touched area was in left side of the page means skip otherwise like
    return touchedPositionx < pageWidth / 2.8 ? onSkip(video) : onLike(video);
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

  handleVideoEnd(data, video) {
    const {onSkip} = this.props;

    this.setState({
      paused: true,
    });

    // it suppose to skip the video
    return onSkip(video);
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
          <Pulse size={40} color="#ffffff"/>
        </View>
      </View>;
    }
  }

  handleVideo() {
    const {styles, video} = this.props;
    const {videoFilePath, paused} = this.state;

    console.log(videoFilePath);
    // Once video was downloaded and ready for preview
    //if (videoFilePath) {
    //  return <Video
    //    source={{uri: videoFilePath, mainVer: 1, patchVer: 0}}
    //    style={styles.video}
    //    muted={false}
    //    paused={paused}
    //    rate={paused ? 0 : 1}
    //    repeat={false}
    //    playInBackground={false}
    //    playWhenInactive={false}
    //    resizeMode='cover'
    //    onProgress={this.handleVideoProgress.bind(this)}
    //    onVideoProgress={this.handleVideoProgress.bind(this)}
    //    onLoadStart={this.handleVideoLoadStart.bind(this)}
    //    onVideoLoadStart={this.handleVideoLoadStart.bind(this)}
    //    onLoad={this.handleVideoLoad.bind(this)}
    //    onVideoLoad={this.handleVideoLoad.bind(this)}
    //    onEnd={this.handleVideoEnd.bind(this, video)}
    //    onVideoEnd={this.handleVideoEnd.bind(this, video)}
    //    onBuffer={this.handleVideoBuffer.bind(this)}
    //    onVideoBuffer={this.handleVideoBuffer.bind(this)}
    //    onError={this.handleVideoError.bind(this)}
    //    onVideoError={this.handleVideoError.bind(this)}
    //  />;
    //}
  }

  handleRecordButtonPress() {
    Utils.all([
      Camera.checkDeviceAuthorizationStatus(),
      Camera.checkVideoAuthorizationStatus(),
      Camera.checkAudioAuthorizationStatus(),
    ]).then((isAuths) => {
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
    });
  }

  render() {
    const {video, styles} = this.props;
    const {duration, currentTime} = this.state;

    return (
      <View style={styles.videoContainer}>
        <TouchableWithoutFeedback onPress={this.handleTouchAction.bind(this, video)}>
          <View style={styles.videoThumbnailImageContainer}>
            {this.handleLoading()}
            {this.handleThumbnail()}
            {this.handleVideo()}
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.highlightBottomContainer}>
          <LinearGradient
            start={{x: 0, y: 1}} end={{x: 0, y: 0}}
            locations={[0, 0.2, 1]}
            colors={['#000', '#111', 'transparent']}
            style={styles.highlightBottom}>
            <Grid>
              <Col>
                <Grid>
                  <Row style={{height: 50}}>
                    {
                      duration && currentTime <= duration
                      ? <TimeFormat time={duration - currentTime} styles={styles}/>
                      : <TimeFormat time={0} styles={styles}/>
                    }
                  </Row>
                  <Row>
                    <Grid>
                      <Col style={{width: 70, paddingLeft: 10}}>
                        <ProfileImage
                          avatar={video.user.avatarUri}
                          styles={styles}
                          onClick={() => { console.log('profile image click'); }}/>
                      </Col>
                      <Col>
                        <Text style={styles.profileUserName}>{video.user.firstName}</Text>
                        <Text style={styles.profileInfo}>{video.user.firstName}</Text>
                      </Col>
                    </Grid>
                  </Row>
                </Grid>
              </Col>
              <Col style={
                {
                  width: 80,
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
  onLike: PropTypes.func,
  onSkip: PropTypes.func,
};
