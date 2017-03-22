import { AsyncStorage } from 'react-native';

export default class LocalStorage {
  static save(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify({value}));
  }

  static load(key) {
    return new Promise(async(fulfill, reject) => {
      try {
        const valueStored = await AsyncStorage.getItem(key);

        if (valueStored === null) {
          return;
        }

        const valueObject = JSON.parse(valueStored);

        fulfill(valueObject.value);
      } catch (error) {
        reject(error);
      }
    });
  }

  static unload(key) {
    return AsyncStorage.removeItem(key);
  }
}
