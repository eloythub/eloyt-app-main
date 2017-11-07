// Basics
import React from 'react'
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native'
import Swiper from 'react-native-swiper'
// Essentials
import { CommonStyles, CompleteProfileScreenStyles, WaitingComponentStyles } from '../Styles'
import { Assets, Debug, Utils } from '../Factories'
import CompleteProfileScreenDelegator from '../Delegators/Screens/CompleteProfileScreenDelegator'
import ImageEntity from '../Components/ImageEntity'
import InputTextBoxEntity from '../Components/InputTextBoxEntity'
import BirthdateEntity from '../Components/BirthdateEntity'
import GenderEntity from '../Components/GenderEntity'
import TermsAndConditionLink from '../Components/TermsAndConditionLink'
// Modules
import { Bars } from 'react-native-loader'

export default class CompleteProfileScreen extends CompleteProfileScreenDelegator {
  constructor (props) {
    Debug.Log(`CompleteProfileScreen:constructor`)

    super(props)

    this.state = {
      waitingMain: true,
      waitingNext: false
    }

    this.introSwiperProperties = {
      ref: 'introSwiperRef',
      index: 0,
      loop: false,
      bounces: false,
      autoplay: false,
      horizontal: true,
      loadMinimal: true,
      showsButtons: false,
      showsPagination: false,
      scrollEnabled: false
    }
  }

  postRender () {
    return (
      <Swiper keyboardShouldPersistTaps="handled"
              {...this.introSwiperProperties}>
        {this.postRenderIntro()}
        {this.postRenderCompleteProfile()}
      </Swiper>
    )
  }

  postRenderIntro () {
    return (
      <View style={CompleteProfileScreenStyles.rootMainPostContainer}>
        <View style={CompleteProfileScreenStyles.logoContainer}>
          <Image source={Assets.PureLogo} style={CompleteProfileScreenStyles.pureLogo}/>
          <Text style={CompleteProfileScreenStyles.sceneTitle}>{'Welcome to eloyt'.toUpperCase()}</Text>
        </View>
        <View style={CompleteProfileScreenStyles.profileEntitiesContainer}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={CompleteProfileScreenStyles.descriptionTextWrapper}>
              <Text style={CompleteProfileScreenStyles.descriptionText}>
                {'\n'}
                <Text style={CompleteProfileScreenStyles.descriptionTextBold}>Eloyt</Text> is a video base networking
                app which allows you to share your ideas to people in your area.
                {'\n\n'}
                our mission is to make networking experience easier and more affordable.
                {'\n\n'}
                by using Eloyt you will get
                to  <Text style={CompleteProfileScreenStyles.descriptionTextBold}>know</Text> people around you
                , <Text style={CompleteProfileScreenStyles.descriptionTextBold}>like</Text> their ideas
                and make a common <Text style={CompleteProfileScreenStyles.descriptionTextBold}>trust</Text> in order
                to have business collaboration or even more.
                {'\n\n'}
                it only takes two steps to complete your profile and start networking but you have to know that by
                completing your account and finalize the registration, you agreed with our terms and condition on using
                this platform.
              </Text>
              <View style={CompleteProfileScreenStyles.termsAndConditionsWrapper}>
                <TermsAndConditionLink showOnlyLink={true}
                                       linkText="Terms and Conditions"
                                       linkStyle={CompleteProfileScreenStyles.termsAndConditions}/>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity style={CompleteProfileScreenStyles.nextButton}
                            onPress={this.nextSlide.bind(this)}>
            <Text style={CompleteProfileScreenStyles.nextButtonCaption}>
              {`i'm agree with Terms and conditions`.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  postRenderCompleteProfile () {
    const {ssoUserData} = this
    const {waitingNext} = this.state

    return (
      <View style={CompleteProfileScreenStyles.rootMainPostContainer}>
        <View style={CompleteProfileScreenStyles.logoContainer}>
          <Image source={Assets.PureLogo} style={CompleteProfileScreenStyles.pureLogo}/>
          <Text style={CompleteProfileScreenStyles.sceneTitle}>{'Complete Your Profile'.toUpperCase()}</Text>
        </View>
        <View style={CompleteProfileScreenStyles.profileEntitiesContainer}>
          <KeyboardAvoidingView behavior="padding"
                                style={CompleteProfileScreenStyles.keyboardAvoidingViewContainer}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={CompleteProfileScreenStyles.entitiesContainer}>
                <View style={CompleteProfileScreenStyles.profileEntityContainer}>
                  <ImageEntity imageUrl={ssoUserData.cloudAvatarUrl}/>
                </View>
                <View style={CompleteProfileScreenStyles.profileEntityContainer}>
                  <InputTextBoxEntity
                    setTextRef={(textRefObj) => this.usernameRef = textRefObj}
                    onChange={(text) => this.username = text}
                    default={this.username}
                    caption="USERNAME"
                    name="username"
                    nextFocusObjectRef={() => this.firstNameRef.focus()}
                  />
                </View>
                <View style={CompleteProfileScreenStyles.profileEntityContainer}>
                  <InputTextBoxEntity
                    setTextRef={(textRefObj) => this.firstNameRef = textRefObj}
                    onChange={(text) => this.firstName = text}
                    default={this.firstName}
                    caption="FIRST NAME"
                    name="firstname"
                    nextFocusObjectRef={() => this.lastNameRef.focus()}
                  />
                </View>
                <View style={CompleteProfileScreenStyles.profileEntityContainer}>
                  <InputTextBoxEntity
                    setTextRef={(textRefObj) => this.lastNameRef = textRefObj}
                    onChange={(text) => this.lastName = text}
                    default={this.lastName}
                    caption="LAST NAME"
                    name="lastname"
                  />
                </View>
                <View style={CompleteProfileScreenStyles.profileEntityContainer}>
                  <GenderEntity
                    onPress={(genderValue) => this.gender = genderValue}
                    value={this.gender.toLowerCase()}
                  />
                </View>
                <View style={CompleteProfileScreenStyles.profileEntityContainer}>
                  <BirthdateEntity
                    onChange={(dateOfBirth) => this.dateOfBirth = dateOfBirth}
                    date={this.dateOfBirth}/>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <TouchableOpacity disabled={waitingNext} style={CompleteProfileScreenStyles.nextButton}
                            onPress={this.nextButtonPress.bind(this)}>
            {
              !waitingNext
                ? <Text style={CompleteProfileScreenStyles.nextButtonCaption}>
                {'Save & Select Areas of Interest'.toUpperCase()}
              </Text>
                : null
            }
            {this.renderWaitingNext(waitingNext)}
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    const {waitingMain} = this.state

    return (
      <View style={CompleteProfileScreenStyles.rootContainer}>
        <StatusBar
          backgroundColor={Utils.isIOS() ? '#ffffff' : '#000000'}
          barStyle="light-content"
          hidden={false}
        />
        <Image source={Assets.FluidBackground} style={CommonStyles.backgroundImage}/>

        {this.renderWaiting(waitingMain)}

        <View style={CompleteProfileScreenStyles.rootMainContainer}>
          {!waitingMain ? this.postRender() : null}
        </View>
      </View>
    )
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

  renderWaitingNext (show) {
    if (!show) {
      return
    }

    return <Bars size={7} color="#ffffff"/>
  }
}

export const CompleteProfileScreenKey = 'CompleteProfileScene'
