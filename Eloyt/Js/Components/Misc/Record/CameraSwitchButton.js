import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import cameraSwitchIcon from '../../../../Assets/Images/camera-switch-icon.png';

export default class CameraSwitchButton extends Component {
  click() {
    const {onClick} = this.props;

    return onClick();
  }

  render() {
    const {styles, hidden} = this.props;

    if (hidden) {
      return <View style={styles.cameraSwitchContainer}/>;
    }

    return <View style={styles.cameraSwitchContainer}>
      <TouchableOpacity onPress={this.click.bind(this)}>
        <View style={styles.cameraSwitchButton}>
          <Image source={cameraSwitchIcon} style={styles.cameraSwitchIcon}/>
        </View>
      </TouchableOpacity>
    </View>;
  }
}

CameraSwitchButton.propTypes = {
  styles: PropTypes.object,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
};
