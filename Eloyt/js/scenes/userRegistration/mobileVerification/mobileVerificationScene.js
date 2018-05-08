import React from 'react'
import { BlurView } from 'expo'
import { Button } from 'native-base'
import { View, Image, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import commonStyle, {transparentHeader} from '../../../styles/commonStyle'
import commonAssets from '../../../styles/commonAssets'
import mobileVerificationStyle from './mobileVerificationStyle'
import MobileVerificationController from './mobileVerificationController'
import Input from '../../../components/input/transparent'

export default class MobileVerificationScene extends MobileVerificationController {
  static navigationOptions = {
    headerTitle: 'Mobile Verification',
    ...transparentHeader
  }

  render () {
    return (
      <View style={commonStyle.splashBackgroundView}>
        <StatusBar
          backgroundColor={'#ffffff'}
          barStyle="light-content"
          hidden={false}
        />

        <Image source={commonAssets.backgroundBlur} style={commonStyle.backgroundImage}/>

        <View style={commonStyle.starterView}/>

        <View style={commonStyle.rowView}>
          <Input placeholder="Verification Code" />
        </View>

        <SafeAreaView style={commonStyle.footerWrapper}>
          <View style={mobileVerificationStyle.buttonsSection}>
            <Button block success onPress={this.onPressNext.bind(this)}>
              <Text style={commonStyle.buttonText}>Complete the Profile</Text>
            </Button>
          </View>
        </SafeAreaView>
      </View>
    )
  }
}
