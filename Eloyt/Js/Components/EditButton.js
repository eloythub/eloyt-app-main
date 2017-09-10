// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Delegator } from 'react-eloyt'
import { TouchableOpacity, View, Image } from 'react-native'
// Essentials
import { Assets } from '../Factories'
import { ButtonComponentStyles } from '../Styles'

export default class EditButton extends Delegator {
  render () {
    if (this.props.hide) {
      return <View style={ButtonComponentStyles.editButtonContainer} />
    }

    return (
      <View style={ButtonComponentStyles.editButtonContainer}>
        <TouchableOpacity {...this.props}>
          <View style={ButtonComponentStyles.editButton}>
            <Image source={Assets.EditIcon} style={ButtonComponentStyles.editButtonIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

EditButton.propTypes = {
  hide: PropTypes.bool,
  onPress: PropTypes.func,
}
