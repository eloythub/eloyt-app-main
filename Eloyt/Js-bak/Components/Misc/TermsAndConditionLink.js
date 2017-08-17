import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking, Alert } from 'react-native';

const styles = StyleSheet.create({
  rootContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  termsAndServicesText: {
    fontSize: 12,
    fontFamily: 'OpenSans',
    flexDirection: 'column',
    color: '#ffffff',
  },
  termsAndServicesLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
        <Text>{' '}</Text>
        <TouchableOpacity onPress={this.onTermsAndServicesLink.bind(this)}>
          <Text style={[styles.termsAndServicesText, styles.termsAndServicesLink]}>Terms Of Services</Text>
        </TouchableOpacity>
      </View>
    );
  }
}