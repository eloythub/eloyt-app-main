// Basics
import React from 'react'
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
// Essentials
//import { LoginScreenStyles, WatingComponentStyles } from '../Styles'
import { Assets, Utils, Debug } from '../Factories'
import LoginScreenDelegator from '../Delegators/Screens/LoginScreenDelegator'
// Components
//import TermsAndConditionLink from '../Components/TermsAndConditionLink'
// Modules
//import { Col, Grid, Row } from 'react-native-easy-grid'
//import { Bars } from 'react-native-loader'

export default class HomeScreen extends LoginScreenDelegator {
  constructor (props) {
    Debug.Log('HomeScreen:constructor')

    super(props)
  }


  render () {
    return (
      <View>
      </View>
    )
  }
}

export const HomeScreenKey   = 'HomeScene'
export const HomeScreenTitle = 'Home'
