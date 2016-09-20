import { connect } from 'react-redux'
import MainContent from 'components/MainContent/MainContent'

const mapDispatchToProps = {
    
}

const mapStateToProps = (state) => {
    
    return {
        mainContentReducer : state.mainContentReducer.toJS()
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContent)
