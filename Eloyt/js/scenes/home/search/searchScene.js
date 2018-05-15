import React from 'react'
import { Button } from 'native-base'
import { Image, SafeAreaView, StatusBar, Text, View } from 'react-native'
import { Footer, Content } from 'native-base'
import FooterTabGroup from '../../../ui/FooterTabGroup'
import commonStyle, { normalHeader } from '../../../styles/commonStyle'
import commonAssets from '../../../styles/commonAssets'
import searchStyle from './searchStyle'
import SearchController from './searchController'

export default class MessagesScene extends SearchController {
  static navigationOptions = {
    ...normalHeader,
    headerTitle: 'Search'
  }

  render () {
    return (
      <View style={commonStyle.backgroundView}>
        <Content>
        </Content>
        <Footer>
          <FooterTabGroup buttons={this.getFooterButtons('Search')} />
        </Footer>
      </View>
    )
  }
}
