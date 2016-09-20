import React from 'react'
import RepoItem from '../RepoItem'
import SearchInput from '../SearchInput/SearchInput'
// import './RepoList.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class RepoList extends React.Component {

  constructor () {
    super()
    this.state = {
      searchText : '',
      showSearch : false,
      offsetTop  : 0
    }
    this.wait = false
    this.search = this.search.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.onSectionScroll = this.onSectionScroll.bind(this)
  }

  static propTypes = {
    repoListReducer    : React.PropTypes.object.isRequired,
    searchUserRepos    : React.PropTypes.func.isRequired,
    clearUserReposPage : React.PropTypes.func.isRequired
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
            nextProps.repoListReducer != this.props.repoListReducer ||
            nextState.searchText != this.state.searchText ||
            nextState.showSearch != this.state.showSearch ||
            nextState.offsetTop != this.state.offsetTop
        )
  }

  componentWillMount () {

  }

  onSectionScroll () {
    var _this = this

    _this.lastScrollTop = _this.refs.scrollWrapper.scrollTop
    if (_this.wait === false) {
      window.requestAnimationFrame(() => {
        if (_this.lastScrollTop > 0) {
          _this.refs.searchWrapper.classList.add('shadow')
        } else {
          _this.refs.searchWrapper.classList.remove('shadow')
        }
        _this.wait = false
      })
      _this.wait = true
    }
  }

  componentDidMount () {
    var _this = this

    this.refs.scrollWrapper.addEventListener('scroll', this.onSectionScroll)

    this.onTransitionDidEnd()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.username !== this.props.params.username) {
      this.searchUserRepos(this.props.params.username, this.state.searchText, this.props.repoListReducer.page)
    }
  }

  componentWillUnmount () {
    this.props.clearUserReposPage()

    this.refs.scrollWrapper.removeEventListener('scroll', this.onSectionScroll)

        // Undo the footer hack in RepoList
    document.querySelector('.footer.original').style.display = 'flex'
  }

  onTransitionWillStart (data) {
    this.setState({
      offsetTop : data.scrollTop
    })
  }

  onTransitionDidEnd () {
    this.setState({ offsetTop: 0 })

        // Show search, need a delay to trigger CSS animation
    setTimeout(() => this.setState({ showSearch: true }), 50)

    setTimeout(() => {
            // Get user profile
      this.props.searchUserRepos(this.props.params.username, this.state.searchText, this.props.repoListReducer.page)
    }, 300)

        // Hack the footer
        // this.hackTheFooter();
  }

  hackTheFooter () {
    const oldFooter = document.querySelector('.footer')
    const newFooter = oldFooter.cloneNode(true)
    oldFooter.style.display = 'none'
    newFooter.classList.remove('original')
    document.querySelector('#repo-list-page #scroll-wrapper').appendChild(newFooter)
  }

  loadMore () {
    if (this.props.repoListReducer.isSearching) return
    this.props.searchUserRepos(
            this.props.params.username, this.state.searchText, this.props.repoListReducer.page + 1)
  }

  search () {
    if (this.props.repoListReducer.isSearching) return

    this.refs.scrollWrapper.scrollTop = 0
    this.props.searchUserRepos(
            this.props.params.username, this.state.searchText, 1)
  }

  render () {
    var { isSearching, emptyData, complete, repos } = this.props.repoListReducer

    return (
            <div>
                <div
                  ref='searchWrapper'
                  id='search-wrapper'
                >
                    <ReactCSSTransitionGroup
                      transitionName='list'
                      transitionAppear
                      transitionAppearTimeout={500}
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                    >
                        {this.state.showSearch ?
                            <SearchInput
                              placeholder='Find a repository...'
                              buttonText='SEARCH'
                              onChange={e => this.setState({ searchText: e.target.value })}
                              onSearch={this.search}
                            /> : null}
                    </ReactCSSTransitionGroup>
                </div>
                <div
                  ref='scrollWrapper'
                  id='scroll-wrapper'
                >
                    <div id='repo-list'>
                        {emptyData ?
                            <div className='empty-data'>:-( Sad... No result found!</div> :
                            <div>
                                <div>
                                    <ReactCSSTransitionGroup
                                      transitionName='list'
                                      transitionAppear
                                      transitionAppearTimeout={500}
                                      transitionEnterTimeout={500}
                                      transitionLeaveTimeout={500}
                                    >
                                        {repos.map(repo =>
                                            <RepoItem key={repo.id} {...repo} />
                                        )}
                                    </ReactCSSTransitionGroup>
                                </div>

                                {!complete && repos.length > 0 ?
                                    <div
                                      id='load-more'
                                      onClick={this.loadMore}
                                    >
                                        {isSearching ? 'LOADING...' : 'LOAD MORE'}
                                    </div>
                                    : null}
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
  }
}
