import React from 'react';
import styled from 'styled-components/macro';
import { ModalProvider, BaseModalBackground } from "styled-react-modal";
import media from '@/utils/media';

const FadingBackground = styled(BaseModalBackground)`
  background-color: ${props => props.theme.color_white};
  bottom: 0;
  opacity: ${props => props.opacity};
  overflow-y: auto;
  right: 0;
  transition: opacity ease 200ms;
  -webkit-overflow-scrolling: touch;
  z-index: 100;

  ${media.md`
    background-color: rgba(0, 0, 0, 0.5);
    min-height: 100%;
    /* Padding equal to modal top */
    padding-bottom: 20rem;
  `}
`;

function ModalOverlay(props) {
  return (
    <ModalProvider backgroundComponent={FadingBackground}>
      {props.children}
    </ModalProvider>
  );
}

export default ModalOverlay;
