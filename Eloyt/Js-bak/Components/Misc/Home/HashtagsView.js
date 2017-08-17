import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import {listOfInterests} from '../../../../default.json';

const defaultWidth = 230;
const defaultOpacity = 0.7;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: defaultWidth,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    paddingTop: 10,
  },
  container: {
    flex: 0,
    height: 18,
    minWidth: 40,
    alignItems: 'center',
    flexDirection:'column',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 4,
    paddingTop: 0,
    paddingRight: 5,
    paddingLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: '#ffffff',
    opacity: defaultOpacity,
  },
  title: {
    fontFamily: 'OpenSans',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  onlyTextTitle: {
    fontFamily: 'OpenSans',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#afafaf',
    backgroundColor: 'transparent',
  },
});

export default class HashtagsView extends Component {
  constructor(props) {
    super(props);
  }

  getHashtagTitleBySlug(hashtag) {
    for(let tag of listOfInterests) {
      if (tag.hashtag === hashtag) {
        return tag.title;
      }
    }
  }

  render() {
    const {tags, width, opacity, showOnlyText = false} = this.props;

    const showOnlyTags = tags.map((hashtag, index) => this.getHashtagTitleBySlug(hashtag));

    return (
      <View style={[styles.rootContainer, {width: width ? width : defaultWidth}]}>
        {
          showOnlyText
          ? <Text style={styles.onlyTextTitle}>{showOnlyTags.join(' - ')}</Text>
          : tags.map((hashtag, index) => {
              return <View key={index} style={[styles.container, {opacity : opacity ? opacity : defaultOpacity}]}>
                <Text style={styles.title}>{this.getHashtagTitleBySlug(hashtag)}</Text>
              </View>;
            })
        }
      </View>
    );
  }
}

HashtagsView.propTypes = {
  tags: PropTypes.array,
  width: PropTypes.number,
  opacity: PropTypes.number,
  showOnlyText: PropTypes.bool,
};
