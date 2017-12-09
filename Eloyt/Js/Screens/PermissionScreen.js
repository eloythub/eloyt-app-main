// Basics
import React from 'react'
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import Swiper from 'react-native-swiper'
// Essentials
import { CommonStyles, PermissionScreenStyles } from '../Styles'
import { Assets, Debug, Utils } from '../Factories'
import PermissionScreenDelegator from '../Delegators/Screens/PermissionScreenDelegator'
// Modules

export default class PermissionScreen extends PermissionScreenDelegator {
  constructor (props) {
    Debug.Log(`DriverScreen:constructor`)

    super(props)

    this.state = {}

    this.swiperProperties = {
      ref:'swiperRef',
      index: 0,
      loop: false,
      bounces: false,
      autoplay: false,
      horizontal: true,
      showsButtons: false,
      showsPagination: false,
      scrollEnabled: true,
    }
  }

  postRender () {
    return (
      <View style={PermissionScreenStyles.rootMainPostContainer}>
        <View style={PermissionScreenStyles.logoContainer}>
          <Image source={Assets.PureLogo} style={PermissionScreenStyles.pureLogo}/>
          <Text style={PermissionScreenStyles.sceneTitle}>{'Permission'.toUpperCase()}</Text>
        </View>
        <View style={PermissionScreenStyles.descriptionContainer}>
          <Text style={PermissionScreenStyles.descriptionDescription}>
            The app needs your permission on following items in order to reveal its full potential:{'\n'}
          </Text>
        </View>
        <Swiper {...this.swiperProperties}
                keyboardShouldPersistTaps="handled">
          <View style={PermissionScreenStyles.slide}>
            <Image source={Assets.PermissionCamera} style={PermissionScreenStyles.icons}/>
            <Text style={PermissionScreenStyles.text}>
              Camera
            </Text>
            <Text style={PermissionScreenStyles.descriptionText}>
              We need your permission on camera in order to record you,
              have in mind, one of important aspects of networking is to people like reality of your life
            </Text>
            <TouchableOpacity style={PermissionScreenStyles.button}
                              onPress={this.nextSlide.bind(this)}>
              <Text style={PermissionScreenStyles.buttonCaption}>
                {'next'.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={PermissionScreenStyles.slide}>
            <Image source={Assets.PermissionMicrophone} style={PermissionScreenStyles.icons}/>
            <Text style={PermissionScreenStyles.text}>
              Microphone
            </Text>
            <Text style={PermissionScreenStyles.descriptionText}>
              We need your permission on microphone in order to have your voice in the recorder video.{'\n'}
              Without your voice, you cannot express yourself
            </Text>
            <TouchableOpacity style={PermissionScreenStyles.button}
                              onPress={this.nextSlide.bind(this)}>
              <Text style={PermissionScreenStyles.buttonCaption}>
                {'next'.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={PermissionScreenStyles.slide}>
            <Image source={Assets.PermissionLocation} style={PermissionScreenStyles.icons}/>
            <Text style={PermissionScreenStyles.text}>
              Location
            </Text>
            <Text style={PermissionScreenStyles.descriptionText}>
              We need your permission on location in order to show you the related videos about people around your area
            </Text>
            <TouchableOpacity style={PermissionScreenStyles.askButton}
                              onPress={this.process.bind(this)}>
              <Text style={PermissionScreenStyles.buttonCaption}>
                {'Start'.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </Swiper>
      </View>
    )
  }

  render () {
    return (
      <View style={PermissionScreenStyles.rootContainer}>
        <StatusBar
          backgroundColor={Utils.isIOS() ? '#ffffff' : '#000000'}
          barStyle="light-content"
          hidden={false}
        />
        <Image source={Assets.FluidBackground} style={CommonStyles.backgroundImage}/>

        <View style={PermissionScreenStyles.rootMainContainer}>
          {this.postRender()}
        </View>
      </View>
    )
  }
}

export const PermissionScreenKey = 'PermissionScene'
