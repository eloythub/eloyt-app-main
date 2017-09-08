import { Dimensions, StyleSheet } from 'react-native'

import { Utils } from '../../../Factories'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  rootNonFlexContainer: {
    width,
    height,
  },
  rootSnapPlayerContainer: {
    flex: 1,
    width,
    height,
  },
  rootContainer: {
    flex: 1,
  },
  topSection: {
    top: 0,
    flex: 1,
    width,
    height: 65,
    paddingTop: 25,
    paddingRight: 5,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 1,
  },
  bottomSection: {
    bottom: 0,
    flex: 1,
    width,
    height: 25,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    opacity: .7
  },
  bottomSectionLine: {
    width: width - 70,
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    backgroundColor: 'transparent',
    marginRight: 5,
    marginLeft: 5,
  },
  notifyListMessageRecipientsSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width / 3,
    paddingLeft: 5,
  },
  profileSection: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width / 3
  },
  searchSection: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: width / 3,
    paddingRight: 5,
  },
})
