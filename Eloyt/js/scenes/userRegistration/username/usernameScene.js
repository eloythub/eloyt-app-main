import React from 'react'
import { BlurView } from 'expo'
import { Button, Form, Item } from 'native-base'
import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
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
        <Image source={commonAssets.backgroundBlur} style={commonStyle.backgroundImage}/>

        <View style={commonStyle.starterView}/>

        <ScrollView>
          <View style={commonStyle.rowView}>
            <Input title="Username"/>
          </View>
        </ScrollView>

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
