import { connect } from 'react-redux'

import MenuOpenStateHandler from 'components/MenuOpenStateHandler/MenuOpenStateHandler'

const mapDispatchToProps = dispatch => {
  return {
  }
}
const mapStateToProps = (state) => {
  return {
    menuOpenStateReducer : state.menuOpenStateReducer.toJS()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuOpenStateHandler)
