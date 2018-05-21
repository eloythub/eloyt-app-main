import React from 'react'
import { View } from 'react-native'
import inputStyle from './inputStyle'
import PhoneVerificationInputSector from './phoneVerificationInputSector'

export default class PhoneVerificationInput extends React.Component {
  inputSectorsRef = {
    0: null,
    1: null,
    2: null,
    3: null
  }

  constructor (props) {
    super(props)

    this.state = {
      inputSectorsValues: {
        0: null,
        1: null,
        2: null,
        3: null
      }
    }
  }

  componentDidMount () {
    this.inputSectorsRef[0].focus()
  }

  async onKeyBackspace (key) {
    let {inputSectorsValues} = this.state

    if (!inputSectorsValues[key] && key > 0) {
      await this.inputSectorsRef[key - 1].focus()
    }

    inputSectorsValues[key] = null

    await this.setState({inputSectorsValues})
  }

  async onKeyTyped (key) {
    let {inputSectorsValues} = this.state

    await this.setState({inputSectorsValues})

    if (key < 3) {
      return this.inputSectorsRef[key + 1].focus()
    }

    let finalValue = ''

    Object.keys(inputSectorsValues).map((_, key) => {
      finalValue += inputSectorsValues[key]
    })

    this.props.onCheckCode(finalValue)
  }

  async onKeyPressInput (nativeEvent, key) {
    if (nativeEvent.key === 'Backspace') {
      return await this.onKeyBackspace(key)
    }
  }

  async onChangeTextInput (value, key) {
    let {inputSectorsValues} = this.state

    inputSectorsValues[key] = value

    await this.setState({inputSectorsValues})

    if (inputSectorsValues[key]) {
      await this.onKeyTyped(key)
    }
  }

  renderInputSector (key) {
    return <PhoneVerificationInputSector
      key={key}
      value={this.state.inputSectorsValues[key]}
      getRef={(ref) => {
        this.inputSectorsRef[key] = ref
      }}
      onKeyPress={({nativeEvent}) => this.onKeyPressInput(nativeEvent, key)}
      onChangeText={(value) => this.onChangeTextInput(value, key)}
      keyboardAppearance="dark"/>
  }

  render () {
    return (
      <View style={inputStyle.inputWrapper}>
        <View style={inputStyle.phoneVerificationWrapper}>
          {Object.keys(this.inputSectorsRef).map((_, key) => this.renderInputSector(key))}
        </View>
      </View>
    )
  }
}
