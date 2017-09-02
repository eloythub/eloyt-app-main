// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native'
import Camera from 'react-native-camera'
import DeviceInfo from 'react-native-device-info'
// Essentials
import CloseButton from '../../Components/CloseButton'
import SnapButton from '../../Components/SnapButton'
import { HomeScreenStyles, VideoSnapComponentStyles } from '../../Styles'
import VideoSnapComponentDelegator from '../../Delegators/Components/HomeScene/VideoSnapComponentDelegator'

export default class VideoSnapComponent extends VideoSnapComponentDelegator {
  constructor (props) {
    super(props)

    this.state = {
      isRecording: false,
      isCameraTypeFront: true,
    }
  }

  render () {
    const {isRecording, isCameraTypeFront}                                        = this.state
    const {Orientation, Aspect, CaptureTarget, CaptureMode, CaptureQuality, Type} = Camera.constants

    if (DeviceInfo.isEmulator()) {
      console.log('dev mode cannot work with camera, please use a phone')

      return (
        <View style={VideoSnapComponentStyles.rootContainer}>
          <Text style={HomeScreenStyles.tempPlaceholder}>Dev mode cannot work with camera, Please use a phone</Text>
        </View>
      )
    }

    return (
      <View style={VideoSnapComponentStyles.rootContainer}>
        <Camera
          ref="cameraRef"
          style={VideoSnapComponentStyles.camera}
          keepAwake={true}
          defaultOnFocusComponent={true}
          type={isCameraTypeFront ? Type.front : Type.back}
          captureAudio={true}
          playSoundOnCapture={false}
          //torchMode={camera.torchMode}
          captureMode={CaptureMode.video}
          captureTarget={CaptureTarget.temp}
          orientation={Orientation.portrait}
          captureQuality={CaptureQuality.high}
          aspect={Aspect.fill}
        >
          <TouchableWithoutFeedback onPress={this.onDoubleTapOnScreen.bind(this)}>
            <View style={VideoSnapComponentStyles.backgroundLayer}/>
          </TouchableWithoutFeedback>
          <View style={VideoSnapComponentStyles.topSection}>
            <CloseButton hide={isRecording} onPress={this.close.bind(this)}/>
          </View>
          <View style={VideoSnapComponentStyles.bottomSection}>
            <SnapButton onSnapStarted={this.startSnapping.bind(this)} onSnapEnded={this.finishSnapping.bind(this)}/>
          </View>
        </Camera>
      </View>
    )
  }
}

VideoSnapComponent.propTypes = {
  onSnapStarted: PropTypes.func,
  onSnapEnded: PropTypes.func,
  onClose: PropTypes.func,
}
