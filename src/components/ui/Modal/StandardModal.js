import React, { Component } from 'react';
import Modal from "styled-react-modal";
import FocusLock, { AutoFocusInside } from 'react-focus-lock';
import media from '@/utils/media';
import { isScrollable } from '@/utils/helpers';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withBaseModal } from '@/components/ui/Modal/BaseModal';
import { ModalCloseButton } from '@/components/ui/Buttons/Buttons';

const ModalContent = styled.div`
  align-items: center;
  align-self: start;
  background-color: ${props => props.theme.color_white};
  height: auto;
  justify-content: center;
  height: 100%;
  left: 0;
  max-width: 70rem;
  opacity: ${props => props.opacity};
  overflow: auto;
  position: absolute;
  right: 0;
  transition: opacity ease 500ms;
  width: 100%;

  ${media.md`
    height: auto;
    left: auto;
    margin-bottom: 20rem;
    min-height: 10rem;
    overflow: auto;
    right: auto;
    top: 10rem;
    width: ${100 * 8/12}%;
  `}

  ${media.lg`
    width: ${props => 100 * props.width/12}%;
  `}
`;

const Footer = styled.div`
  bottom: 0;
  position: fixed;
  z-index: 101;
`;

class StandardModal extends Component {
  static propTypes = {
    footer: PropTypes.node,
  }

  constructor(props) {
    super(props);

    this.containerRef = React.createRef();
  }

  render() {
    // check container ref height
    const isStickyScroll = isScrollable(this.containerRef.current);

    return (
      <>
        <Modal
          isOpen={this.props.toggle}
          allowScroll={true}
          long={this.props.long}
          opacity={this.props.opacity}
          backgroundProps={{ opacity: this.props.opacity }}
          afterOpen={this.props.afterOpen}
          beforeClose={this.props.beforeClose}
          afterClose={this.props.afterClose}
          onBackgroundClick={this.props.afterClose}
          onEscapeKeydown={this.props.afterClose}
        >
          <ModalContent width={this.props.width} ref={this.containerRef}>
            <FocusLock returnFocus={true}>
              {!this.props.hideClose &&
                <AutoFocusInside>
                  <ModalCloseButton onClick={this.props.onAfterClose} sticky={isStickyScroll}/>
                </AutoFocusInside>
              }
              {this.props.children}
            </FocusLock>
          </ModalContent>
          <Footer>
            {this.props.footer}
          </Footer>
        </Modal>
      </>
    );
  }
}

export default withBaseModal(StandardModal);
