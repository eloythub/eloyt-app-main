import { StyleSheet, Platform, Dimensions } from 'react-native';

const {width, height}     = Dimensions.get('window');
const logoContainerHeight = 80;
const statusBarHeight     = Platform.OS === 'ios' ? 20 : 0;

export const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
    },
    rootMainContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      paddingTop: statusBarHeight,
    },
    rootMainPostContainer: {
      flex: 1,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      position: 'absolute',
      left: -310,
      top: 0,
      width: width + 310,
      height: height,
    },
    logoContainer: {
      paddingTop: 10,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: logoContainerHeight,
    },
    pureLogo: {
      width: 30,
      height: 35,
    },
    sceneTitle: {
      color: '#ffffff',
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'OpenSans',
    },
    profileEntitiesContainer: {
      flex: 1,
      width: width,
      height: (height - logoContainerHeight) - (Platform.OS === 'ios' ? 0 : 24),
      paddingTop: 10,
    },
    nextButton: {
      width: Dimensions.get('window').width,
      backgroundColor: '#00b651',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingTop: 20,
      paddingBottom: 20,
    },
    nextButtonCaption: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'OpenSans',
    },
    entitiesContainer: {
      flex: 1,
    },
    profileEntityContainer: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 10,
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
});
