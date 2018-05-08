import { Dimensions, StyleSheet } from 'react-native'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  logoWrapper: {
    alignItems: 'center',
    paddingTop: 80
  },
  appNameWrapper: {
    alignItems: 'center',
  },
  appNameText: {
    fontFamily: 'open-sans-light',
    fontSize: 35,
    color: '#fff'
  },
  buttonsSection: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  termsSection: {
    padding: 20,
    paddingTop: 10,
    alignItems: 'center'
  },
  termsText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'open-sans-bold',
  },
  termsTextWithLink: {
    marginBottom: -2,
    flexDirection:'row',
    flexWrap:'wrap'
  },
  termsLink: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'open-sans-bold',
    textDecorationLine: 'underline',
    alignItems: 'center'
  }
})
