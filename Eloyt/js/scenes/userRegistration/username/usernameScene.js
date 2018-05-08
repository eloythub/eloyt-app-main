import React from 'react'
import { BlurView } from 'expo'
import { Button, Form, Item } from 'native-base'
import { View, Image, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import commonStyle, {transparentHeader} from '../../../styles/commonStyle'
import commonAssets from '../../../styles/commonAssets'
import usernameStyle from './usernameStyle'
import UsernameController from './usernameController'
import Input from '../../../components/input/transparent'

export default class UsernameScene extends UsernameController {
  static navigationOptions = {
    headerTitle: 'Username',
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
          <Input placeholder="Username" />
        </View>

        <SafeAreaView style={commonStyle.footerWrapper}>
          <View style={usernameStyle.buttonsSection}>
            <Button block info onPress={this.onPressNext.bind(this)}>
              <Text style={commonStyle.buttonText}>Next</Text>
            </Button>
          </View>
        </SafeAreaView>
      </View>
    )
  }
}
