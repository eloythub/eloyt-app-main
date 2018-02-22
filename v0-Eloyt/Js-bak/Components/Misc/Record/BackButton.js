import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import arrowLeftIcon from '../../../../Assets/Images/arrow-left-icon.png';

export default class BackButton extends Component {
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
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={this.click.bind(this)}>
          <View style={styles.backButton}>
            <Image source={arrowLeftIcon} style={styles.backIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

BackButton.propTypes = {
  styles: PropTypes.object,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
};
