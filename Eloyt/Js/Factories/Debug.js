import { Factory } from 'react-eloyt'

export default class Debug extends Factory {
  static Log (...debugArgs) {
    debugArgs.forEach((debugArg) => console.log(debugArg));
  }
}
