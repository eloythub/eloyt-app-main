// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Image, ScrollView, Text, TouchableWithoutFeedback, TouchableOpacity, View } from 'react-native'
import { Bars } from 'react-native-loader'
import moment from 'moment'
// Essentials
import { Assets } from '../../Factories'
import { ProfilePreviewComponentStyles, WaitingComponentStyles } from '../../Styles'
import { ProfileEnum } from '../../Enums'
import ProfilePreviewComponentDelegator from '../../Delegators/Components/HomeScene/ProfilePreviewComponentDelegator'
import CloseButton from '../../Components/CloseButton'
import SignOutButton from '../../Components/SignOutButton'
import EditButton from '../../Components/EditButton'
import ImageEntity from '../../Components/ImageEntity'
import HashtagViewerEntity from '../../Components/HashtagViewerEntity'

export default class ProfilePreviewComponent extends ProfilePreviewComponentDelegator {
  constructor (props) {
    super(props)

    this.state = {
      mainWaiting: true,
      mode: ProfileEnum.MODE_PREVIEW_GUESS,
    }

    this.requestedProfileData = null
  }

  renderWaiting (show) {
    if (!show) {
      return
    }

    return <View style={[
      WaitingComponentStyles.mainWaitingContainer,
      {
        marginTop: 65,
        paddingBottom: 130
      }
    ]}>
      <View style={WaitingComponentStyles.mainWaiting}>
        <Bars size={30} color="#ffffff"/>
      </View>
    </View>
  }

  renderProfileDetails () {
    const {mode} = this.state

    if (!this.requestedProfileData) {
      return
    }

    const dateOfBirth = this.requestedProfileData.dateOfBirth ? moment(this.requestedProfileData.dateOfBirth) : null

    return (
      <View style={ProfilePreviewComponentStyles.profileEntitiesContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={ProfilePreviewComponentStyles.entitiesContainer}>
            <View style={ProfilePreviewComponentStyles.profileEntityContainer}>
              <ImageEntity imageUrl={this.requestedProfileData.cloudAvatarUrl}/>
            </View>

            <View style={ProfilePreviewComponentStyles.profileEntityContainer}>
              <View style={ProfilePreviewComponentStyles.usernameContainer}>
                <Text style={ProfilePreviewComponentStyles.descriptiveText}>
                  @{this.requestedProfileData.username}
                </Text>
              </View>
              <Text style={ProfilePreviewComponentStyles.fullNameText}>
                {this.requestedProfileData.firstName} {this.requestedProfileData.lastName}
              </Text>
            </View>

            <TouchableWithoutFeedback onPress={async () => await this.sendEmail(this.requestedProfileData.email)}>
              <View style={[
                ProfilePreviewComponentStyles.profileEntityContainer,
                ProfilePreviewComponentStyles.descriptiveContainer
              ]}>
                <Image source={Assets.EmailIcon} style={ProfilePreviewComponentStyles.emailImage}/>
                <Text style={ProfilePreviewComponentStyles.descriptiveText}>{this.requestedProfileData.email}</Text>
              </View>
            </TouchableWithoutFeedback>

            {
              dateOfBirth
                ? (
                <View style={[
                  ProfilePreviewComponentStyles.profileEntityContainer,
                  ProfilePreviewComponentStyles.descriptiveContainer
                ]}>
                  <Image source={Assets.BirthdateIcon} style={ProfilePreviewComponentStyles.birthdateImage}/>
                  <Text style={ProfilePreviewComponentStyles.descriptiveText}>
                    {dateOfBirth.format('Y/MMM/DD')}
                  </Text>
                </View>
              )
                : null
            }

            <View style={[
              ProfilePreviewComponentStyles.profileEntityContainer,
              ProfilePreviewComponentStyles.descriptiveContainer,
              ProfilePreviewComponentStyles.aboutMe,
              this.requestedProfileData.aboutMe ? ProfilePreviewComponentStyles.aboutMeWithText: null
            ]}>
              {
                !this.requestedProfileData.aboutMe && mode === ProfileEnum.MODE_PREVIEW_MASTER
                  ? <TouchableOpacity onPress={this.onUpdateButton.bind(this)}>
                  <Image source={Assets.EditIcon} style={ProfilePreviewComponentStyles.updateImage}/>
                </TouchableOpacity>
                  : null
              }
              {
                !this.requestedProfileData.aboutMe && mode === ProfileEnum.MODE_PREVIEW_MASTER
                  ? <TouchableOpacity onPress={this.onUpdateButton.bind(this)}>
                  <Text style={ProfilePreviewComponentStyles.descriptiveTextPlaceholder}>
                    {'< Here you can describe yourself >'}
                  </Text>
                </TouchableOpacity>
                  : <Text style={ProfilePreviewComponentStyles.descriptiveText}>
                  {this.requestedProfileData.aboutMe}
                </Text>
              }
            </View>

            <View style={[
              ProfilePreviewComponentStyles.profileEntityContainer,
              ProfilePreviewComponentStyles.descriptiveContainer,
            ]}>
              <HashtagViewerEntity src={this.requestedProfileData.hashtags}/>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }

  render () {
    const {mainWaiting, mode} = this.state

    return (
      <View style={ProfilePreviewComponentStyles.rootContainer}>
        {this.renderProfileDetails()}
        <View style={ProfilePreviewComponentStyles.topSection}>
          <CloseButton onPress={this.onCloseButton.bind(this)}/>
          <SignOutButton hide={mode !== ProfileEnum.MODE_PREVIEW_MASTER} onPress={this.onSignOutButton.bind(this)}/>
          <EditButton hide={mode !== ProfileEnum.MODE_PREVIEW_MASTER} onPress={this.onUpdateButton.bind(this)}/>
        </View>
        {this.renderWaiting(mainWaiting)}
      </View>
    )
  }
}

ProfilePreviewComponent.propTypes = {
  profilePreviewUserId: PropTypes.string,
  closeProfile: PropTypes.func,
  updateProfile: PropTypes.func,
  isUpdated: PropTypes.bool,
}
