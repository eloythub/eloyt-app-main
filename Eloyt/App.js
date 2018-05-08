import React from 'react'
import { Font } from 'expo'
import { createStackNavigator } from 'react-navigation'
import Scene from './js/ui/scene'
import LoginScene from './js/scenes/login/loginScene'
import UsernameScene from './js/scenes/userRegistration/username/usernameScene'
import MobileScene from './js/scenes/userRegistration/mobile/mobileScene'
import MobileVerificationScene from './js/scenes/userRegistration/mobileVerification/mobileVerificationScene'
import ProfileInfoScene from './js/scenes/userRegistration/profileInfo/profileInfoScene'
import CongratsScene from './js/scenes/userRegistration/congrats/congratsScene'

const RootStack = createStackNavigator({
    Login: {
      screen: LoginScene
    },
    Username: {
      screen: UsernameScene
    },
    Mobile: {
      screen: MobileScene
    },
    MobileVerification: {
      screen: MobileVerificationScene
    },
    ProfileInfo: {
      screen: ProfileInfoScene
    },
    Congrats: {
      screen: CongratsScene
    },
  },
  {
    initialRouteName: 'Username',
    //initialRouteName: 'Login',
  }
)

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      fontLoaded: false
    }
  }

  async componentDidMount () {
    await Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans_bold.ttf'),
      'open-sans-bold-italic': require('./assets/fonts/OpenSans_bold_italic.ttf'),
      'open-sans-italic': require('./assets/fonts/OpenSans_italic.ttf'),
      'open-sans-light': require('./assets/fonts/OpenSans_light.ttf'),
      'open-sans-light-italic': require('./assets/fonts/OpenSans_light_italic.ttf')
    })

    this.setState({ fontLoaded: true });
  }

  render () {
    return this.state.fontLoaded && (
      <Scene>
        <RootStack />
      </Scene>
    )
  }
}
