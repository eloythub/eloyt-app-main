import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import VideoPlayer from './VideoPlayer';

export default class VideoQueue extends Component {
  componentDidMount() {
  }

  render() {
    const {queue, styles, refreshProps, onLike, onSkip} = this.props;

    return (
      <View style={styles.rootContainer}>
        {
          queue.map((video, videoIndex) => {
            if (videoIndex === queue.length - 1) {
              return <VideoPlayer
                key={videoIndex}
                refreshProps={refreshProps}
                video={video}
                onLike={onLike}
                onSkip={onSkip}
                styles={styles}/>;
            }

            return;
          })
        }
      </View>
    );
  }
}

VideoQueue.propTypes = {
  queue: PropTypes.array,
  refreshProps: PropTypes.object,
  styles: PropTypes.object,
  onLike: PropTypes.func,
  onSkip: PropTypes.func,
};
