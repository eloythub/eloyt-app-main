// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Delegator } from 'react-eloyt'
import { View } from 'react-native'
// Essentials
import { ButtonComponentStyles } from '../Styles'

export default class RecordIcon extends Delegator {
  render () {
    if (!this.props.show) {
      return (<View style={ButtonComponentStyles.recordIconContainer}/>)
    }

    return (
      <View style={ButtonComponentStyles.recordIconContainer}>
        <View style={ButtonComponentStyles.recordIcon}/>
      </View>
    )
  }
}

RecordIcon.propTypes = {
  show: PropTypes.bool,
}