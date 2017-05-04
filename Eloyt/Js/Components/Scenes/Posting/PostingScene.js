import React, { Component, PropTypes } from 'react';
import { View, StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PostingActions from './PostingActions';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import { styles } from './PostingStyles';
import { Actions, ActionConst } from 'react-native-router-flux';
import { LoginManager } from 'react-native-fbsdk';
import LocalStorage from '../../../Libraries/LocalStorage';
import BackButton from '../../Misc/Record/BackButton';

class PostingScene extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {postingActions} = this.props;

    LocalStorage.load(LoginActionsConst.ON_SSO_USER_DATA)
      .then((ssoUserData) => {
        postingActions.setUserLogin({
          ssoUserData,
        });
      })
      .catch(() => {
        LoginManager.logOut();

        Actions.login({
          type: ActionConst.REPLACE,
        });
      });

    console.log(this.props);
  }

  handleBackButtonPress() {
    Actions.pop();
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <StatusBar
          hidden={true}
        />
        <View style={styles.rootMainContainer}>
          <View style={styles.recordController}>
            <View style={styles.topSection}>
              <BackButton onClick={this.handleBackButtonPress.bind(this)} styles={styles}/>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

PostingScene.propTypes = {
  PostingReducers: PropTypes.object,
  postingActions: PropTypes.object,
  ssoUserData: PropTypes.object,
};

const mapStateToProps = (state) => {
  const {PostingReducers} = state;

  const {ssoUserData} = PostingReducers;

  return {
    PostingReducers,
    ssoUserData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postingActions: bindActionCreators(PostingActions, dispatch),
  };
};

const ConnectedPostingScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostingScene);

export const PostingSceneKey   = 'posting';
export const PostingSceneTitle = 'Posting';

export default ConnectedPostingScene;
