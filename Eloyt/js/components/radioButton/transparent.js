import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import radioButtonStyle from './radioButtonStyle'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default class TransparentRadioButton extends React.Component {
  render () {
    return (
      <View style={radioButtonStyle.radioButtonWrapper}>
        <Text style={radioButtonStyle.lable}>{this.props.title.toUpperCase()}:</Text>
        <RadioForm
          radio_props={this.props.items}
          buttonColor="#fff"
          selectedButtonColor="#fff"
          formHorizontal={true}
          labelHorizontal={false}
          labelColor="#fff"
          selectedLabelColor="#fff"
          buttonSize={10}
          labelWrapStyle={radioButtonStyle.lableWrap}
          onPress={(value) => {this.setState({value:value})}}
        />
      </View>
    )
  }
}
