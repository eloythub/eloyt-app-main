import { Dimensions, StyleSheet } from 'react-native'
import {ifIphoneX} from 'react-native-iphone-x-helper'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  profileEntitiesContainer: {
    flex: 1,
    width,
    height,
    paddingTop: 65,
    ...ifIphoneX({
      paddingTop: 90,
    })
  },
  topSection: {
    top: 0,
    flex: 1,
    width,
    height: 65,
    paddingTop: 25,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    ...ifIphoneX({
      height: 90,
      paddingTop: 50,
    })
  },
  entitiesContainer: {
    flex: 1,
  },
  profileEntityContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  fullNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'OpenSans',
  },
  usernameContainer: {
    flexDirection:'row',
    alignItems: 'center',
  },
  descriptiveContainer: {
    paddingLeft: 20,
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems: 'center',
  },
  descriptiveText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'OpenSans',
    marginLeft: 10,
  },
  descriptiveTextPlaceholder: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#cccccc',
    fontFamily: 'OpenSans',
    marginLeft: 10,
  },
  usernameSignText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#ffffff',
    fontFamily: 'OpenSans',
  },
  aboutMe: {
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  aboutMeWithText: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  emailImage: {
    width: 20,
    height: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  birthdateImage: {
    width: 20,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hashtagsContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  updateImage: {
    width: 18,
    height: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})