import { Dimensions, StyleSheet } from 'react-native'

const {width} = Dimensions.get('window')

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 10,
  },
  container: {
    flex: 0,
    height: 30,
    minWidth: 60,
    alignItems: 'center',
    flexDirection: 'column',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 4,
    paddingTop: 5,
    paddingRight: 5,
    paddingLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'OpenSans',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
})
