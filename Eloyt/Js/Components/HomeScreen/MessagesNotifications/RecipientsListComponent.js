// Basics
import React from 'react'
import PropTypes from 'prop-types'
import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
// Essentials
import { Assets } from '../../../Factories'
import { RecipientsListComponentStyles } from '../../../Styles'
import RecipientsListComponentDelegator from '../../../Delegators/Components/HomeScene/MessagesNotifications/RecipientsListComponentDelegator'
import ProfileAvatar from '../../../Components/ProfileAvatar'
import Button from '../../../Components/Button'
import AlternativeSnapButton from '../../../Components/AlternativeSnapButton'

export default class RecipientsListComponent extends RecipientsListComponentDelegator {
  renderRecipients () {
    const {recipients} = this.props

    if (recipients.length === 0) {
      return (
        <View style={RecipientsListComponentStyles.noActivityContainer}>
          <Image source={Assets.NoActivityIcon} style={RecipientsListComponentStyles.noActivityImage}/>
          <Text style={RecipientsListComponentStyles.noActivity}>
            You had no activity
          </Text>
          <Text style={RecipientsListComponentStyles.noActivity}>
            Checkout what is going on in your area
          </Text>
          <Text style={RecipientsListComponentStyles.noActivity}>
            Leave your feedback on their snaps
          </Text>
          <Button caption="Let's go networking"
                  onPress={this.props.onPressGoNeworking.bind(this)}
                  style={RecipientsListComponentStyles.noActivityButton}/>

          <Text style={RecipientsListComponentStyles.noActivityAfterButton}>
            or
          </Text>

          <Text style={RecipientsListComponentStyles.noActivity}>
            Record a snap and express yourself
          </Text>
          <View style={RecipientsListComponentStyles.noActivitySnap}>
            <AlternativeSnapButton onPress={this.props.onPressSnap.bind(this)}/>
          </View>
        </View>
      )
    }

    return recipients.map((recipient, key) => {
      return (
        <View key={key} style={RecipientsListComponentStyles.recipientContainer}>
          <View style={RecipientsListComponentStyles.detailsUserAvatar}>
            <ProfileAvatar size={60}
                           imageUrl={recipient.cloudAvatarUrl}
                           onPress={this.openProfile.bind(this, recipient)}
            />
            {
              recipient.unreadMessagesCount
                ?
                <View style={[
                  RecipientsListComponentStyles.unreadIcon,
                  recipient.unreadMessagesCount < 10 ? {minWidth: 20} : {}
                ]}>
                  <Text style={RecipientsListComponentStyles.unreadText}>{
                    recipient.unreadMessagesCount <= 99
                      ? recipient.unreadMessagesCount
                      : '+99'
                  }</Text>
                </View>
                : null
            }
          </View>
          <TouchableOpacity onPress={this.openProfile.bind(this, recipient)}>
            <View style={RecipientsListComponentStyles.detailsUserInfo}>
              <Text style={RecipientsListComponentStyles.detailsUserInfoTextUsername}>
                @{recipient.username}{'\n'}
              </Text>
              <Text style={RecipientsListComponentStyles.detailsUserInfoTextFirstName}>
                {recipient.firstName}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    })
  }

  render () {
    const {recipients, refreshing} = this.props

    return (
      <View style={RecipientsListComponentStyles.rootContainer}>
        <ScrollView keyboardShouldPersistTaps="handled"
                    refreshControl={
                      <RefreshControl refreshing={refreshing}
                                      onRefresh={this.onRefresh.bind(this)}/>
                    }
                    contentContainerStyle={[
                      RecipientsListComponentStyles.rootScrollView,
                      recipients.length === 0 ? RecipientsListComponentStyles.rootScrollNoActivityView : {}
                    ]}>
          <View style={RecipientsListComponentStyles.rootScrollViewContainer}>
            {this.renderRecipients()}
          </View>
        </ScrollView>
      </View>
    )
  }
}

RecipientsListComponent.propTypes = {
  refreshing: PropTypes.bool,
  loadRecipients: PropTypes.func,
  recipients: PropTypes.array,
  onPressGoNeworking: PropTypes.func,
  onPressSnap: PropTypes.func,
  openProfile: PropTypes.func,
}
