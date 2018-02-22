// Basics
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, View } from 'react-native'
// Essentials
import { ImageEntityComponentStyles } from '../Styles'
import { Assets } from '../Factories'
import ImageEntityComponentDelegator from '../Delegators/Components/ImageEntityComponentDelegator'

class EmptyProfileUserImage extends Component {
  render () {
    return (
      <View style={ImageEntityComponentStyles.imageWrapper}>
        <Image source={Assets.DefaultProfileUser} style={ImageEntityComponentStyles.emptyProfileUserImage}/>
      </View>
    )
  }
}

class ProfileUserImage extends Component {
  constructor (props) {
    super(props)

    this.state = props
  }

  componentWillReceiveProps (props) {
    this.setState(props)
  }

  render () {
    return (
      <Image source={{uri: this.state.imageUrl}} style={ImageEntityComponentStyles.profileUserImage}/>
    )
  }
}

export default class ImageEntity extends ImageEntityComponentDelegator {
  constructor (props) {
    super(props)

    this.state = props
  }

  render () {
    return (
      <View style={ImageEntityComponentStyles.rootContainer}>
        {
          this.state.imageUrl
            ? <ProfileUserImage {...this.state}/>
            : <EmptyProfileUserImage  />
        }
      </View>
    )
  }
}

ProfileUserImage.propTypes = ImageEntity.propTypes = {
  imageUrl: PropTypes.string,
}
