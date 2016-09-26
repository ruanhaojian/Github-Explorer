import React from 'react'
import './Footer.scss'

export default () => (
    <div className='footer original'>
        <div id='footer-logo'>
            <a href='https://github.com/trungdq88/github-explorer' target='_blank'>
                <i className='fa fa-github' />
        <span id='version'>
          {window.VERSION}
        </span>
            </a>
        </div>
        <div id='footer-credit'>
            GitHub concept by Quan &amp; Bang<br />
            Created by rhj
        </div>
    </div>
)
