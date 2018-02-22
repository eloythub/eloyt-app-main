// Basics
import React from 'react'
import { Animated } from 'react-native'
import { Delegator } from 'react-eloyt'
import { LocalStorage } from '../../../../Factories'

const identifierKey = 'UsingForFirstTimeTutorialComponent'

export default class UsingForFirstTimeTutorialComponentDelegator extends Delegator {
  async componentDidMount () {
    // @TODO: remove this line after finishing the tutorial
    //await LocalStorage.unload(identifierKey)
    const isModuleLoadedBefore = await LocalStorage.init(identifierKey)

    if (isModuleLoadedBefore) {
      return
    }

    await this.setState({modal: true})

    await this.props.show()

    await LocalStorage.save(identifierKey, true)

    this.newMessageSlidePositionTouchAnimation()
    this.searchSlidePositionTouchAnimation()
  }

  newMessageSlidePositionTouchAnimation () {
    const {newMessageSlidePosition} = this.state

    Animated.sequence([
      Animated.timing(newMessageSlidePosition, {
        toValue: 270,
        duration: 1500,
        delay: 700
      }),
      Animated.timing(newMessageSlidePosition, {
        toValue: 20,
        duration: 300,
      })
    ]).start(this.newMessageSlidePositionTouchAnimation.bind(this))
  }

  searchSlidePositionTouchAnimation () {
    const {searchSlidePosition} = this.state

    Animated.sequence([
      Animated.timing(searchSlidePosition, {
        toValue: 20,
        duration: 1500,
        delay: 700
      }),
      Animated.timing(searchSlidePosition, {
        toValue: 280,
        duration: 300,
      })
    ]).start(this.searchSlidePositionTouchAnimation.bind(this))
  }

  async doHide() {
    await this.setState({modal: false})

    await this.props.hide()
  }

  async nextSlide () {
    await this.refs.mainSlide.scrollBy(1)
  }

  async previewsSlide () {
    await this.refs.mainSlide.scrollBy(-1)
  }
}
