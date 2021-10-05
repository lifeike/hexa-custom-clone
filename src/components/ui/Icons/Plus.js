import React from 'react';

const Plus = ({...props}) => (
  <svg viewBox="0 0 9 9">
    <path fill={props.fill || "#000"} fillRule="evenodd" d="M5 0v4h4v1H5v4H4V5H0V4h4V0h1z"/>
  </svg>
);

export default Plus;
