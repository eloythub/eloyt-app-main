import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import searchIcon from '../../../../Assets/Images/search-icon.png';
import messageIcon from '../../../../Assets/Images/message-icon.png';
import notificationIcon from '../../../../Assets/Images/notification-icon.png';

export default class TopHighlightIcon extends Component {
  click(video) {
    const {onClick} = this.props;

    return onClick(video);
  }

  render() {
    const {icon, styles, newIcon} = this.props;

    let iconResource, left, bottom;

    switch (icon) {
      case 'search':
        left   = 14;
        bottom = 14;

        iconResource = searchIcon;
        break;
      case 'message':
        left   = 12;
        bottom = 18;

        iconResource = messageIcon;
        break;
      case 'notification':
        left   = 16;
        bottom = 17;

        iconResource = notificationIcon;
        break;
    }

    return (
      <View style={styles.topHighlightIconContainer}>
        <TouchableOpacity onPress={this.click.bind(this)}>
          <Image style={styles.topHighlightIcon} source={iconResource}/>
        </TouchableOpacity>

        {newIcon ? <View style={[styles.topHighlightNewIcon, {left, bottom}]}/> : null}
      </View>
    );
  }
}

TopHighlightIcon.propTypes = {
  newIcon: PropTypes.bool,
  icon: PropTypes.string,
  styles: PropTypes.object,
  onClick: PropTypes.func,
};
