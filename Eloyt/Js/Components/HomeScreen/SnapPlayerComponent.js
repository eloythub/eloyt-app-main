// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { KeyboardAvoidingView, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Bars } from 'react-native-loader'
import Video from 'react-native-video'
import Swiper from 'react-native-swiper'
import moment from 'moment'
// Essentials
import { SnapPlayerComponentStyle, WaitingComponentStyles } from '../../Styles'
import SnapPlayerComponentDelegator from '../../Delegators/Components/HomeScene/SnapPlayerComponentDelegator'
import ProfileAvatar from '../../Components/ProfileAvatar'
import MoreButton from '../../Components/MoreButton'
import LeftArrowButton from '../../Components/LeftArrowButton'
import LikeButton from '../../Components/LikeButton'
import DislikeButton from '../../Components/DislikeButton'
import InputTextBoxEntity from '../../Components/InputTextBoxEntity'

export default class SnapPlayerComponent extends SnapPlayerComponentDelegator {
  constructor (props) {
    super(props)

    this.state = {
      waitingMain: true,
      pause: false,
    }

    this.detailsActionsSwiperProperties = {
      ref: 'detailsActionsSwiperRef',
      index: 1,
      loop: false,
      bounces: true,
      autoplay: false,
      horizontal: true,
      showsButtons: false,
      showsPagination: true,
      paginationStyle: SnapPlayerComponentStyle.detailsActionPagination,
      dotColor: 'rgba(255, 255, 255, 0.3)',
      activeDotColor: 'rgba(255, 255, 255, 0.8)',
    }
  }

  renderWaiting (show) {
    if (!show) {
      return
    }

    return <View style={WaitingComponentStyles.mainWaitingContainer}>
      <View style={WaitingComponentStyles.mainWaiting}>
        <Bars size={30} color="#ffffff"/>
      </View>
    </View>
  }

  renderBottomDetails () {
    const {snapVideo} = this.props

    const uploadedAt = moment(new Date(snapVideo.uploadedAt)).fromNow()

    return (
      <View style={SnapPlayerComponentStyle.detailsContainer}>
        <View style={SnapPlayerComponentStyle.detailsUserAvatar}>
          <View style={SnapPlayerComponentStyle.detailsUserAvatarContainer}>
            <ProfileAvatar size={80}
                           imageUrl={snapVideo.videoOwner.avatar}
                           onPress={() => console.log('navigate to Profile Scene')}/>
          </View>
        </View>
        <View style={SnapPlayerComponentStyle.detailsSnapDetails}>
          <View style={SnapPlayerComponentStyle.detailsSnapDetailsContainer}>
            <Text style={SnapPlayerComponentStyle.detailsUsername}>@{snapVideo.videoOwner.username}</Text>
            <Text style={SnapPlayerComponentStyle.detailsTime}>{uploadedAt}</Text>
          </View>
          <View style={SnapPlayerComponentStyle.detailsSnapDetailsContainer}>
            <View style={SnapPlayerComponentStyle.detailsSnapDetailsContent}>
              <ScrollView>
                <Text style={SnapPlayerComponentStyle.detailsDescription}>{snapVideo.description}</Text>
              </ScrollView>
            </View>
            <View style={SnapPlayerComponentStyle.detailsSnapDetailsAction}>
              <MoreButton onPress={this.onPressAction.bind(this)}/>
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderBottomActions () {
    return (
      <View style={SnapPlayerComponentStyle.actionsContainer}>
        <LeftArrowButton onPress={this.onPressBackToDetailSlide.bind(this)}/>
        <InputTextBoxEntity
          onChange={(text) => this.directQuickMessage = text}
          caption="Send Quick Message"
          name="quickMessage"
          placeholderColor="#ffffff"
          autoCapitalize="none"
          widthOffset={160}
          fontSize={14}
          height={45}
        />
        <DislikeButton onPress={this.onPressDislike.bind(this)}/>
        <LikeButton onPress={this.onPressLike.bind(this)}/>
      </View>
    )
  }

  renderBottom () {
    return (
      <KeyboardAvoidingView behavior="position"
                            style={SnapPlayerComponentStyle.keyboardAvoidingViewContainer}>
        <View style={SnapPlayerComponentStyle.bottomSection}>
          <Swiper {...this.detailsActionsSwiperProperties}
                  onIndexChanged={this.onDetailsActionsSwiperIndexChanged.bind(this)}>
            <View style={SnapPlayerComponentStyle.detailsActionSlide}/>
            <View style={SnapPlayerComponentStyle.detailsActionSlide}>{this.renderBottomDetails()}</View>
            <View style={SnapPlayerComponentStyle.detailsActionSlide}>{this.renderBottomActions()}</View>
          </Swiper>
        </View>
      </KeyboardAvoidingView>
    )
  }

  render () {
    const {waitingMain, pause}    = this.state
    const {snapVideo, forcePause} = this.props

    return (
      <View style={SnapPlayerComponentStyle.rootContainer}>
        <TouchableWithoutFeedback onPressIn={this.onPressInOnVideo.bind(this)}
                                  onPressOut={this.onPressOutOnVideo.bind(this)}>
          <View>
            {this.renderWaiting(waitingMain)}
            <Video
              ref="videoRef"
              style={SnapPlayerComponentStyle.video}
              poster={snapVideo.cloudThumbnailUrl}
              source={{uri: snapVideo.cloudVideoUrl}}
              seek={0}
              rate={forcePause ? 0 : (pause ? 0 : 1)}
              muted={false}
              paused={forcePause ? true : pause}
              resizeMode="cover"
              repeat={false}
              playInBackground={false}
              playWhenInactive={false}

              onLoadStart={this.onLoadStart.bind(this)}
              onLoad={this.onLoad.bind(this)}
              onEnd={this.onEnd.bind(this)}
              onError={this.onError.bind(this)}
            />
          </View>
        </TouchableWithoutFeedback>
        {this.renderBottom(waitingMain)}
      </View>
    )
  }
}

SnapPlayerComponent.propTypes = {
  forcePause: PropTypes.bool,
  snapVideo: PropTypes.object,
  onVideoLoadingStarted: PropTypes.func,
  onVideoStartPlaying: PropTypes.func,
  onVideoEnded: PropTypes.func,
  onVideoError: PropTypes.func,
  onSkipTheSnap: PropTypes.func,
  onLikeTheSnap: PropTypes.func,
  onDislikeTheSnap: PropTypes.func,
}
