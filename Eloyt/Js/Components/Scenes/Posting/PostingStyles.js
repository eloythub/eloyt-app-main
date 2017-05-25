import { StyleSheet, Dimensions } from 'react-native';

const {width, height}  = Dimensions.get('window');
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
    shadowColor: '#d3d3d3',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
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
  cancelContainer: {
    width: 55,
    height: 55,
    backgroundColor: 'transparent',
    shadowColor: '#d3d3d3',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  cancelIcon: {
    width: 18,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  cancelButton: {
    width: 55,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postingContainer: {
    width: 55,
    height: 55,
    backgroundColor: 'transparent',
    shadowColor: '#d3d3d3',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  postingIcon: {
    width: 26,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  postingButton: {
    width: 55,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  sceneTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'OpenSans',
  },
  postingEntitiesContainer: {
    flex: 1,
    position: 'absolute',
    top: topSectionHeight,
    width,
    height: height - topSectionHeight,
  },
  entitiesContainer: {
    flex: 1,
  },
  postingEntityContainer: {
    flex: 1,
    alignItems: 'center',
  },
  postingProgressContainer: {
    flex: 1,
    position: 'absolute',
    top: topSectionHeight,
    width,
    height: height - topSectionHeight,
    alignItems: 'center',
  },
  progressBar: {
    fontSize: 24,
    color: '#ffffff',
    fontFamily: 'OpenSans',
  },
});