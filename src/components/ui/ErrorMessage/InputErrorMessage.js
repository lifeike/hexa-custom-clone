import React from 'react';
import styled from 'styled-components/macro';

const Error = styled.span`
  color: ${props => props.theme.color_red};
  font-family: ${props => props.theme.font_family};
  font-size: 1.4rem;
`;

const InputErrorMessage = ({ error }) => <Error>{error}</Error>;

export default InputErrorMessage;
