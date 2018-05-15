import React from 'react'
import { BlurView } from 'expo'
import { Button } from 'native-base'
import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import commonStyle, {transparentHeader} from '../../../styles/commonStyle'
import commonAssets from '../../../styles/commonAssets'
import profileInfoStyle from './profileInfoStyle'
import ProfileInfoController from './profileInfoController'
import Input from '../../../components/input/transparent'
import TransparentRadioButton from '../../../components/radioButton/transparent'
import SimpleAvatarButton from '../../../components/avatarButton/simple'
import TransparentDatePickerInput from '../../../components/datePickerInput/transparent'
import configs from '../../../libs/configs'

export default class ProfileInfoScene extends ProfileInfoController {
  static navigationOptions = {
    headerTitle: 'Profile Info',
    ...transparentHeader
  }

  render () {
    return (
      <View style={commonStyle.splashBackgroundView}>
        <Image source={commonAssets.backgroundBlur} style={commonStyle.backgroundImage}/>

        <View style={commonStyle.starterView}/>

        <ScrollView>
          <View style={commonStyle.rowView}>
            <View style={profileInfoStyle.profileInfoWrapper}>
              <View style={profileInfoStyle.profileImageWrapper}>
                <SimpleAvatarButton size={120} image={require('../../../../assets/images/mockups/profileImage.jpg')}/>
              </View>
              <View style={profileInfoStyle.nameWrapper}>
                <Input title="FirstName" />
                <View style={commonStyle.padding2}/>
                <Input title="LastName" />
              </View>
            </View>
            <View style={commonStyle.padding5}/>
            <Input title="Email" keyboardType="email-address" />
            <View style={commonStyle.padding5}/>
            <TransparentRadioButton title="Gender" items={configs.genders} />
            <View style={commonStyle.padding5}/>
            <TransparentDatePickerInput placeholder="Date of Birth" />
          </View>
        </ScrollView>

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
