import { StyleSheet, Platform, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');
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
    width,
    height,
    flex: 1,
    position: 'absolute',
    backgroundColor: '#111111',
  },
  videoThumbnailImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  videoThumbnailImage: {
    width,
    height,
    resizeMode: 'cover',
  },
  video: {
    width,
    height,
  },
  loadingContainer: {
    width,
    height,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  loading: {
    opacity: 0.5,
    backgroundColor: 'transparent',
  },
  highlightTopContainer: {
    width,
    position: 'absolute',
    top: 0,
  },
  highlightBottomContainer: {
    flex: 1,
    zIndex: 999,
    width,
    height: 140,
    position: 'absolute',
    bottom: 0,
  },
  highlightTop: {
    height: 70,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  highlightBottom: {
    flex: 1,
    height: 140,
  },
  profileImageViewContainer: {
    paddingRight: 10,
  },
  profileImageContainer: {
    width: 55,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
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
    shadowColor: '#c62828',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  recordIcon: {
    width: 24,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  recordButton: {
    width: 55,
    height: 55,
    backgroundColor: '#f44336',
    borderColor: '#c62828',
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
    color: 'rgba(255, 255, 255, 0.4)',
    fontFamily: 'OpenSans',
    fontSize: 35,
    fontWeight: 'normal',
    paddingLeft: 10,
    opacity: 0,
  },
  topHighlightIconContainer: {
    width: 55,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    shadowColor: '#d3d3d3',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  topHighlightIcon: {
    width: 25,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  topHighlightNewIcon: {
    width: 8,
    height: 8,
    backgroundColor: '#f44336',
    borderRadius: 8,
    opacity: 0.9,
    position: 'absolute',
  },
  toast: {
    backgroundColor: '#ffffff',
  },
  toastText: {
    color: '#000000',
  },
});
