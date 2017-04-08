import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import Api from '../../../Libraries/Api';
import LinearGradient from 'react-native-linear-gradient';
import { Pulse } from 'react-native-loader';

export default class VideoPlayer extends Component {
  like(video) {
    const {onLike} = this.props;

    return onLike(video);
  }

  render() {
    const {video, styles} = this.props;

    const thumbnailSource = {
      uri: Api.url(video.resourceThumbnailUri),
    };

    return (
      <View style={styles.videoContainer}>
        <TouchableWithoutFeedback onPress={this.like.bind(this, video)}>
          <View style={styles.loadingContainer}>
            <View style={styles.loading}>
              <Pulse size={40} color="#ffffff"/>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.like.bind(this, video)}>
          <Image style={styles.videoThumbnailImage} source={thumbnailSource}/>
        </TouchableWithoutFeedback>

        <View style={styles.highlightBottomContainer}>
          <LinearGradient
            start={{x: 0, y: 1}} end={{x: 0, y: 0}}
            locations={[0, 0.2, 1]}
            colors={['#000', '#111', 'transparent']}
            style={styles.highlightBottom}>

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
