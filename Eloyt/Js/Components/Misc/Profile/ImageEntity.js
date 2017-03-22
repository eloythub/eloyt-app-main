import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import profileUserImage from '../../../../Assets/Images/profile-user.png';

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'transparent',
  },
  imageWrapper: {
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#b7b7b7',
    borderStyle: 'dashed',
    overflow: 'hidden',
    width: 120,
    height: 120,
  },
  emptyProfileUserImage: {
    width: 100,
    height: 100,
    left: 7,
    top: 6,
  },
  profileUserImage: {
    flex:1,
    borderWidth: 3,
    borderColor: '#b7b7b7',
    borderRadius: 60,
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
});

class EmptyProfileUserImage extends Component {
  render() {
    return (
      <View style={styles.imageWrapper}>
        <Image source={profileUserImage} style={styles.emptyProfileUserImage}/>
      </View>
    );
  }
}

class ProfileUserImage extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  render() {
    return (
      <Image source={{uri: this.state.imageUrl}} style={styles.profileUserImage}/>
    );
  }
}

export default class ImageEntity extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        {
          this.state.imageUrl
          ? <ProfileUserImage imageUrl={this.state.imageUrl} />
          : <EmptyProfileUserImage  />
        }
      </View>
    );
  }
}

profileUserImage.propTypes = ImageEntity.propTypes = {
  imageUrl: PropTypes.string,
};
