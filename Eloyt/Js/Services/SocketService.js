import SocketIO from 'react-native-socketio'
import { Debug, LocalStorage } from '../Factories'
import { AuthEnum, ConfigsEnum } from '../Enums'

export default class SocketService {
  static async createSocket () {
    if (this.socket) {
      return this.socket
    }

    this.authToken = await LocalStorage.load(AuthEnum.LOGIN_API_ACCESS_TOKEN)

    this.socket = new SocketIO(ConfigsEnum.COM_BASE_URL[ConfigsEnum.NODE_ENV], {})

    return this.socket
  }

  static connect () {
    Debug('SocketService:connect')

    if (this.isConnected()) {
      return
    }

    this.socket.connect()

    this.emitAuthPong()
  }

  static emitAuthPong () {
    Debug('SocketService:emitAuthPong')

    this.emit('auth-pong', {
      authToken: this.authToken,
      'device_type': 'ios'
    })
  }

  static reconnect () {
    Debug('SocketService:reconnect')

    this.socket.reconnect()
  }

  static emit (event, data) {
    Debug(`SocketService:emit:${event}`)

    if (!this.isConnected()) {
      return false
    }

    this.socket.emit(event, data)

    return true
  }

  static on (event, handler) {
    Debug(`SocketService:on:${event}`)

    this.socket.on(event, handler)
  }

  static disconnect () {
    Debug('SocketService:disconnect')

    this.socket.disconnect()
  }

  static isConnected () {
    Debug('SocketService:disconnect')

    return this.socket.isConnected
  }
}
