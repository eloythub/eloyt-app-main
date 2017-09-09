// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Modal, Text, TouchableWithoutFeedback, View } from 'react-native'
import Camera from 'react-native-camera'
import DeviceInfo from 'react-native-device-info'
import { BlurView, VibrancyView } from 'react-native-blur'
import Swiper from 'react-native-swiper'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Bars } from 'react-native-loader'
// Essentials
import InputTextBoxEntity from '../../Components/InputTextBoxEntity'
import OkButton from '../../Components/OkButton'
import CloseButton from '../../Components/CloseButton'
import SnapButton from '../../Components/SnapButton'
import { HomeScreenStyles, VideoSnapComponentStyles, WaitingComponentStyles } from '../../Styles'
import VideoSnapComponentDelegator from '../../Delegators/Components/HomeScene/VideoSnapComponentDelegator'
import HashtagSelectorEntity from '../../Components/HashtagSelectorEntity'

const {width}  = Dimensions.get('window');

export default class VideoSnapComponent extends VideoSnapComponentDelegator {
  constructor (props) {
    super(props)

    this.description      = ''
    this.selectedHashtags = []

    this.state = {
      isRecording: false,
      isCameraTypeFront: true,
      isUploadMode: false,
      isCameraFadeFilterAppears: false,
      uploadProgress: 0,
    }
  }

  renderUploadProgress () {
    const {uploadProgress} = this.state

    return (
      <View style={VideoSnapComponentStyles.uploadSlide}>
        <View style={VideoSnapComponentStyles.placeholderContainer}>
          <View style={VideoSnapComponentStyles.progressContainer}>
            <AnimatedCircularProgress
              size={width - 50}
              rotation={0}
              width={10}
              fill={uploadProgress}
              backgroundColor="rgba(0, 0, 0, 0.3)"
              tintColor="rgba(0, 203, 118, 0.7)"
              style={VideoSnapComponentStyles.progressBarObject}>
              {
                (fill) => (
                  <Text style={VideoSnapComponentStyles.progressBar}>
                    { parseInt(fill) }
                  </Text>
                )
              }
            </AnimatedCircularProgress>
          </View>
        </View>
        <View style={VideoSnapComponentStyles.modalTopSection}>
          <CloseButton onPress={this.cancelUpload.bind(this)}/>
          <View style={[WaitingComponentStyles.mainWaiting, {marginRight: 5}]}>
            <Bars size={8} color="#ffffff"/>
          </View>
        </View>
      </View>
    )
  }

  renderPreUpload () {
    return (
      <View style={VideoSnapComponentStyles.uploadSlide}>
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
          <CloseButton onPress={this.discardUpload.bind(this)}/>
          <OkButton onPress={this.startUploadingSnap.bind(this)}/>
        </View>
      </View>
    )
  }

  renderUploadModal () {
    const {isUploadMode} = this.state

    const uploadSwiperProperties = {
      ref: 'uploadSwiperRef',
      index: 0,
      loop: false,
      bounces: true,
      autoplay: false,
      horizontal: true,
      loadMinimal: true,
      showsButtons: false,
      showsPagination: false,
      scrollEnabled: false
    }

    return (
      <Modal
        visible={isUploadMode}
        transparent={true}
        animationType="fade"
        onRequestClose={() => this.setState({isUploadMode: false})}>
        <View>
          <BlurView blurType="prominent" overlayColor="#ffffff" blurAmount={10}
                    style={VideoSnapComponentStyles.uploadBlurView}>
            <Swiper {...uploadSwiperProperties}>
              {this.renderPreUpload()}
              {this.renderUploadProgress()}
            </Swiper>
          </BlurView>
        </View>
      </Modal>
    )
  }

  renderCameraFadeFilterModal () {
    const {isCameraFadeFilterAppears} = this.state

    return (
      <Modal
        visible={isCameraFadeFilterAppears}
        transparent={true}
        animationType="fade"
        onRequestClose={() => this.setState({isCameraFadeFilterAppears: false})}>
        <View>
          <VibrancyView blurType="xlight" overlayColor="#ffffff" blurAmount={20}
                    style={VideoSnapComponentStyles.uploadBlurView}/>
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
            keepAwake={false}
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
        {this.renderCameraFadeFilterModal()}
      </View>
    )
  }
}

VideoSnapComponent.propTypes = {
  onSnapStarted: PropTypes.func,
  onSnapEnded: PropTypes.func,
  onClose: PropTypes.func,
}
