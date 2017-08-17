import { Platform, Alert, AlertIOS } from 'react-native';

export default class Utils {
  static next() {
    return this.wait(0);
  }

  static wait(time) {
    return new Promise(async(fulfill) => {
      setTimeout(fulfill, time);
    });
  }

  static alert(message) {
    let alertObj = Alert;

    if (Platform.OS === 'ios') {
      alertObj = AlertIOS;
    }

    alertObj.alert(message);
  }

  static all(keys) {
    let promises = [];

    keys.map((key) => {
      promises.push(key);
    });

    return Promise.all(promises);
  }
}
