import { StyleSheet, Platform, Dimensions } from 'react-native';

const logoContainerHeight = 80;
const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  rootMainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: statusBarHeight,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width + 70,
    height: Dimensions.get('window').height + 100,
    position: 'absolute',
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
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height - logoContainerHeight) - (Platform.OS === 'ios' ? 0 : 24),
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
});
