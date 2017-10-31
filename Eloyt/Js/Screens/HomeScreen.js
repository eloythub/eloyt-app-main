// Basics
import React from 'react'
import { Modal, StatusBar, View } from 'react-native'
import Swiper from 'react-native-swiper'
import { BlurView } from 'react-native-blur'
// Essentials
import { HomeScreenStyles } from '../Styles'
import { Debug, Utils } from '../Factories'
import HomeScreenDelegator from '../Delegators/Screens/HomeScreenDelegator'
import VideoPlayerComponent from '../Components/HomeScreen/VideoPlayerComponent'
import VideoSnapComponent from '../Components/HomeScreen/VideoSnapComponent'
import ProfileComponent from '../Components/HomeScreen/ProfileComponent'
import SearchComponent from '../Components/HomeScreen/SearchComponent'
import MessagesNotificationsComponent from '../Components/HomeScreen/MessagesNotificationsComponent'

export default class HomeScreen extends HomeScreenDelegator {
  constructor (props) {
    Debug.Log('HomeScreen:constructor')

    super(props)

    this.state = {
      mainSwiperScrollEnable: true,
      playerSnapScrollEnable: true,
      forcePause: false,
      isUserProfileModalAppears: false,
      profilePreviewUserId: null,
      focusOnSearchField: false,
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

  renderProfileModal () {
    const {isUserProfileModalAppears, profilePreviewUserId} = this.state

    return (
      <Modal
        visible={isUserProfileModalAppears}
        transparent={true}
        animationType="slide"
        onRequestClose={() => this.setState({
          isUserProfileModalAppears: false,
          profilePreviewUserId: null
        })}>
        <View>
          <BlurView blurType="dark"
                    overlayColor="#ffffff"
                    blurAmount={20}
                    style={HomeScreenStyles.userProfileBlurView}>
            <ProfileComponent profilePreviewUserId={profilePreviewUserId} closeProfile={this.closeProfile.bind(this)}/>
          </BlurView>
        </View>
      </Modal>
    )
  }

  render () {
    const {mainSwiperScrollEnable, playerSnapScrollEnable, forcePause, focusOnSearchField} = this.state

    return (
      <View style={HomeScreenStyles.baseContainer}>
        <StatusBar backgroundColor={Utils.isIOS() ? '#ffffff' : '#000000'}
                   barStyle="light-content"
                   hidden={false}/>

        <Swiper onIndexChanged={this.onMainSwiperIndexChanged.bind(this)}
                keyboardShouldPersistTaps="handled"
                {...Object.assign({
                  scrollEnabled: mainSwiperScrollEnable
                }, this.mainSwiperProperties)}>
          <View style={HomeScreenStyles.mainSlide}>
            <MessagesNotificationsComponent ref="messagesNotificationsComponent"
                                            onClose={this.moveSceneToVideoPlayerFromMessagesNotifications.bind(this)}
                                            onSnapButton={this.moveSceneToSnapFromMessagesNotifications.bind(this)}
                                            openProfile={(userId) => this.openProfile(userId)}
                                            notificationUpdated={
                                              (unreadNotificationCount) => {
                                                this.refs.VideoPlayerComponent.updateUnreadNotificationCount(unreadNotificationCount)
                                              }
                                            }/>
          </View>
          <View style={HomeScreenStyles.mainSlide}>
            <Swiper {...Object.assign({
              scrollEnabled: playerSnapScrollEnable
            }, this.playerSnapSwiperProperties)}
                    keyboardShouldPersistTaps="handled"
                    onIndexChanged={this.onPlayerSnapSwiperIndexChanged.bind(this)}>
              <View style={HomeScreenStyles.playerSnapSlide}>
                <VideoPlayerComponent ref="VideoPlayerComponent"
                                      forcePause={forcePause}
                                      openProfile={(userId) => this.openProfile(userId)}
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
            <SearchComponent onClose={this.moveSceneToVideoPlayerFromSearch.bind(this)}
                             focusOnSearchField={focusOnSearchField}
                             openProfile={(userId) => this.openProfile(userId)}/>
          </View>
        </Swiper>
        {this.renderProfileModal()}
      </View>
    )
  }
}

export const HomeScreenKey = 'HomeScene'
