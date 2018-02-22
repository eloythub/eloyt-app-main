import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid';

const {width: windowWidth, height} = Dimensions.get('window');
const skipSectionWidth             = windowWidth / 2.8;
const likeSectionWidth             = windowWidth - skipSectionWidth;

const topPadding = 90;
const bottomPadding = 10;
const actionButtonHeight = 60;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  rootMainContainer: {
    flex: 1,
    position: 'absolute',
    width: windowWidth,
    height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingTop: topPadding,
  },
  likeSection: {
    width: likeSectionWidth,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  border: {
    borderColor: '#ffffff',
    borderWidth: 1,
    borderStyle: 'dashed',
    width: 1,
    borderRadius: 5,
  },
  skipSection: {
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
    height: height - actionButtonHeight - topPadding,
    width: windowWidth,
    paddingBottom: bottomPadding,
  },
  actionRow: {
    height: actionButtonHeight,
    width: windowWidth,
  },
  actionButton: {
    width: windowWidth,
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
  render() {
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
          <TouchableOpacity style={styles.actionButton} onPress={() => this.props.onPress()}>
            <Text style={styles.actionButtonCaption}>{'Got it Lets Rock it'.toUpperCase()}</Text>
          </TouchableOpacity>
        </Row>
      </Grid>
    </View>;
  }
}

LikeOrSkip.propTypes = {
  onPress: PropTypes.func,
};
