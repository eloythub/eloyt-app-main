import { Dimensions, StyleSheet } from 'react-native'

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
  },
  doneButton: {
    width,
    backgroundColor: '#00b651',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
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
})
