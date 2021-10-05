
import React from 'react';

const Exclamation = ({...props}) => (
  <svg viewBox="0 0 33 33">
    <g fill={props.fill} fillRule="evenodd">
      <circle cx="16.5" cy="16.5" r="16.5" opacity=".2"/>
      <path fillRule="nonzero" d="M15.82 18.78l-.42-6.12-.1-2.66h2.96l-.1 2.66-.42 6.12h-1.92zm.96 4.86a1.69 1.69 0 0 1-1.27-.53c-.34-.353-.51-.79-.51-1.31 0-.533.17-.977.51-1.33a1.69 1.69 0 0 1 1.27-.53c.507 0 .93.177 1.27.53.34.353.51.797.51 1.33 0 .52-.17.957-.51 1.31a1.69 1.69 0 0 1-1.27.53z"/>
    </g>
  </svg>
);

export default Exclamation;
