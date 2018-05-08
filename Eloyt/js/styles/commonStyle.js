import { Dimensions, StyleSheet } from 'react-native'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  splashBackgroundView: {
    flex: 1,
    backgroundColor: '#010101'
  },
  starterView: {
    padding: 10
  },
  rowView: {
    paddingLeft: 20,
    paddingRight: 20,
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
    bottom: 0,
    left: 0,
    right: 0
  },
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
