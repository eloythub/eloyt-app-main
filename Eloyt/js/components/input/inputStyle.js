import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
  inputWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 0,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5
  },
  label: {
    color: '#fff',
    fontFamily: 'open-sans',
    fontSize: 12,
  },
  input: {
    color: '#fff',
    fontFamily: 'open-sans',
  },
  transparentInput: {
    color: '#fff',
    fontFamily: 'open-sans',
    paddingBottom: 9,
    marginLeft: -5
  },
  revealIcon: {
    fontSize: 35,
    position: 'absolute',
    right: 0,
    bottom: -8
  },
  item: {
    alignItems: 'flex-start'
  },
  phoneWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  countryWrapper: {
    paddingBottom: 5,
  },
  flag: {
    height: 20,
    width: 40,
  },
  phoneVerificationWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  sector: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 255, 255, 0.6)',
    margin: 5
  },
  sectorInput: {
    width: 60,
    textAlign: 'center',
    fontSize: 30,
    paddingBottom: 5,
    fontFamily: 'open-sans',
    color: 'rgba(255, 255, 255, 0.8)',
  }
})
