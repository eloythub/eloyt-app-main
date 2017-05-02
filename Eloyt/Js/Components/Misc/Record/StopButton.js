import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import stopIcon from '../../../../Assets/Images/stop-icon.png';

export default class StopButton extends Component {
  click(video) {
    const {onClick} = this.props;

    return onClick(video);
  }

  render() {
    const {styles} = this.props;

    return (
      <View style={styles.stopContainer}>
        <TouchableOpacity onPress={this.click.bind(this)}>
          <View style={styles.stopButton}>
            <Image source={stopIcon} style={styles.stopIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

StopButton.propTypes = {
  styles: PropTypes.object,
  onClick: PropTypes.func,
};
