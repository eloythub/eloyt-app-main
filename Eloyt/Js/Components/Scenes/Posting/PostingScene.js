import React, { Component, PropTypes } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PostingActions from './PostingActions';
import * as LoginActionsConst from '../Login/LoginActionsConst';
import { styles } from './PostingStyles';
import { Actions, ActionConst } from 'react-native-router-flux';
import { LoginManager } from 'react-native-fbsdk';
import LocalStorage from '../../../Libraries/LocalStorage';
import BackButton from '../../Misc/Record/BackButton';
import PostingButton from '../../Misc/Posting/PostingButton';
import InputTextBox from '../../Misc/Posting/InputTextBoxEntity';
import InterestsEntity from '../../Misc/Posting/InterestsEntity';

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
  }

  handleBackButtonPress() {
    Actions.pop();
  }

  handlePostButtonPress() {
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <StatusBar hidden={true}/>
        <View style={styles.rootMainContainer}>
          <View style={styles.topSection}>
            <BackButton onClick={this.handleBackButtonPress.bind(this)} styles={styles}/>
            <Text style={styles.sceneTitle}>{PostingSceneTitle}</Text>
            <PostingButton onClick={this.handlePostButtonPress.bind(this)} styles={styles}/>
          </View>

          <View style={styles.postingEntitiesContainer}>
            <View style={styles.entitiesContainer}>
              <View style={styles.postingEntityContainer}>
                <InputTextBox
                  setTextRef={(textRefObj) => this.descriptionRef = textRefObj}
                  onChange={(text) => this.description = text}
                  caption="DESCRIPTION"
                  name="description"
                />
                <ScrollView>
                  <InterestsEntity onChange={
                    (text) => this.description = text
                  }/>
                </ScrollView>
              </View>
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
