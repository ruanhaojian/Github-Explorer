import React from 'react';
import classNames from 'classnames';
import './TextHolder.scss';

export default (props) => (
    <span
        className={classNames({
      'text-holder-wrapper': props.children === undefined,
      center: props.center,
    })}
        style={props.children === undefined ? {
      width: props.width,
      height: props.height,
    } : {}}
    >
    {props.children === undefined ? <div className="text-holder"></div> : props.children}
  </span>
);
