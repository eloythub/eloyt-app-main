import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Platform, TouchableOpacity, Linking, Alert } from 'react-native';

const styles = StyleSheet.create({
  rootContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  termsAndServicesText: {
    fontSize: Platform.OS === 'android' ? 14 : 12,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'HelveticaNeue-Thin',
    fontWeight: 'bold',
    flexDirection: 'column',
  },
  termsAndServicesLink: {
    color: 'blue',
  },
});

export default class TermsAndConditionLink extends Component {
  onTermsAndServicesLink() {
    const url = 'https://eloyt.com/terms';

    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        Alert.alert('You need to review : ' + url);
      } else {
        return Linking.openURL(url);
      }
    });
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.termsAndServicesText}>
          By Using This App You Agreed Our
        </Text>
        <TouchableOpacity onPress={this.onTermsAndServicesLink.bind(this)}>
          <Text style={[styles.termsAndServicesText, styles.termsAndServicesLink]}> Terms Of Services</Text>
        </TouchableOpacity>

      </View>
    );
  }
}