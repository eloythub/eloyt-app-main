import React from 'react'
import {log} from './logs'

export default class Controller extends React.Component {
  navigate (method, scene) {
    log('navigate', method, scene)

    console.log(this.props.navigation)
    this.props.navigation[method](scene)
  }
}
