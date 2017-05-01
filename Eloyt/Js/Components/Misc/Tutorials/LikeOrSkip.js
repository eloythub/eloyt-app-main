import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid';

const {width: windowWidth, height} = Dimensions.get('window');
const skipSectionWidth = windowWidth / 2.8;
const likeSectionWidth = windowWidth - skipSectionWidth;

const actionButtonHeight = 80;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  likeSection: {
    //height,
    width: likeSectionWidth,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  border: {
    //height,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  skipSection: {
    //height,
    width: skipSectionWidth - 2,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'OpenSans',
  },
  guideRow: {
    height: height - actionButtonHeight,
    width: windowWidth,
  },
  actionRow: {
    height: actionButtonHeight,
    width: windowWidth,
  },
  actionButton: {
    width: Dimensions.get('window').width,
    backgroundColor: '#00b651',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
  },
  actionButtonCaption: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
});

export default class LikeOrSkip extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  render() {
    const {watched} = this.props;

    if (watched) {
      return null;
    }

    return <View style={styles.rootContainer}>
      <Grid style={styles.rootMainContainer}>
        <Row style={StyleSheet.flatten(styles.guideRow)}>
          <Col style={StyleSheet.flatten(styles.skipSection)}>
            <Text style={styles.text}>Press To {'\n'}Skip</Text>
          </Col>
          <Col style={StyleSheet.flatten(styles.border)}>
          </Col>
          <Col style={StyleSheet.flatten(styles.likeSection)}>
            <Text style={styles.text}>Press To {'\n'}Like</Text>
          </Col>
        </Row>
        <Row style={StyleSheet.flatten(styles.actionRow)}>
          <TouchableOpacity style={styles.actionButton} onPress={this.props.onPress.bind(this)}>
            <Text style={styles.actionButtonCaption}>{'Got it Lets Rock it'.toUpperCase()}</Text>
          </TouchableOpacity>
        </Row>
      </Grid>
    </View>;
  }
}

LikeOrSkip.propTypes = {
  onPress: PropTypes.func,
  watched: PropTypes.bool,
};
