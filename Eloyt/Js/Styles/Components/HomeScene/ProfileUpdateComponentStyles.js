import { Dimensions, StyleSheet } from 'react-native'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  keyboardAvoidingViewContainer: {
    flex: 1,
  },
  profileEntitiesContainer: {
    flex: 1,
    width,
    height,
    paddingTop: 65,
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
    borderBottomColor: '#7d7d7d',
  },
  entitiesContainer: {
    flex: 1,
  },
  profileEntityContainerBottom: {
    flex: 1,
    alignItems: 'center',
    height: 150,
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
