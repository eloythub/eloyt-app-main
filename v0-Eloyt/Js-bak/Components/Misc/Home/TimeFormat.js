import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import moment from 'moment';

export default class TimeFormat extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  render() {
    const {time, format = 'mm:ss', styles} = this.props;

    const showTime = moment('1900-01-01 00:00:00').add(time, 'seconds').format(format);

    return <Text style={styles.videoTimer}>{showTime}</Text>;
  }
}

TimeFormat.propTypes = {
  time: PropTypes.number,
  format: PropTypes.string,
  styles: PropTypes.object,
};
