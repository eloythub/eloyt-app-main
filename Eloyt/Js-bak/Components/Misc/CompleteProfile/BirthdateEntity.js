import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';

const styles = StyleSheet.create({
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
