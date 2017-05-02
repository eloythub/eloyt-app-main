import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import torchOnIcon from '../../../../Assets/Images/torch-on-icon.png';
import torchOffIcon from '../../../../Assets/Images/torch-off-icon.png';

export default class TorchButton extends Component {
  click() {
    const {onClick} = this.props;

    return onClick();
  }

  render() {
    const {styles, isOn, hidden} = this.props;

    if (hidden) {
      return <View style={styles.torchContainer}/>;
    }

    return (
      <View style={styles.torchContainer}>
        <TouchableOpacity onPress={this.click.bind(this)}>
          <View style={styles.torchButton}>
            <Image source={isOn ? torchOnIcon : torchOffIcon} style={styles.torchIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

TorchButton.propTypes = {
  styles: PropTypes.object,
  isOn: PropTypes.bool,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
};
