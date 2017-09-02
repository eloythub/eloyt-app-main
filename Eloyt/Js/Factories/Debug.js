import { Factory } from 'react-eloyt'

export default class Debug extends Factory {
  static Log (...debugArgs) {
    if (!__DEV__) {
      return
    }

    debugArgs.forEach((debugArg) => console.log(debugArg));
  }
}
