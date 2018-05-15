import React from 'react'
import Controller from '../../../libs/controller'
import {log} from '../../../libs/logs'

export default class NewPostController extends Controller {
  onPressNext () {
    log('onPress', 'onPressNext')
  }
}
