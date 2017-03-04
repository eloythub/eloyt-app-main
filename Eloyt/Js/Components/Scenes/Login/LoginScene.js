import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Button, Text, Platform, NativeModules } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginActions from './LoginActions';
const {StatusBarManager} = NativeModules;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT,
  },
});

class LoginScene extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  render() {
    //const {routes}       = this.context;
    const {loginActions} = this.props;

    return (
      <View style={styles.rootContainer}>
        <Button onPress={loginActions.login} title='login test'/>
        <Text>
          Test Message: {this.props.count}
        </Text>
      </View>
    );
  }
}

LoginScene.propTypes = {
  loginActions: PropTypes.object,
  count: PropTypes.number,
};

const mapStateToProps = (state) => {
  const {LoginReducers} = state;

  return LoginReducers;
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginActions: bindActionCreators(LoginActions, dispatch),
  };
};

const ConnectedLoginScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScene);

export const LoginSceneKey   = 'login';
export const LoginSceneTitle = 'login';

export default ConnectedLoginScene;