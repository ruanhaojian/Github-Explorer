import React from 'react'
import classNames from 'classnames'
import SearchInput from '../SearchInput/SearchInput'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Image from '../Image/Image'
import './NavMenu.scss'
// import classes from './NavMenu.scss'

export default class NavMenu extends React.Component {

  constructor () {
    super()
    this.state = {
      searchText : ''
    }

    this.wait = false

        // this.obsSearchTextChange = new Rx.Subject();

    this.onSearchTextChange = this.onSearchTextChange.bind(this)
  }

  static propTypes = {
    navMenuReducer : React.PropTypes.object.isRequired,
    getUsers       : React.PropTypes.func.isRequired,
    fullNavMenu    : React.PropTypes.func.isRequired,
    openNavMenu    : React.PropTypes.func.isRequired,
    closeNavMenu   : React.PropTypes.func.isRequired,
    clearUserPage  : React.PropTypes.func.isRequired
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
            nextProps.navMenuReducer.users != this.props.navMenuReducer.users ||
            nextProps.navMenuReducer.searching != this.props.navMenuReducer.searching ||
            nextState.searchText != this.state.searchText
        )
  }

  componentDidMount () {
    var _this = this

    this.props.getUsers()

    this.refs.userList.addEventListener('scroll', function () {
      _this.lastScrollTop = _this.refs.userList.scrollTop
      if (_this.wait === false) {
        window.requestAnimationFrame(() => {
          if (_this.lastScrollTop > 0) {
            _this.refs.searchBar.classList.add('dark-bg')
          } else {
            _this.refs.searchBar.classList.remove('dark-bg')
          }
          _this.wait = false
        })
        _this.wait = true
      }
    })
  }

  componentWillUnmount () {

  }

  onSearchTextChange (e) {
    this.setState({
      searchText : e.target.value
    })

    var _this = this

    if (!this.props.navMenuReducer.searching) {
      this.searchTimer && clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(() => {
        _this.props.getUsers(_this.state.searchText)
      }, 1000)
    }
  }

  userClick (path) {
        // action.onNext({ name: ACTIONS.CLOSE_NAV_MENU });
    this.props.closeNavMenu()
        // Wait for animation done, we don't want to overheat the CPU
    setTimeout(() => {
            // this.props.clearUserPage()
      this.context.router.push(path)
    }, 300)
  }

  cancelClick () {
    this.setState({ searchText: '' })
    this.props.openNavMenu()
  }

  render () {
    var { users, searching } = this.props.navMenuReducer
    var { fullNavMenu, getUsers } = this.props

    return (
            <div
              id='nav-menu'
              className={classNames({ open: this.props.open })}
            >
                <div
                  id='search-bar'
                  ref='searchBar'
                >
                    <SearchInput
                      onFocus={fullNavMenu}
                      onChange={this.onSearchTextChange}
                      value={this.state.searchText}
                      placeholder='Search by username…'
                      onSearch={() => getUsers(this.state.searchText)}
                    />
                    <div
                      id='cancel-button'
                      className={classNames({ show: this.props.full })}
                      onClick={this.cancelClick.bind(this)}
                    >Cancel</div>
                </div>
                <div
                  id='user-list'
                  ref='userList'
                >

                    {searching ?
                        <div id='loading'>
                            <div className='loading' />
                        </div> :
                        <ReactCSSTransitionGroup
                          transitionName='list'
                          transitionAppear
                          transitionAppearTimeout={500}
                          transitionEnterTimeout={500}
                          transitionLeaveTimeout={500}
                        >
                            {users.length ? users.map(user =>
                                <a
                                  key={user.id}
                                  className='user-item'
                                  onClick={() => this.userClick(`/user/${user.login}`)}
                                >
                                    <Image
                                      className='user-avatar'
                                      src={`https://avatars.githubusercontent.com/u/${user.id.split('-')[1]}`}
                                    />
                                    <div className='user-info'>
                                        <div className='fullname'>{user.fullname || user.login}</div>
                                        <div className='username'>{user.login || user.fullname}</div>
                                    </div>
                                </a>
                            ) : <div className='empty-data'>
                                Hmm.. that user cannot be found on GitHub.
                            </div>}
                        </ReactCSSTransitionGroup>
                    }

                </div>
            </div>
        )
  }
}

NavMenu.contextTypes = {
  router : React.PropTypes.object.isRequired
}
