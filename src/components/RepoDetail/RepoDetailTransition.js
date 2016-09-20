import React from 'react'
import { Base64 } from 'js-base64'
import './RepoDetail.scss'
import RepoDetailContainer from '../../routes/CoreLayout/containers/RepoDetailContainer'

export default class RepoDetail extends React.Component {

  constructor () {
    super()
    this.state = {
      doTransform   : false,
      offsetTop     : 0,
      startPosition : {
        top   : 0,
        left  : 0,
        right : 0
      }
    }
  }

  static propTypes = {
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  onTransitionWillStart (data) {
    return new Promise(resolve => {
      if (!data || !data.detailPageData) return
      this.setState({
        startPosition  : data.detailPageData.startPosition,
        repoDetailData : data.detailPageData.repoData,
        offsetTop      : data.scrollTop,
        doTransform    : true
      }, resolve)
    })
  }

  onTransitionDidEnd () {
        // this.getProfile();
  }

  transitionManuallyStart () {
    return new Promise(resolve => {
      this.setState({
        startPosition : {
          top : 60
        },
        doTransform : true
      }, resolve)
    })
  }

  transitionManuallyStop () {
    this.setState({
      doTransform : false
    })
  }

// <RepoDetailContainer repoDetailData={this.state.repoDetailData} params={this.props.params} />
  render () {
    return (
            <div
              id='repo-detail'
              className='transition-item'
              style={{
                transform : this.state.doTransform ?
            `translate3d(0, ${this.state.startPosition.top + this.state.offsetTop - 60}px, 0)` :
              undefined
              }}
            >
                <RepoDetailContainer repoDetailData={this.state.repoDetailData} params={this.props.params} />
            </div>
        )
  }
}
