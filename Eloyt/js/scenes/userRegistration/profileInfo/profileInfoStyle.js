import { Dimensions, StyleSheet } from 'react-native'
import configs from '../../../libs/configs'
const {width, height} = Dimensions.get('window')

const profileWidth = 130
const pagePadding = 130

export default StyleSheet.create({
  buttonsSection: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileInfoWrapper: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  profileImageWrapper: {
    width: profileWidth
  },
  nameWrapper: {
    width: width - profileWidth - (configs.rowViewPaddingSize * 2)
  }
})
