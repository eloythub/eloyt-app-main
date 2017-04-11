import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import recordIcon from '../../../../Assets/Images/record-icon.png';

export default class RecordButton extends Component {
  click(video) {
    const {onClick} = this.props;

    return onClick(video);
  }

  render() {
    const {styles} = this.props;

    return (
      <View style={styles.recordContainer}>
        <TouchableOpacity onPress={this.click.bind(this)}>
          <View style={styles.recordButton}>
            <Image source={recordIcon} style={styles.recordIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

RecordButton.propTypes = {
  styles: PropTypes.object,
  onClick: PropTypes.func,
};
