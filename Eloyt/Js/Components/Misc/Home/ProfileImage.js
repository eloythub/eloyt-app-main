import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Api from '../../../Libraries/Api';

export default class ProfileImage extends Component {
  click(avatar) {
    const {userId, onClick} = this.props;

    return onClick(userId, avatar);
  }

  render() {
    const {userId, avatar, styles, width = 55, height = 55} = this.props;

    let borderRadius = width / 2;

    const thumbnailSource = {
      uri: userId ? Api.getProfileAvatar(userId, avatar) : Api.url(avatar),
    };

    return (
      <View style={[styles.profileImageContainer, {width, height, borderRadius}]}>
        <TouchableOpacity onPress={this.click.bind(this, avatar)}>
          <Image style={[styles.profileImage, {width, height, borderRadius}]} source={thumbnailSource}/>
        </TouchableOpacity>
      </View>
    );
  }
}

ProfileImage.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  userId: PropTypes.string,
  avatar: PropTypes.string,
  styles: PropTypes.object,
  onClick: PropTypes.func,
};
