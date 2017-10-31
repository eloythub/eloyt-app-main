import { Dimensions, StyleSheet } from 'react-native'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  rootScrollViewContainer: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  rootScrollView: {
    flex: 1,
  },
  rootScrollNoActivityView: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
  },
  recipientContainer : {
    width: width / 3,
    alignItems: 'center',
    height: 110,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
    color: '#ffffff'
  },
  noActivityContainer : {
    //flex: 0,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noActivityImage: {
    alignItems: 'center',
    width: 100,
    height: 100,
    marginLeft: 18,
    marginBottom: 20,
  },
  noActivity: {
    fontSize: 15,
    fontWeight: 'normal',
    fontFamily: 'OpenSans',
    color: '#ffffff',
    alignItems: 'center',
    zIndex: 1,
  },
  noActivitySnap: {
    flex: -1,
    marginTop: 10,
  },
  noActivityAfterButton: {
    fontSize: 15,
    fontWeight: 'normal',
    fontFamily: 'OpenSans',
    color: '#ffffff',
    alignItems: 'center',
    zIndex: 1,
    marginTop: 30,
    marginBottom: 20,
  },
  noActivityButton: {
    flex: 1,
    marginTop: 10,
    zIndex: 100,
  },
  detailsUserAvatar: {
    width: width / 3,
    height: 60,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  detailsUserInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 3,
  },
  detailsUserInfoTextUsername: {
    height: 12,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'OpenSans',
    lineHeight: 13,
  },
  detailsUserInfoTextFirstName: {
    height: 15,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'OpenSans',
    lineHeight: 17,
  },
  unreadIcon: {
    minWidth: 22,
    height: 20,
    backgroundColor: '#f44336',
    borderRadius: 9,
    opacity: 0.9,
    position: 'absolute',
    right: 30,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#ffffff',
    fontFamily: 'OpenSans',
    fontSize: 10,
    fontWeight: 'bold',
  },

})
