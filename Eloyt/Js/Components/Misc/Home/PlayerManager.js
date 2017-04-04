import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

export default class PlayerManager extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }


  componentDidMount() {
    const {homeActions} = this.props;

    // TODO: call produced data from server and start the process of previewing the videos

  }

  render() {
    const {styles} = this.props;

    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>Home Page</Text>
      </View>
    );
  }
}

PlayerManager.propTypes = {
  HomeReducers: PropTypes.object,
  homeActions: PropTypes.object,
  ssoUserData: PropTypes.object,
  styles: PropTypes.object,
};
