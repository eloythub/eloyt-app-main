import React, { Component, PropTypes } from 'react';
import { View, Image, StyleSheet, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import tickNormal from '../../../../Assets/Images/tick-normal.png';
import tickSelected from '../../../../Assets/Images/tick-selected.png';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
    paddingLeft: 15,
  },
  entityTitleNormal: {
    color: '#7d7d7d',
    fontSize: 18,
    fontWeight: 'normal',
    fontFamily: 'OpenSans',
    marginTop: 2,
  },
  entityTitleSelected: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'normal',
    fontFamily: 'OpenSans',
    marginTop: 2,
  },
  tickImageNormal: {
    width: 24,
    height: 24,
    marginTop: 2,
    marginRight: 5,
  },
  tickImageSelected: {
    width: 24,
    height: 24,
    marginTop: 3,
    marginRight: 5,
  },
});

export default class InterestEntity extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  componentDidMount() {
    this.setState({
      selected: this.state.defaultSelected,
    });
  }

  wrapOnPress() {
    const selected = !this.state.selected;

    this.setState({selected});

    this.props.onPress(selected);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.wrapOnPress.bind(this)}>
        <View style={styles.rootContainer}>
          <Image
            source={this.state.selected ? tickSelected : tickNormal}
            style={this.state.selected ? styles.tickImageSelected : styles.tickImageNormal}/>
          <Text style={this.state.selected ? styles.entityTitleSelected : styles.entityTitleNormal}>
            {this.state.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

InterestEntity.propTypes = {
  defaultSelected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
