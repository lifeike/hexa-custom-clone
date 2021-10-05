import React from 'react';

const Chevron = ({...props}) => (
  <svg viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <path fill={props.fill || "#000"} d="M14 18l1.41-1.41L10.83 12l4.58-4.59L14 6l-6 6z"/>
      <path d="M24 24H0V0h24z"/>
    </g>
  </svg>

);

export default Chevron;
