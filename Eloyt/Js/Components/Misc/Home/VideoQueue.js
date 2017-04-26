import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import VideoPlayer from './VideoPlayer';

export default class VideoQueue extends Component {
  componentDidMount() {
  }

  render() {
    const {queue, styles, onLike, onSkip} = this.props;

    console.log(queue);

    return (
      <View style={styles.rootContainer}>
        {
          queue.map((video, videoIndex) => {
            if (videoIndex === queue.length - 1) {
              console.log(video);
              return <VideoPlayer
                key={videoIndex}
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
  styles: PropTypes.object,
  onLike: PropTypes.func,
  onSkip: PropTypes.func,
};
