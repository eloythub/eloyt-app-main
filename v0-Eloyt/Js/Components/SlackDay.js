import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native'

import moment from 'moment'

import { isSameDay, isSameUser, warnDeprecated } from './SlackUtils'

export default class Day extends React.Component {
  render () {
    const {dateFormat} = this.props

    if (!isSameDay(this.props.currentMessage, this.props.previousMessage)) {
      return (
        <View style={[styles.container, this.props.containerStyle]}>
          <View style={[styles.wrapper, this.props.wrapperStyle]}>
            <Text style={[styles.text, this.props.textStyle]}>
              {moment(this.props.currentMessage.createdAt).locale(this.context.getLocale()).format(dateFormat).toUpperCase()}
            </Text>
          </View>
        </View>
      )
    }
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //alignItems: 'flex-start',
    //justifyContent: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10
  },
  wrapper: {
    flex: 1,
    paddingBottom: 2,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    borderBottomWidth: 1,
  },
  text: {
    //flex: 1,
    color: '#b2b2b2',
    fontSize: 12,
    fontWeight: '600',
  }
})

Day.contextTypes = {
  getLocale: PropTypes.func,
}

Day.defaultProps = {
  currentMessage: {
    // TODO test if crash when createdAt === null
    createdAt: null,
  },
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
  //TODO: remove in next major release
  isSameDay: warnDeprecated(isSameDay),
  isSameUser: warnDeprecated(isSameUser),
}

Day.propTypes = {
  currentMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  //TODO: remove in next major release
  isSameDay: PropTypes.func,
  isSameUser: PropTypes.func,
  dateFormat: PropTypes.string,
}
