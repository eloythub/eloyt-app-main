import React from 'react'
import { Button } from 'native-base'
import { Image, SafeAreaView, StatusBar, Text, View } from 'react-native'
import commonStyle, { transparentHeader } from '../../../styles/commonStyle'
import commonAssets from '../../../styles/commonAssets'
import congratsStyle from './congratsStyle'
import CongratsController from './congratsController'

export default class CongratsScene extends CongratsController {
  static navigationOptions = {
    header: null
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

        <View style={congratsStyle.logoWrapper}>
          <Image source={commonAssets.logo} style={commonStyle.logo}/>
        </View>
        <View style={congratsStyle.appNameWrapper}>
          <Text style={congratsStyle.appNameText}>Good Job!{'\n'}You are all setup</Text>
        </View>

        <SafeAreaView style={commonStyle.footerWrapper}>
          <View style={congratsStyle.buttonsSection}>
            <Button block success onPress={this.onPressNext.bind(this)}>
              <Text style={commonStyle.buttonText}>Finish</Text>
            </Button>
          </View>
        </SafeAreaView>
      </View>
    )
  }
}
