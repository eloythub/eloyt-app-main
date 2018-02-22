// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Delegator } from 'react-eloyt'
import { TouchableOpacity, View, Text } from 'react-native'
// Essentials
import { ButtonComponentStyles } from '../Styles'

export default class Button extends Delegator {
  render () {
    const { caption } = this.props

    if (this.props.hide) {
      return <View style={ButtonComponentStyles.buttonContainer}/>
    }

    return (
      <View style={ButtonComponentStyles.buttonContainer}>
        <TouchableOpacity {...this.props}>
          <View style={ButtonComponentStyles.container}>
            <Text style={ButtonComponentStyles.title}>{caption}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

Button.propTypes = {
  hide: PropTypes.bool,
  onPress: PropTypes.func,
  caption: PropTypes.string,
}
