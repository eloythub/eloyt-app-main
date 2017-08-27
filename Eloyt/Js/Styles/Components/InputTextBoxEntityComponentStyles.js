import { Dimensions, StyleSheet } from 'react-native'

import { Utils } from '../../Factories'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  rootContainer: {
    width: width - 60,
    borderBottomWidth: 0.5,
    borderBottomColor: '#7d7d7d',
  },
  inputBox: {
    fontFamily: 'OpenSans',
    fontSize: Utils.isIOS() ? 18 : 16,
    fontWeight: Utils.isIOS() ? 'normal' : '100',
    color: '#ffffff',
    height: 50,
    paddingBottom: 0,
  },
})
