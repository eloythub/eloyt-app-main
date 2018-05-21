import React from 'react'
import { BlurView } from 'expo'
import { Button } from 'native-base'
import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import commonStyle, {transparentHeader} from '../../../styles/commonStyle'
import commonAssets from '../../../styles/commonAssets'
import mobileVerificationStyle from './mobileVerificationStyle'
import MobileVerificationController from './mobileVerificationController'
import PhoneVerification from '../../../components/input/phoneVerification'

export default class MobileVerificationScene extends MobileVerificationController {
  static navigationOptions = {
    headerTitle: 'Mobile Verification',
    ...transparentHeader
  }

  render () {
    return (
      <View style={commonStyle.splashBackgroundView}>
        <Image source={commonAssets.backgroundBlur} style={commonStyle.backgroundImage}/>

        <View style={commonStyle.starterView}/>

        <ScrollView>
          <View style={commonStyle.rowView}>
            <PhoneVerification onCheckCode={this.onCheckCode.bind(this)} />
          </View>
        </ScrollView>
      </View>
    )
  }
}
