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
    opacity: 0.1,
  },
});
