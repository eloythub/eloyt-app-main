import { Dimensions, StyleSheet } from 'react-native'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  camera: {
    width,
    height,
    paddingTop: 20,
  },
  topSection: {
    top: 0,
    flex: 1,
    width,
    height: 70,
    paddingTop: 20,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 1,
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
  },
  backgroundLayer: {
    flex: 1,
    width,
    height,
    position: 'absolute',
    zIndex: 0,
    backgroundColor: 'transparent'
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
})
