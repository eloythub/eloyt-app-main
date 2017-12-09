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
  rootMainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: statusBarHeight,
  },
  rootMainPostContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    left: -310,
    top: 0,
    width: width + 310,
    height: height,
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
    width,
    height: (height - logoContainerHeight) - (Utils.isIOS() ? 0 : 24),
    ...ifIphoneX({
      paddingTop: 20,
    })
  },
  doneButton: {
    width,
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
  doneButtonCaption: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
  entitiesContainer: {
    flex: 1,
  },
  hashtagSelectorWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  descriptionContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingTop: 10,
    ...ifIphoneX({
      paddingTop: 40,
    })
  },
  descriptionDescription: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'OpenSans',
  },
  entity: {
    color: '#ffffff',
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
  slide: {
    flex: 1,
    width,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  icons: {
    width: 150,
    height: 150,
    marginTop: 30,
    ...ifIphoneX({
      marginTop: 90,
    })
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'OpenSans',
    marginTop: 20
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#ffffff',
    fontFamily: 'OpenSans',
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 10
  },
  button: {
    width,
    backgroundColor: '#00b651',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...ifIphoneX({
      paddingTop: 20,
      paddingBottom: 40,
    })
  },
  askButton: {
    width,
    backgroundColor: '#f44336',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...ifIphoneX({
      paddingTop: 20,
      paddingBottom: 40,
    })
  },
  buttonCaption: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
})
