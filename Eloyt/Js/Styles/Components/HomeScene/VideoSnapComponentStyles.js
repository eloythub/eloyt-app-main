import { Dimensions, StyleSheet } from 'react-native'

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
  },
  entitiesContainer: {
    flex: 1,
    alignItems: 'center',
  },
  placeholderContainer: {
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
})
