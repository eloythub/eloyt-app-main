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
import FlashButton, { FlashButtonMode } from '../../Misc/Record/FlashButton';
import CameraSwitchButton from '../../Misc/Record/CameraSwitchButton';
import Utils from '../../../Libraries/Utils';
import { Bubbles } from 'react-native-loader';
import Camera from 'react-native-camera';

class RecordScene extends Component {
  constructor(props) {
    const {Type, FlashMode} = Camera.constants;

    super(props);

    this.state = {
      isRecording: false,
      waiting: true,
      camera: {
        type: Type.front,
        flashMode: FlashMode.off,
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

        this.setState({
          waiting: false,
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

    Utils.next().then(() => Actions.pop());
  }

  handleFlashButtonPress() {
    const {camera} = this.state;

    switch (camera.flashMode) {
      case FlashButtonMode.off:
        camera.flashMode = FlashButtonMode.on;
        break;
      case FlashButtonMode.on:
        camera.flashMode = FlashButtonMode.auto;
        break;
      case FlashButtonMode.auto:
        camera.flashMode = FlashButtonMode.off;
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

  handleLoading() {
    const {waiting} = this.state;

    if (waiting) {
      return <View style={styles.loadingContainer}>
        <View style={styles.loading}>
          <Bubbles size={40} color="#ffffff"/>
        </View>
      </View>;
    }
  }

  handleRecordButtonPress() {
    const {camera}      = this.refs;
    const {CaptureMode} = Camera.constants;

    const options = {
      mode: CaptureMode.video,
      metadata: {},
    };

    camera.capture(options)
      .then((data) => {
        console.log(data);
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

    camera.stopCapture((data) => {
      console.log(data);
    });

    this.setState({
      isRecording: false,
    });
  }

  render() {
    const {isRecording, camera}                                             = this.state;
    const {Orientation, Aspect, CaptureTarget, CaptureMode, CaptureQuality} = Camera.constants;

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
                  flashMode={camera.flashMode}
                  captureQuality={CaptureQuality.medium}
                  captureTarget={CaptureTarget.cameraRoll}
                  captureMode={CaptureMode.video}
                  orientation={Orientation.portrait}
                  aspect={Aspect.fill}>
            <View style={styles.recordController}>
              {this.handleLoading()}
              <View style={styles.topSection}>
                <BackButton onClick={this.handleBackButtonPress.bind(this)} styles={styles} hidden={isRecording}/>
              </View>
              <View style={styles.bottomSection}>
                <FlashButton onClick={this.handleFlashButtonPress.bind(this)}
                             mode={camera.flashMode}
                             styles={styles}
                             hidden={isRecording}/>
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
