import React from 'react';

const LowInventory = ({...props}) => (
  <svg viewBox="0 0 61 61">
    <g fill={props.fill} fillRule="evenodd">
      <circle cx="30.5" cy="30.5" r="30.5" opacity=".2"/>
      <path fillRule="nonzero" d="M29.612 35.092l-.825-11.217L28.59 19h5.82l-.197 4.875-.825 11.217h-3.776zM31.5 44c-.996 0-1.829-.324-2.497-.971C28.334 42.38 28 41.58 28 40.628c0-.978.334-1.79 1.003-2.438.668-.648 1.5-.972 2.497-.972.996 0 1.829.324 2.497.972.669.647 1.003 1.46 1.003 2.438 0 .953-.334 1.753-1.003 2.4-.668.648-1.5.972-2.497.972z"/>
    </g>
  </svg>

);

export default LowInventory;
