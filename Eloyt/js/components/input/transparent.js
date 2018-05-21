import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { Icon, Input, Item, Label } from 'native-base'
import PhoneInput from 'react-native-phone-input'
import inputStyle from './inputStyle'
import configs from '../../libs/configs'
import CountryPicker from 'react-native-country-picker-modal'

class EmptyPhoneNumberTextComponent extends React.Component {
  render () {
    return (
      <View />
    )
  }
}

export default class NormalInput extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      secureTextEntry: props.secureEntry || false,
      cca2: 'US'
    }
  }

  onPressFlag() {
    this.countryPicker.openModal();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2 });
  }

  toggleSecurityTextEntry () {
    let {secureTextEntry} = this.state

    secureTextEntry = !secureTextEntry

    this.setState({
      secureTextEntry
    })
  }

  renderSecurityToggle () {
    const {secureTextEntry} = this.state

    return this.props.secureEntry && (
        <TouchableOpacity onPress={this.toggleSecurityTextEntry.bind(this)}>
          <Icon {...{active: secureTextEntry || undefined}} name="eye" style={inputStyle.revealIcon}/>
        </TouchableOpacity>
      )
  }

  renderCountryCodeSelector () {
    if (this.props.keyboardType !== 'phone-pad') {
      return
    }

    return (
      <View style={inputStyle.countryWrapper}>
        <PhoneInput
          style={StyleSheet.flatten(inputStyle.flag)}
          initialCountry={configs.initialCountry}
          textComponent={EmptyPhoneNumberTextComponent}
          onPressFlag={this.onPressFlag.bind(this)}
          ref={(ref) => {
            this.phone = ref
          }} />
        <CountryPicker
          ref={(ref) => {
            this.countryPicker = ref;
          }}
          onChange={this.selectCountry.bind(this)}
          translation="eng"
          cca2={this.state.cca2}
          styles={{
            itemCountryName: {
              height: 30
            }
          }}>
          <View />
        </CountryPicker>
      </View>
    )
  }

  render () {
    return (
      <View style={inputStyle.inputWrapper}>
        <Item stackedLabel style={inputStyle.item}>
          {this.props.title && <Label style={inputStyle.label}>{this.props.title.toUpperCase()}:</Label>}
          <View style={inputStyle.phoneWrapper}>
            {this.renderCountryCodeSelector()}
            <Input
              style={inputStyle.transparentInput}
              keyboardAppearance="dark"
              {...this.props}
              {...this.state}/>
          </View>
        </Item>
        {this.renderSecurityToggle()}
      </View>
    )
  }
}
