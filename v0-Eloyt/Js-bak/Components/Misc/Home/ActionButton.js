import React, { Component, PropTypes } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import likeIcon from '../../../../Assets/Images/like-icon.png';
import dislikeIcon from '../../../../Assets/Images/dislike-icon.png';
import skipIcon from '../../../../Assets/Images/skip-icon.png';

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 60,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -20,
  },
  icon: {
    width: 40,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'OpenSans',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  button: {
    width: 90,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class ActionButton extends Component {
  click() {
    const {onClick} = this.props;

    return onClick();
  }

  render() {
    const {hidden, caption, icon} = this.props;

    if (hidden) {
      return <View style={styles.container}/>;
    }

    let selectedIcon;

    switch (icon) {
      case 'like':
        selectedIcon = likeIcon;
        break;
      case 'dislike':
        selectedIcon = dislikeIcon;
        break;
      case 'skip':
        selectedIcon = skipIcon;
        break;
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.click.bind(this)}>
          <View style={styles.button}>
            <Image source={selectedIcon} style={styles.icon}/>
          </View>
          <View>
            <Text style={styles.text}>{caption}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

ActionButton.propTypes = {
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
  caption: PropTypes.string,
  icon: PropTypes.string,

};
