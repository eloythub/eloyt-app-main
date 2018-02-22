// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Delegator } from 'react-eloyt'
import { Image, TouchableOpacity, View } from 'react-native'
// Essentials
import { Assets } from '../Factories'
import { ButtonComponentStyles } from '../Styles'

export default class SearchButton extends Delegator {
  render () {
    if (this.props.hide) {
      return <View style={ButtonComponentStyles.cancelButtonContainer}/>
    }

    return (
      <View style={ButtonComponentStyles.searchButtonContainer}>
        <TouchableOpacity {...this.props}>
          <View style={ButtonComponentStyles.searchButton}>
            <Image source={Assets.SearchIcon} style={ButtonComponentStyles.searchButtonIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

SearchButton.propTypes = {
  hide: PropTypes.bool,
  onPress: PropTypes.func,
}
