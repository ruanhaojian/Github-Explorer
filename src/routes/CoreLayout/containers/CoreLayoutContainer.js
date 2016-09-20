import { connect } from 'react-redux'
import { closeNavMenu, updateCoreData } from '../modules/CoreLayout'
import CoreLayout from '../../../layouts/CoreLayout/CoreLayout'

const mapDispatchToProps = {
    closeNavMenu,
    updateCoreData
}

const mapStateToProps = (state) => {

    // console.log('---->')
    // console.dir(state)

    return {
        coreLayoutReducer: state.coreLayoutReducer.toJS()
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
