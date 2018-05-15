// Basics
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, TouchableHighlight, View } from 'react-native'
// Essentials
import avatarButtonStyle from './avatarButtonStyle'

export default class SimpleAvatarButton extends Component {
  render () {
    const {imageUrl, image, size, onPress = () => null} = this.props

    return (
      <TouchableHighlight onPress={onPress.bind(this)} underlayColor="transparent">
        <View style={[avatarButtonStyle.rootContainer, {
          width: size,
          height: size,
        }]}>
          <Image
            source={image ? image : {uri: imageUrl}}
            style={[avatarButtonStyle.profileUserImage, {
              //borderRadius: size / 2,
              //height: 40,
              //width: 40,
              borderRadius: size / 2,
              width: size,
              height: size,
            }]}/>
        </View>
      </TouchableHighlight>
    )
  }
}

SimpleAvatarButton.propTypes = {
  imageUrl: PropTypes.string,
  image: PropTypes.any,
  size: PropTypes.number,
  onPress: PropTypes.func,
}
