// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import { ApiService } from '../../Services'

export default class HashtagSelectorEntityComponentDelegator extends Delegator {
  async componentDidMount () {
    if (typeof this.state.src !== 'object') {
      try {
        const hashtagsSrc = await ApiService.getAllHashtags()

        await this.setState({src: hashtagsSrc.data})
      } catch (err) {
      }
    }
  }

  componentWillReceiveProps (props) {
    this.setState(props)
  }

  isSelected (slug) {
    const {selectedHashtags} = this.state

    let isSelected = false

    const selectedHashtagIndex = selectedHashtags.findIndex((selectedHashtag) => {
      return selectedHashtag.slug === slug
    })

    return selectedHashtagIndex >= 0
  }

  doUnSelect (hashtag) {
    let {selectedHashtags} = this.state

    const selectedHashtagIndex = selectedHashtags.findIndex((selectedHashtag) => {
      return selectedHashtag.slug === hashtag.slug
    })

    selectedHashtags.splice(selectedHashtagIndex, 1)

    return this.setState({selectedHashtags})
  }

  doSelect (hashtag) {
    let {selectedHashtags} = this.state

    selectedHashtags.push(hashtag)

    return this.setState({selectedHashtags})
  }

  toggleHashtag (hashtag) {
    // TODO: bug here
    !this.isSelected(hashtag.slug)
      ? this.doSelect(hashtag)
      : this.doUnSelect(hashtag)

    let {onChange}         = this.props
    let {selectedHashtags} = this.state

    onChange(selectedHashtags)
  }
}
