import React from 'react'
import { View, TextInput } from 'react-native'
import { Form } from 'native-base'
import inputStyle from './inputStyle'

export default class PhoneVerificationInputSector extends React.Component {
  render () {
    return (
      <View style={inputStyle.sector}>
        <Form fixedLabel>
          <TextInput
            ref={(ref) => {
              this.props.getRef(ref)
            }}
            style={inputStyle.sectorInput}
            keyboardType="number-pad"
            maxLength={1}
            {...this.props}/>
        </Form>
      </View>
    )
  }
}
