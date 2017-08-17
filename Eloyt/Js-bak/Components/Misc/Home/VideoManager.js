import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import VideoQueue from './VideoQueue';
import Api from '../../../Libraries/Api';
import Utils from '../../../Libraries/Utils';

export default class VideoManager extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  componentDidMount() {
    const {homeActions, ssoUserData} = this.props;

    homeActions.fetchProducedResources(ssoUserData.id);
  }

  render() {
    const {HomeReducers, homeActions, ssoUserData, refreshProps, styles} = this.props;

    const {producedData} = HomeReducers;

    return (
      <View style={styles.rootContainer}>
        {
          producedData
            ? <VideoQueue
                refreshProps={refreshProps}
                onNewVideoUploaded={
                  async (video) => {
                    const uploadedVideoData = await Api.fetchProducedResourcesById(video.id);

                    if (!uploadedVideoData) {
                      return;
                    }

                    homeActions.newVideoUploaded(uploadedVideoData);
                  }
                }
                onLike={
                  async (video) => {
                    const likeVideoResponse = await Api.requestReactToVideo(ssoUserData.id, video, 'like');

                    if (likeVideoResponse.statusCode !== 200) {
                      return Utils.alert('There was a problem on performing this action, please try again few moment later');
                    }

                    homeActions.likeVideo(ssoUserData.id, video);

                    if (producedData.length < 2) {
                      homeActions.fetchProducedResources(ssoUserData.id);
                    }
                  }
                }
                onDislike={
                  async (video) => {
                    const likeVideoResponse = await Api.requestReactToVideo(ssoUserData.id, video, 'dislike');

                    if (likeVideoResponse.statusCode !== 200) {
                      return Utils.alert('There was a problem on performing this action, please try again few moment later');
                    }

                    homeActions.dislikeVideo(ssoUserData.id, video);

                    if (producedData.length < 2) {
                      homeActions.fetchProducedResources(ssoUserData.id);
                    }
                  }
                }
                onSkip={
                  async (video) => {
                    const likeVideoResponse = await Api.requestReactToVideo(ssoUserData.id, video, 'skip');

                    if (likeVideoResponse.statusCode !== 200) {
                      return Utils.alert('There was a problem on performing this action, please try again few moment later');
                    }

                    homeActions.skipVideo(ssoUserData.id, video);

                    if (producedData.length < 2) {
                      homeActions.fetchProducedResources(ssoUserData.id);
                    }
                  }
                }
                queue={producedData}
                styles={styles} />
            : null
        }
      </View>
    );
  }
}

VideoManager.propTypes = {
  HomeReducers: PropTypes.object,
  homeActions: PropTypes.object,
  ssoUserData: PropTypes.object,
  producedData: PropTypes.object,
  refreshProps: PropTypes.object,
  styles: PropTypes.object,
};
