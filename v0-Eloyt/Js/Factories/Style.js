import { StyleSheet } from 'react-native'
import { Factory } from 'react-eloyt'

export default class Style extends Factory {
  static reverseStyleObject (styleId) {
    return StyleSheet.flatten(styleId)
  }
}
