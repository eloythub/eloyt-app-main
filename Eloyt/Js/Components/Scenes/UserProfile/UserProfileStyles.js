import { StyleSheet, Platform, Dimensions } from 'react-native';

const {width, height}  = Dimensions.get('window');
const statusBarHeight  = Platform.OS === 'ios' ? 20 : 0;
const topSectionHeight = 70;

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    width,
    height,
    overflow: 'hidden',
  },
  rootMainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: statusBarHeight,
  },
  rootMainModalContainer: {
    flex: 1,
    paddingTop: statusBarHeight,
  },
  rootMainPostContainer: {
    flex: 1,
  },
  loadingMainContainer: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    //flex: 1,
    position: 'absolute',
    zIndex: 999,
  },
  loadingContainer: {
    width,
    height: height - topSectionHeight - statusBarHeight,
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    left: -310,
    top: 0,
    width: width + 310,
    height: height,
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
  settingsContainer: {
    width: 55,
    height: 55,
    backgroundColor: 'transparent',
  },
  settingsIcon: {
    width: 18,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  settingsButton: {
    width: 55,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileEntitiesContainer: {
    flex: 1,
    width: width,
    height: height - (Platform.OS === 'ios' ? 0 : 24),
    paddingTop: 10,
  },

  entitiesContainer: {
    flex: 1,
  },
  profileEntityContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  discriptiveContainer: {
    paddingLeft: 30,
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems: 'center',
  },
  hashtags: {
    paddingLeft: 30,
  },
  aboutMe: {
    paddingLeft: 20,
  },
  fullNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'OpenSans',
  },
  descriptiveText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'OpenSans',
    marginLeft: 10,
  },
  emailImage: {
    width: 20,
    height: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  birthdateImage: {
    width: 20,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    width,
    backgroundColor: '#f44336',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
  },
  logoutButtonCaption: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
  checkContainer: {
    width: 55,
    height: 55,
    backgroundColor: 'transparent',
  },
  checkIcon: {
    width: 18,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  checkButton: {
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
});