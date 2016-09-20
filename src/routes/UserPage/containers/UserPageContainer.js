import { connect } from 'react-redux'
import { getRandomUser, getUserProfile, getUserProfileRepos } from 'actions/user'
import { clearUserPage } from '../modules/UserPage'
import {
    triggerLoadAnimation,
    triggerLoadAnimationDone,
    triggerLoadAnimationHide,
    triggerLoadAnimationFailed
} from '../../CoreLayout/modules/Header'

import UserPage from 'components/UserPage/UserPage'

const mapDispatchToProps = {
    getRandomUser,
    getUserProfile,
    getUserProfileRepos,
    clearUserPage,
    triggerLoadAnimation,
    triggerLoadAnimationDone,
    triggerLoadAnimationHide,
    triggerLoadAnimationFailed
}

const mapStateToProps = (state) => {
    return {
        UserPageReducer : state.UserPageReducer.toJS()
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
