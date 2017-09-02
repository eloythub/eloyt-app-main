// Basics
import React from 'react'
//import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
// Essentials
import { HomeScreenStyles, VideoPlayerComponentStyles } from '../../Styles'
import VideoPlayerComponentDelegator from '../../Delegators/Components/HomeScene/VideoPlayerComponentDelegator'

export default class VideoPlayerComponent extends VideoPlayerComponentDelegator {
  constructor (props) {
    super(props)

    this.state = props
  }

  render () {
    return (
      <View style={VideoPlayerComponentStyles.rootContainer}>
        <Text style={HomeScreenStyles.tempPlaceholder}>Video Player</Text>
      </View>
    )
  }
}

VideoPlayerComponent.propTypes = {}
