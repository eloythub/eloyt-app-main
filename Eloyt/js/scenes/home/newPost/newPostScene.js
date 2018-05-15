import React from 'react'
import { Button } from 'native-base'
import { Image, SafeAreaView, StatusBar, Text, View } from 'react-native'
import { Footer, Content } from 'native-base'
import FooterTabGroup from '../../../ui/FooterTabGroup'
import commonStyle, { normalHeader } from '../../../styles/commonStyle'
import commonAssets from '../../../styles/commonAssets'
import newPostStyle from './newPostStyle'
import NewPostController from './newPostController'

export default class NewPostScene extends NewPostController {
  static navigationOptions = {
    ...normalHeader,
    headerTitle: 'New Post'
  }

  render () {
    return (
      <View style={commonStyle.backgroundView}>
        <Content>
        </Content>
        <Footer>
          <FooterTabGroup buttons={this.getFooterButtons('NewPost')} />
        </Footer>
      </View>
    )
  }
}
