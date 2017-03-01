import React, { Component } from 'react';
import { View, Text, StyleSheet, AppRegistry } from 'react-native';

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
});

export default class BootstrapView extends Component {
  render() {
    return (
      <View style={styles.bodyContainer}>
        <View>
          <Text>Test Test</Text>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('Eloyt', () => BootstrapView);