import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import VideoQueue from './VideoQueue';

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

    homeActions.fetchProducedResources(ssoUserData._id);
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
                onLike={
                  (video) => {
                    console.log('like');
                    homeActions.likeVideo(video);

                    if (producedData.length < 2) {
                      homeActions.fetchProducedResources(ssoUserData._id);
                    }
                  }
                }
                onSkip={
                  (video) => {
                    console.log('skip');
                    homeActions.skipVideo(video);

                    if (producedData.length < 2) {
                      homeActions.fetchProducedResources(ssoUserData._id);
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
