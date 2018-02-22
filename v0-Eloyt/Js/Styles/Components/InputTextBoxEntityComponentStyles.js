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
    fontWeight: Utils.isIOS() ? 'normal' : '100',
    color: '#ffffff',
    paddingBottom: 0,
  },
})
