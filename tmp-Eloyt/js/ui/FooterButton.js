import React from 'React'
import PropTypes from 'prop-types'
import { Button, Icon } from 'native-base'

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
        {
          this.state.isActive
            ? <Icon name={`ios-${this.props.name}`} />
            : <Icon name={`ios-${this.props.name}-outline`} />
        }
      </Button>
    )
  }
}

FooterButton.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}
