// Basics
import React from 'react'
import { View, Modal, Text, Image, TouchableOpacity, Animated } from 'react-native'
import { BlurView } from 'react-native-blur'
import PropTypes from 'prop-types'
import Swiper from 'react-native-swiper'
import {Col, Grid, Row} from 'react-native-easy-grid'
// Essentials
import TermsAndConditionLink from '../../../Components/TermsAndConditionLink'
import { Assets } from '../../../Factories'
import { UsingForFirstTimeTutorialComponentStyles, CommonStyles } from '../../../Styles'
import UsingForFirstTimeTutorialComponentDelegator from '../../../Delegators/Components/HomeScene/Tutorial/UsingForFirstTimeTutorialComponentDelegator'
import LeftArrowButton from '../../LeftArrowButton'

export default class UsingForFirstTimeTutorialComponent extends UsingForFirstTimeTutorialComponentDelegator {
  constructor (props) {
    super(props)

    this.state = {
      modal: false,
      newMessageSlidePosition: new Animated.Value(20),
      searchSlidePosition: new Animated.Value(280),
      snapSlidePosition: new Animated.Value(270),
    }
  }

  renderScene1 () {
    return (
      <View>
        <View style={UsingForFirstTimeTutorialComponentStyles.mainContainer}>
          <Image source={Assets.PureLogo} style={UsingForFirstTimeTutorialComponentStyles.pureLogo}/>
          <Text style={UsingForFirstTimeTutorialComponentStyles.sceneTitle}>{`Welcome to eloyt's family`.toUpperCase()}</Text>
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
                You are going to watch videos from people in your area.
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
                You will get to
                <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionTextBold}> React </Text>
                to their videos,
                whether you've <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionTextBold}>liked </Text>
                or <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionTextBold}>disliked </Text>
                and leave them <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionTextBold}>message </Text>
                immediately.
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
            <View style={UsingForFirstTimeTutorialComponentStyles.descriptionTextWrapper}>
              <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionText}>
                {'\n\n'}Every Time anyone likes to your video,
                or sends you a message,
                you will receive a notification.
              </Text>
            </View>
            <View style={UsingForFirstTimeTutorialComponentStyles.descriptionTextWrapper}/>
            <View style={UsingForFirstTimeTutorialComponentStyles.tutorialNewNotificationWrapper}>
              <Image source={Assets.TutorialNewNotification}
                     style={UsingForFirstTimeTutorialComponentStyles.tutorialNewNotification}/>
            </View>
            <View style={UsingForFirstTimeTutorialComponentStyles.tutorialNotificationWrapper}>
              <Image source={Assets.TutorialNotification}
                     style={UsingForFirstTimeTutorialComponentStyles.tutorialNotification}/>
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
    const {newMessageSlidePosition} = this.state

    return (
      <View>
        <View style={UsingForFirstTimeTutorialComponentStyles.topSection}>
          <LeftArrowButton onPress={this.previewsSlide.bind(this)}/>
        </View>
        <View style={UsingForFirstTimeTutorialComponentStyles.mainContainer}>
          <View style={UsingForFirstTimeTutorialComponentStyles.entitiesContainer}>
            <View style={UsingForFirstTimeTutorialComponentStyles.descriptionTextWrapper}>
              <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionText}>
                In case you received a new message
                from anyone in your area,
                you can simply slide from left to right{'\n'}
              </Text>
              <Animated.Image source={Assets.TutorialSlideHandForMessage}
                     style={[
                       UsingForFirstTimeTutorialComponentStyles.tutorialHandTouch,
                       {
                         marginLeft: newMessageSlidePosition
                       }
                     ]}/>
              <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionText}>
                {'\n'}
                or press the message Icon in order to
                navigate to message board
                and start chatting with people
                who messaged you or you have left them message.
              </Text>
              <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionText}/>
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

  renderScene5 () {
    const {searchSlidePosition} = this.state

    return (
      <View>
        <View style={UsingForFirstTimeTutorialComponentStyles.topSection}>
          <LeftArrowButton onPress={this.previewsSlide.bind(this)}/>
        </View>
        <View style={UsingForFirstTimeTutorialComponentStyles.mainContainer}>
          <View style={UsingForFirstTimeTutorialComponentStyles.entitiesContainer}>
            <View style={UsingForFirstTimeTutorialComponentStyles.descriptionTextWrapper}>
              <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionText}>
                Are you looking for someone special?{'\n'}
                you can easily just slide from right to left{'\n'}
                or press the search icon {'\n'}
                while you are on the main page {'\n'}
              </Text>
              <Animated.Image source={Assets.TutorialSlideHandForSearch}
                     style={[
                       UsingForFirstTimeTutorialComponentStyles.tutorialHandTouch,
                       {
                         marginLeft: searchSlidePosition
                       }
                     ]}/>
              <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionText}>
                {'\n'}
                this way, you will be able to search
                based on username or any other
                identifiers. We are always working on better ways to
                produce a better result for you with
                better techniques.
              </Text>
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

  renderScene6 () {
    return (
      <View>
        <View style={UsingForFirstTimeTutorialComponentStyles.topSection}>
          <LeftArrowButton onPress={this.previewsSlide.bind(this)}/>
        </View>
        <View style={UsingForFirstTimeTutorialComponentStyles.mainContainer}>
          <View style={UsingForFirstTimeTutorialComponentStyles.entitiesContainer}>
            <View style={UsingForFirstTimeTutorialComponentStyles.descriptionTextWrapperNonFlex}>
              <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionText}>
                Do you have an awesome Idea?{'\n'}
                maybe a lesson, experience?{'\n'}
                or you just want to share something
                interesting with people around you
                in order to engage with people?
              </Text>
            </View>
            <Swiper index={0}
                    horizontal={true}
                    loop={true}
                    bounces={true}
                    autoplay={true}
                    loadMinimal={false}
                    showsButtons={false}
                    scrollEnabled={true}
                    style={{

                    }}
                    >
              <View style={UsingForFirstTimeTutorialComponentStyles.swiperSlide}>
                <Image source={Assets.TutorialSlideVerticaly}
                       style={UsingForFirstTimeTutorialComponentStyles.slideImage}/>
                <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionTextNoWidth}>
                  You can do that by simply slide from bottom to top
                </Text>
              </View>
              <View style={UsingForFirstTimeTutorialComponentStyles.swiperSlide}>
                <Image source={Assets.TutorialRecording}
                       style={UsingForFirstTimeTutorialComponentStyles.slideImage}/>
                <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionTextNoWidth}>
                  Camera will appear and you are ready to record
                </Text>
              </View>
              <View style={UsingForFirstTimeTutorialComponentStyles.swiperSlide}>
                <Image source={Assets.TutorialSharing}
                       style={UsingForFirstTimeTutorialComponentStyles.slideImage}/>
                <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionTextNoWidth}>
                  Just record it, and share it to everyone and wait to see peoples react
                </Text>
              </View>
            </Swiper>
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

  renderScene7 () {
    const {snapSlidePosition} = this.state

    return (
      <View>
        <View style={UsingForFirstTimeTutorialComponentStyles.topSection}>
          <LeftArrowButton onPress={this.previewsSlide.bind(this)}/>
        </View>
        <View style={UsingForFirstTimeTutorialComponentStyles.mainContainer}>
          <View style={UsingForFirstTimeTutorialComponentStyles.entitiesContainer}>
            <View style={UsingForFirstTimeTutorialComponentStyles.descriptionTextWrapper}>
              <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionText}>

              </Text>
              <View style={UsingForFirstTimeTutorialComponentStyles.tutorialAttentionWrapper}>
                <Image source={Assets.TutorialAttention}
                       style={UsingForFirstTimeTutorialComponentStyles.tutorialAttentionPreview}/>
              </View>

              <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionText}>
                {'\n'}We are respectfully requesting you to obey {'\n'}
                our <Text style={UsingForFirstTimeTutorialComponentStyles.descriptionTextBold}>terms and conditions </Text>
                as you agreed to.
                any inappropriate content would result by{'\n'}
                termination of your account forever.
              </Text>
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
          <Image source={Assets.PureLogo} style={UsingForFirstTimeTutorialComponentStyles.pureLogo}/>
          <Text style={UsingForFirstTimeTutorialComponentStyles.sceneTitle}>{`that's all about it`.toUpperCase()}</Text>
        </View>

        <TouchableOpacity style={UsingForFirstTimeTutorialComponentStyles.nextButton}
                          onPress={this.doHide.bind(this)}>
          <Text style={UsingForFirstTimeTutorialComponentStyles.nextButtonCaption}>
            {`Let's eloyt'em up`.toUpperCase()}
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
        <Image source={Assets.FluidBackground} style={CommonStyles.backgroundImage}/>

        <View>
          <BlurView blurType="prominent"
                    overlayColor="#aaa"
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
                    scrollEnabled={false}>
              {this.renderScene1()}
              {this.renderScene2()}
              {this.renderScene3()}
              {this.renderScene4()}
              {this.renderScene5()}
              {this.renderScene6()}
              {this.renderScene7()}
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
