import { AsyncStorage } from 'react-native'
import Debug from './Debug'

export default class LocalStorage {
  static async init (key, value) {
    Debug.Log(`LocalStorage:init`)

    try {
      return await this.load(key)
    } catch (err) {
      return await this.save(key, value)
    }
  }

  static save (key, value) {
    Debug.Log(`LocalStorage:save`)

    return AsyncStorage.setItem(key, JSON.stringify({value}))
  }

  static load (key) {
    Debug.Log(`LocalStorage:load`)

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
    Debug.Log(`LocalStorage:all`)

    let promises = []

    keys.map((key) => {
      promises.push(this.load(key))
    })

    return Promise.all(promises)
  }

  static unload (key) {
    Debug.Log(`LocalStorage:unload`)

    return AsyncStorage.removeItem(key)
  }
}
