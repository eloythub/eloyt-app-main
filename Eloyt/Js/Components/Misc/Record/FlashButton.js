import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Camera from 'react-native-camera';
import torchOnIcon from '../../../../Assets/Images/torch-on-icon.png';
import torchOffIcon from '../../../../Assets/Images/torch-off-icon.png';
import torchAutoIcon from '../../../../Assets/Images/torch-auto-icon.png';

export const FlashButtonMode = {
  on: Camera.constants.FlashMode.on,
  off: Camera.constants.FlashMode.off,
  auto: Camera.constants.FlashMode.auto,
};

export default class FlashButton extends Component {
  click() {
    const {onClick} = this.props;

    return onClick();
  }

  render() {
    const {styles, mode, hidden} = this.props;

    if (hidden) {
      return <View style={styles.torchContainer}/>;
    }

    let imageSource = null;

    switch (mode) {
      case FlashButtonMode.off:
        imageSource = torchOffIcon;
        break;

      case FlashButtonMode.on:
        imageSource = torchOnIcon;
        break;

      case FlashButtonMode.auto:
        imageSource = torchAutoIcon;
        break;
    }

    return (
      <View style={styles.torchContainer}>
        <TouchableOpacity onPress={this.click.bind(this)}>
          <View style={styles.torchButton}>
            <Image source={imageSource} style={styles.torchIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

FlashButton.propTypes = {
  styles: PropTypes.object,
  mode: PropTypes.number,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
};
