import React from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import './img/github-logo.png'
import './img/notification-icon.png'
import classNames from 'classnames'
import { ROUTES, matchParams } from '../../utils/routes.js'

import LoadingBlock from '../LoadingBlock'
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon'

class Header extends React.Component {

  constructor (...args) {
    super(...args)
    this.state = {
      isUserPage : false
    }
    this.shouldShowBackBtn = this.shouldShowBackBtn.bind(this)
    this.click = this.click.bind(this)
    this.isUserPage = this.isUserPage.bind(this)
  }

  static propTypes = {
    showLoading   : React.PropTypes.bool.isRequired,
    doneLoading   : React.PropTypes.bool.isRequired,
    loadFailed    : React.PropTypes.bool.isRequired,
    toggleNavMenu : React.PropTypes.func.isRequired,
    backButton    : React.PropTypes.func.isRequired
  }

  componentDidMount () {
    if (this.isUserPage(this.props.route)) {
      this.mountHeaderChange()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.isUserPage(nextProps.route)) {
      this.unmountHeaderChange()
    } else {
      this.mountHeaderChange()
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
            nextProps.showLoading != this.props.showLoading ||
            nextProps.doneLoading != this.props.doneLoading ||
            nextProps.loadFailed != this.props.loadFailed ||
            nextProps.open != this.props.open ||
            nextProps.route != this.props.route
        )
  }

  componentWillUnmount () {
    this.unmountHeaderChange()
  }

  unmountHeaderChange () {
    this.refs.header.classList.remove('transparent')
        // this.refs.header.removeEventListener('scroll')
  }

  mountHeaderChange () {
    this.unmountHeaderChange() // Make sure there is no multiple mount
    this.refs.header.classList.add('transparent')
    this.scrollSection = document.getElementById('scroll-section')
    this.wait = false

    var _this = this
    this.scrollSection.addEventListener('scroll', function () {
      if (!_this.state.isUserPage) {
        return false
      }

      _this.lastScrollTop = _this.scrollSection.scrollTop
      if (_this.wait === false) {
        window.requestAnimationFrame(() => {
                    // Access direct to the DOM for better scrolling performance
          if (_this.lastScrollTop === 0) {
            _this.refs.header.classList.add('transparent')
          } else {
            _this.refs.header.classList.remove('transparent')
          }
          _this.wait = false
        })
        _this.wait = true
      }
    })
  }

  isUserPage (route) {
    const isUserPage = route === undefined || // React Router returns undefined on root?
            route === ROUTES.USER_DETAIL ||
            route === ROUTES.HOME

    this.setState({
      isUserPage : isUserPage
    })

    return isUserPage
  }

  shouldShowBackBtn (route) {
    switch (route) {
      case ROUTES.HOME: return false
      case ROUTES.USER_DETAIL: return false
      case ROUTES.USER_REPO_LIST: return ROUTES.USER_DETAIL
      case ROUTES.REPO_DETAIL: return ROUTES.USER_REPO_LIST
      default: return false
    }
  }

  click () {
        // alert('BackBtn Clicked')
    const backRoute = this.shouldShowBackBtn(this.props.route)
    if (backRoute) {
      this.props.backButton(backRoute)
    } else {
      this.props.toggleNavMenu()
    }
  }

  render () {
    var { showLoading, doneLoading, loadFailed } = this.props

    return (
            <div>
                <div
                  ref='header'
                  className={classNames('header')}
                >
                    <HamburgerIcon
                      open={this.props.open}
                      back={this.shouldShowBackBtn(this.props.route)}
                      id='hamberger-menu'
                      onClick={this.click}
                    />
                    <Link to='/'>
                        <div id='brand-logo' />
                    </Link>
                    <div id='notification-icon' />
                </div>
                {showLoading ?
                    <LoadingBlock
                      done={doneLoading}
                      failed={loadFailed}
                    /> : null}
            </div>
        )
  }
}

export default Header
