// Basics
import React from 'react'
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
// Essentials
import { HomeScreenStyles, WatingComponentStyles } from '../Styles'
import { Assets, Utils, Debug } from '../Factories'
import HomeScreenDelegator from '../Delegators/Screens/HomeScreenDelegator'
// Components
import VideoPlayerComponent from '../Components/HomeScreen/VideoPlayerComponent'
import VideoSnapComponent from '../Components/HomeScreen/VideoSnapComponent'
// Modules
import Swiper from 'react-native-swiper'
//import { Col, Grid, Row } from 'react-native-easy-grid'
//import { Bars } from 'react-native-loader'

export default class HomeScreen extends HomeScreenDelegator {
  constructor (props) {
    Debug.Log('HomeScreen:constructor')

    super(props)

    this.homeMainSwiperProperties = {
      index: 1,
      loop: false,
      autoplay: false,
      horizontal: true,
      loadMinimal: false,
      showsButtons: false,
      showsPagination: false
    }

    this.playerSnapSwiperProperties = {
      index: 0,
      loop: false,
      autoplay: false,
      horizontal: false,
      loadMinimal: true,
      showsButtons: false,
      showsPagination: false
    }
  }

  render () {
    return (
      <View style={HomeScreenStyles.baseContainer}>
        <StatusBar
          backgroundColor={Utils.isIOS() ? '#ffffff' : '#000000'}
          barStyle="light-content"
          hidden={false}
        />

        <Swiper {...this.homeMainSwiperProperties}>
          <View style={HomeScreenStyles.mainSlide}>
            <Text style={HomeScreenStyles.tempPlaceholder}>Message/Notifications</Text>
          </View>
          <View style={HomeScreenStyles.mainSlide}>
            <Swiper {...this.playerSnapSwiperProperties}>
              <View style={HomeScreenStyles.playerSnapSlide}>
                <VideoPlayerComponent />
              </View>
              <View style={HomeScreenStyles.playerSnapSlide}>
                <VideoSnapComponent />
              </View>
            </Swiper>
          </View>
          <View style={HomeScreenStyles.mainSlide}>
            <Text style={HomeScreenStyles.tempPlaceholder}>Search</Text>
          </View>
        </Swiper>
      </View>
    )
  }
}

export const HomeScreenKey   = 'HomeScene'
export const HomeScreenTitle = 'Home'
