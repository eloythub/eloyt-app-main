// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import Camera from 'react-native-camera'
import { Utils, Debug } from '../../../Factories'
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

    try {
      await this.setState({isRecording: true})

      const captureData = await cameraRef.capture(options)

      Debug.Log('VideoSnapComponentDelegator:startSnapping:captureData', captureData)

      if (!this.validateCapturedData(captureData)) {
        Utils.alert('Your Snap must be more than 5 second and less than 3 minute')

        return
      }

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
    const {cameraRef}     = this.refs

    onSnapEnded()

    cameraRef.stopCapture();

    await this.setState({isRecording: false})
  }


  validateCapturedData ({duration}) {
    // check if snap duration:
    //    is less than 5 sec
    //    or more than 3 min
    if (duration < 5 || duration > (3 * 60)) {
      return false
    }

    return true
  }

  async onDoubleTapOnScreen () {
    let { isCameraTypeFront } = this.state

    const now = new Date().getTime();

    if (this.lastTapOnScreen && (now - this.lastTapOnScreen) < GeneralEnum.DOUBLE_PRESS_DELAY) {
      delete this.lastTapOnScreen;

      // Switch the camera
      isCameraTypeFront = !isCameraTypeFront

      await this.setState({isCameraTypeFront})

      Debug.Log('VideoSnapComponentDelegator:onDoubleTapOnScreen:SwitchCameraType')

      return
    }

    this.lastTapOnScreen = now;
  }

  close () {
    this.props.onClose()
  }

  discardUpload () {
    this.setState({isUploadMode: false})
  }
}
