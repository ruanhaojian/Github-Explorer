import { connect } from 'react-redux'
import RepoList from 'components/RepoList/RepoList'
import { searchUserRepos } from 'actions/user'
import { clearUserReposPage } from '../modules/RepoList'

const mapDispatchToProps = {
  searchUserRepos,
  clearUserReposPage
}

const mapStateToProps = (state) => {
  return {
    repoListReducer : state.repoListReducer.toJS()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoList)
