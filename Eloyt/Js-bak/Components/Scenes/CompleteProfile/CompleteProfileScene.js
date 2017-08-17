import React, { Component, PropTypes } from 'react'
import { Image, Platform, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as LoginActionsConst from '../Login/LoginActionsConst'
import * as CompleteProfileActions from './CompleteProfileActions'
import fluidBackground from '../../../../Assets/Images/fluid-background.jpg'
import pureLogo from '../../../../Assets/Images/pure-logo.png'
import { styles } from './CompleteProfileStyles'
import ImageEntity from '../../Misc/CompleteProfile/ImageEntity'
import InputTextBox from '../../Misc/CompleteProfile/InputTextBoxEntity'
import GenderEntity from '../../Misc/CompleteProfile/GenderEntity'
import BirthdateEntity from '../../Misc/CompleteProfile/BirthdateEntity'
import { Bars } from 'react-native-loader'
import { ActionConst, Actions } from 'react-native-router-flux'
import LocalStorage from '../../../Libraries/LocalStorage'
import Utils from '../../../Libraries/Utils'
import Api from '../../../Libraries/Api'

const {log} = console

class CompleteProfileScene extends Component {
  constructor (props) {
    log(`CompleteProfileScene:constructor`)

    super(props)
  }

  async componentDidMount () {
    log(`CompleteProfileScene:componentDidMount`)

    const {completeProfileActions} = this.props

    const ssoUserData = await LocalStorage.load(LoginActionsConst.ON_SSO_USER_DATA)

    await completeProfileActions.setUserLogin({
      ssoUserData,
    })

    this.firstName   = ssoUserData.firstName
    this.lastName    = ssoUserData.lastName
    this.gender      = ssoUserData.gender
    this.dateOfBirth = ssoUserData.dateOfBirth

    completeProfileActions.waiting(false)

      //.catch((error) => {
      //  LoginManager.logOut()
      //
      //  Actions.login({
      //    type: ActionConst.REPLACE,
      //    error,
      //  })
      //})
  }

  async onNextButtonPress () {
    log(`CompleteProfileScene:onNextButtonPress`)

    const {completeProfileActions, ssoUserData} = this.props

    if (!this.firstName || !this.lastName || !this.gender || !this.dateOfBirth) {
      Utils.alert('All the fields are required.')

      return
    }

    await completeProfileActions.waiting(true)

    Api.requestUpdateProfile(ssoUserData.id, {
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        dateOfBirth: this.dateOfBirth,
      })
      .then((updatedUserRes) => {
        completeProfileActions.setUserLogin({ssoUserData: updatedUserRes.data})

        completeProfileActions.waiting(false)

        Utils.next().then(() => {
          Actions.areaOfInterests({
            type: ActionConst.REPLACE,
          })
        })
      })
      .catch(() => {
        completeProfileActions.waiting(false)
      })
  }

  postRender () {
    const {ssoUserData} = this.props

    return (
      <View style={styles.rootMainPostContainer}>
        <View style={styles.logoContainer}>
          <Image source={pureLogo} style={styles.pureLogo}/>
          <Text style={styles.sceneTitle}>{'Complete Your Profile'.toUpperCase()}</Text>
        </View>
        <View style={styles.profileEntitiesContainer}>
          <ScrollView>
            <View style={styles.entitiesContainer}>
              <View style={styles.profileEntityContainer}>
                <ImageEntity
                  imageUrl={Api.getProfileAvatar(
                    ssoUserData.id,
                    ssoUserData.avatar
                  )}/>
              </View>
              <View style={styles.profileEntityContainer}>
                <InputTextBox
                  setTextRef={(textRefObj) => this.firstNameRef = textRefObj}
                  onChange={(text) => this.firstName = text}
                  default={ssoUserData.firstName}
                  caption="FIRST NAME"
                  name="firstname"
                  nextFocusObjectRef={() => this.lastNameRef.focus()}
                />
              </View>
              <View style={styles.profileEntityContainer}>
                <InputTextBox
                  setTextRef={(textRefObj) => this.lastNameRef = textRefObj}
                  onChange={(text) => this.lastName = text}
                  default={ssoUserData.lastName}
                  caption="LAST NAME"
                  name="lastname"
                />
              </View>
              <View style={styles.profileEntityContainer}>
                <GenderEntity
                  onPress={(genderValue) => this.gender = genderValue}
                  value={ssoUserData.gender.toLowerCase()}
                />
              </View>
              <View style={styles.profileEntityContainer}>
                <BirthdateEntity
                  onChange={(dateOfBirth) => this.dateOfBirth = dateOfBirth}
                  date={ssoUserData.dateOfBirth}/>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.nextButton} onPress={this.onNextButtonPress.bind(this)}>
            <Text style={styles.nextButtonCaption}>{'Save & Select Areas of Interest'.toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  handleLoading (show) {
    if (show) {
      return <View style={styles.loadingContainer}>
        <View style={styles.loading}>
          <Bars size={40} color="#ffffff"/>
        </View>
      </View>
    }
  }

  render () {
    const {waiting} = this.props

    return (
      <View style={styles.rootContainer}>
        <StatusBar
          backgroundColor={Platform.OS === 'ios' ? '#ffffff' : '#000000'}
          barStyle="light-content"
          hidden={false}
        />
        <Image source={fluidBackground} style={styles.backgroundImage}/>
        {this.handleLoading(waiting)}
        <View style={styles.rootMainContainer}>
          {this.props.ssoUserData ? this.postRender() : null}
        </View>
      </View>
    )
  }
}

CompleteProfileScene.propTypes = {
  completeProfileActions: PropTypes.object,
  waiting: PropTypes.bool,
  fbAccessToken: PropTypes.string,
  ssoUserData: PropTypes.object,
}

const mapStateToProps = (state) => {
  const {CompleteProfileReducers} = state

  return CompleteProfileReducers
}

const mapDispatchToProps = (dispatch) => {
  return {
    completeProfileActions: bindActionCreators(CompleteProfileActions, dispatch),
  }
}

const ConnectedCompleteProfileScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompleteProfileScene)

export const CompleteProfileSceneKey   = 'completeProfile'
export const CompleteProfileSceneTitle = 'Complete Profile'

export default ConnectedCompleteProfileScene
