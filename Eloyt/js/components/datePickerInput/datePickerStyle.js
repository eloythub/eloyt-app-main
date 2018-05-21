import { Dimensions, StyleSheet } from 'react-native'

const {width} = Dimensions.get('window')

export default StyleSheet.create({
  inputWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 0,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    flexDirection:'row',
  },
  datePickerDateText: {
    flex: 1,
    fontFamily: 'open-sans',
    fontSize: 15,
    fontWeight: 'normal',
    color: '#ffffff',
    height: 40,
    paddingBottom: 0,
    alignItems: 'flex-start',
  },
  datePickerDateInput: {
    borderColor: 'transparent',
    alignItems: 'flex-start',
    paddingLeft: 0,
    height: 35,
  },
  empty: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    width: 32
  },
  emptyImage: {
    width: 32,
    height: 18
  },

  label: {
    color: '#fff',
    fontFamily: 'open-sans',
    fontSize: 12,
  },
  input: {
    color: '#fff',
    fontFamily: 'open-sans',
  },
  closeIconButton: {
    position: 'absolute',
    width: 30,
    right: -5,
    bottom: -2,
    paddingLeft: 10,
    paddingRight: 10
  },
  closeIcon: {
    fontSize: 40,
    color: 'rgba(255, 255, 255, 0.8)',
    padding: 0,
    margin: 0,
    position: 'absolute',
    right: -7
  }
})
