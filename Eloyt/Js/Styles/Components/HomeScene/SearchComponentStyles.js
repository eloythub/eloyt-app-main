import { Dimensions, StyleSheet } from 'react-native'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  rootNonFlexContainer: {
    width,
    height,
  },
  rootContainer: {
    flex: 1,
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

  searchEntitiesContainer: {
    width,
    height,
    paddingTop: 65,
  },
  searchEntityContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  searchResultEntityContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 65,
  },
  searchResultScrollView: {
  },
  resultRowContainer: {
    width: width - 40,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#ffffff',
    fontFamily: 'OpenSans',
    textAlign: 'center',
  },
  resultRowDetailsUserContainer: {
    width: width - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#7d7d7d',
    paddingBottom: 10,
    paddingTop: 5,
  },
  resultRowDetailsUserFirstContainer: {
    borderTopColor: 'transparent',
  },
  detailsUserAvatar: {
    width: 50,
    height: 50,
    marginRight: 5,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  detailsUserInfo: {
    width: 300,
    height: 50,
    marginLeft: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  detailsUserInfoTextUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'OpenSans',
  },
  detailsUserInfoTextFullName: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#ffffff',
    fontFamily: 'OpenSans',
  },
  summeryContainer: {
    minWidth: 45,
    paddingRight: 15,
    height: 45,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summeryImage: {
    width: 20,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  summeryText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#ffffff',
    fontFamily: 'OpenSans',
    textAlign: 'center',
  },
})
