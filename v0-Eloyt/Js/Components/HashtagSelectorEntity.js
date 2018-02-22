// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Bars } from 'react-native-loader'
// Essentials
import { HashtagSelectorEntityComponentStyles } from '../Styles'
import HashtagSelectorEntityComponentDelegator from '../Delegators/Components/HashtagSelectorEntityComponentDelegator'
import Button from '../Components/Button'

const {width} = Dimensions.get('window')

export default class HashtagSelectorEntity extends HashtagSelectorEntityComponentDelegator {
  constructor (props) {
    super(props)

    this.state = Object.assign({
      isFailedToLoad: false,
      selectedHashtags: props.initSelected || []
    }, props)
  }

  render () {
    const {src, isFailedToLoad} = this.state
    const {widthOffset = 60}    = this.props

    if (!src) {
      return (
        <ScrollView keyboardShouldPersistTaps="handled">
          {
            isFailedToLoad
              ? <View style={[
              HashtagSelectorEntityComponentStyles.rootContainer,
              HashtagSelectorEntityComponentStyles.rootWaitingContainer,
              {
                width: width - widthOffset
              }
            ]}>
              <Button onPress={this.retry.bind(this)} caption="Failed To Load Tags!!! Try again please"/>
            </View>
              : <View style={[
              HashtagSelectorEntityComponentStyles.rootContainer,
              HashtagSelectorEntityComponentStyles.rootWaitingContainer,
            ]}>
              <Bars size={20} color="#ffffff"/>
            </View>
          }
        </ScrollView>
      )
    }

    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={[
          HashtagSelectorEntityComponentStyles.rootContainer,
          {
            width: width - widthOffset
          }
        ]}>
          {
            src.map((hashtag, index) => {
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
            })
          }
        </View>
      </ScrollView>
    )
  }
}

HashtagSelectorEntity.propTypes = {
  onChange: PropTypes.func,
  initSelected: PropTypes.array,
  src: PropTypes.array,
  widthOffset: PropTypes.number,
}
