import React from 'react'
import Controller from '../../../libs/controller'
import {log} from '../../../libs/logs'

export default class CongratsController extends Controller {
  onPressNext () {
    log('onPress', 'onPressNext')

    this.navigate('reset', 'Feed')
  }
}
