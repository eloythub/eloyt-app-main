import React from 'React'
import PropTypes from 'prop-types'
import { Button } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'

export default class FooterButton extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isActive: false
    }
  }

  inactivate () {
    this.setState({
      isActive: false
    })
  }

  activate () {
    this.setState({
      isActive: true
    })
  }

  render () {
    return (
      <Button
        {...this.props}
        onPress={() => {
          this.props.onPress && this.props.onPress()

          this.setState({
            isActive: true
          })
        }}
      >
        <FontAwesome
          name={this.props.name}
          size={25}
          color={this.props.isActive || this.state.isActive ? '#000' : 'rgba(0, 0, 0, 0.4)'}
        />
      </Button>
    )
  }
}

FooterButton.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isActive: PropTypes.bool
}
