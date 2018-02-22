import io from 'socket.io-client'
import { Debug, LocalStorage } from '../Factories'
import { AuthEnum, ConfigsEnum } from '../Enums'

export default class SocketService {
  static socket
  static authToken

  static async connect () {
    Debug.Log('SocketService:connect')

    if (this.socket && this.isConnected()) {
      return this.socket
    }

    this.authToken = await LocalStorage.load(AuthEnum.LOGIN_API_ACCESS_TOKEN)

    this.socket =  io(ConfigsEnum.COM_BASE_URL[ConfigsEnum.NODE_ENV], {
      transports: ['websocket'],
    })

    this.socket.connect()

    return this.socket
  }

  static emitAuthPong () {
    Debug.Log('SocketService:emitAuthPong')

    this.emit('auth-pong', {
      authToken: this.authToken,
      'device_type': 'ios'
    })
  }

  static reconnect () {
    Debug.Log('SocketService:reconnect')

    this.socket.reconnect()
  }

  static emit (event, data) {
    Debug.Log(`SocketService:emit:${event}`)

    if (!this.socket || !this.isConnected()) {
      return false
    }

    this.socket.emit(event, data)

    return true
  }

  static on (event, handler) {
    Debug.Log(`SocketService:on:${event}`)

    this.socket.on(event, handler)
  }

  static disconnect () {
    Debug.Log('SocketService:disconnect')

    this.socket.disconnect()
  }

  static isConnected () {
    Debug.Log('SocketService:disconnect')

    return this.socket.connected
  }
}
