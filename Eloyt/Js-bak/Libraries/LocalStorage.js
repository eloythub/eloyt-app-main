import { AsyncStorage } from 'react-native';

const {log} = console

export default class LocalStorage {
  static save(key, value) {
    log(`LocalStorage:save`)

    return AsyncStorage.setItem(key, JSON.stringify({value}));
  }

  static load(key) {
    log(`LocalStorage:load`)

    return new Promise(async(fulfill, reject) => {
      try {
        const valueStored = await AsyncStorage.getItem(key);

        if (valueStored === null) {
          return fulfill(null);
        }

        const valueObject = JSON.parse(valueStored);

        fulfill(valueObject.value);
      } catch (error) {
        reject(error);
      }
    });
  }

  static all(keys) {
    log(`LocalStorage:all`)

    let promises = [];

    keys.map((key) => {
      promises.push(this.load(key));
    });

    return Promise.all(promises);
  }

  static unload(key) {
    log(`LocalStorage:unload`)

    return AsyncStorage.removeItem(key);
  }
}
