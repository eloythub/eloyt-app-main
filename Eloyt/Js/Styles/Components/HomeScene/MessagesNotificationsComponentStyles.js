import { Dimensions, StyleSheet } from 'react-native'

import { Utils } from '../../../Factories'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  rootNonFlexContainer: {
    width,
    height,
  },
  rootContainer: {
    flex: 1,
    marginTop: 65,
    height: height - 65,
  },
  notificationContainer: {
    width,
    //minHeight: 45,
    maxHeight: 200,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  messageContainer: {
    flex: 1,
    width,
  },
  topSection: {
    top: 0,
    flex: 1,
    width,
    height: 65,
    paddingLeft: 5,
    paddingTop: 25,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  composerContainer: {
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  textInputStyle: {
    fontFamily: 'OpenSans',
    fontWeight: 'normal',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  sendStyle: {
    backgroundColor: 'red',
    justifyContent: 'center'
  },
})
