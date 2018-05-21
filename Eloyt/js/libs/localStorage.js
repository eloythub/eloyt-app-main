import { AsyncStorage } from 'react-native'

export default class LocalStorage {
  static keys = {
    authentication: 'authentication'
  }

  static save (key, value) {
    return AsyncStorage.setItem(key, JSON.stringify({value}))
  }

  static load (key) {
    return new Promise(async (fulfill, reject) => {
      try {
        const valueStored = await AsyncStorage.getItem(key)

        if (valueStored === null) {
          return fulfill(null)
        }

        const valueObject = JSON.parse(valueStored)

        fulfill(valueObject.value)
      } catch (error) {
        reject(error)
      }
    })
  }

  static all (keys) {
    let promises = []

    keys.map((key) => {
      promises.push(this.load(key))
    })

    return Promise.all(promises)
  }

  static unload (key) {
    return AsyncStorage.removeItem(key)
  }
}
