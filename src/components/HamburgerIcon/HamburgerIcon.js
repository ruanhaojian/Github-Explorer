/**
 * Created by ruanhaojian on 16/9/13.
 */
import React from 'react';
import classNames from 'classnames';
import './HamburgerIcon.scss';

export default (props) => (
    <div
        id={props.id}
        onClick={props.onClick}
        className={classNames('nav-icon', {
      open: props.open,
      back: props.back,
    })}
    >
        <div className="nav-icon-bars">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
);
