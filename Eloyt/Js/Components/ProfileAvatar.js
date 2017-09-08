// Basics
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, TouchableHighlight, View } from 'react-native'
// Essentials
import { ProfileAvatarComponentStyles } from '../Styles'

export default class ProfileAvatar extends Component {
  render () {
    const {imageUrl, size, onPress} = this.props

    return (
      <TouchableHighlight onPress={onPress.bind(this)} underlayColor="transparent">
        <View style={[ProfileAvatarComponentStyles.rootContainer, {
          width: size,
          height: size,
        }]}>
          <Image
            source={{uri: imageUrl}}
            style={[ProfileAvatarComponentStyles.profileUserImage, {
              borderRadius: size / 2,
              width: size,
              height: size,
            }]}/>
        </View>
      </TouchableHighlight>
    )
  }
}

ProfileAvatar.propTypes = {
  imageUrl: PropTypes.string,
  size: PropTypes.number,
  onPress: PropTypes.func,
}
