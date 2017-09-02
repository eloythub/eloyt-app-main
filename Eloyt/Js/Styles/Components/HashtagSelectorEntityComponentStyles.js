import { Dimensions, StyleSheet } from 'react-native'

import { Utils } from '../../Factories'

const {width} = Dimensions.get('window')

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: width - 60,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    paddingTop: 10,
  },
  container: {
    flex: 0,
    height: 40,
    minWidth: 60,
    alignItems: 'center',
    flexDirection:'column',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 4,
    paddingTop: 9,
    paddingRight: 5,
    paddingLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  containerSelected: {
    backgroundColor: '#ffffff',
  },
  title: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  titleSelected: {
    color: '#000000',
  },
})
