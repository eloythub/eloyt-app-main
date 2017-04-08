import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

export default class VideoPlayer extends Component {
  componentDidMount() {
  }

  render() {
    const {video, styles} = this.props;

    console.log(styles);

    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>Home Page {video.id}</Text>
      </View>
    );
  }
}

VideoPlayer.propTypes = {
  video: PropTypes.object,
  styles: PropTypes.object,
};
