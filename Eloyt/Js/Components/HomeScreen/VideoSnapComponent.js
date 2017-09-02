// Basics
import React from 'react'
//import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import Camera from 'react-native-camera';
import DeviceInfo from 'react-native-device-info'
// Essentials
import { HomeScreenStyles, VideoSnapComponentStyles } from '../../Styles'
import VideoSnapComponentDelegator from '../../Delegators/Components/HomeScene/VideoSnapComponentDelegator'


export default class VideoSnapComponent extends VideoSnapComponentDelegator {
  constructor (props) {
    super(props)

    this.state = props
  }

  render () {
    const {Orientation, Aspect, CaptureTarget, CaptureMode, CaptureQuality, Type} = Camera.constants;

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
        </Camera>
      </View>
    )
  }
}

VideoSnapComponent.propTypes = {}
