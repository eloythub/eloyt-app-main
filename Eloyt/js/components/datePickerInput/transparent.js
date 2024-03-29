// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, View, Image, TouchableOpacity } from 'react-native'
import { Input, Item, Label, Icon, Button } from 'native-base'
import DatePicker from 'react-native-datepicker'
// Essentials
import datePickerStyle from './datePickerStyle'
import commonAssets from '../../styles/commonAssets'

const {width} = Dimensions.get('window')

export default class TransparentDatePickerInput extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dateLayoutWidth: null,
      date: null
    }
  }

  render () {
    const {widthOffset = 60} = this.props

    return (
      <View style={datePickerStyle.inputWrapper} onLayout={this.onLayout.bind(this)}>
        <Item stackedLabel>
          {this.props.placeholder && <Label style={datePickerStyle.label}>{this.props.placeholder.toUpperCase()}:</Label>}
          <DatePicker
            showIcon={false}
            style={{
              width: this.state.dateLayoutWidth - 22,
            }}
            customStyles={{
              placeholderText: datePickerStyle.datePickerPlaceHolderText,
              dateText: datePickerStyle.datePickerDateText,
              dateInput: datePickerStyle.datePickerDateInput
            }}
            date={this.state.date}
            mode="date"
            format="MMM DD YYYY"
            confirmBtnText="Select"
            cancelBtnText="Cancel"
            onDateChange={
              (date) => {
                this.setState({date})

                this.props.onChange && this.props.onChange(date)
              }
            }
          />
          <Button
            transparent
            small
            style={datePickerStyle.closeIconButton}
            onPress={() => {
              this.setState({date: null})

              this.props.onChange && this.props.onChange(null)
            }}>
            <Icon name="close" style={datePickerStyle.closeIcon} />
          </Button>
        </Item>
      </View>
    )
  }

  onLayout (event) {
    if (this.state.dateLayoutWidth)
      return

    this.setState({
      dateLayoutWidth: event.nativeEvent.layout.width
    })
  }
}

TransparentDatePickerInput.propTypes = {
  date: PropTypes.string,
  onChange: PropTypes.func,
  widthOffset: PropTypes.number,
}
