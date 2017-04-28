import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Api from '../../../Libraries/Api';
import LinearGradient from 'react-native-linear-gradient';
import { Pulse } from 'react-native-loader';
import ProfileImage from './ProfileImage';
import RecordButton from './RecordButton';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Video from 'react-native-video';

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoFilePath: null,
      videoLoaded: false,
    };
  }

  componentDidMount() {
    const {video} = this.props;

    // TODO: temporary read from stream feed, later must be able to cache the video
    this.setState({
      videoFilePath: Api.url(video.resourceUri),
    });

    //Files.downloadFile(video.resourceUri)
    //  .then(
    //    (videoFilePath) => {
    //      this.setState({
    //        videoFilePath,
    //      });
    //    },
    //    (e) => {
    //      console.log(e)
    //      // TODO: show a toast later to video has being failed to load
    //      this.setState({
    //        videoFilePath: null,
    //      });
    //    }
    //  )
    //  .catch((e) => {
    //  console.log(e)
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

    return touchedPositionx < pageWidth / 2.8 ? onSkip(video) : onLike(video);
  }

  handleVideoLoad(data, video) {
    console.log('handle Video Load', data, video);
    this.setState({
      videoLoaded: true,
    });
  }

  handleVideoLoadStart(data, video) {
    console.log('handle Video Load Start', data, video);
  }

  handleVideoEnd(data, video) {
    console.log('handle Video End', data, video);
    const {onSkip} = this.props;

    // it suppose to skip the video
    return onSkip(video);
  }

  handleVideoBuffer(data, video) {
    console.log('handle Video Buffer', data, video);
  }

  handleVideoError(data, video) {
    console.log('handle Video Error', data, video);
  }

  handleVideo() {
    const {styles, video} = this.props;

    // Once video was downloaded and ready for preview
    if (this.state.videoFilePath) {
      return <Video
        ref={(ref) => this.player = ref}
        playWhenInactive={false}
        playInBackground={false}
        paused={false}
        rate={1}
        resizeMode='cover'
        source={{type: 'mp4', uri: this.state.videoFilePath}}
        style={styles.video}

        onLoadStart={this.handleVideoLoadStart.bind(this, video)}
        onLoad={this.handleVideoLoad.bind(this, video)}
        onEnd={this.handleVideoEnd.bind(this, video)}
        onBuffer={this.handleVideoBuffer.bind(this, video)}
        onError={this.handleVideoError.bind(this, video)}
      />;
    }
  }

  handleThumbnail() {
    const {video, styles} = this.props;

    const thumbnailSource = {
      uri: Api.url(video.resourceThumbnailUri),
    };

    // Once video was downloaded and ready for preview
    if (!this.state.videoLoaded) {
      return <Image style={styles.videoThumbnailImage} source={thumbnailSource}/>;
    }
  }

  handleLoading() {
    const {styles} = this.props;

    // Once video was downloaded and ready for preview
    if (!this.state.videoLoaded) {
      return <View style={styles.loadingContainer}>
        <View style={styles.loading}>
          <Pulse size={40} color="#ffffff"/>
        </View>
      </View>;
    }
  }

  render() {
    const {video, styles} = this.props;

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
                    <Text style={styles.videoTimer}>02:20</Text>
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
                <RecordButton onClick={() => {console.log('record button click');}} styles={styles}/>
              </Col>
            </Grid>
          </LinearGradient>
        </View>
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
