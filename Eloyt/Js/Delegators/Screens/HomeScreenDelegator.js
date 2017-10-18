// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import OneSignal from 'react-native-onesignal'
// Essentials
import { Debug } from '../../Factories'
import { ComService, SocketService } from '../../Services'

export default class HomeScreenDelegator extends Delegator {
  static socket

  constructor (props) {
    super(props)

  }

  async componentDidMount () {
    // TODO: fix the issue with swift socket.io client and empower the socket.io
    // SOCKET.IO
    this.socket = await SocketService.connect()

    await SocketService.on('connect', this.onSocketConnect.bind(this))
    await SocketService.on('auth-ping', this.onSocketAuthPing.bind(this))
    await SocketService.on('auth-green-light', this.onSocketAuthGreenLight.bind(this))
    await SocketService.on('recipients-update', this.onSocketRecipientsUpdate.bind(this))
    await SocketService.on('disconnect', this.onSocketDisconnect.bind(this))

    // PUSH NOTIFICATION
    OneSignal.inFocusDisplaying(0)

    OneSignal.promptLocation()
    OneSignal.checkPermissions(({alert, badge, sound}) => {
      if (!alert || !badge || !sound) {
        OneSignal.promptForPushNotificationsWithUserResponse((isAllowed) => {
          OneSignal.requestPermissions(isAllowed)

          OneSignal.registerForPushNotifications()

          // TODO: show an instruction that user can go and enable their push notification settings
        })
      }
    })

    OneSignal.registerForPushNotifications()

    OneSignal.addEventListener('received', this.onReceived)
    OneSignal.addEventListener('opened', this.onOpened)
    OneSignal.addEventListener('registered', this.onRegistered)
    OneSignal.addEventListener('ids', this.onIds)
  }

  componentWillUnmount () {
    // SOCKET.IO
    SocketService.disconnect()

    // PUSH NOTIFICATION
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onRegistered(notifData) {
    console.log("Device had been registered for push notifications!", notifData);
  }

  onIds ({pushToken}) {
    Debug.Log(`HomeScreenDelegator:onIds`, pushToken)

    ComService.pushNotificationTokenRegister(pushToken)
  }

  async onSocketConnect () {
    Debug.Log(`HomeScreenDelegator:onSocketConnect`)

    console.log('socket: ', this.socket.id)
  }

  async onSocketAuthPing () {
    Debug.Log(`HomeScreenDelegator:onSocketAuthPing`)

    SocketService.emitAuthPong()
  }

  async onSocketAuthGreenLight (data) {
    Debug.Log(`HomeScreenDelegator:onSocketAuthGreenLight`)

    console.log('got green light from server to start working :D', data)
  }

  async onSocketDisconnect () {
    Debug.Log(`HomeScreenDelegator:onSocketDisconnect`)

    console.log('oops, i lost connection')
  }

  async onSocketRecipientsUpdate () {
    Debug.Log(`HomeScreenDelegator:onSocketRecipientsUpdate`)

    this.refs.messagesNotificationsComponent.loadRecipients()
  }

  async onMainSwiperIndexChanged (index) {
    Debug.Log(`HomeScreenDelegator:onMainSwiperIndexChanged`)

    if (index !== 1) {
      await this.forcePauseSnap()

      await this.setState({
        focusOnSearchField: false,
        doLoadRecipiets: false
      })
    } else {
      await this.releaseForcePauseSnap()
    }

    // focus on textbox on search field
    if (index === 2) {
      await this.setState({
        focusOnSearchField: true
      })
    }

    // load recipients
    if (index === 0) {
      await this.setState({
        doLoadRecipiets: true
      })
    }
  }

  async onPlayerSnapSwiperIndexChanged (index) {
    Debug.Log(`HomeScreenDelegator:onPlayerSnapSwiperIndexChanged`)

    if (index !== 0) {
      await this.forcePauseSnap()
    } else {
      await this.releaseForcePauseSnap()
    }

    await this.setState({
      mainSwiperScrollEnable: index !== 1 // index 1 represents the snap component
    })
  }

  async onSnapStarted () {
    Debug.Log(`HomeScreenDelegator:onSnapStarted`)

    await this.setState({
      mainSwiperScrollEnable: false,
      playerSnapScrollEnable: false
    })
  }

  async onSnapEnded () {
    Debug.Log(`HomeScreenDelegator:onSnapEnded`)

    await this.setState({
      mainSwiperScrollEnable: false,
      playerSnapScrollEnable: true
    })
  }

  async onSnapClose () {
    Debug.Log(`HomeScreenDelegator:onSnapClose`)

    await this.setState({
      mainSwiperScrollEnable: false,
      playerSnapScrollEnable: true,
      forcePause: false
    })

    this.refs.playerSnapSwiperRef.scrollBy(-1, true)
  }

  async moveSceneToNotificationScene () {
    Debug.Log(`HomeScreenDelegator:moveSceneToNotificationScene`)

    this.forcePauseSnap()

    this.refs.mainSnapSwiperRef.scrollBy(-1, true)
  }

  async moveSceneToSearchScene () {
    Debug.Log(`HomeScreenDelegator:moveSceneToSearchScene`)

    this.forcePauseSnap()

    this.refs.mainSnapSwiperRef.scrollBy(1, true)
  }

  async moveSceneToRecordScene () {
    Debug.Log(`HomeScreenDelegator:moveSceneToRecordScene`)

    this.forcePauseSnap()

    this.refs.playerSnapSwiperRef.scrollBy(1, true)
  }

  async moveSceneToVideoPlayerFromSearch () {
    Debug.Log(`HomeScreenDelegator:moveSceneToVideoPlayerFromSearch`)

    this.refs.mainSnapSwiperRef.scrollBy(-1, true)

    await this.setState({
      focusOnSearchField: false
    })
  }

  async moveSceneToVideoPlayerFromMessagesNotifications () {
    Debug.Log(`HomeScreenDelegator:moveSceneToVideoPlayerFromMessagesNotifications`)

    this.refs.mainSnapSwiperRef.scrollBy(1, true)
  }

  async moveSceneToSnapFromMessagesNotifications () {
    Debug.Log(`HomeScreenDelegator:moveSceneToSnapFromMessagesNotifications`)

    this.refs.mainSnapSwiperRef.scrollBy(1, true)
    this.refs.playerSnapSwiperRef.scrollBy(1, true)
  }

  async forcePauseSnap () {
    Debug.Log(`HomeScreenDelegator:forcePauseSnap`)

    await this.setState({
      forcePause: true
    })
  }

  async releaseForcePauseSnap () {
    Debug.Log(`HomeScreenDelegator:releaseForcePauseSnap`)

    await this.setState({
      forcePause: false
    })
  }

  async openProfile (userId) {
    Debug.Log(`HomeScreenDelegator:openProfile > userId: `, userId)

    await this.setState({
      forcePause: true,
      isUserProfileModalAppears: true,
      profilePreviewUserId: userId,
    })
  }

  async closeProfile () {
    Debug.Log(`HomeScreenDelegator:closeProfile`)

    await this.setState({
      forcePause: this.refs.mainSnapSwiperRef.index !== 1,
      isUserProfileModalAppears: false,
      profilePreviewUserId: null,
    })
  }
}
