import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import checkIcon from '../../../../Assets/Images/check-icon.png';

export default class CheckButton extends Component {
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
      <View style={styles.checkContainer}>
        <TouchableOpacity onPress={this.click.bind(this)}>
          <View style={styles.checkButton}>
            <Image source={checkIcon} style={styles.checkIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

CheckButton.propTypes = {
  styles: PropTypes.object,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
};
