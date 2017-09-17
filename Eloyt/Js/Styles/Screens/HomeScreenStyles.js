import { Dimensions, StyleSheet } from 'react-native'

import { Utils } from '../../Factories'

const {width, height} = Dimensions.get('window')
const statusBarHeight = Utils.isIOS() ? 20 : 0

export default StyleSheet.create({
  baseContainer: {
    flex: 1,
    backgroundColor: '#282828'
  },
  mainSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828',
  },
  playerSnapSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828',
  },
  placeholder: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
    textAlign: 'center',
  },
  rootContainer: {
    flex: 1,
  },
  rootMainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    paddingTop: statusBarHeight,
  },
  rootMainPostContainer: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'OpenSans',
  },
  userProfileBlurView: {
    width,
    height,
  },
})
