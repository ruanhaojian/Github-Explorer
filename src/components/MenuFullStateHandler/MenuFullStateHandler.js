import React from 'react'
import './MenuFullStateHandler.scss'

export default class MenuFullStateHandler extends React.Component {

  constructor () {
    super()
    this.state = {
    }
  }

  static propTypes = {
    menuFullStateReducer : React.PropTypes.object.isRequired
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
            nextProps.menuFullStateReducer.full != this.props.menuFullStateReducer.full
        )
  }

  componentDidMount () {

  }

  componentWillUnmount () {
  }

  render () {
    var { full } = this.props.menuFullStateReducer

    return (
            <input type='checkbox' id='nav-menu-full-checkbox' checked={full} />
        )
  }

}
