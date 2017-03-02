import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';

export default class LoginScene extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  render() {
    const {routes} = this.context;

    return (
      <View>
        <Text>Login Scene</Text>
      </View>
    );
  }
}

export const LoginSceneKey = 'login';
export const LoginSceneTitle = 'login';
