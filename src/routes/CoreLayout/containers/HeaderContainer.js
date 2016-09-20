import { connect } from 'react-redux'
import { toggleNavMenu, backButton} from '../modules/Header'
import Header from 'components/Header/Header'

const mapDispatchToProps = {
    toggleNavMenu,
    backButton
}

const mapStateToProps = (state) => {
    
    return state.loadingBlockReducer.toJS()
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)
