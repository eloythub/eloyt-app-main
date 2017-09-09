// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, View } from 'react-native'
import { Bars } from 'react-native-loader'
// Essentials
import { SnapPlayerManagerComponentStyle, WaitingComponentStyles } from '../../Styles'
import SnapPlayerManagerComponentDelegator from '../../Delegators/Components/HomeScene/SnapPlayerManagerComponentDelegator'
import Button from '../../Components/Button'
import SnapPlayerComponent from '../../Components/HomeScreen/SnapPlayerComponent'

export default class SnapPlayerManagerComponent extends SnapPlayerManagerComponentDelegator {
  constructor (props) {
    super(props)

    this.state = {
      waitingMain: true,
      snapQueue: [],
      currentSnap: null,
    }
  }

  renderSnapVideo () {
    const {currentSnap} = this.state
    const {forcePause}  = this.props

    return (
      <View style={SnapPlayerManagerComponentStyle.rootSnapContainer}>
        <SnapPlayerComponent forcePause={forcePause}
                             snapVideo={currentSnap}
                             onSkipTheSnap={this.onSkipTheSnap.bind(this)}
                             onLikeTheSnap={this.onLikeTheSnap.bind(this)}
                             onDislikeTheSnap={this.onDislikeTheSnap.bind(this)}/>
      </View>
    )
  }

  renderSnapEmptyQueue () {
    const {waitingMain} = this.state

    if (waitingMain) {
      return
    }

    return (
      <View style={SnapPlayerManagerComponentStyle.rootSnapQueueEmptyContainer}>
        <Text style={SnapPlayerManagerComponentStyle.noSnapText}>Awww :({'\n'}Apparently, ain't no one around</Text>

        <Button onPress={this.searchAgain.bind(this)} caption="Look after people again"/>

        <View style={SnapPlayerManagerComponentStyle.linkContainer}>
          <TouchableOpacity onPress={this.props.moveSceneToSearch.bind(this)}>
            <Text style={SnapPlayerManagerComponentStyle.link}>or improve your search</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderSnapWrapper () {
    const {snapQueue, currentSnap} = this.state

    if (snapQueue.length === 0 && !currentSnap) {
      return this.renderSnapEmptyQueue()
    }

    return this.renderSnapVideo()
  }

  renderWaiting (show) {
    if (!show) {
      return
    }

    return <View style={WaitingComponentStyles.mainWaitingContainer}>
      <View style={WaitingComponentStyles.mainWaiting}>
        <Bars size={30} color="#ffffff"/>
      </View>
    </View>
  }

  render () {
    const {waitingMain} = this.state

    return (
      <View style={SnapPlayerManagerComponentStyle.rootContainer}>
        {this.renderSnapWrapper()}

        {this.renderWaiting(waitingMain)}
      </View>
    )
  }
}

SnapPlayerManagerComponent.propTypes = {
  forcePause: PropTypes.bool,
  moveSceneToSearch: PropTypes.func
}
