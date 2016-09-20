import React from 'react'
import './Toast.scss'

export default (props) => (
    <div className='toast'>
        {props.toast.message}
        {props.toast.button}
    </div>
)
