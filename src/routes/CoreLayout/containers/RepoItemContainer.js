import { connect } from 'react-redux'
import RepoItem from 'components/RepoItem/RepoItem'
import { detailTransitionData } from '../modules/RepoItem'

const mapDispatchToProps = {
  detailTransitionData
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoItem)
