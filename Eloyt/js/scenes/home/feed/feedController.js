import React from 'react'
import Controller from '../../../libs/controller'
import {log} from '../../../libs/logs'

export default class FeedController extends Controller {
  onPressNext () {
    log('onPress', 'onPressNext')
  }
}
