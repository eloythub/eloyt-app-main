import { Dimensions, StyleSheet } from 'react-native'

import { Utils } from '../../../Factories'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width,
    height,
    //position: 'absolute',
    //top: 0,
    //right: 0,
    //left: 0,
    //bottom: 0,
  },
})
