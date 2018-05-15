import { Dimensions, StyleSheet } from 'react-native'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  logoWrapper: {
    alignItems: 'center',
    paddingTop: 120
  },
  appNameWrapper: {
    alignItems: 'center',
  },
  appNameText: {
    fontFamily: 'open-sans-light',
    fontSize: 35,
    textAlign: 'center',
    color: '#fff'
  },
  buttonsSection: {
    paddingLeft: 20,
    paddingRight: 20,
  },
})
