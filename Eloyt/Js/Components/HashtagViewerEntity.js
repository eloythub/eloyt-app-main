// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, Text, View } from 'react-native'
// Essentials
import { HashtagViewerEntityComponentStyles } from '../Styles'
import HashtagViewerEntityComponentDelegator from '../Delegators/Components/HashtagViewerEntityComponentDelegator'

export default class HashtagViewerEntity extends HashtagViewerEntityComponentDelegator {
  constructor (props) {
    super(props)

    this.state = props
  }

  render () {
    const {src} = this.state

    return (
      <ScrollView>
        <View style={HashtagViewerEntityComponentStyles.rootContainer}>
          {src.map((hashtag, index) => {
            return <View key={index}
                         style={HashtagViewerEntityComponentStyles.container}>
              <Text style={HashtagViewerEntityComponentStyles.title}>
                {hashtag.name}
              </Text>
            </View>
          })}
        </View>
      </ScrollView>
    )
  }
}

HashtagViewerEntity.propTypes = {
  src: PropTypes.array,
}
