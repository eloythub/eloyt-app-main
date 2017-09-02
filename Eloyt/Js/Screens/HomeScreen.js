// Basics
import React from 'react'
import { StatusBar, Text, View } from 'react-native'
// Essentials
import { HomeScreenStyles } from '../Styles'
import { Debug, Utils } from '../Factories'
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

    this.state = {
      mainSwiperScrollEnable: true,
      playerSnapScrollEnable: true
    }

    this.mainSwiperProperties = {
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
    const {mainSwiperScrollEnable, playerSnapScrollEnable} = this.state

    return (
      <View style={HomeScreenStyles.baseContainer}>
        <StatusBar
          backgroundColor={Utils.isIOS() ? '#ffffff' : '#000000'}
          barStyle="light-content"
          hidden={false}
        />

        <Swiper {...Object.assign({
          scrollEnabled: mainSwiperScrollEnable
        }, this.mainSwiperProperties)}>
          <View style={HomeScreenStyles.mainSlide}>
            <Text style={HomeScreenStyles.tempPlaceholder}>Message/Notifications</Text>
          </View>
          <View style={HomeScreenStyles.mainSlide}>
            <Swiper {...Object.assign({
              scrollEnabled: playerSnapScrollEnable
            }, this.playerSnapSwiperProperties)}
                    onIndexChanged={this.onPlayerSnapSwiperIndexChanged.bind(this)}>
              <View style={HomeScreenStyles.playerSnapSlide}>
                <VideoPlayerComponent />
              </View>
              <View style={HomeScreenStyles.playerSnapSlide}>
                <VideoSnapComponent onSnapStarted={this.onSnapStarted.bind(this)}
                                    onSnapEnded={this.onSnapEnded.bind(this)}/>
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
