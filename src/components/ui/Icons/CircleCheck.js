import React from 'react';

const CircleCheck = ({...props}) => (
  <svg viewBox="0 0 12 12">
    <path fill={props.fill} fillRule="nonzero" d="M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12zM4.915 8.99L2.583 6.658a.541.541 0 0 1 .766-.765l1.566 1.56L8.65 3.719a.541.541 0 0 1 .767.002.545.545 0 0 1-.002.769l-4.5 4.5z"/>
  </svg>
);

export default CircleCheck;
