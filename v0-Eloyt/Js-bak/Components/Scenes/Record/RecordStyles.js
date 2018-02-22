import { StyleSheet, Dimensions } from 'react-native';

const {width, height}     = Dimensions.get('window');
const topSectionHeight    = 70;
const bottomSectionHeight = 90;

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  rootMainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
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
  recordContainer: {
    width: 55,
    height: 55,
    backgroundColor: 'transparent',
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
  },
  stopContainer: {
    width: 55,
    height: 55,
    backgroundColor: 'transparent',
  },
  stopIcon: {
    width: 16,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  stopButton: {
    width: 55,
    height: 55,
    backgroundColor: '#f44336',
    borderColor: '#c62828',
    borderWidth: 2,
    borderRadius: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  torchContainer: {
    width: 55,
    height: 55,
    backgroundColor: 'transparent',
  },
  torchIcon: {
    width: 28,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  torchButton: {
    width: 55,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraSwitchContainer: {
    width: 55,
    height: 55,
    backgroundColor: 'transparent',
  },
  cameraSwitchIcon: {
    width: 35,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  cameraSwitchButton: {
    width: 55,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  midSection: {
    height: height - topSectionHeight - bottomSectionHeight,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    width,
    position: 'absolute',
    height: bottomSectionHeight,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    bottom: 0,
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
  camera: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },

});