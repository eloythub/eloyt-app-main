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
    Debug.Log('VideoSnapComponentDelegator:startSnapping')

    const {onSnapStarted} = this.props
    const {isRecording}   = this.state
    const {cameraRef}     = this.refs
    const {CaptureMode}   = Camera.constants

    onSnapStarted()

    delete this.snapObject

    if (isRecording) {
      return
    }

    await this.setState({isRecording: true})

    cameraRef.stopCapture()

    cameraRef.capture({
        title: 'Eloyt',
        mode: CaptureMode.video,
        metadata: {},
      })
      .then(this.doneSnapping.bind(this), this.failedSnapping.bind(this))
      .catch(this.failedSnapping.bind(this))
  }

  async doneSnapping (captureData) {
    Debug.Log('VideoSnapComponentDelegator:doneSnapping:captureData', captureData)

    if (!this.validateCapturedData(captureData)) {
      await this.setState({
        isUploadMode: false,
        isRecording: false,
        waitingMain: false
      })

      Utils.alert(`Your Snap must be:\nmore than ${GeneralEnum.SNAP_RECORD_SECOND_MIN} second\nand\nless than ${GeneralEnum.SNAP_RECORD_MINUTE_MAX} minute`)

      return
    }

    this.snapObject = captureData

    // Go To Upload Mode
    await this.setState({
      isUploadMode: true,
      isRecording: false,
      waitingMain: false
    })
  }

  async failedSnapping (err) {
    const {cameraRef} = this.refs

    Debug.Log('VideoSnapComponentDelegator:startSnapping:error', err)

    await this.setState({
      isRecording: false,
      waitingMain: false
    })

    Utils.alert('Something went wrong!!!\nPlease try again.')

  }

  async finishSnapping () {
    Debug.Log('VideoSnapComponentDelegator:finishSnapping')

    const {onSnapEnded} = this.props
    const {cameraRef}   = this.refs

    await this.setState({
      isRecording: false,
      waitingMain: true,
    })

    cameraRef.stopCapture()

    onSnapEnded()
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

  close (uploadedSnap) {
    this.props.onClose(uploadedSnap)
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

      Debug.Log('uploadSnapResponse: ', uploadSnapResponse.responseText)

      let uploadedSnap

      try {
        uploadedSnap = JSON.parse(uploadSnapResponse.responseText)
      } catch (err) {
        console.log(err.message)
      }

      // get back to Close the snap Scene
      this.close(uploadedSnap.data)

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
