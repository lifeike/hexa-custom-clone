import React from 'react';

const Account = ({...props}) => (
  <svg viewBox="0 0 22 22">
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h22v22H0z"/>
      <path fill={props.fill || "#fff"} fillRule="nonzero" d="M11 1.833C5.94 1.833 1.833 5.94 1.833 11S5.94 20.167 11 20.167 20.167 16.06 20.167 11 16.06 1.833 11 1.833zm5.83 13.595c-1.31-1.596-4.492-2.136-5.83-2.136s-4.52.54-5.83 2.136A7.287 7.287 0 0 1 3.667 11c0-4.043 3.29-7.333 7.333-7.333s7.333 3.29 7.333 7.333c0 1.668-.568 3.2-1.503 4.428zM11 5.5a3.2 3.2 0 0 0-3.208 3.208A3.2 3.2 0 0 0 11 11.917a3.2 3.2 0 0 0 3.208-3.209A3.2 3.2 0 0 0 11 5.5z"/>
    </g>
  </svg>
);

export default Account;
