
import React from 'react';

const Kebab = ({...props}) => (
  <svg viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <g fill={props.fill || "#231F20"} transform="translate(2 10)">
        <circle cx="2" cy="2" r="2"/>
        <circle cx="10" cy="2" r="2"/>
        <circle cx="18" cy="2" r="2"/>
      </g>
      <path d="M0 0h24v24H0z"/>
    </g>
  </svg>
);

export default Kebab;
