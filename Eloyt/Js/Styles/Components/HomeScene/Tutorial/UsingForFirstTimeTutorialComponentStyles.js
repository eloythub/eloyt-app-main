import { Dimensions, StyleSheet } from 'react-native'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  blurView: {
    width,
    height,
  },
  mainContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height
  },
  pureLogo: {
    width: 180,
    height: 210.00,
  },
  sceneTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
    marginTop: 20
  },
  nextButton: {
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
  },
  nextButtonCaption: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
  topSection: {
    top: 0,
    flex: 1,
    width,
    height: 65,
    paddingTop: 25,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 1,
  },
  entitiesContainer: {
    flex: 1,
    width: width,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 45
  },
  entitiesScene2Container: {
    flex: 1,
    width: width,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 45,
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
    textAlign: 'auto'
  },
  descriptionTextBold: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
    textAlign: 'justify'
  },
  tutorialSnapPreviewWrapper: {
    width: 250,
    height: 444.67,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    position: 'absolute',
    top:110
  },
  tutorialSnapPreview: {
    width: 250,
    height: 444.67,
  },
  tutorialPreReactWrapper: {
    width: 250,
    height: 66.67,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    position: 'absolute',
    top:150
  },
  tutorialPreReact: {
    width: 250,
    height: 66.67,
  },
  tutorialReactWrapper: {
    width: 250,
    height: 66.67,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    position: 'absolute',
    top:280
  },
  tutorialReact: {
    width: 250,
    height: 66.67,
  },
  tutorialNewNotificationWrapper: {
    width: 80,
    height: 73.10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    position: 'absolute',
    top:120
  },
  tutorialNewNotification: {
    width: 80,
    height: 73.10,
  },
  tutorialNotificationWrapper: {
    width: 250,
    height: 50.67,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    position: 'absolute',
    top:190
  },
  tutorialNotification: {
    width: 250,
    height: 50.67,
  },
})
