import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import settingIcon from '../../../../Assets/Images/setting-icon.png';

export default class SettingsButton extends Component {
  click() {
    const {onClick} = this.props;

    return onClick();
  }

  render() {
    const {styles, hidden} = this.props;

    if (hidden) {
      return <View style={styles.settingsContainer}/>;
    }

    return (
      <View style={styles.settingsContainer}>
        <TouchableOpacity onPress={this.click.bind(this)}>
          <View style={styles.settingsButton}>
            <Image source={settingIcon} style={styles.settingsIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

SettingsButton.propTypes = {
  styles: PropTypes.object,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
};
