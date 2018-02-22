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
import BackButton from '../../Misc/Record/BackButton';
import RecordButton from '../../Misc/Home/RecordButton';
import StopButton from '../../Misc/Record/StopButton';
import TorchButton, { TorchButtonMode } from '../../Misc/Record/TorchButton';
import CameraSwitchButton from '../../Misc/Record/CameraSwitchButton';
import Camera from 'react-native-camera';

class RecordScene extends Component {
  constructor(props) {
    const {Type, TorchMode} = Camera.constants;

    super(props);

    this.state = {
      isRecording: false,
      camera: {
        type: Type.front,
        torchMode: TorchMode.off,
      },
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
    Actions.pop({
      refresh: {
        refreshProps: {startVideoAgain: true},
      },
    });
  }

  handleFlashButtonPress() {
    const {camera} = this.state;

    switch (camera.torchMode) {
      case TorchButtonMode.off:
        camera.torchMode = TorchButtonMode.on;
        break;
      case TorchButtonMode.on:
        camera.torchMode = TorchButtonMode.auto;
        break;
      case TorchButtonMode.auto:
        camera.torchMode = TorchButtonMode.off;
        break;
    }

    this.setState({camera});
  }

  handleCameraSwitchButtonPress() {
    const {camera} = this.state;
    const {Type}   = Camera.constants;

    camera.type = camera.type === Type.back
      ? Type.front
      : Type.back;

    this.setState({camera});
  }

  handleRecordButtonPress() {
    const {camera}      = this.refs;
    const {CaptureMode} = Camera.constants;

    const options = {
      title: 'Eloyt',
      mode: CaptureMode.video,
      metadata: {},
    };

    camera.capture(options)
      .then((recordedVideo) => {
        Actions.posting({
          type: ActionConst.PUSH_OR_POP,
          recordedVideo,
        });
      })
      .catch((err) => {
        console.log(err);

        this.setState({
          isRecording: false,
        });
      });

    this.setState({
      isRecording: true,
    });
  }

  handleStopButtonPress() {
    const {camera} = this.refs;

    camera.stopCapture();

    this.setState({
      isRecording: false,
    });
  }

  render() {
    const {isRecording, camera}                                                   = this.state;
    const {Orientation, Aspect, CaptureTarget, CaptureMode, CaptureQuality, Type} = Camera.constants;

    return (
      <View style={styles.rootContainer}>
        <StatusBar
          hidden={true}
        />
        <View style={styles.rootMainContainer}>
          <Camera ref="camera"
                  style={styles.camera}
                  keepAwake={true}
                  playSoundOnCapture={false}
                  captureAudio={true}
                  type={camera.type}
                  torchMode={camera.torchMode}
                  captureQuality={CaptureQuality.high}
                  captureTarget={CaptureTarget.temp}
                  captureMode={CaptureMode.video}
                  orientation={Orientation.portrait}
                  aspect={Aspect.fill}>
            <View style={styles.recordController}>
              <View style={styles.topSection}>
                <BackButton onClick={this.handleBackButtonPress.bind(this)} styles={styles} hidden={isRecording}/>
              </View>
              <View style={styles.bottomSection}>
                <TorchButton onClick={this.handleFlashButtonPress.bind(this)}
                             mode={camera.torchMode}
                             styles={styles}
                             hidden={isRecording || camera.type === Type.front}/>
                {
                  isRecording
                    ? <StopButton onClick={this.handleStopButtonPress.bind(this)} styles={styles}/>
                    : <RecordButton onClick={this.handleRecordButtonPress.bind(this)} styles={styles}/>
                }
                <CameraSwitchButton onClick={this.handleCameraSwitchButtonPress.bind(this)} styles={styles}
                                    hidden={isRecording}/>
              </View>
            </View>
          </Camera>
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
