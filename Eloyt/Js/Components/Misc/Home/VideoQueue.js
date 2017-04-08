import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import VideoPlayer from './VideoPlayer';

export default class VideoQueue extends Component {
  componentDidMount() {
  }

  render() {
    const {queue, styles, onLike} = this.props;

    return (
      <View style={styles.rootContainer}>
        {
          queue.map((video, videoIndex) => {
            return <VideoPlayer
              key={videoIndex}
              video={video}
              onLike={onLike}
              styles={styles}/>;
          })
        }
      </View>
    );
  }
}

VideoQueue.propTypes = {
  queue: PropTypes.array,
  styles: PropTypes.object,
  onLike: PropTypes.func,
};
