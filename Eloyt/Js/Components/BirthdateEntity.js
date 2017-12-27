// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, View, Image, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-datepicker'
// Essentials
import { BirthdateEntityComponentStyles } from '../Styles'
import { Assets } from '../Factories'
import BirthdateEntityComponentDelegator from '../Delegators/Components/BirthdateEntityComponentDelegator'

const {width} = Dimensions.get('window')

export default class BirthdateEntity extends BirthdateEntityComponentDelegator {
  constructor (props) {
    super(props)

    this.state = props
  }

  render () {
    const {widthOffset = 60} = this.props

    return (
      <View style={[
        BirthdateEntityComponentStyles.rootContainer,
        {
          width: width - widthOffset
        }
      ]}>
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
              this.setState({date})

              this.props.onChange(date)
            }
          }
        />
        <TouchableOpacity style={BirthdateEntityComponentStyles.empty} onPress={() => {
          this.setState({date: null})

          this.props.onChange(null)
        }}>
          <Image source={Assets.DeleteIcon} style={BirthdateEntityComponentStyles.emptyImage}/>
        </TouchableOpacity>
      </View>
    )
  }
}

BirthdateEntity.propTypes = {
  date: PropTypes.string,
  onChange: PropTypes.func,
  widthOffset: PropTypes.number,
}
