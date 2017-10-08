// Basics
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Bars } from 'react-native-loader'
// Essentials
import { Assets } from '../../Factories'
import { SearchComponentStyles } from '../../Styles'
import SearchComponentDelegator from '../../Delegators/Components/HomeScene/SearchComponentDelegator'
import LeftArrowButton from '../../Components/LeftArrowButton'
import InputTextBoxEntity from '../../Components/InputTextBoxEntity'
import ProfileAvatar from '../../Components/ProfileAvatar'

export default class SearchComponent extends SearchComponentDelegator {
  constructor (props) {
    super(props)

    this.state = {
      searchWaiting: false,
      searchResults: [],
      searchQuery: '',
    }
  }

  renderWaiting () {
    const {searchWaiting} = this.state

    if (!searchWaiting) {
      return
    }

    return (
      <View style={SearchComponentStyles.resultRowContainer}>
        <Bars size={10} color="#ffffff"/>
      </View>
    )
  }

  renderResults () {
    const {searchWaiting, searchResults, searchQuery} = this.state

    if (searchQuery.length < 3) {
      return
    }

    if (!searchWaiting && searchResults.length === 0) {
      return (
        <View style={SearchComponentStyles.resultRowContainer}>
          <Text style={SearchComponentStyles.resultText}>No Result :(</Text>
        </View>
      )
    }

    return searchResults.map((searchResult, index) => {
      return (
        <View key={index} style={[
          SearchComponentStyles.resultRowDetailsUserContainer,
          index === 0 ? SearchComponentStyles.resultRowDetailsUserFirstContainer : {},
        ]}>
          <View style={SearchComponentStyles.detailsUserAvatar}>
            <ProfileAvatar size={50}
                           imageUrl={searchResult.cloudAvatarUrl}
                           onPress={this.openProfile.bind(this, searchResult.id)}/>
          </View>
          <TouchableOpacity onPress={this.openProfile.bind(this, searchResult.id)}>
            <View style={SearchComponentStyles.detailsUserInfo}>
              <Text style={SearchComponentStyles.detailsUserInfoTextUsername}>
                @{searchResult.username}
              </Text>
              <Text style={SearchComponentStyles.detailsUserInfoTextFullName}>
                {searchResult.firstName} {searchResult.lastName}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    })
  }

  renderSearch () {
    const {searchQuery, searchResults} = this.state

    if (!this.ssoUserData) {
      return
    }

    return (
      <View style={SearchComponentStyles.searchEntitiesContainer}>
        <View style={SearchComponentStyles.entitiesContainer}>
          <View style={SearchComponentStyles.searchEntityContainer}>
            <InputTextBoxEntity
              setTextRef={(textRefObj) => this.serachRef = textRefObj}
              onChange={this.onSearchQueryChange.bind(this)}
              default={this.firstName}
              widthOffset={40}
              caption="SEARCH"
              name="search"
              returnKeyType="search"
              autoCapitalize="none"
            />
          </View>
          <View style={SearchComponentStyles.searchResultEntityContainer}>
            <ScrollView style={SearchComponentStyles.searchResultScrollView} keyboardShouldPersistTaps="handled">
              {this.renderWaiting()}
              {this.renderResults()}
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }

  render () {
    const {searchResults} = this.state

    return (
      <View style={SearchComponentStyles.rootNonFlexContainer}>
        {this.renderSearch()}
        <View style={SearchComponentStyles.topSection}>
          <LeftArrowButton onPress={this.onCloseButton.bind(this)}/>
          {
            searchResults.length > 0
              ?
              <View style={SearchComponentStyles.summeryContainer}>
                <Image source={Assets.UsersIcon} style={SearchComponentStyles.summeryImage}/>
                <Text style={SearchComponentStyles.summeryText}>{searchResults.length}</Text>
              </View>
              : null
          }
        </View>
      </View>
    )
  }
}

SearchComponent.propTypes = {
  onClose: PropTypes.func,
  focusOnSearchField: PropTypes.bool,
  openProfile: PropTypes.func,
}
