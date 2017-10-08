import React from 'react'
import PropTypes from 'prop-types'
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native'
import { Bars } from 'react-native-loader'
// Essentials
import { ProfileUpdateComponentStyles, WaitingComponentStyles } from '../../Styles'
import ProfileUpdateComponentDelegator from '../../Delegators/Components/HomeScene/ProfileUpdateComponentDelegator'
import { ProfileEnum } from '../../Enums'
import CloseButton from '../../Components/CloseButton'
import OkButton from '../../Components/OkButton'
import ImageEntity from '../../Components/ImageEntity'
import InputTextBoxEntity from '../../Components/InputTextBoxEntity'
import GenderEntity from '../../Components/GenderEntity'
import BirthdateEntity from '../../Components/BirthdateEntity'
import HashtagSelectorEntity from '../../Components/HashtagSelectorEntity'

export default class ProfileUpdateComponent extends ProfileUpdateComponentDelegator {
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

    return (
      <View style={ProfileUpdateComponentStyles.profileEntitiesContainer}>
        <KeyboardAvoidingView behavior="padding"
                              style={ProfileUpdateComponentStyles.keyboardAvoidingViewContainer}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={ProfileUpdateComponentStyles.entitiesContainer}>
              <View style={ProfileUpdateComponentStyles.profileEntityContainer}>
                <TouchableOpacity onPress={this.notImplementedFeature.bind(this)}>
                  <ImageEntity imageUrl={this.requestedProfileData.cloudAvatarUrl}/>
                </TouchableOpacity>
              </View>

              <View style={ProfileUpdateComponentStyles.profileEntityContainer}>
                <InputTextBoxEntity
                  setTextRef={(textRefObj) => this.firstNameRef = textRefObj}
                  onChange={(text) => this.firstName = text}
                  default={this.firstName}
                  caption="FIRST NAME"
                  name="firstname"
                  widthOffset={40}
                  nextFocusObjectRef={() => this.lastNameRef.focus()}
                />
              </View>

              <View style={ProfileUpdateComponentStyles.profileEntityContainer}>
                <InputTextBoxEntity
                  setTextRef={(textRefObj) => this.lastNameRef = textRefObj}
                  onChange={(text) => this.lastName = text}
                  default={this.lastName}
                  caption="LAST NAME"
                  name="lastname"
                  widthOffset={40}
                  nextFocusObjectRef={() => this.aboutMeRef.focus()}
                />
              </View>

              <View style={ProfileUpdateComponentStyles.profileEntityContainer}>
                <InputTextBoxEntity
                  setTextRef={(textRefObj) => this.aboutMeRef = textRefObj}
                  onChange={(text) => this.aboutMe = text}
                  default={this.aboutMe}
                  caption="ABOUT YOURSELF"
                  name="aboutme"
                  numberOfLines={3}
                  height={120}
                  widthOffset={40}
                  multiline={true}
                />
              </View>

              <View style={ProfileUpdateComponentStyles.profileEntityContainer}>
                <GenderEntity
                  onPress={(genderValue) => this.gender = genderValue}
                  value={this.gender.toLowerCase()}
                  widthOffset={40}/>
              </View>

              <View style={ProfileUpdateComponentStyles.profileEntityContainer}>
                <BirthdateEntity
                  onChange={(dateOfBirth) => this.dateOfBirth = dateOfBirth}
                  date={this.dateOfBirth}
                  widthOffset={40}/>
              </View>

              <View style={ProfileUpdateComponentStyles.profileEntityContainer}>
                <HashtagSelectorEntity initSelected={this.hashtags}
                                       onChange={(hashtags) => this.hashtags = hashtags}
                                       widthOffset={40}/>
              </View>

              <View style={ProfileUpdateComponentStyles.profileEntityContainerBottom}/>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }

  render () {
    const {mainWaiting} = this.state

    return (
      <View style={ProfileUpdateComponentStyles.rootContainer}>
        {this.renderProfileDetails()}
        <View style={ProfileUpdateComponentStyles.topSection}>
          <CloseButton onPress={this.onCloseButton.bind(this)}/>
          <OkButton onPress={this.onSaveButton.bind(this)}/>
        </View>
        {this.renderWaiting(mainWaiting)}
      </View>
    )
  }
}

ProfileUpdateComponent.propTypes = {
  profilePreviewUserId: PropTypes.string,
  discard: PropTypes.func
}
