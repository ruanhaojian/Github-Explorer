import { connect } from 'react-redux'
import RepoDetail from 'components/RepoDetail/RepoDetail'
import { getRepoPageDetail } from 'actions/user'
import { clearRepoDetailPage } from '../modules/RepoDetail'

const mapDispatchToProps = {
  getRepoPageDetail,
  clearRepoDetailPage
}

const mapStateToProps = (state) => {
  return {
    repoDetailReducer : state.repoDetailReducer.toJS()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoDetail)
