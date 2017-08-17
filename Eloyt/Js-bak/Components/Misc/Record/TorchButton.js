import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Camera from 'react-native-camera';
import torchOnIcon from '../../../../Assets/Images/torch-on-icon.png';
import torchOffIcon from '../../../../Assets/Images/torch-off-icon.png';
import torchAutoIcon from '../../../../Assets/Images/torch-auto-icon.png';

export const TorchButtonMode = {
  on: Camera.constants.TorchMode.on,
  off: Camera.constants.TorchMode.off,
  auto: Camera.constants.TorchMode.auto,
};

export default class TorchButton extends Component {
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
      case TorchButtonMode.off:
        imageSource = torchOffIcon;
        break;

      case TorchButtonMode.on:
        imageSource = torchOnIcon;
        break;

      case TorchButtonMode.auto:
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

TorchButton.propTypes = {
  styles: PropTypes.object,
  mode: PropTypes.number,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
};
