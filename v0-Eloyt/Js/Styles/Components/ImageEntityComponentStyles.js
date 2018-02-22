import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  rootContainer: {
    backgroundColor: 'transparent',
  },
  imageWrapper: {
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#b7b7b7',
    borderStyle: 'dashed',
    overflow: 'hidden',
    width: 120,
    height: 120,
  },
  emptyProfileUserImage: {
    width: 100,
    height: 100,
    left: 7,
    top: 6,
  },
  profileUserImage: {
    flex: 1,
    //borderWidth: 3,
    //borderColor: '#b7b7b7',
    borderRadius: 60,
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
})
