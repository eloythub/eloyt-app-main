import { Dimensions, StyleSheet } from 'react-native'

const {width, height} = Dimensions.get('window')

const commonDetailsActionSlide = {
  height: 100,
}

const detailsSnapDetailsWidth = width - 100
const detailsSnapDetailsActionWidth = 40

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  keyboardAvoidingViewContainer: {
    flex: 1,
  },
  video: {
    width,
    height,
  },
  detailsActionPagination: {
    bottom: 10,
  },
  detailsActionPaginationDot: {
    width: 5,
    height: 5,
  },
  bottomSection: {
    ...commonDetailsActionSlide,
    width,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  detailsActionSlide: {
    ...commonDetailsActionSlide,
    width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'OpenSans',
  },

  // Details Slide
  detailsContainer: {
    ...commonDetailsActionSlide,
    width: width - 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  detailsUserAvatar: {
    width: 80,
    marginRight: 5,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  detailsSnapDetails: {
    width: detailsSnapDetailsWidth,
  },
  detailsSnapDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsSnapDetailsContent: {
    width: detailsSnapDetailsWidth - detailsSnapDetailsActionWidth,
    //backgroundColor: 'red',
  },
  detailsSnapDetailsAction: {
    width: detailsSnapDetailsActionWidth,
    //backgroundColor: 'yellow',
  },
  detailsTime: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'OpenSans',
    color: '#ffffff',
    padding: 0,
  },
  detailsUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
    color: '#ffffff',
    padding: 0,
  },
  detailsDescription: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily: 'OpenSans',
    textAlign: 'justify',
    color: '#ffffff',
    padding: 0,
  },

  // Actions Slide
  actionsContainer: {
    width: width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
    paddingRight: 5,
  },
})
