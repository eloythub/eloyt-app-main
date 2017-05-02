import React, { Component, PropTypes } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RecordActions from './RecordActions';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import { styles } from './RecordStyles';
import { Actions, ActionConst } from 'react-native-router-flux';
import { LoginManager } from 'react-native-fbsdk';
import LocalStorage from '../../../Libraries/LocalStorage';
import { Grid, Row } from 'react-native-easy-grid';
import BackButton from '../../Misc/Record/BackButton';
import RecordButton from '../../Misc/Home/RecordButton';
import StopButton from '../../Misc/Record/StopButton';
import TorchButton from '../../Misc/Record/TorchButton';
import CameraSwitchButton from '../../Misc/Record/CameraSwitchButton';
import Utils from '../../../Libraries/Utils';
import { Bubbles } from 'react-native-loader';

class RecordScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRecording: false,
      waiting: true,
    };
  }

  componentDidMount() {
    const {recordActions} = this.props;

    LocalStorage.load(LoginActionsConst.ON_SSO_USER_DATA)
      .then((ssoUserData) => {
        recordActions.setUserLogin({
          ssoUserData,
        });
      })
      .catch(() => {
        LoginManager.logOut();

        Actions.login({
          type: ActionConst.REPLACE,
        });
      });
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  handleBackButtonPress() {
    this.setState({
      waiting: false,
    });

    Utils.next().then(() => {Actions.pop()});
  }

  handleRecordButtonPress() {
    this.setState({
      isRecording: true,
    });
  }

  handleStopButtonPress() {
    this.setState({
      isRecording: false,
    });
  }

  handleTorchButtonPress() {
  }

  handleCameraSwitchButtonPress() {
  }

  postRender() {
    const {recordActions} = this.props;

    return (
      <View style={styles.rootMainPostContainer}>

      </View>
    );
  }

  handleLoading() {
    const {waiting} = this.state;

    if (waiting) {
      return <View style={styles.loading}>
        <Bubbles size={40} color="#ffffff"/>
      </View>;
    }
  }

  render() {
    const {isRecording} = this.state;

    return (
      <View style={styles.rootContainer}>
        <StatusBar
          hidden={true}
        />
        <View style={styles.rootMainContainer}>
          <Grid style={styles.recordCamera}>
            <Row style={StyleSheet.flatten(styles.camera)}>

            </Row>
          </Grid>
          <Grid style={styles.recordController}>
            <Row style={StyleSheet.flatten(styles.topSection)}>
              <BackButton onClick={this.handleBackButtonPress.bind(this)} styles={styles} hidden={isRecording}/>
            </Row>
            <Row style={StyleSheet.flatten(styles.midSection)}>
              {this.handleLoading()}
            </Row>
            <Row style={StyleSheet.flatten(styles.bottomSection)}>
              <TorchButton onClick={this.handleTorchButtonPress.bind(this)} isOn={true} styles={styles} hidden={isRecording}/>
              {
                isRecording
                  ? <StopButton onClick={this.handleStopButtonPress.bind(this)} styles={styles}/>
                  : <RecordButton onClick={this.handleRecordButtonPress.bind(this)} styles={styles}/>
              }
              <CameraSwitchButton onClick={this.handleCameraSwitchButtonPress.bind(this)} styles={styles} hidden={isRecording}/>
            </Row>
          </Grid>
          {this.props.ssoUserData ? this.postRender() : null}
        </View>
      </View>
    );
  }
}

RecordScene.propTypes = {
  RecordReducers: PropTypes.object,
  recordActions: PropTypes.object,
  ssoUserData: PropTypes.object,
};

const mapStateToProps = (state) => {
  const {RecordReducers} = state;

  const {ssoUserData} = RecordReducers;

  return {
    RecordReducers,
    ssoUserData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    recordActions: bindActionCreators(RecordActions, dispatch),
  };
};

const ConnectedRecordScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordScene);

export const RecordSceneKey   = 'record';
export const RecordSceneTitle = 'Record';

export default ConnectedRecordScene;
