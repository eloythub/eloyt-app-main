// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import NotificationsIOS, { NotificationAction, NotificationCategory } from 'react-native-notifications';
// Essentials
import { Debug, Utils } from '../../Factories'
import { ComService, SocketService } from '../../Services'

export default class HomeScreenDelegator extends Delegator {
  static socket

  constructor (props) {
    super(props)

    NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
    NotificationsIOS.addEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));

    NotificationsIOS.addEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
    NotificationsIOS.addEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this));
    NotificationsIOS.addEventListener('notificationOpened', this.onNotificationOpened.bind(this));
  }

  async componentDidMount () {
    // there is a fucking bug here, investigate more on it and fix it
    //await Utils.next()
    //
    //await this.refs.mainSnapSwiperRef.scrollBy(1, true)

    // push notification preparation
    await NotificationsIOS.requestPermissions()
    await NotificationsIOS.checkPermissions()

    NotificationsIOS.consumeBackgroundQueue()

    // TODO: fix the issue with swift socket.io client and empower the socket.io
    // socket preparation
    this.socket = await SocketService.connect()

    await SocketService.on('connect', this.onSocketConnect.bind(this))
    await SocketService.on('auth-ping', this.onSocketAuthPing.bind(this))
    await SocketService.on('auth-green-light', this.onSocketAuthGreenLight.bind(this))
    await SocketService.on('disconnect', this.onSocketDisconnect.bind(this))
  }

  componentWillUnmount() {
    NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
    NotificationsIOS.removeEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));

    NotificationsIOS.removeEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
    NotificationsIOS.removeEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this));
    NotificationsIOS.removeEventListener('notificationOpened', this.onNotificationOpened.bind(this));

    SocketService.disconnect()
  }

  async onSocketConnect() {
    Debug.Log(`HomeScreenDelegator:onSocketConnect`)

    console.log('socket: ', this.socket.id)
  }


  async onSocketAuthPing() {
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

  async onPushRegistered(deviceToken) {
    Debug.Log(`HomeScreenDelegator:onPushRegistered`)

    console.log('Device Token Received', deviceToken)

    await ComService.pushNotificationTokenRegister(deviceToken)
  }

  onPushRegistrationFailed(error) {
    Debug.Log(`HomeScreenDelegator:onPushRegistrationFailed`)

    console.log('error: ', error);
  }

  onNotificationReceivedForeground(notification) {
    Debug.Log(`HomeScreenDelegator:onNotificationReceivedForeground`)

    console.log('Notification Received - Foreground: ', notification);
  }

  onNotificationReceivedBackground(notification) {
    Debug.Log(`HomeScreenDelegator:onNotificationReceivedBackground`)

    console.log('Notification Received - Background: ', notification);
  }

  onNotificationOpened(notification) {
    Debug.Log(`HomeScreenDelegator:onNotificationOpened`)

    console.log('Notification opened by device user: ', notification);
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
