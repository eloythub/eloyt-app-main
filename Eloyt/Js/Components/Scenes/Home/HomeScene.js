import React, { Component, PropTypes } from 'react';
import { View, Platform, StatusBar, Modal } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Utils from '../../../Libraries/Utils';
import * as HomeActions from './HomeActions';
import { styles } from './HomeStyles';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import * as HomeActionsConst from '../Home/HomeActionsConst';
import { Actions, ActionConst } from 'react-native-router-flux';
import { LoginManager } from 'react-native-fbsdk';
import LocalStorage from '../../../Libraries/LocalStorage';
import LikeOrSkip from '../../../Components/Misc/Tutorials/LikeOrSkip';
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


    LocalStorage.all([LoginActionsConst.ON_SSO_USER_DATA, HomeActionsConst.ON_HOME_IS_TUTORIAL_WATCHED])
      .then(([ssoUserData, isTutorialWatched]) => {
        homeActions.setUserLogin({
          ssoUserData,
        });

        homeActions.setTutorialWatched({
          isTutorialWatched,
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

  handleTutorialActionPressed() {
    const {homeActions} = this.props;

    LocalStorage.save(HomeActionsConst.ON_HOME_IS_TUTORIAL_WATCHED, true);

    homeActions.setTutorialWatched({
      isTutorialWatched: true,
    });
  }

  postRender() {
    const {producedData, ssoUserData, isTutorialWatched} = this.props;

    return (
      <View style={styles.rootMainPostContainer}>
        <Spinner visible={this.props.waiting}/>

        <VideoManager
          {...this.props}
          {...{producedData}}
          styles={styles}/>

        <Modal
          visible={!isTutorialWatched}
          transparent={true}
          animationType="fade"
          onRequestClose={() => this.setState({isTutorialWatched: true})}>
          <LikeOrSkip onPress={this.handleTutorialActionPressed.bind(this)}/>
        </Modal>

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
    const {ssoUserData} = this.props;

    return (
      <View style={styles.rootContainer}>
        <StatusBar
          backgroundColor={Platform.OS === 'ios' ? '#ffffff' : '#000000'}
          barStyle="light-content"
          hidden={false}/>
        <View style={styles.rootMainContainer}>
          {ssoUserData ? this.postRender() : null}
        </View>
      </View>
    );
  }
}

HomeScene.propTypes = {
  HomeReducers: PropTypes.object,
  homeActions: PropTypes.object,
  ssoUserData: PropTypes.object,
  isTutorialWatched: PropTypes.bool,
  producedData: PropTypes.object,
  waiting: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {HomeReducers} = state;

  const {ssoUserData, isTutorialWatched} = HomeReducers;

  return {
    HomeReducers,
    ssoUserData,
    isTutorialWatched,
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
