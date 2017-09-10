// Basics
import React from 'react'
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
// Essentials
import { CommonStyles, ProfileHashtagsScreenStyles, WaitingComponentStyles } from '../Styles'
import { Assets, Debug, Utils } from '../Factories'
import ProfileHashtagsScreenDelegator from '../Delegators/Screens/ProfileHashtagsScreenDelegator'
import HashtagSelectorEntity from '../Components/HashtagSelectorEntity'
// Modules
import { Bars } from 'react-native-loader'

export default class ProfileHashtagsScreen extends ProfileHashtagsScreenDelegator {
  constructor (props) {
    Debug.Log(`ProfileHashtagsScreen:constructor`)

    super(props)

    this.state = {
      waitingMain: true,
      waitingNext: false,
      selectedHashtags: []
    }
  }

  postRender () {
    const {waitingNext, selectedHashtags} = this.state

    return (
      <View style={ProfileHashtagsScreenStyles.rootMainPostContainer}>
        <View style={ProfileHashtagsScreenStyles.logoContainer}>
          <Image source={Assets.PureLogo} style={ProfileHashtagsScreenStyles.pureLogo}/>
          <Text style={ProfileHashtagsScreenStyles.sceneTitle}>{'Area of Interest'.toUpperCase()}</Text>
        </View>
        <View style={ProfileHashtagsScreenStyles.descriptionContainer}>
          <Text style={ProfileHashtagsScreenStyles.descriptionDescription}>
            Please select areas of your interest:
          </Text>
        </View>
        <View style={ProfileHashtagsScreenStyles.profileEntitiesContainer}>
          <View style={ProfileHashtagsScreenStyles.entitiesContainer}>
            <View style={ProfileHashtagsScreenStyles.hashtagSelectorWrapper}>
              <HashtagSelectorEntity src={this.hashtags}
                                     initSelected={selectedHashtags}
                                     onChange={(selectedHashtags) => this.setState({selectedHashtags})}/>
            </View>
          </View>
          <TouchableOpacity disabled={waitingNext} style={ProfileHashtagsScreenStyles.doneButton}
                            onPress={this.doneButtonPress.bind(this)}>
            {
              !waitingNext
                ? <Text style={ProfileHashtagsScreenStyles.doneButtonCaption}>
                {'Save & Go Networking'.toUpperCase()}
              </Text>
                : null
            }
            {this.renderWaitingNext(waitingNext)}
          </TouchableOpacity>
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

  render () {
    const {waitingMain} = this.state

    return (
      <View style={ProfileHashtagsScreenStyles.rootContainer}>
        <StatusBar
          backgroundColor={Utils.isIOS() ? '#ffffff' : '#000000'}
          barStyle="light-content"
          hidden={false}
        />
        <Image source={Assets.FluidBackground} style={CommonStyles.backgroundImage}/>

        {this.renderWaiting(waitingMain)}

        <View style={ProfileHashtagsScreenStyles.rootMainContainer}>
          {!waitingMain ? this.postRender() : null}
        </View>
      </View>
    )
  }
}

export const ProfileHashtagsScreenKey   = 'ProfileHashtagsScene'
