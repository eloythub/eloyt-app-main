import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import cancelIcon from '../../../../Assets/Images/cancel-icon.png';

export default class CancelButton extends Component {
  click() {
    const {onClick} = this.props;

    return onClick();
  }

  render() {
    const {styles, hidden} = this.props;

    if (hidden) {
      return <View style={styles.backContainer}/>;
    }

    return (
      <View style={styles.cancelContainer}>
        <TouchableOpacity onPress={this.click.bind(this)}>
          <View style={styles.cancelButton}>
            <Image source={cancelIcon} style={styles.cancelIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

CancelButton.propTypes = {
  styles: PropTypes.object,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
};
