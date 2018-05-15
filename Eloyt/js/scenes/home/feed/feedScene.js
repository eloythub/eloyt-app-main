import React from 'react'
import { Button } from 'native-base'
import { Image, SafeAreaView, StatusBar, Text, View } from 'react-native'
import { Footer, Content } from 'native-base'
import FooterTabGroup from '../../../ui/FooterTabGroup'
import commonStyle, { normalHeader } from '../../../styles/commonStyle'
import commonAssets from '../../../styles/commonAssets'
import feedStyle from './feedStyle'
import FeedController from './feedController'

export default class FeedScene extends FeedController {
  static navigationOptions = {
    ...normalHeader,
    headerTitle: 'Eloyt'
  }

  render () {
    return (
      <View style={commonStyle.backgroundView}>
        <Content>

        </Content>
        <Footer>
          <FooterTabGroup buttons={this.getFooterButtons('Feed')} />
        </Footer>
      </View>
    )
  }
}
