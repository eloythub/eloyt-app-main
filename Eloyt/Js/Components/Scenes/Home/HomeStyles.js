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
    zIndex:999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    opacity: 0.5,
  },
  highlightTopContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
  },
  highlightBottomContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: 150,
    position: 'absolute',
    bottom: 0,
  },
  highlightTop: {
    height: 70,
  },
  highlightBottom: {
    flex: 1,
    height: 150,
  },
});
