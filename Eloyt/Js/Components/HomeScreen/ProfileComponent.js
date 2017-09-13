// Basics
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Swiper from 'react-native-swiper'
// Essentials
import { ProfileComponentStyles } from '../../Styles'
import ProfileComponentDelegator from '../../Delegators/Components/HomeScene/ProfileComponentDelegator'
import ProfilePreviewComponent from '../../Components/HomeScreen/ProfilePreviewComponent'
import ProfileUpdateComponent from '../../Components/HomeScreen/ProfileUpdateComponent'

export default class ProfileComponent extends ProfileComponentDelegator {
  constructor (props) {
    super(props)

    this.state = {
      isUpdated: false
    }

    this.profileSwiperProperties = {
      ref: 'profileSwiperRef',
      index: 0,
      loop: false,
      bounces: true,
      autoplay: false,
      horizontal: true,
      showsButtons: false,
      showsPagination: false,
      scrollEnabled: false,
    }
  }

  render () {
    const {profilePreviewUserId} = this.props
    const {isUpdated} = this.state

    if (!profilePreviewUserId) {
      return
    }

    return (
      <View style={ProfileComponentStyles.rootContainer}>
        <Swiper {...this.profileSwiperProperties}>
          <View style={ProfileComponentStyles.slide}>
            <ProfilePreviewComponent {...this.props} updateProfile={this.updateProfile.bind(this)} isUpdated={isUpdated}/>
          </View>
          <View style={ProfileComponentStyles.slide}>
            <ProfileUpdateComponent {...this.props} discard={this.discardUpdateProfile.bind(this)}/>
          </View>
        </Swiper>
      </View>
    )
  }
}

ProfileComponent.propTypes = {
  profilePreviewUserId: PropTypes.string,
  closeProfile: PropTypes.func
}
