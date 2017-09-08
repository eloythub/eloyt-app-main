// Basics
import React from 'react'
import { StatusBar, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
// Essentials
import { HomeScreenStyles } from '../Styles'
import { Debug, Utils } from '../Factories'
import HomeScreenDelegator from '../Delegators/Screens/HomeScreenDelegator'
import VideoPlayerComponent from '../Components/HomeScreen/VideoPlayerComponent'
import VideoSnapComponent from '../Components/HomeScreen/VideoSnapComponent'

export default class HomeScreen extends HomeScreenDelegator {
  constructor (props) {
    Debug.Log('HomeScreen:constructor')

    super(props)

    this.state = {
      mainSwiperScrollEnable: true,
      playerSnapScrollEnable: true,
      forcePause: false,
    }

    this.mainSwiperProperties = {
      ref: 'mainSnapSwiperRef',
      index: 1,
      loop: false,
      bounces: false,
      autoplay: false,
      horizontal: true,
      loadMinimal: true,
      showsButtons: false,
      showsPagination: false
    }

    this.playerSnapSwiperProperties = {
      ref: 'playerSnapSwiperRef',
      index: 0,
      loop: false,
      bounces: false,
      autoplay: false,
      horizontal: false,
      loadMinimal: true,
      showsButtons: false,
      showsPagination: false
    }
  }

  render () {
    const {mainSwiperScrollEnable, playerSnapScrollEnable, forcePause} = this.state

    return (
      <View style={HomeScreenStyles.baseContainer}>
        <StatusBar
          backgroundColor={Utils.isIOS() ? '#ffffff' : '#000000'}
          barStyle="light-content"
          hidden={false}
        />

        <Swiper
          onIndexChanged={this.onMainSwiperIndexChanged.bind(this)}
          {...Object.assign({
            scrollEnabled: mainSwiperScrollEnable
          }, this.mainSwiperProperties)}>
          <View style={HomeScreenStyles.mainSlide}>
            <Text style={HomeScreenStyles.placeholder}>Message/Notifications</Text>
          </View>
          <View style={HomeScreenStyles.mainSlide}>
            <Swiper {...Object.assign({
              scrollEnabled: playerSnapScrollEnable
            }, this.playerSnapSwiperProperties)}
                    onIndexChanged={this.onPlayerSnapSwiperIndexChanged.bind(this)}>
              <View style={HomeScreenStyles.playerSnapSlide}>
                <VideoPlayerComponent forcePause={forcePause}
                                      moveSceneToRecordScene={this.moveSceneToRecordScene.bind(this)}
                                      moveSceneToSearchScene={this.moveSceneToSearchScene.bind(this)}
                                      moveSceneToNotificationScene={this.moveSceneToNotificationScene.bind(this)}/>
              </View>
              <View style={HomeScreenStyles.playerSnapSlide}>
                <VideoSnapComponent onClose={this.onSnapClose.bind(this)}
                                    onSnapStarted={this.onSnapStarted.bind(this)}
                                    onSnapEnded={this.onSnapEnded.bind(this)}/>
              </View>
            </Swiper>
          </View>
          <View style={HomeScreenStyles.mainSlide}>
            <Text style={HomeScreenStyles.placeholder}>Search</Text>
          </View>
        </Swiper>
      </View>
    )
  }
}

export const HomeScreenKey   = 'HomeScene'
export const HomeScreenTitle = 'Home'
