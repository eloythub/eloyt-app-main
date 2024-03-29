// Basics
import React from 'react'
import { Delegator } from 'react-eloyt'
import OneSignal from 'react-native-onesignal'
// Essentials
import { Debug, LocalStorage } from '../../Factories'
import { ComService, SocketService, ApiService } from '../../Services'
import { ConfigsEnum, GeneralEnum } from '../../Enums'

const {geolocation} = navigator

export default class HomeScreenDelegator extends Delegator {
  static socket
  static locationWatchId

  async componentDidMount () {
    // TODO: fix the issue with swift socket.io client and empower the socket.io
    // SOCKET.IO
    this.socket = await SocketService.connect()

    await SocketService.on('connect', this.onSocketConnect.bind(this))
    await SocketService.on('auth-ping', this.onSocketAuthPing.bind(this))
    await SocketService.on('auth-green-light', this.onSocketAuthGreenLight.bind(this))
    await SocketService.on('recipients-update', this.onSocketRecipientsUpdate.bind(this))
    await SocketService.on('message-new', this.onSocketMessageNew.bind(this))
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

    OneSignal.addEventListener('opened', this.onOpened.bind(this))
    OneSignal.addEventListener('registered', this.onRegistered.bind(this))
    OneSignal.addEventListener('ids', this.onIds.bind(this))

    // Location
    geolocation.requestAuthorization()
    geolocation.getCurrentPosition(
      this.updateCurrentGPSLocation.bind(this),
      this.failedGPSLocation.bind(this),
      ConfigsEnum.GPS_OPTIONS
    )
    this.locationWatchId = geolocation.watchPosition(
      this.updateCurrentGPSLocation.bind(this),
      this.failedGPSLocation.bind(this),
      ConfigsEnum.GPS_OPTIONS
    )

    await this.refs.messagesNotificationsComponent.loadRecipients()
  }

  componentWillUnmount () {
    // SOCKET.IO
    SocketService.disconnect()

    // PUSH NOTIFICATION
    OneSignal.removeEventListener('opened', this.onOpened.bind(this));
    OneSignal.removeEventListener('registered', this.onRegistered.bind(this));
    OneSignal.removeEventListener('ids', this.onIds.bind(this));

    // Location
    geolocation.clearWatch(this.locationWatchId)
  }

  async updateCurrentGPSLocation ({coords}) {
    const {latitude, longitude} = coords

    let settings = await LocalStorage.load(GeneralEnum.CATCHED_SETTINGS)

    if (!settings) {
      settings = {
        currentLocation: {
          lat: latitude,
          lng: longitude
        }
      }

      await LocalStorage.save(GeneralEnum.CATCHED_SETTINGS, settings)

      try {
        await ApiService.updateCurrentLocation(latitude, longitude)
      } catch (err) {
        // do nothing for now
      }

      return
    }


    if (settings.currentLocation.lat === latitude && settings.currentLocation.lng === longitude) {
      return
    }

    settings.currentLocation.lat = latitude
    settings.currentLocation.lng = longitude

    await LocalStorage.save(GeneralEnum.CATCHED_SETTINGS, settings)

    try {
      await ApiService.updateCurrentLocation(latitude, longitude)
    } catch (err) {
      // do nothing for now
    }
  }

  async failedGPSLocation (err) {
    console.log('error', err)
  }

  async onOpened(openResult) {
    // visit following link for more accurate information: https://github.com/geektimecoil/react-native-onesignal
    const {additionalData} = openResult.notification.payload

    if (!additionalData || !additionalData.hasOwnProperty('messageId')) {
      return
    }

    switch (additionalData.messageId) {
      case 'NEW_MESSAGE':
        await this.newMessagePushNofifyOpen(additionalData.messageObject)
        break
    }
  }

  onRegistered(notifData) {
    // TODO: make it work
    console.log("Device had been registered for push notifications!", notifData);
  }

  async onIds ({pushToken, userId}) {
    Debug.Log(`HomeScreenDelegator:onIds`, pushToken, userId)

    await ComService.pushNotificationTokenRegister(userId)
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

  async onSocketMessageNew (msg) {
    Debug.Log(`HomeScreenDelegator:onSocketMessageNew`)

    this.refs.messagesNotificationsComponent.onNewMessageRecievedFromSocket(msg)
  }

  async onSocketDisconnect () {
    Debug.Log(`HomeScreenDelegator:onSocketDisconnect`)

    console.log('oops, i lost connection')
  }

  async onSocketRecipientsUpdate () {
    Debug.Log(`HomeScreenDelegator:onSocketRecipientsUpdate`)

    this.refs.messagesNotificationsComponent.loadRecipients()
  }

  async newMessagePushNofifyOpen (message) {
    Debug.Log(`HomeScreenDelegator:newMessagePushNofifyOpen`)

    await this.refs.messagesNotificationsComponent.loadRecipients()
    await this.moveSceneToNotificationScene()
    await this.refs.messagesNotificationsComponent.openMessage(message.senderUser)
  }

  async onMainSwiperIndexChanged (index) {
    Debug.Log(`HomeScreenDelegator:onMainSwiperIndexChanged`)

    if (index !== 1) {
      await this.forcePauseSnap()

      await this.setState({
        focusOnSearchField: false,
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
      this.refs.messagesNotificationsComponent.loadRecipients()
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

  async onSnapClose (uploadedSnap) {
    Debug.Log(`HomeScreenDelegator:onSnapClose`)

    // add the uploaded snap to snap player
    if (uploadedSnap) {
      await this.refs.VideoPlayerComponent.refs.SnapPlayerManagerComponent.appendSnapToQueue(uploadedSnap)
    }

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

  async onFirstTimeTutorialShows () {
    Debug.Log(`HomeScreenDelegator:onFirstTimeTutorialShows`)

    await this.setState({
      forcePause: true,
    })
  }

  async onFirstTimeTutorialHides () {
    Debug.Log(`HomeScreenDelegator:onFirstTimeTutorialHides`)

    await this.setState({
      forcePause: false,
    })
  }
}
