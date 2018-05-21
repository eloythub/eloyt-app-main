import React from 'react'
import {log} from './logs'
import configs from './configs'
import { StackActions, NavigationActions } from 'react-navigation'

export default class Controller extends React.Component {
  navigate (method, routeName) {
    log('navigate', method, routeName)

    if (method === 'reset') {
      return this.resetNavigator(routeName)
    }

    this.props.navigation[method](routeName)
  }

  resetNavigator (routeName) {
    log('resetNavigator', routeName)

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    })

    this.props.navigation.dispatch(resetAction)
  }

  getFooterButtons (currentScene) {
    let items = []

    configs.footerItems.map((item) => {
      items.push({
        icon: item.icon,
        selectedIcon: item.selectedIcon,
        isActive: currentScene === item.routeName,
        onPress: () => {
          this.resetNavigator(item.routeName)
        }
      })
    })

    return items
  }

  async logOut () {
    await LocalStorage.unload(LocalStorage.keys.authentication)

    await this.navigate('reset', 'Auth')
  }
}
