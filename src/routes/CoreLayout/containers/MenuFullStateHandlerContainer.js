import { connect } from 'react-redux'

import MenuFullStateHandler from 'components/MenuFullStateHandler/MenuFullStateHandler'

const mapDispatchToProps = dispatch =>{
    return {
    }
}
const mapStateToProps = (state) => {
    
    return {
        menuFullStateReducer : state.menuFullStateReducer.toJS()
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuFullStateHandler)
