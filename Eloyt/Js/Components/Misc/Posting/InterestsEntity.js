import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, TouchableWithoutFeedback } from 'react-native';
import defaultFile from '../../../../default.json';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: Dimensions.get('window').width - 60,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    paddingTop: 10,
  },
  container: {
    flex: 0,
    height: 40,
    minWidth: 60,
    alignItems: 'center',
    flexDirection:'column',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 4,
    paddingTop: 9,
    paddingRight: 5,
    paddingLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  containerSelected: {
    backgroundColor: '#ffffff',
  },
  title: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  titleSelected: {
    color: '#000000',
  },
});

export default class InterestsEntity extends Component {
  constructor(props) {
    super(props);

    const listOfInterests = defaultFile.listOfInterests;

    listOfInterests.map((value) => {
      return Object.assign(value, {
        selected: false,
      });
    });

    this.state = {
      listOfInterests,
    };
  }

  componentDidMount() {
  }

  toggleSelectedInterest(index) {
    const {listOfInterests} = this.state;

    listOfInterests[index].selected = !listOfInterests[index].selected;

    this.setState({
      listOfInterests,
    });
  }

  render() {
    const {listOfInterests} = this.state;

    return (
      <View style={styles.rootContainer}>
        {listOfInterests.map((value, index) => {
            return <TouchableWithoutFeedback key={index} onPress={this.toggleSelectedInterest.bind(this, index)}>
              <View style={[styles.container, (listOfInterests[index].selected ? styles.containerSelected : {})]}>
                <Text style={[styles.title, (listOfInterests[index].selected ? styles.titleSelected : {})]}>{value.title}</Text>
              </View>
            </TouchableWithoutFeedback>;
        })}
      </View>
    );
  }
}

InterestsEntity.propTypes = {
  onChange: PropTypes.func,
};
