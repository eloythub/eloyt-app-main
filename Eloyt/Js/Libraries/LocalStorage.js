import { AsyncStorage } from 'react-native';

export default class Api {
  save(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify({ value }));
  }

  load(key) {
    return new Promise(async(fulfill, reject) => {
      try {
        const valueStored = await AsyncStorage.getItem(key);

        if (valueStored === null) {
          return;
        }

        valueObject = JSON.parse(valueStored);

        fulfill(valueObject.value);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  unload(key) {
    return AsyncStorage.removeItem(key);
  }
}
