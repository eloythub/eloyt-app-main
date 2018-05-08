import React from 'React'
import PropTypes from 'prop-types'
import { Button, Icon, FooterTab} from 'native-base'
import FooterButton from './FooterButton'

export default class FooterTabGroup extends React.Component {
  inactiveFooterButtons () {
    for (x in this.refs) {
      this.refs[x].inactivate()
    }
  }

  render () {
    return (
      <FooterTab>
        {
          this.props.buttons.map((button, key) => {
            return (
              <FooterButton
                key={key}
                ref={button.icon}
                name={button.icon}
                onPress={() => {
                  button.onPress && button.onPress()

                  this.inactiveFooterButtons()
                }} />
            )
          })
        }
      </FooterTab>
    )
  }
}

FooterTabGroup.propTypes = {
  buttons: PropTypes.array.isRequired
}
