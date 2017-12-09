// Basics
import React from 'react'
import { Keyboard } from 'react-native'
import { Delegator } from 'react-eloyt'
import { GiftedChat } from 'react-native-gifted-chat'
// Essentials
import { ApiService } from '../../../Services'
import { Debug, LocalStorage } from '../../../Factories'
import { AuthEnum, GeneralEnum } from '../../../Enums'

export default class MessagesNotificationsComponentDelegator extends Delegator {
  async componentDidMount () {
    Debug.Log(`MessagesNotificationsComponentDelegator:componentDidMount`)

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({
        isKeyboardOpen: true
      })
    })
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({
        isKeyboardOpen: false
      })
    })

    this.ssoUserData = await LocalStorage.load(AuthEnum.LOGIN_STATUS)

    this.setState({})
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  async swiperIndexChanged (index) {
    Debug.Log(`MessagesNotificationsComponentDelegator:swiperIndexChanged`)

    this.setState({swiperScrollEnable: index > 0})

    if (index === 0) {
      await this.setState({
        selectedRecipientUser: null
      })

      await this.loadRecipients()
    }
  }

  async onCloseButton () {
    Debug.Log(`MessagesNotificationsComponentDelegator:onCloseButton`)

    this.props.onClose()
  }

  async onSnapButton () {
    Debug.Log(`MessagesNotificationsComponentDelegator:onSnapButton`)

    this.props.onClose()
  }

  async openMessage (selectedRecipientUser) {
    Debug.Log(`MessagesNotificationsComponentDelegator:openMessage`)

    // check if selectedRecipientUser is existed in recipientsList
    if (!this.isUserExistsInRecipientsList(selectedRecipientUser.id)) {
      return
    }

    await this.setState({selectedRecipientUser})

    this.refs.messageNotificationSwiperRef.scrollBy(1)

    await this.refs.chatboxRef.focusTextInput()

    // load messages
    //await LocalStorage.save(GeneralEnum.CATCHED_MESSAGE, {})
    let messages = {}

    messages[selectedRecipientUser.id] = []

    try {
      cashedMessages = await LocalStorage.load(GeneralEnum.CATCHED_MESSAGE)

      if (!cashedMessages.hasOwnProperty(selectedRecipientUser.id)) {
        cashedMessages[selectedRecipientUser.id] = []
      }

      messages = cashedMessages;

      await this.setState({
        messages: this.parseMessage(cashedMessages[selectedRecipientUser.id])
      })

      await LocalStorage.save(GeneralEnum.CATCHED_MESSAGE, messages)
    } catch (err) {
      Debug.Log(err)

      await LocalStorage.save(GeneralEnum.CATCHED_MESSAGE, messages)
    }

    const offset = 0
    const limit = 25

    try {
      const fetchedMessages = await ApiService.getMessages(selectedRecipientUser.id, offset, limit)

      cashedMessages[selectedRecipientUser.id] = fetchedMessages.data

      await LocalStorage.save(GeneralEnum.CATCHED_MESSAGE, cashedMessages)

      await ApiService.readMessages(selectedRecipientUser.id)

      await this.setState({
        messages: this.parseMessage(cashedMessages[selectedRecipientUser.id])
      })
    } catch (err) {
      Debug.Log(err)
    }
  }

  parseMessage (messages) {
    let parsedMessages = []

    if (!messages) {
      return []
    }

    for (const message of messages) {
      parsedMessages.push({
        _id: message.id,
        text: message.message,
        createdAt: new Date(message.sendAt),
        user: {
          _id: message.senderUser.id,
          name: message.senderUser.username,
          avatar: message.senderUser['cloud_avatar_url'],
        },
      })
    }

    return parsedMessages
  }

  async openProfile (selectedRecipientUser) {
    Debug.Log(`MessagesNotificationsComponentDelegator:openProfile`)

    this.props.openProfile(selectedRecipientUser.id)
  }

  async onBackButton () {
    Debug.Log(`MessagesNotificationsComponentDelegator:onBackButton`)

    await this.refs.messageNotificationSwiperRef.scrollBy(-1)

    await this.setState({
      selectedRecipientUser: null
    })

    await this.loadRecipients()
  }

  async onSendMessage (messagesObject) {
    Debug.Log(`MessagesNotificationsComponentDelegator:onSendMessage`, messagesObject)

    await this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messagesObject),
    }));

    const [messageObject] = messagesObject

    await this.refs.chatboxRef.focusTextInput()

    ApiService.sendMessage(this.state.selectedRecipientUser.id, 'text', messageObject.text)
  }

  async onNewMessageRecievedFromSocket ({messageObject}) {
    console.log('recievedNewMessage', messageObject)
    // check if message is open
    if (this.state.selectedRecipientUser && this.state.selectedRecipientUser.id === messageObject.senderUser.id) {
      try {
        await this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, this.parseMessage([messageObject])),
        }));

        await ApiService.readMessages(this.state.selectedRecipientUser.id)

        return
      } catch (err) {
        Debug.Log(err)

        return
      }
    }

    this.loadRecipients()
  }

  async loadRecipients () {
    Debug.Log(`MessagesNotificationsComponentDelegator:loadRecipients`)

    try {
      let recipientsList = await LocalStorage.load(GeneralEnum.CATCHED_RECIPIENTS)

      await this.setState({
        recipientsList,
        refreshing: false
      })

      await this.updateUnreadNotification()
    } catch (err) {
      // just ignore
    }

    try {
      const recipients = await ApiService.getRecipients()

      await LocalStorage.save(GeneralEnum.CATCHED_RECIPIENTS, recipients.data)

      await this.setState({
        recipientsList: recipients.data,
        refreshing: false
      })

      await this.updateUnreadNotification()
    } catch (err) {
      Debug.Log(err)
      this.setState({refreshing: false})
    }
  }

  async updateUnreadNotification () {
    let unreadNotificationCount = 0

    for (let recipients of this.state.recipientsList) {
      unreadNotificationCount += recipients.unreadMessagesCount
    }

    await this.props.notificationUpdated(unreadNotificationCount)
  }

  isUserExistsInRecipientsList (userId) {
    const {recipientsList} = this.state

    for (let recipient of recipientsList) {
      if (recipient.id === userId) {
        return true
      }
    }

    return false
  }
}
