import { Factory } from 'react-eloyt'
// LoginScreen
import FluidBackground from '../../Assets/Images/fluid-background.jpg'
import FacebookLogo from '../../Assets/Images/facebook.png'
import PureLogo from '../../Assets/Images/pure-logo.png'
// CompleteProfileScreen
import DefaultProfileUser from '../../Assets/Images/default-profile-user.png'
// Buttons
import CancelIcon from '../../Assets/Images/cancel-icon.png'
import OkIcon from '../../Assets/Images/ok-icon.png'

export default class Assets extends Factory {
  // LoginScreen
  static FluidBackground = FluidBackground
  static FacebookLogo    = FacebookLogo
  static PureLogo        = PureLogo

  // CompleteProfileScreen
  static DefaultProfileUser = DefaultProfileUser

  // Buttons
  static CancelIcon = CancelIcon
  static OkIcon = OkIcon
}
