import { Dimensions, StyleSheet } from 'react-native'

import { Utils } from '../../Factories'

const {width} = Dimensions.get('window')

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  caption: {
    flex: 1,
    fontFamily: 'OpenSans',
    fontSize: Utils.isIOS() ? 18 : 16,
    fontWeight: Utils.isIOS() ? 'normal' : '100',
    color: '#7d7d7d',
    height: 50,
    paddingTop: 15,
    paddingLeft: Utils.isIOS() ? 0 : 3,
  },
  radioButtonContainer: {
    height: 50,
    paddingTop: 15,
    paddingLeft: 10,
  },
  radioButtonText: {
    fontFamily: 'OpenSans',
    fontSize: Utils.isIOS() ? 18 : 16,
    fontWeight: Utils.isIOS() ? 'normal' : '100',
    color: '#7d7d7d',
    marginLeft: 5,
  },
  radioButtonTextSelected: {
    fontFamily: 'OpenSans',
    fontSize: Utils.isIOS() ? 18 : 16,
    fontWeight: Utils.isIOS() ? 'normal' : '100',
    color: '#ffffff',
    marginLeft: 5,
  },
})
