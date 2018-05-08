import React from 'react'
import { Button, Card, CardItem, Container, Content, Header, Footer, Text, Icon } from 'native-base'
import Scene from './ui/scene'
import FooterTabGroup from './ui/FooterTabGroup'

export default class js extends React.Component {

  render () {
    return (
      <Scene>
        <Container>
          <Header>

          </Header>
          <Content>
            <Text>
              Block - Normal
            </Text>
            <Card>
              <Button primary block>
                <Text>Primary</Text>
              </Button>
              <Button light block>
                <Text>Light</Text>
              </Button>
              <Button success block>
                <Text>Success</Text>
              </Button>
              <Button danger block>
                <Text>Danger</Text>
              </Button>
              <Button warning block>
                <Text>Warning</Text>
              </Button>
              <Button dark block>
                <Text>Dark</Text>
              </Button>
              <Button info block>
                <Text>Info</Text>
              </Button>
            </Card>
            <Text>
              Block - small
            </Text>
            <Card>
              <Button primary block small>
                <Text>Primary</Text>
              </Button>
              <Button light block small>
                <Text>Light</Text>
              </Button>
              <Button success block small>
                <Text>Success</Text>
              </Button>
              <Button danger block small>
                <Text>Danger</Text>
              </Button>
              <Button warning block small>
                <Text>Warning</Text>
              </Button>
              <Button dark block small>
                <Text>Dark</Text>
              </Button>
              <Button info block small>
                <Text>Info</Text>
              </Button>
            </Card>
          </Content>
          <Footer>
            <FooterTabGroup buttons={[
              {
                icon: 'home',
                onPress: () => {

                }
              },
              {
                icon: 'chatboxes',
                onPress: () => {

                }
              },
              {
                icon: 'search',
                onPress: () => {

                }
              },
              {
                icon: 'person',
                onPress: () => {

                }
              },
            ]} />
          </Footer>
        </Container>
      </Scene>
    )
  }
}
