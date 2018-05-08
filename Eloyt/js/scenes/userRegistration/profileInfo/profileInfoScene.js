import React from 'react'
import { BlurView } from 'expo'
import { Button } from 'native-base'
import { View, Image, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import commonStyle, {transparentHeader} from '../../../styles/commonStyle'
import commonAssets from '../../../styles/commonAssets'
import profileInfoStyle from './profileInfoStyle'
import ProfileInfoController from './profileInfoController'

export default class ProfileInfoScene extends ProfileInfoController {
  static navigationOptions = {
    headerTitle: 'Profile Info',
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

        <SafeAreaView style={commonStyle.footerWrapper}>
          <View style={profileInfoStyle.buttonsSection}>
            <Button block success onPress={this.onPressNext.bind(this)}>
              <Text style={commonStyle.buttonText}>Create Account</Text>
            </Button>
          </View>
        </SafeAreaView>
      </View>
    )
  }
}
