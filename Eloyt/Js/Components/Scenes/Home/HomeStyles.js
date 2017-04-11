import { StyleSheet, Platform, Dimensions } from 'react-native';

const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  rootMainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    paddingTop: statusBarHeight,
  },
  rootMainPostContainer: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
  videoContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    position: 'absolute',
    backgroundColor: '#111111',
  },
  videoThumbnailImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    position: 'absolute',
    opacity: 1,
  },
  loadingContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    zIndex:99,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    opacity: 0.5,
    backgroundColor: 'transparent',
  },
  highlightTopContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
  },
  highlightBottomContainer: {
    flex: 1,
    zIndex: 999,
    width: Dimensions.get('window').width,
    height: 140,
    position: 'absolute',
    bottom: 0,
  },
  highlightTop: {
    height: 70,
  },
  highlightBottom: {
    flex: 1,
    height: 140,
  },
  profileImageContainer: {
    width: 55,
    height: 55,
    paddingLeft: 10,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 28,
  },
  profileUserName: {
    color: '#ffffff',
    fontFamily: 'OpenSans',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  profileInfo: {
    color: '#acacac',
    fontFamily: 'OpenSans',
    fontSize: 14,
    fontWeight: 'normal',
    backgroundColor: 'transparent',
  },
  recordContainer: {
    width: 55,
    height: 55,
    backgroundColor: 'transparent',
  },
  recordIcon: {
    width: 22,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  recordButton: {
    width: 55,
    height: 55,
    backgroundColor: '#ff433c',
    borderColor: '#d0252b',
    borderWidth: 2,
    borderRadius: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
  },
  highlightBottomRightContainer: {
    width: 70,
    borderColor: '#d0252b',
  },
  videoTimer: {
    backgroundColor: 'transparent',
    color: '#e2e4ed',
    fontFamily: 'OpenSans',
    fontSize: 35,
    fontWeight: 'normal',
    paddingLeft: 10,
  },
});
