import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import stopIcon from '../../../../Assets/Images/stop-icon.png';
import Utils from '../../../Libraries/Utils';

export default class StopButton extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);

    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.sin,
      }
    ).start(() => this.animate());
  }

  click(video) {
    const {onClick} = this.props;

    return onClick(video);
  }

  render() {
    const {styles} = this.props;

    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 1],
    });

    return <View style={styles.stopContainer}>
      <TouchableOpacity onPress={this.click.bind(this)}>
        <View style={styles.stopButton}>
          <Animated.Image source={stopIcon}
                          style={[styles.stopIcon, {
                            opacity,
                          }]}/>
        </View>
      </TouchableOpacity>
    </View>;
  }
}

StopButton.propTypes = {
  styles: PropTypes.object,
  onClick: PropTypes.func,
};
