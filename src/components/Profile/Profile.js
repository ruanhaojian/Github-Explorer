import React from 'react'
import Image from '../Image/Image'
import TextHolder from '../TextHolder/TextHolder'
import { Link } from 'react-router'
import './Profile.scss'
import cmd from './cmd.jpg'

export default class Profile extends React.Component {

  constructor () {
    super()
  }

  static propTypes = {
    profile : React.PropTypes.object.isRequired
  }

  componentDidMount () {

  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
            nextProps.profile != this.props.profile
        )
  }

  componentWillReceiveProps (nextProps) {

  }

  componentWillUnmount () {

  }

  render () {
    var props = this.props

    return (
            <div id='profile'>

                <div id='user-profile'>

                    <Image
                      id='avatar'
                      src={props.profile.avatar_url}
                    />

                    <div id='user-info'>
                        <div id='user-info-upper'>
                            <h1>
                                <TextHolder
                                  width={190}
                                  height={19}
                                >{props.profile.name || props.profile.login}</TextHolder>
                            </h1>
                            <h2>
                                <TextHolder
                                  width={100}
                                  height={16}
                                >{props.profile.login || props.profile.name}</TextHolder>
                            </h2>
                        </div>
                        <div id='user-info-lower'>
                            <div className='round-btn'>
                                Follow
                            </div>
                        </div>
                    </div>

                </div>

                <div id='user-bio'>
                    <TextHolder
                      width={200}
                      height={20}
                      center
                    >
                        {props.profile.bio}
                    </TextHolder>
                </div>

                <div id='user-stats'>
                    <div className='stats-divider space-holder' />

                    <div className='stats-block'>
                        <div className='stats-title'>
                            <TextHolder
                              width={40}
                              height={20}
                              center
                            >{props.profile.followers}</TextHolder>
                        </div>
                        <div className='stats-description'>Followers</div>
                    </div>

                    <div className='stats-divider' />

                    <div className='stats-block'>
                        <div className='stats-title'>
                            <TextHolder
                              width={40}
                              height={20}
                              center
                            >{props.profile.public_repos}</TextHolder>
                        </div>
                        <div className='stats-description'>Public repos</div>
                    </div>

                    <div className='stats-divider' />

                    <div className='stats-block'>
                        <div className='stats-title'>
                            <TextHolder
                              width={40}
                              height={20}
                              center
                            >{props.profile.following}</TextHolder>
                        </div>
                        <div className='stats-description'>Following</div>
                    </div>

                    <div className='stats-divider space-holder' />
                </div>

                <div id='view-repos'>
                    <Link
                      to={`/user/${props.profile.username || props.profile.login}/repos`}
                      className='green-btn'
                    >VIEW REPOSITORIES</Link>
                </div>

            </div>
        )
  }
}
