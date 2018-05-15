import React from 'react'
import { BlurView } from 'expo'
import { Button } from 'native-base'
import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import commonStyle, {transparentHeader} from '../../../styles/commonStyle'
import commonAssets from '../../../styles/commonAssets'
import mobileStyle from './mobileStyle'
import MobileController from './mobileController'
import Input from '../../../components/input/transparent'

export default class MobileScene extends MobileController {
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
            <Input title="Mobile Number" keyboardType="phone-pad" />
          </View>
        </ScrollView>

        <SafeAreaView style={commonStyle.footerWrapper}>
          <View style={mobileStyle.buttonsSection}>
            <Button block info onPress={this.onPressNext.bind(this)}>
              <Text style={commonStyle.buttonText}>Receive the verification code</Text>
            </Button>
          </View>
        </SafeAreaView>
      </View>
    )
  }
}
