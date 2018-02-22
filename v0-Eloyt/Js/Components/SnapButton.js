// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, View } from 'react-native'
// Essentials
import { ButtonComponentStyles } from '../Styles'
import SnapButtonComponentDelegator from '../Delegators/Components/SnapButtonComponentDelegator'

export default class SnapButton extends SnapButtonComponentDelegator {
  render () {
    return (
      <View style={ButtonComponentStyles.rootContainer}>
        <TouchableHighlight
          style={ButtonComponentStyles.snapButton}
          delayPressIn={0}
          delayPressOut={0}
          onPressIn={this.startSnapping.bind(this)}
          onPressOut={this.finishSnapping.bind(this)}
          onPress={this.finishSnapping.bind(this)}

          underlayColor="rgba(255, 255, 255, 0.5)">
          <View />
        </TouchableHighlight>
      </View>
    )
  }
}

SnapButton.propTypes = {
  onSnapStarted: PropTypes.func,
  onSnapEnded: PropTypes.func,
}
