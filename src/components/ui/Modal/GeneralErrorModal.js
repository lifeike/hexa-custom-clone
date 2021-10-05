import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import Modal from "styled-react-modal";
import PropTypes from 'prop-types';
import FocusLock, { AutoFocusInside } from 'react-focus-lock';

import { withBaseModal } from '@/components/ui/Modal/BaseModal';
import { BorderedButton } from '@/components/ui/Buttons/Buttons';
import Box from '@/components/ui/Layout/Box/Box';
import Icon from '@/components/ui/Icons/Icon';
import Typography from '@/components/ui/Typography/Typography';

const ModalStyled = Modal.styled`
  align-items: center;
  align-self: center;
  background-color: ${props => props.theme.color_white};
  height: auto;
  justify-content: center;
  margin: 0 2.4rem;
  opacity: ${props => props.opacity};
  position: relative;
  transition: opacity ease 500ms;
  z-index: 100;
`;

export const ErrorText = styled.div`
  color: ${props => props.color || props.theme.color_darkest};
  font-size: 1.4rem;
  font-weight: ${props => props.theme.font_weight_semi_bold};
  line-height: 1.3;
`;

export const ErrorButtonText = styled.span`
  font-size: 1.3rem;
  font-weight: ${props => props.theme.font_weight_semi_bold};
  letter-spacing: 1.1px;
`;

const ErrorContainer = styled.div`
  padding: 3.6rem 5.4rem;
`;

class GeneralErrorModal extends Component {

  static propTypes = {
    onAfterClose: PropTypes.func,
    errorMessage: PropTypes.string.isRequired,
  }

  afterClose() {
    if (this.props.onAfterClose) {
      this.props.onAfterClose();
    }
  }

  render() {
    const { theme, errorMessage, errorHeader, long } = this.props;

    return (
      <ModalStyled
        isOpen={errorMessage || errorHeader}
        allowScroll={true}
        long={long}
      >
        <FocusLock returnFocus={true}>
          <ErrorContainer>
            <Box className="box_textCenter box_flats2">
              <Icon size={30} fill={theme.color_red} name="exclamation"></Icon>
            </Box>
            {errorHeader &&
              <Box classes="bottom1">
                <Typography variant="h2"></Typography>
              </Box>
            }
            <Box className="box_textCenter">
              <ErrorText>{errorMessage}</ErrorText>
            </Box>
            <AutoFocusInside>
              <Box className="box_textCenter box_top3">
                <BorderedButton onClick={() => this.afterClose()}>
                  <ErrorButtonText>OK</ErrorButtonText>
                </BorderedButton>
              </Box>
            </AutoFocusInside>
          </ErrorContainer>
        </FocusLock>
      </ModalStyled>
    );
  }
}

export default withTheme(withBaseModal(GeneralErrorModal));
