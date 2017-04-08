import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import Utils from '../../../Libraries/Utils';
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
    const {HomeReducers, homeActions, ssoUserData, styles} = this.props;

    const {producedData} = HomeReducers;

    return (
      <View style={styles.rootContainer}>
        {
          producedData
            ? <VideoQueue
                onLike={
                  (video) => {
                    homeActions.likeVideo(video);

                    if (producedData.length < 3) {
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
  styles: PropTypes.object,
};
