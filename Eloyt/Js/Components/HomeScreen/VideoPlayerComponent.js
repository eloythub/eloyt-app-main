// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import { Bars } from 'react-native-loader'
// Essentials
import { VideoPlayerComponentStyles, WaitingComponentStyles } from '../../Styles'
import VideoPlayerComponentDelegator from '../../Delegators/Components/HomeScene/VideoPlayerComponentDelegator'
import ProfileAvatar from '../../Components/ProfileAvatar'
import SearchButton from '../../Components/SearchButton'
import MessagesButton from '../../Components/MessagesButton'
import SnapPlayerManagerComponent from './SnapPlayerManagerComponent'
import BottomCameraImage from '../BottomCameraImage'

export default class VideoPlayerComponent extends VideoPlayerComponentDelegator {
  constructor (props) {
    super(props)

    this.state = {
      waitingMain: true,
    }
  }

  renderVideoPlayerQueue () {
    const {forcePause} = this.props

    return (
      <View style={VideoPlayerComponentStyles.rootSnapPlayerContainer}>
        <SnapPlayerManagerComponent forcePause={forcePause}
                                    openProfile={(userId) => this.openProfile(userId)}
                                    moveSceneToSearch={this.props.moveSceneToSearchScene.bind(this)}/>
      </View>
    )
  }

  renderWaiting () {
    return <View style={WaitingComponentStyles.mainWaitingContainer}>
      <View style={WaitingComponentStyles.mainWaiting}>
        <Bars size={30} color="#ffffff"/>
      </View>
    </View>
  }

  render () {
    const {waitingMain} = this.state
    const {
            moveSceneToSearchScene,
            moveSceneToNotificationScene,
            moveSceneToRecordScene
          }             = this.props

    if (waitingMain) {
      return this.renderWaiting()
    }

    const loggedInUser = this.ssoUserData

    return (
      <View style={VideoPlayerComponentStyles.rootNonFlexContainer}>
        {this.renderVideoPlayerQueue()}
        <View style={VideoPlayerComponentStyles.topSection}>
          <View style={VideoPlayerComponentStyles.notifyListMessageRecipientsSection}>
            <MessagesButton unread={0}
                                onPress={moveSceneToNotificationScene.bind(this)}/>
          </View>
          <View style={VideoPlayerComponentStyles.profileSection}>
            <ProfileAvatar onPress={this.openProfile.bind(this, loggedInUser.id)}
                           imageUrl={loggedInUser.cloudAvatarUrl}
                           size={40}/>
          </View>
          <View style={VideoPlayerComponentStyles.searchSection}>
            <SearchButton onPress={moveSceneToSearchScene.bind(this)}/>
          </View>
        </View>
        <View style={VideoPlayerComponentStyles.bottomSection}>
          <TouchableOpacity onPress={moveSceneToRecordScene.bind(this)}>
            <BottomCameraImage />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

VideoPlayerComponent.propTypes = {
  forcePause: PropTypes.bool,
  moveSceneToRecordScene: PropTypes.func,
  moveSceneToSearchScene: PropTypes.func,
  moveSceneToNotificationScene: PropTypes.func,
  openProfile: PropTypes.func,
}
