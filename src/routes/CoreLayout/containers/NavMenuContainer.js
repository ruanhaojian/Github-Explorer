import { connect } from 'react-redux'
import { closeNavMenu, fullNavMenu, openNavMenu } from '../modules/CoreLayout'
import { clearUserPage } from '../../UserPage/modules/UserPage'
import NavMenu from 'components/NavMenu/NavMenu'
import { getUsers } from 'actions/user'

const mapDispatchToProps = {
  closeNavMenu,
  fullNavMenu,
  openNavMenu,
  getUsers,
  clearUserPage
}

const mapStateToProps = (state) => {
  return {
    navMenuReducer : state.navMenuReducer.toJS()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu)
