import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './UserPage.scss'
import { Link } from 'react-router'
import Profile from '../Profile/Profile'
import RepoItem from '../RepoItem'

export default class UserPage extends React.Component {

  constructor () {
    super()
    this.state = {
      profile : {},
      repos   : []
    }
  }

  static propTypes = {
    UserPageReducer     : React.PropTypes.object.isRequired,
    getRandomUser       : React.PropTypes.func.isRequired,
    getUserProfile      : React.PropTypes.func.isRequired,
    getUserProfileRepos : React.PropTypes.func.isRequired,
    clearUserPage       : React.PropTypes.func.isRequired,

    triggerLoadAnimation       : React.PropTypes.func.isRequired,
    triggerLoadAnimationDone   : React.PropTypes.func.isRequired,
    triggerLoadAnimationHide   : React.PropTypes.func.isRequired,
    triggerLoadAnimationFailed : React.PropTypes.func.isRequired
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
            nextProps.UserPageReducer.profile != this.props.UserPageReducer.profile ||
            nextProps.UserPageReducer.repos != this.props.UserPageReducer.repos ||
            nextProps.route != this.props.route
        )
  }

  componentWillMount () {

  }

  componentDidMount () {
    if (this.props.UserPageReducer.profile != this.props.params.username) {
      this.props.clearUserPage()
      setTimeout(() => {
        this.loadUser(this.props.params.username)
      }, 100)
    } else {

    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.username !== this.props.params.username) {
      this.setState({
        profile : {},
        repos   : []
      })
      this.loadUser(nextProps.params.username)
    } else {
      this.setState({
        profile : nextProps.UserPageReducer.profile,
        repos   : nextProps.UserPageReducer.repos
      })
    }
  }

  componentWillUnmount () {

        // this.props.clearUserPage()

  }

  loadUser (username) {
    this.props.triggerLoadAnimation()
    if (username) {
      this.props.getUserProfile(username)
      this.props.getUserProfileRepos(username)
    } else {
      this.props.getRandomUser().then(data => {
        const user = data.items[0]
        this.props.getUserProfile(user.login)
        this.props.getUserProfileRepos(user.login)
      })
    }
  }

  render () {
        // var { profile, repos } = this.props.UserPageReducer

    var { profile, repos } = this.state

        // console.dir(repos)

    return (
            <div id='user-page'>
                <Profile
                  profile={profile}
                />
                <div className='repo-list'>
                    <div className='repo-list-header'>POPULAR REPOSITORIES</div>
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
                </div>
                <Link
                  to={`/user/${profile.login}/repos`}
                  className='view-all-btn'
                >
                    VIEW ALL REPOS
                </Link>
            </div>
        )
  }
}
