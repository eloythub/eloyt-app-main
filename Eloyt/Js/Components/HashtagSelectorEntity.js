// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableWithoutFeedback, View, ScrollView } from 'react-native'
// Essentials
import { HashtagSelectorEntityComponentStyles } from '../Styles'
import HashtagSelectorEntityComponentDelegator from '../Delegators/Components/HashtagSelectorEntityComponentDelegator'

export default class HashtagSelectorEntity extends HashtagSelectorEntityComponentDelegator {
  constructor (props) {
    super(props)

    this.state = Object.assign({
      selectedHashtags: []
    }, props)
  }

  render () {
    const {src} = this.state

    return (
      <ScrollView>
        <View style={HashtagSelectorEntityComponentStyles.rootContainer}>
          {src.map((hashtag, index) => {
            const isSelected = this.isSelected(hashtag.slug)

            return <TouchableWithoutFeedback key={index} onPress={this.toggleHashtag.bind(this, hashtag)}>
              <View
                style={
                  [
                    HashtagSelectorEntityComponentStyles.container,
                    (isSelected ? HashtagSelectorEntityComponentStyles.containerSelected : {})
                  ]
                }>
                <Text style={
                  [
                    HashtagSelectorEntityComponentStyles.title,
                    (isSelected ? HashtagSelectorEntityComponentStyles.titleSelected : {})
                  ]
                }>{hashtag.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          })}
        </View>
      </ScrollView>
    )
  }
}

HashtagSelectorEntity.propTypes = {
  onChange: PropTypes.func,
  initSelected: PropTypes.array,
  src: PropTypes.array,
}
