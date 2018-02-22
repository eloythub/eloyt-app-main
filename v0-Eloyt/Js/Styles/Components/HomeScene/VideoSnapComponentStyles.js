import { Dimensions, StyleSheet } from 'react-native'
import {ifIphoneX} from 'react-native-iphone-x-helper'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  rootPlaceholderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rootContainer: {
    flex: 1,
  },
  camera: {
    width,
    height,
  },
  uploadSlide: {
    flex: 1,
  },
  modalTopSection: {
    top: 0,
    flex: 1,
    width,
    height: 65,
    paddingTop: 20,
    paddingRight: 5,
    paddingLeft: 5,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    ...ifIphoneX({
      height: 90,
      paddingTop: 50,
    })
  },
  topSection: {
    top: 0,
    flex: 1,
    width,
    height: 65,
    paddingTop: 20,
    paddingRight: 5,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 1,
    ...ifIphoneX({
      height: 80,
      paddingTop: 40,
      paddingRight: 10
    })
  },
  bottomSection: {
    bottom: 0,
    flex: 1,
    width,
    height: 110,
    paddingTop: 20,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
    ...ifIphoneX({
      bottom: 50,
    })
  },
  uploadBlurView: {
    width,
    height,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  postingEntitiesContainer: {
    flex: 1,
    paddingTop: 70,
    zIndex: 0,
    ...ifIphoneX({
      paddingTop: 100,
    })
  },
  entitiesContainer: {
    flex: 1,
    alignItems: 'center',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
    textAlign: 'center',
  },
  progressContainer: {
    flex: 1,
    position: 'absolute',
    top: 70,
    width,
    height: height - 140,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarObject: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    position: 'absolute',
    fontSize: 24,
    color: '#ffffff',
    fontFamily: 'OpenSans',
  },
})
