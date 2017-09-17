// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import PropTypes from 'prop-types'
import { TouchableHighlight, View } from 'react-native'
// Essentials
import { ButtonComponentStyles } from '../Styles'

export default class AlternativeSnapButton extends Delegator {
  render () {
    return (
      <View style={ButtonComponentStyles.rootAlternativeContainer}>
        <TouchableHighlight
          style={ButtonComponentStyles.snapButton}
          onPress={this.props.onPress.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)">
          <View />
        </TouchableHighlight>
      </View>
    )
  }
}

AlternativeSnapButton.propTypes = {
  onPress: PropTypes.func,
}
