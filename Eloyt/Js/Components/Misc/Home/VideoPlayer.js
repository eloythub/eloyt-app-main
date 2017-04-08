import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import Api from '../../../Libraries/Api';

export default class VideoPlayer extends Component {
  componentDidMount() {
  }

  render() {
    const {video, styles, onLike} = this.props;

    const thumbnailSource = {
      uri: Api.url(video.resourceThumbnailUri),
    };

    return (
      <View style={styles.videoContainer}>
        <TouchableWithoutFeedback onPress={onLike.bind(this, video)}>
          <Image style={styles.videoThumbnailImage} source={thumbnailSource}/>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

VideoPlayer.propTypes = {
  video: PropTypes.object,
  styles: PropTypes.object,
  onLike: PropTypes.func,
};
