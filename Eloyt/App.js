import React from 'react'
import { Font } from 'expo'
import { StatusBar, View, Text, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { createStackNavigator } from 'react-navigation'
import transitionConfig from './js/styles/transitionConfig'
import commonStyle from './js/styles/commonStyle'
import Scene from './js/ui/scene'
// Login Area
import LoginScene from './js/scenes/login/loginScene'
// User Registration Area
import UsernameScene from './js/scenes/userRegistration/username/usernameScene'
import MobileScene from './js/scenes/userRegistration/mobile/mobileScene'
import MobileVerificationScene from './js/scenes/userRegistration/mobileVerification/mobileVerificationScene'
import ProfileInfoScene from './js/scenes/userRegistration/profileInfo/profileInfoScene'
import CongratsScene from './js/scenes/userRegistration/congrats/congratsScene'
// Home Area
import FeedScene from './js/scenes/home/feed/feedScene'
import SearchScene from './js/scenes/home/search/searchScene'
import NewPostScene from './js/scenes/home/newPost/newPostScene'
import MessagesScene from './js/scenes/home/messages/messagesScene'
import MyProfileScene from './js/scenes/home/myProfile/myProfileScene'

const RootStack = createStackNavigator({
    // Login Area
    Login: {
      screen: LoginScene
    },
    // User Registration Area
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
    // Home Area
    Feed: {
      screen: FeedScene,
    },
    Search: {
      screen: SearchScene,
    },
    NewPost: {
      screen: NewPostScene,
    },
    Messages: {
      screen: MessagesScene,
    },
    MyProfile: {
      screen: MyProfileScene,
    },
  },
  {
    initialRouteName: 'Feed',
    initialRouteName: 'Login',
    transitionConfig
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

    this.setState({fontLoaded: true})
  }

  render () {
    return this.state.fontLoaded && (
        <View style={commonStyle.flexView}>
          <StatusBar
            backgroundColor={'#ffffff'}
            barStyle="light-content"
          />
          <Scene>
            <RootStack />
          </Scene>
        </View>
      )
  }
}
