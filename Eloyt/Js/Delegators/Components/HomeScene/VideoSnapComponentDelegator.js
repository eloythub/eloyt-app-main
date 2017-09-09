// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import Camera from 'react-native-camera'
import { Debug, Utils } from '../../../Factories'
import { GeneralEnum } from '../../../Enums'
import { ApiService } from '../../../Services'

export default class VideoSnapComponentDelegator extends Delegator {
  async componentDidMount () {
    try {
      const hashtagsSrc = await ApiService.getAllHashtags()

      this.hashtags = hashtagsSrc.data
    } catch (err) {
      Debug.Log(err)
    }
  }

  async startSnapping () {
    const {onSnapStarted} = this.props
    const {cameraRef}     = this.refs
    const {CaptureMode}   = Camera.constants

    onSnapStarted()

    const options = {
      title: 'Eloyt',
      mode: CaptureMode.video,
      metadata: {},
    }

    delete this.snapObject

    try {
      await this.setState({isRecording: true})

      const captureData = await cameraRef.capture(options)

      Debug.Log('VideoSnapComponentDelegator:startSnapping:captureData', captureData)

      if (!this.validateCapturedData(captureData)) {
        Utils.alert(`Your Snap must be:\nmore than ${GeneralEnum.SNAP_RECORD_SECOND_MIN} second\nand\nless than ${GeneralEnum.SNAP_RECORD_MINUTE_MAX} minute`)

        return
      }

      this.snapObject = captureData

      // Go To Upload Mode
      await this.setState({isUploadMode: true})
    } catch (err) {
      await this.setState({isRecording: false})

      Debug.Log('VideoSnapComponentDelegator:startSnapping:error', err)

      Utils.alert('Something went wrong!!!\nPlease try again.')
    }
  }

  async finishSnapping () {
    const {onSnapEnded} = this.props
    const {cameraRef}   = this.refs

    onSnapEnded()

    cameraRef.stopCapture()

    await this.setState({isRecording: false})
  }

  validateCapturedData ({duration}) {
    if (duration < GeneralEnum.SNAP_RECORD_SECOND_MIN || duration > GeneralEnum.SNAP_RECORD_SECOND_MAX) {
      return false
    }

    return true
  }

  async onDoubleTapOnScreen () {
    let {isCameraTypeFront} = this.state

    const now = new Date().getTime()

    if (this.lastTapOnScreen && (now - this.lastTapOnScreen) < GeneralEnum.DOUBLE_PRESS_DELAY) {
      delete this.lastTapOnScreen

      // Switch the camera
      isCameraTypeFront = !isCameraTypeFront

      // Little Effect when camera is switching
      await this.setState({isCameraFadeFilterAppears: true})
      await Utils.wait(0.3)
      await this.setState({isCameraTypeFront})
      await Utils.wait(0.3)
      await this.setState({isCameraFadeFilterAppears: false})

      Debug.Log('VideoSnapComponentDelegator:onDoubleTapOnScreen:SwitchCameraType')

      return
    }

    this.lastTapOnScreen = now
  }

  close () {
    this.props.onClose()
  }

  discardUpload () {
    this.setState({isUploadMode: false})
  }

  async startUploadingSnap () {
    if (!this.description) {
      return Utils.alert('Description is required')
    }

    if (!this.selectedHashtags || (
        this.selectedHashtags.length < GeneralEnum.SNAP_HASHTAG_COUNT_LIMIT_MIN ||
        this.selectedHashtags.length > GeneralEnum.SNAP_HASHTAG_COUNT_LIMIT_MAX
      )) {
      return Utils.alert(`Your must at least ${GeneralEnum.SNAP_HASHTAG_COUNT_LIMIT_MIN} to ${GeneralEnum.SNAP_HASHTAG_COUNT_LIMIT_MAX} tags`)
    }

    this.refs.uploadSwiperRef.scrollBy(1, true)

    // start uploading
    try {
      const uploadSnapResponse = await ApiService.uploadSnap(
        this.snapObject,
        this.description,
        this.selectedHashtags,
        this.onUploadProgress.bind(this)
      )

      Debug.Log('uploadSnapResponse: ', uploadSnapResponse)

      // get back to Close the snap Scene
      this.close()

      await Utils.wait(1)

      // normalize uploadSwiperRef back to normal
      this.refs.uploadSwiperRef.scrollBy(-1, true)

      // normalize UploadModal back to normal
      await this.setState({isUploadMode: false})
    } catch (err) {
      Debug.Log(err)

      Utils.alert('Something went wrong!!!\nPlease try again.')

      this.cancelUpload()
    }
  }

  cancelUpload () {
    ApiService.abortSnap()

    this.refs.uploadSwiperRef.scrollBy(-1, true)
  }

  async onUploadProgress (progressEvent) {
    const uploadProgress = parseInt((progressEvent.loaded / progressEvent.total) * 100)

    // prevent calling setState too much
    if (uploadProgress !== this.lastUploadProgress) {
      Debug.Log('VideoSnapComponentDelegator:onUploadProgress', `${uploadProgress}%`)

      await this.setState({uploadProgress})
    }

    this.lastUploadProgress = uploadProgress
  }
}
