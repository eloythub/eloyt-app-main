import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

const topSectionHeight = 70;

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  rootMainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  recordController: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  topSection: {
    width,
    height: topSectionHeight,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    top: 0,
  },
  backContainer: {
    width: 55,
    height: 55,
    backgroundColor: 'transparent',
  },
  backIcon: {
    width: 18,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 55,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
