import React, { Component, PropTypes } from 'react';
import { View, Platform, StatusBar} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Utils from '../../../Libraries/Utils';
import * as HomeActions from './HomeActions';
import { styles } from './HomeStyles';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import { Actions, ActionConst } from 'react-native-router-flux';
import { LoginManager } from 'react-native-fbsdk';
import LocalStorage from '../../../Libraries/LocalStorage';
import VideoManager from '../../../Components/Misc/Home/VideoManager';
import LinearGradient from 'react-native-linear-gradient';
import TopHighlightIcon from '../../../Components/Misc/Home/TopHighlightIcon';
import ProfileImage from '../../../Components/Misc/Home/ProfileImage';

class HomeScene extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {homeActions} = this.props;

    Utils.next().then(() => homeActions.waiting(false));

    LocalStorage.load(LoginActionsConst.ON_SSO_USER_DATA)
      .then((ssoUserData) => {
        homeActions.setUserLogin({
          ssoUserData,
        });
      })
      .catch(() => {
        LoginManager.logOut();

        Actions.login({
          type: ActionConst.REPLACE,
        });
      });
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  postRender() {
    const {producedData, ssoUserData} = this.props;

    return (
      <View style={styles.rootMainPostContainer}>
        <Spinner visible={this.props.waiting}/>
        <VideoManager
          {...this.props}
          {...{producedData}}
          styles={styles}/>

        <View style={styles.highlightTopContainer}>
          <LinearGradient
            start={{x: 0, y: 0}} end={{x: 0, y: 1}}
            locations={[0, 1]}
            colors={['#111', 'transparent']}
            style={styles.highlightTop}>
            <TopHighlightIcon icon="search" styles={styles} onClick={() => console.log('search icon')} />
            <TopHighlightIcon icon="message" styles={styles} onClick={() => console.log('message icon')} />
            <TopHighlightIcon icon="notification" styles={styles} onClick={() => console.log('notification icon')} />
            <View style={styles.profileImageViewContainer}>
              <ProfileImage
                width={45}
                height={45}
                userId={ssoUserData._id}
                avatar={ssoUserData.avatar}
                styles={styles}
                onClick={() => console.log('avatar icon')}/>
            </View>
          </LinearGradient>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <StatusBar
          backgroundColor={Platform.OS === 'ios' ? '#ffffff' : '#000000'}
          barStyle="light-content"
          hidden={false}/>
        <View style={styles.rootMainContainer}>
          {this.props.ssoUserData ? this.postRender() : null}
        </View>
      </View>
    );
  }
}

HomeScene.propTypes = {
  HomeReducers: PropTypes.object,
  homeActions: PropTypes.object,
  ssoUserData: PropTypes.object,
  producedData: PropTypes.object,
  waiting: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {HomeReducers} = state;

  const {ssoUserData} = HomeReducers;

  return {
    HomeReducers,
    ssoUserData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    homeActions: bindActionCreators(HomeActions, dispatch),
  };
};

const ConnectedHomeScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScene);

export const HomeSceneKey   = 'home';
export const HomeSceneTitle = 'Home';

export default ConnectedHomeScene;
