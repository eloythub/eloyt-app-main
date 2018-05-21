import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import configs from '../libs/configs'
import commonAssets from '../styles/commonAssets'
import NormalHeader from '../components/header/normal'

const {width, height} = Dimensions.get('window')

let paddingMargin = {}

for (let x = 1; x <= 1000; x++) {
  paddingMargin[`padding${x}`]       = {padding: x}
  paddingMargin[`paddingLeft${x}`]   = {paddingLeft: x}
  paddingMargin[`paddingRight${x}`]  = {paddingRight: x}
  paddingMargin[`paddingTop${x}`]    = {paddingTop: x}
  paddingMargin[`paddingBottom${x}`] = {paddingBottom: x}
  paddingMargin[`margin${x}`]        = {margin: x}
  paddingMargin[`marginLeft${x}`]    = {marginLeft: x}
  paddingMargin[`marginRight${x}`]   = {marginRight: x}
  paddingMargin[`marginTop${x}`]     = {marginTop: x}
  paddingMargin[`marginBottom${x}`]  = {marginBottom: x}
}

export default StyleSheet.create({
  flexView: {
    flex: 1
  },
  splashBackgroundView: {
    flex: 1,
    backgroundColor: '#010101'
  },
  backgroundView: {
    flex: 1,
    backgroundColor: '#E6E6E6'
  },
  starterView: {
    padding: 10
  },
  container: {
    padding: 10,
  },
  rowView: {
    paddingLeft: configs.rowViewPaddingSize,
    paddingRight: configs.rowViewPaddingSize,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    left: -310,
    bottom: 20,
    width: width + 310,
    height: height,
  },
  logo: {
    width: 90,
    height: 104.93
  },
  buttonFacebook: {
    backgroundColor: '#50ACF9',
    marginBottom: 5
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 15,
  },
  buttonFacebookText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 15,
  },
  buttonGoogle: {
    backgroundColor: '#E54253'
  },
  buttonGoogleText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 15,
  },
  footerWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  },
  ...paddingMargin
})

export const transparentHeader = {
  headerStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontFamily: 'open-sans',
  },
}

export const normalHeader = {
  headerStyle: {
    backgroundColor: '#4B6CB7'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
}