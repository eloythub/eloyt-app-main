import { Dimensions, StyleSheet } from 'react-native'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  rootSnapContainer: {
    flex: 1,
    zIndex: 999,
  },
  rootSnapQueueEmptyContainer: {
    flex: 1,
    width,
    height,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noSnapText: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  linkContainer: {
    marginTop: 10,
  },
  link: {
    fontSize: 13,
    fontFamily: 'OpenSans',
    flexDirection: 'column',
    color: '#ffffff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
})
