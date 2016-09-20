import React from 'react'
import './MenuOpenStateHandler.scss'

export default class MenuOpenStateHandler extends React.Component {

  constructor () {
    super()
    this.state = {
    }
  }

  static propTypes = {
    menuOpenStateReducer : React.PropTypes.object.isRequired
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
            nextProps.menuOpenStateReducer.open != this.props.menuOpenStateReducer.open
        )
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  render () {
    var { open } = this.props.menuOpenStateReducer

    return (
            <input type='checkbox' id='nav-menu-open-checkbox' checked={open} />
        )
  }

}
