import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  // Snap Button
  snapButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  // Cancel Button
  cancelButtonContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
  cancelButton: {
    width: 50,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonIcon: {
    width: 18,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
})
