import { Factory } from 'react-eloyt'

const {log} = console

export default class Debug extends Factory {
  static Log (...debugArgs) {
    if (!__DEV__) {
      return
    }

    debugArgs.forEach((debugArg) => log(debugArg))
  }
}
