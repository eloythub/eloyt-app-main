// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import DatePicker from 'react-native-datepicker'
// Essentials
import { BirthdateEntityComponentStyles } from '../Styles'
import BirthdateEntityComponentDelegator from '../Delegators/Components/BirthdateEntityComponentDelegator'

export default class BirthdateEntity extends BirthdateEntityComponentDelegator {
  constructor (props) {
    super(props)

    this.state = props
  }

  render () {
    return (
      <View style={BirthdateEntityComponentStyles.rootContainer}>
        <DatePicker
          showIcon={false}
          style={BirthdateEntityComponentStyles.datePicker}
          customStyles={{
            placeholderText: BirthdateEntityComponentStyles.datePickerPlaceHolderText,
            dateText: BirthdateEntityComponentStyles.datePickerDateText,
            dateInput: BirthdateEntityComponentStyles.datePickerDateInput,
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
    )
  }
}

BirthdateEntity.propTypes = {
  date: PropTypes.string,
  onChange: PropTypes.func,
}
