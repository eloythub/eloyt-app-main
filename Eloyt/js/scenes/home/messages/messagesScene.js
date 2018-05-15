import React from 'react'
import { Button } from 'native-base'
import { Image, SafeAreaView, StatusBar, Text, View } from 'react-native'
import { Footer, Content } from 'native-base'
import FooterTabGroup from '../../../ui/FooterTabGroup'
import commonStyle, { normalHeader } from '../../../styles/commonStyle'
import commonAssets from '../../../styles/commonAssets'
import messagesStyle from './messagesStyle'
import MessagesController from './messagesController'

export default class MessagesScene extends MessagesController {
  static navigationOptions = {
    ...normalHeader,
    headerTitle: 'Messages'
  }

  render () {
    return (
      <View style={commonStyle.backgroundView}>
        <Content>
        </Content>
        <Footer>
          <FooterTabGroup buttons={this.getFooterButtons('Messages')} />
        </Footer>
      </View>
    )
  }
}
