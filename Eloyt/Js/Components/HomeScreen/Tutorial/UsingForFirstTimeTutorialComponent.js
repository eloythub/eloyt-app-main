// Basics
import React from 'react'
import { View, Modal, Text, Image, TouchableOpacity } from 'react-native'
import { BlurView } from 'react-native-blur'
import PropTypes from 'prop-types'
import Swiper from 'react-native-swiper'
// Essentials
import { Assets } from '../../../Factories'
import { UsingForFirstTimeTutorialComponentStyles } from '../../../Styles'
import UsingForFirstTimeTutorialComponentDelegator from '../../../Delegators/Components/HomeScene/Tutorial/UsingForFirstTimeTutorialComponentDelegator'
import LeftArrowButton from '../../LeftArrowButton'

export default class UsingForFirstTimeTutorialComponent extends UsingForFirstTimeTutorialComponentDelegator {
  constructor (props) {
    super(props)

    this.state = {
      modal: false,
    }
  }

  renderScene1 () {
    return (
      <View>
        <View style={UsingForFirstTimeTutorialComponentStyles.mainContainer}>
          <Image source={Assets.PureLogo} style={UsingForFirstTimeTutorialComponentStyles.pureLogo}/>
          <Text style={UsingForFirstTimeTutorialComponentStyles.sceneTitle}>{'Welcome to eloyt'.toUpperCase()}</Text>
        </View>

        <TouchableOpacity style={UsingForFirstTimeTutorialComponentStyles.nextButton}
                          onPress={this.nextSlide.bind(this)}>
          <Text style={UsingForFirstTimeTutorialComponentStyles.nextButtonCaption}>
            {'next'.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderScene2 () {
    return (
      <View>
        <View style={UsingForFirstTimeTutorialComponentStyles.topSection}>
          <LeftArrowButton onPress={this.previewsSlide.bind(this)}/>
        </View>
        <View style={UsingForFirstTimeTutorialComponentStyles.mainContainer}>
          <View style={UsingForFirstTimeTutorialComponentStyles.entitiesScene2Container}>
            <View style={UsingForFirstTimeTutorialComponentStyles.descriptionTextWrapper}>
              <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionText}>
                You are going to watch video snaps from people in your area.
              </Text>
            </View>
            <View style={UsingForFirstTimeTutorialComponentStyles.tutorialSnapPreviewWrapper}>
              <Image source={Assets.TutorialSnapPreview}
                     style={UsingForFirstTimeTutorialComponentStyles.tutorialSnapPreview}/>
            </View>
          </View>
        </View>
        <TouchableOpacity style={UsingForFirstTimeTutorialComponentStyles.nextButton}
                          onPress={this.nextSlide.bind(this)}>
          <Text style={UsingForFirstTimeTutorialComponentStyles.nextButtonCaption}>
            {'next'.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderScene3 () {
    return (
      <View>
        <View style={UsingForFirstTimeTutorialComponentStyles.topSection}>
          <LeftArrowButton onPress={this.previewsSlide.bind(this)}/>
        </View>
        <View style={UsingForFirstTimeTutorialComponentStyles.mainContainer}>
          <View style={UsingForFirstTimeTutorialComponentStyles.entitiesContainer}>
            <View style={UsingForFirstTimeTutorialComponentStyles.descriptionTextWrapper}>
              <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionText}>
                You will get to react to their snap and leave them message at the same time.
              </Text>
            </View>
            <View style={UsingForFirstTimeTutorialComponentStyles.tutorialPreReactWrapper}>
              <Image source={Assets.TutorialPreReact}
                     style={UsingForFirstTimeTutorialComponentStyles.tutorialPreReact}/>
            </View>
            <View style={UsingForFirstTimeTutorialComponentStyles.tutorialReactWrapper}>
              <Image source={Assets.TutorialReact}
                     style={UsingForFirstTimeTutorialComponentStyles.tutorialReact}/>
            </View>
          </View>
        </View>
        <TouchableOpacity style={UsingForFirstTimeTutorialComponentStyles.nextButton}
                          onPress={this.nextSlide.bind(this)}>
          <Text style={UsingForFirstTimeTutorialComponentStyles.nextButtonCaption}>
            {'next'.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderScene4 () {
    return (
      <View>
        <View style={UsingForFirstTimeTutorialComponentStyles.topSection}>
          <LeftArrowButton onPress={this.previewsSlide.bind(this)}/>
        </View>
        <View style={UsingForFirstTimeTutorialComponentStyles.mainContainer}>
          <View style={UsingForFirstTimeTutorialComponentStyles.entitiesContainer}>
            <View style={UsingForFirstTimeTutorialComponentStyles.descriptionTextWrapper}>
              <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionText}>
                Every Time anyone reacts to your snap, you will receive an notification.
              </Text>
            </View>
            <View style={UsingForFirstTimeTutorialComponentStyles.tutorialNewNotificationWrapper}>
              <Image source={Assets.TutorialNewNotification}
                     style={UsingForFirstTimeTutorialComponentStyles.tutorialNewNotification}/>
            </View>
          </View>
        </View>
        <TouchableOpacity style={UsingForFirstTimeTutorialComponentStyles.nextButton}
                          onPress={this.nextSlide.bind(this)}>
          <Text style={UsingForFirstTimeTutorialComponentStyles.nextButtonCaption}>
            {'next'.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderSceneLast () {
    return (
      <View>
        <View style={UsingForFirstTimeTutorialComponentStyles.topSection}>
          <LeftArrowButton onPress={this.previewsSlide.bind(this)}/>
        </View>
        <View style={UsingForFirstTimeTutorialComponentStyles.mainContainer}>
          <View style={UsingForFirstTimeTutorialComponentStyles.entitiesContainer}>
            <View style={UsingForFirstTimeTutorialComponentStyles.descriptionTextWrapper}>
              <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionText}>
                In case you received a new message from a person in your area you can simply slide to the right side
                or press the message Icon in order to navigate to message board and start communicating with people
                who messaged you or you have left message for them.
              </Text>
            </View>
            <View style={UsingForFirstTimeTutorialComponentStyles.tutorialNotificationWrapper}>
              <Image source={Assets.TutorialNotification}
                     style={UsingForFirstTimeTutorialComponentStyles.tutorialNotification}/>
            </View>
          </View>
        </View>
        <TouchableOpacity style={UsingForFirstTimeTutorialComponentStyles.nextButton}
                          onPress={this.doHide.bind(this)}>
          <Text style={UsingForFirstTimeTutorialComponentStyles.nextButtonCaption}>
            {`continue networking`.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    return (
      <Modal
        visible={this.state.modal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => this.setState({
          modal: false
        })}>
        <View>
          <BlurView blurType="dark"
                    overlayColor="#ffffff"
                    blurAmount={40}
                    style={UsingForFirstTimeTutorialComponentStyles.blurView}>
            <Swiper ref="mainSlide"
                    keyboardShouldPersistTaps="handled"
                    index={0}
                    loop={false}
                    bounces={true}
                    autoplay={false}
                    horizontal={true}
                    loadMinimal={true}
                    showsButtons={false}
                    showsPagination={false}
                    scrollEnabled={true}>
              {this.renderScene1()}
              {this.renderScene2()}
              {this.renderScene3()}
              {this.renderScene4()}
              {this.renderSceneLast()}
            </Swiper>
          </BlurView>
        </View>
      </Modal>
    )
  }
}

UsingForFirstTimeTutorialComponent.propTypes = {
  show: PropTypes.func,
  hide: PropTypes.func
}
