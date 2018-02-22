import { Dimensions, StyleSheet } from 'react-native'
import {ifIphoneX} from 'react-native-iphone-x-helper'

import { Utils } from '../../Factories'

const {width, height}     = Dimensions.get('window')
const logoContainerHeight = 80
const statusBarHeight     = Utils.isIOS() ? 20 : 0

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  keyboardAvoidingViewContainer: {
    flex: 1,
  },
  rootMainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: statusBarHeight,
  },
  rootMainPostContainer: {
    flex: 1,
  },
  logoContainer: {
    paddingTop: 10,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: logoContainerHeight,
    ...ifIphoneX({
      paddingTop: 40,
    })
  },
  pureLogo: {
    width: 30,
    height: 35,
  },
  sceneTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
  profileEntitiesContainer: {
    flex: 1,
    width: width,
    height: (height - logoContainerHeight) - (Utils.isIOS() ? 0 : 24),
    ...ifIphoneX({
      paddingTop: 20,
    })
  },
  nextButton: {
    width: Dimensions.get('window').width,
    backgroundColor: '#00b651',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    ...ifIphoneX({
      paddingTop: 20,
      paddingBottom: 40,
    })
  },
  nextButtonCaption: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
  entitiesContainer: {
    flex: 1,
  },
  profileEntityContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  loadingContainer: {
    width,
    height,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  loading: {
    opacity: 0.5,
    backgroundColor: 'transparent',
  },
  nextWaitingContainer: {
    //height: 10,
  },
  descriptionTextWrapper: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  descriptionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'OpenSans',
    textAlign: 'justify'
  },
  descriptionTextBold: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
    textAlign: 'justify'
  },
  termsAndConditionsWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  termsAndConditions: {
    flex: 1,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  }
})