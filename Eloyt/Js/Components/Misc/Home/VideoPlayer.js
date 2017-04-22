import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import Api from '../../../Libraries/Api';
import LinearGradient from 'react-native-linear-gradient';
import { Pulse } from 'react-native-loader';
import ProfileImage from './ProfileImage';
import RecordButton from './RecordButton';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Files from '../../../Libraries/Files';

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoFilePath: false,
    };
  }

  componentDidMount() {
    const {video} = this.props;

    Files.downloadFile(video.resourceUri)
      .then(
        (videoFilePath) => {
          this.setState({
            videoFilePath,
          });
        },
        () => {
          // TODO: show a toast later to video has being failed to load
          this.setState({
            videoFilePath: null,
          });
        }
      )
      .catch(() => {
        // TODO: show a toast later to video has being failed to load
        this.setState({
          videoFilePath: null,
        });
      });
  }

  like(video) {
    const {onLike} = this.props;

    return onLike(video);
  }

  handleVideoAndThumbnail() {
    const {video, styles} = this.props;

    // Once video was downloaded and ready for preview
    if (this.state.videoFilePath) {
      return (
        <View style={styles.videoThumbnailImageContainer}>
        </View>
      );
    }

    const thumbnailSource = {
      uri: Api.url(video.resourceThumbnailUri),
    };

    return (
      <View style={styles.videoThumbnailImageContainer}>
        <Image style={styles.videoThumbnailImage} source={thumbnailSource}/>
      </View>
    );
  }

  render() {
    const {video, styles} = this.props;

    return (
      <View style={styles.videoContainer}>
        <TouchableWithoutFeedback onPress={this.like.bind(this, video)}>
          <View style={styles.loadingContainer}>
            <View style={styles.loading}>
              <Pulse size={40} color="#ffffff"/>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={{flex: 1}} onPress={this.like.bind(this, video)}>
          {this.handleVideoAndThumbnail()}
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
};
