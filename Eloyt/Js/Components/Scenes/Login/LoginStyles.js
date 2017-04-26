import { StyleSheet, Platform, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  rootMainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width + 70,
    height: Dimensions.get('window').height + 100,
    position: 'absolute',
  },
  loginField: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
  },
  loginButtonContainer: {
    width: 250,
    height: 40,
    borderWidth: 2,
    backgroundColor: '#4d6fa9',
    borderColor: '#4d6fa9',
    borderStyle: 'solid',
    borderRadius: 3,
    paddingTop: 4,
    marginBottom: 10,
  },
  loginButtonLogoWrapper: {
    alignItems: 'center',
  },
  loginButtonTextWrapper: {
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'OpenSans',
    paddingRight: 10,
    paddingTop: 1,
  },
  loginButtonFacebookIcon: {
    width: 28,
    height: 28,
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  pureLogo: {
    width: 90,
    height: 104.93,
    alignItems: 'center',
  },
  companyNameContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  companyName: {
    color: '#ffffff',
    fontFamily: 'OpenSans',
    fontSize: 40,
    fontWeight: 'bold',
  },
  logoSloganContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  logoSlogan: {
    color: '#ffffff',
    fontFamily: 'OpenSans',
    fontWeight: 'normal',
    fontSize: 20,
    paddingTop: 10,
  },
  loginAndContinueWithText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'OpenSans',
    marginTop: 30,
  },
  toast: {
    backgroundColor: '#ffffff',
  },
  toastText: {
    color: '#000000',
  },
});
