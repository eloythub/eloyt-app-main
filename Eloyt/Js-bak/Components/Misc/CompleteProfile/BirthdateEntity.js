import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: Dimensions.get('window').width - 60,
  },
  datePicker: {
    width: Dimensions.get('window').width - 60,
  },
  datePickerPlaceHolderText: {
    flex: 1,
    fontFamily: 'OpenSans',
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    fontWeight: Platform.OS === 'ios' ? 'normal' : '100',
    color: '#7d7d7d',
    height: 40,
    paddingBottom: 0,
    alignItems: 'flex-start',
  },
  datePickerDateText: {
    flex: 1,
    fontFamily: 'OpenSans',
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    fontWeight: Platform.OS === 'ios' ? 'normal' : '100',
    color: '#ffffff',
    height: 40,
    paddingBottom: 0,
    alignItems: 'flex-start',
  },
  datePickerDateInput: {
    borderColor: 'transparent',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: '#7d7d7d',
    paddingLeft: Platform.OS === 'ios' ? 0 : 3,
    height: Platform.OS === 'ios' ? 40 : 32,
  },
});

export default class BirthdateEntity extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <DatePicker
          showIcon={false}
          style={styles.datePicker}
          customStyles={{
            placeholderText: styles.datePickerPlaceHolderText,
            dateText: styles.datePickerDateText,
            dateInput: styles.datePickerDateInput,
          }}
          date={this.state.date}
          mode="date"
          placeholder="BIRTHDATE"
          format="YYYY-MM-DD"
          confirmBtnText="Select"
          cancelBtnText="Cancel"
          onDateChange={
            (date) => {
              this.setState({date});

              this.props.onChange(date);
            }
          }
        />
      </View>
    );
  }
}

BirthdateEntity.propTypes = {
  date: PropTypes.string,
  onChange: PropTypes.func,
};
