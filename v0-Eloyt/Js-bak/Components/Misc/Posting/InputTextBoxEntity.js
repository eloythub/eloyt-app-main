import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, TextInput, Dimensions, Platform } from 'react-native';

const styles = StyleSheet.create({
  rootContainer: {
    width: Dimensions.get('window').width - 60,
    borderBottomWidth: 0.5,
    borderBottomColor: '#7d7d7d',
  },
  inputBox: {
    fontFamily: 'OpenSans',
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    fontWeight: Platform.OS === 'ios' ? 'normal' : '100',
    color: '#ffffff',
    height: 90,
    paddingBottom: 0,
  },
});

export default class InputTextBoxEntity extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  componentDidMount() {
    this.props.setTextRef(this.refs.textRefObj);
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <TextInput
          ref='textRefObj'
          style={styles.inputBox}
          editable={true}
          multiline={true}
          autoCapitalize="words"
          placeholder={this.state.caption}
          placeholderTextColor="#7d7d7d"
          underlineColorAndroid="transparent"
          enablesReturnKeyAutomatically={true}
          keyboardAppearance="dark"
          numberOfLines={3}
          maxLength={140}
          onChangeText={
            (text) => {
              this.setState({text});

              this.props.onChange(text);
            }
          }
          onSubmitEditing={() => this.props.nextFocusObjectRef ? this.props.nextFocusObjectRef() : null}
          value={this.state.text}
          defaultValue={this.state.default}
        />
      </View>
    );
  }
}

InputTextBoxEntity.propTypes = {
  setTextRef: PropTypes.func,
  name: PropTypes.string,
  default: PropTypes.string,
  caption: PropTypes.string,
  onChange: PropTypes.func,
  nextFocusObjectRef: PropTypes.func,
};