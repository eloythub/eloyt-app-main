import { Dimensions, StyleSheet } from 'react-native'

import { Utils } from '../../../Factories'

const {width} = Dimensions.get('window')

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
