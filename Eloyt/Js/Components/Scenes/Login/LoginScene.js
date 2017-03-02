import React, { Component, PropTypes } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

export default class LoginScene extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  render() {
    const {routes} = this.context;

    return (
      <View style={styles.rootContainer}>
        <Text>Login Scene</Text>
        <Button onPress={routes.refresh} title="Login" />
      </View>
    );
  }
}

export const LoginSceneKey   = 'login';
export const LoginSceneTitle = 'login';
