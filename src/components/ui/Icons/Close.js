import React from 'react';

const Close = ({...props}) => (
  <svg viewBox="0 0 20 20">
    <path fill={props.fill} fillRule="evenodd" d="M11.414 10l4.243 4.243-1.414 1.414L10 11.414l-4.243 4.243-1.414-1.414L8.586 10 4.343 5.757l1.414-1.414L10 8.586l4.243-4.243 1.414 1.414L11.414 10z"/>
  </svg>
);

export default Close;
