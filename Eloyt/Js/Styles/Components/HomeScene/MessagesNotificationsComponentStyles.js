import { Dimensions, StyleSheet } from 'react-native'
import {ifIphoneX} from 'react-native-iphone-x-helper'

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
    ...ifIphoneX({
      marginTop: 90,
      paddingBottom: 30,
    })
  },
  rootContainerOpenKeyboard: {
    flex: 1,
    marginTop: 65,
    height: height - 65,
    ...ifIphoneX({
      marginTop: 90,
      paddingBottom: 0,
    })
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
    ...ifIphoneX({
      height: 90,
      paddingTop: 50,
    })
  },
  topSectionUserInfo: {
    flex: 1,
    top: -7,
    height: 33,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSectionUserAvatar: {
    marginRight: 10,
    top: -7,
    width: 33,
    height: 33,
  },
  composerContainer: {
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',

    ...ifIphoneX({
      paddingBottom: 50
    })
  },
  composerContainerOpenKeyboard: {
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',

    ...ifIphoneX({
      paddingBottom: 20
    })
  },
  textInputStyle: {
    fontFamily: 'OpenSans',
    fontWeight: 'normal',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  topUsername: {
    fontFamily: 'OpenSans',
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 16,
    marginRight: 5
  },
  sendStyle: {
    backgroundColor: 'red',
    justifyContent: 'center'
  },
  profileImageContainer: {
    width: 20,
    height: 20,
  },
  chatBubbleWrapperLeft: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 2
  },
  chatBubbleTextLeft: {
    color: '#ffffff'
  },
  chatBubbleLinkLeft: {
    color: '#ffffff'
  },
  chatBubbleWrapperRight: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 2
  }
})
