import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import reTryIcon from '../../../../Assets/Images/retry-icon.png';

export default class ReTryButton extends Component {
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
      <View style={styles.retryContainer}>
        <TouchableOpacity onPress={this.click.bind(this)}>
          <View style={styles.retryButton}>
            <Image source={reTryIcon} style={styles.retryIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

ReTryButton.propTypes = {
  styles: PropTypes.object,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
};
