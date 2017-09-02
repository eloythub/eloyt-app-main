// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Text, TouchableWithoutFeedback, View } from 'react-native'
import Camera from 'react-native-camera'
import DeviceInfo from 'react-native-device-info'
import { BlurView } from 'react-native-blur'
// Essentials
import InputTextBoxEntity from '../../Components/InputTextBoxEntity'
import CloseButton from '../../Components/CloseButton'
import SnapButton from '../../Components/SnapButton'
import { HomeScreenStyles, VideoSnapComponentStyles } from '../../Styles'
import VideoSnapComponentDelegator from '../../Delegators/Components/HomeScene/VideoSnapComponentDelegator'
import HashtagSelectorEntity from '../../Components/HashtagSelectorEntity'

export default class VideoSnapComponent extends VideoSnapComponentDelegator {
  constructor (props) {
    super(props)

    this.description      = ''
    this.selectedHashtags = []

    this.state = {
      isRecording: false,
      isCameraTypeFront: true,
      isUploadMode: false,
    }
  }

  renderUploadModal () {
    const {isUploadMode} = this.state

    return (
      <Modal
        ref="uploadModalRef"
        visible={isUploadMode}
        transparent={true}
        animationType="slide"
        onRequestClose={() => this.setState({isUploadMode: false})}>
        <View>
          <BlurView blurType="prominent" overlayColor="#ffffff" blurAmount={10}
                    style={VideoSnapComponentStyles.uploadBlurView}>
            <View style={VideoSnapComponentStyles.postingEntitiesContainer}>
              <View style={VideoSnapComponentStyles.entitiesContainer}>
                <InputTextBoxEntity caption="DESCRIPTION"
                                    name="description"
                                    onChange={(text) => this.description = text}
                                    numberOfLines={3}
                                    maxLength={140}
                                    height={120}
                                    multiline={true}/>
                <HashtagSelectorEntity src={this.hashtags}
                                       initSelected={this.selectedHashtags}
                                       onChange={(selectedHashtags) => this.selectedHashtags = selectedHashtags}/>
              </View>
            </View>
            <View style={VideoSnapComponentStyles.modalTopSection}>
              <CloseButton onPress={() => {
                console.log('is upload mode to false')
                this.setState({isUploadMode: false})
              }}/>
              {/*<CloseButton onPress={this.discardUpload.bind(this)}/>*/}
            </View>
          </BlurView>
        </View>
      </Modal>
    )
  }

  renderControllers () {
    const {isRecording} = this.state

    return (
      <View style={VideoSnapComponentStyles.rootContainer}>
        <View style={VideoSnapComponentStyles.topSection}>
          <CloseButton hide={isRecording} onPress={this.close.bind(this)}/>
        </View>
        <View style={VideoSnapComponentStyles.bottomSection}>
          <SnapButton onSnapStarted={this.startSnapping.bind(this)} onSnapEnded={this.finishSnapping.bind(this)}/>
        </View>
      </View>
    )
  }

  render () {
    const {isCameraTypeFront} = this.state

    const {Orientation, Aspect, CaptureTarget, CaptureMode, CaptureQuality, Type} = Camera.constants

    if (DeviceInfo.isEmulator()) {
      console.log('dev mode cannot work with camera, please use a phone')

      return (
        <View style={VideoSnapComponentStyles.rootPlaceholderContainer}>
          <Text style={HomeScreenStyles.placeholder}>Dev mode cannot work with camera.{'\n'}Please use a phone</Text>
        </View>
      )
    }

    return (
      <View style={VideoSnapComponentStyles.rootContainer}>
        <TouchableWithoutFeedback onPress={this.onDoubleTapOnScreen.bind(this)}>
          <Camera
            ref="cameraRef"
            style={VideoSnapComponentStyles.camera}
            keepAwake={true}
            type={isCameraTypeFront ? Type.front : Type.back}
            captureAudio={true}
            playSoundOnCapture={false}
            defaultOnFocusComponent={false}
            onFocusChanged={() => true}
            //torchMode={camera.torchMode}
            captureMode={CaptureMode.video}
            captureTarget={CaptureTarget.temp}
            orientation={Orientation.portrait}
            captureQuality={CaptureQuality.high}
            aspect={Aspect.fill}
          >
            {this.renderControllers()}
          </Camera>
        </TouchableWithoutFeedback>
        {this.renderUploadModal()}
      </View>
    )
  }
}

VideoSnapComponent.propTypes = {
  onSnapStarted: PropTypes.func,
  onSnapEnded: PropTypes.func,
  onClose: PropTypes.func,
}
