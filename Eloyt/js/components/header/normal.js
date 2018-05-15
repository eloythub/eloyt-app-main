import React from 'react'
import { Header } from 'native-base'
import headerStyle from './headerStyle'

export default class NormalHeader extends React.Component {
  render () {
    return (
      <Header {...this.props}/>
    )
  }
}
