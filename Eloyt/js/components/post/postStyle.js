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
  waitingWrapper: {
    flex: 1
  },
  waitingMockedProfilePicture: {
    width: 40,
    height: 40,
    borderRadius:20,
    backgroundColor: '#E6E6E6'
  },
  waitingMockedText: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    height: 15
  }
})
