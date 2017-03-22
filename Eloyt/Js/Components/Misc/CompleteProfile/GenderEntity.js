import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform } from 'react-native';
import RadioButton from 'radio-button-react-native';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: Dimensions.get('window').width - 60,

    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  caption: {
    flex: 1,
    fontFamily: 'OpenSans',
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    fontWeight: Platform.OS === 'ios' ? 'normal' : '100',
    color: '#7d7d7d',
    height: 50,
    paddingTop: 15,
    paddingLeft: Platform.OS === 'ios' ? 0 : 3,
  },
  radioButtonContainer: {
    height: 50,
    paddingTop: 15,
    paddingLeft: 10,

  },
  radioButtonText: {
    fontFamily: 'OpenSans',
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    fontWeight: Platform.OS === 'ios' ? 'normal' : '100',
    color: '#7d7d7d',
    marginLeft: 5,
  },
  radioButtonTextSelected: {
    fontFamily: 'OpenSans',
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    fontWeight: Platform.OS === 'ios' ? 'normal' : '100',
    color: '#ffffff',
    marginLeft: 5,
  },
});

export default class GenderEntity extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  radioButtonOnPress(value) {
    this.setState({value});

    this.props.onPress(value);
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.caption}>GENDER</Text>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="male"
            currentValue={this.state.value}
            outerCircleColor={this.state.value === 'male' ? '#ffffff' : '#7d7d7d'}
            outerCircleSize={24}
            outerCircleWidth={3}
            innerCircleColor="#ffffff"
            innerCircleSize={14}
            onPress={this.radioButtonOnPress.bind(this)}>
            <Text
              style={
                [
                  styles.radioButtonText,
                  (this.state.value === 'male' ? styles.radioButtonTextSelected : {}),
                ]
              }>
              MALE
            </Text>
          </RadioButton>
        </View>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="female"
            currentValue={this.state.value}
            outerCircleColor={this.state.value === 'female' ? '#ffffff' : '#7d7d7d'}
            outerCircleSize={24}
            outerCircleWidth={3}
            innerCircleColor="#ffffff"
            innerCircleSize={14}
            onPress={this.radioButtonOnPress.bind(this)}>
            <Text
              style={
                [
                  styles.radioButtonText,
                  (this.state.value === 'female' ? styles.radioButtonTextSelected : {}),
                ]
              }>
              FEMALE
            </Text>
          </RadioButton>
        </View>
      </View>
    );
  }
}

GenderEntity.propTypes = {
  onPress: PropTypes.func.isRequired,
};
