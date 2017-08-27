import { Dimensions, StyleSheet } from 'react-native'

import { Utils } from '../../Factories'

const {width} = Dimensions.get('window')

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: width - 60,
  },
  datePicker: {
    width: width - 60,
  },
  datePickerPlaceHolderText: {
    flex: 1,
    fontFamily: 'OpenSans',
    fontSize: Utils.isIOS() ? 18 : 16,
    fontWeight: Utils.isIOS() ? 'normal' : '100',
    color: '#7d7d7d',
    height: 40,
    paddingBottom: 0,
    alignItems: 'flex-start',
  },
  datePickerDateText: {
    flex: 1,
    fontFamily: 'OpenSans',
    fontSize: Utils.isIOS() ? 18 : 16,
    fontWeight: Utils.isIOS() ? 'normal' : '100',
    color: '#ffffff',
    height: 40,
    paddingBottom: 0,
    alignItems: 'flex-start',
  },
  datePickerDateInput: {
    borderColor: 'transparent',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: '#7d7d7d',
    paddingLeft: Utils.isIOS() ? 0 : 3,
    height: Utils.isIOS() ? 40 : 32,
  },
})
