export default {
  rowViewPaddingSize: 20,
  genders: [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'other',
      label: 'Others',
    },
    {
      value: null,
      label: 'Select Later',
    },
  ],
  footerItems: [
    {
      icon: 'globe',
      routeName: 'Feed'
    },
    {
      icon: 'search',
      routeName: 'Search'
    },
    {
      icon: 'plus-square-o',
      routeName: 'NewPost'
    },
    {
      icon: 'envelope-o',
      routeName: 'Messages'
    },
    {
      icon: 'user',
      routeName: 'MyProfile'
    }
  ]
}