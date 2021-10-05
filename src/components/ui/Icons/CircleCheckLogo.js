import React from 'react';

const CircleCheckLogo = ({...props}) => (
  <svg viewBox="0 0 64 64">
    <g fill="none" fillRule="evenodd">
      <circle cx="32" cy="32" r="32" fill={props.fill || "#1D8B07"} opacity=".2"/>
      <path stroke={props.stroke || "#1D8B07"} strokeWidth="5" d="M19 32.494l9.914 10.778L46 21.716"/>
    </g>
  </svg>
);

export default CircleCheckLogo;
