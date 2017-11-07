// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import { LocalStorage } from '../../../../Factories'

const identifierKey = 'UsingForFirstTimeTutorialComponent'

export default class UsingForFirstTimeTutorialComponentDelegator extends Delegator {
  async componentDidMount () {
    // @TODO: remove this line after finishing the tutorial
    await LocalStorage.unload(identifierKey)
    const isModuleLoadedBefore = await LocalStorage.init(identifierKey)

    if (isModuleLoadedBefore) {
      return
    }

    await this.setState({modal: true})

    await this.props.show()

    await LocalStorage.save(identifierKey, true)
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
