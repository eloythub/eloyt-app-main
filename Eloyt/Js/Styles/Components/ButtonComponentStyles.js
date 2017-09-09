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
    width: 45,
    height: 45,
    backgroundColor: 'transparent',
  },
  cancelButton: {
    width: 45,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonIcon: {
    width: 16,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  // OK Button
  okButtonContainer: {
    width: 45,
    height: 45,
    backgroundColor: 'transparent',
  },
  okButton: {
    width: 45,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  okButtonIcon: {
    width: 24,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  // Search Button
  searchButtonContainer: {
    width: 45,
    height: 45,
    backgroundColor: 'transparent',
  },
  searchButton: {
    width: 45,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonIcon: {
    width: 28,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  // More Button
  moreButtonContainer: {
    width: 45,
    height: 45,
    backgroundColor: 'transparent',
  },
  moreButton: {
    width: 45,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButtonIcon: {
    width: 24,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  // Notification Button
  notificationButtonContainer: {
    width: 45,
    height: 45,
    backgroundColor: 'transparent',
  },
  notificationButton: {
    width: 45,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationButtonIcon: {
    width: 28,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  newMessagesIcon: {
    width: 8,
    height: 8,
    backgroundColor: '#f44336',
    borderRadius: 8,
    opacity: 0.9,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  buttonContainer: {
    height: 40,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 0,
    height: 40,
    minWidth: 60,
    alignItems: 'center',
    flexDirection:'column',
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 4,
    paddingTop: 9,
    paddingRight: 5,
    paddingLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#282828',
  },
})
