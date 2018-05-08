import React from 'React'
import { StyleProvider } from 'native-base'

import getTheme from '../styles/ui/components';
import vars from '../styles/ui/variables/eloyt';

export default class Scene extends React.Component {
  render () {
    return (
      <StyleProvider style={getTheme(vars)}>
        {this.props.children || null}
      </StyleProvider>
    )
  }
}
