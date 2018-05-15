import React from 'react'
import { Button } from 'native-base'
import { Image, SafeAreaView, StatusBar, Text, View } from 'react-native'
import { Footer, Content } from 'native-base'
import FooterTabGroup from '../../../ui/FooterTabGroup'
import commonStyle, { normalHeader } from '../../../styles/commonStyle'
import commonAssets from '../../../styles/commonAssets'
import myProfileStyle from './myProfileStyle'
import MyProfileController from './myProfileController'

export default class MyProfileScene extends MyProfileController {
  static navigationOptions = {
    ...normalHeader,
    headerTitle: 'Profile'
  }

  render () {
    return (
      <View style={commonStyle.backgroundView}>
        <Content>
        </Content>
        <Footer>
          <FooterTabGroup buttons={this.getFooterButtons('MyProfile')} />
        </Footer>
      </View>
    )
  }
}
