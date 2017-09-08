// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import { Image, View } from 'react-native'
// Essentials
import { BottomCameraImageComponentStyles } from '../Styles'
import { Assets } from '../Factories'

export default class BottomCameraImage extends Delegator {
  render () {
    return (
      <View style={BottomCameraImageComponentStyles.switchCameraContainer}>
        <Image source={Assets.RecordSceneIcon} style={BottomCameraImageComponentStyles.switchCamera}/>
      </View>
    )
  }
}
