import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import Api from '../../../Libraries/Api';

export default class ProfileImage extends Component {
  click(video) {
    const {onClick} = this.props;

    return onClick(video);
  }

  render() {
    const {video, styles} = this.props;

    const thumbnailSource = {
      uri: Api.url(video.user.avatarUri),
    };

    return (
      <View style={styles.profileImageContainer}>
        <TouchableWithoutFeedback onPress={this.click.bind(this, video)}>
          <Image style={styles.profileImage} source={thumbnailSource}/>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

ProfileImage.propTypes = {
  video: PropTypes.object,
  styles: PropTypes.object,
  onClick: PropTypes.func,
};
