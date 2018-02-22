import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import postingIcon from '../../../../Assets/Images/posting-icon.png';

export default class PostingButton extends Component {
  click() {
    const {onClick} = this.props;

    return onClick();
  }

  render() {
    const {styles, hidden} = this.props;

    if (hidden) {
      return <View style={styles.postingContainer}/>;
    }

    return (
      <View style={styles.postingContainer}>
        <TouchableOpacity onPress={this.click.bind(this)}>
          <View style={styles.postingButton}>
            <Image source={postingIcon} style={styles.postingIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

PostingButton.propTypes = {
  styles: PropTypes.object,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
};
