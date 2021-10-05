import React from 'react';

const Question = ({...props}) => (
  <svg viewBox="0 0 20 20">
    <g fill="none" fillRule="evenodd">
      <path d="M-2-2h24v24H-2z"/>
      <path stroke="#000" strokeOpacity=".5" d="M.5.5v19h19V.5H.5z"/>
      <path fill="#000" d="M9.16 12.482v-.98c0-.383.099-.637.407-.892l.688-.56c.73-.599 1.094-1.032 1.094-1.694 0-.917-.772-1.375-1.571-1.375-.87 0-1.557.47-1.586 1.375H7C7 6.904 8.263 6 9.778 6c1.543 0 2.778.904 2.778 2.407 0 1.044-.772 1.745-1.46 2.343l-.406.357c-.295.267-.407.445-.407.904v.471H9.16zm1.235 2.407H9.048v-1.223h1.347v1.223z"/>
    </g>
  </svg>
);

export default Question;
