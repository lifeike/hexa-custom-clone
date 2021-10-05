import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { rhythm } from '@/utils/helpers';

import { withBaseModal } from '@/components/ui/Modal/BaseModal';
import { BorderedButton } from '@/components/ui/Buttons/Buttons';
import Box from '@/components/ui/Layout/Box/Box';
import Icon from '@/components/ui/Icons/Icon';
import { ErrorText, ErrorButtonText } from '@/components/ui/Modal/GeneralErrorModal';

const ToastContainer = styled.div`
  background-color: ${props => props.theme.color_white};
  bottom: ${rhythm(7)};
  box-shadow:   0 0.7rem 0.9rem 0 rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 ${rhythm(3)};
  padding: ${rhythm(3)} ${rhythm(2)};
  position: fixed;
  width: calc(100% - ${rhythm(6)});
  z-index: 100;
`;

const AlignCenter = styled.div`
  align-items: center;
  display: flex;
`;

const ErrorToastText = styled(ErrorText)`
  display: inline-block;
  font-size: 1.6rem;
`;

class ErrorModal extends Component {

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
    const { theme, errorMessage } = this.props;

    return (
      <ToastContainer>
        <AlignCenter>
          <Box className="box_inlineBlock box_right3 box_vMiddle">
            <Icon size={30} fill={theme.color_red} name="exclamation"></Icon>
          </Box>
          <ErrorToastText>{errorMessage}</ErrorToastText>
        </AlignCenter>
        <div>
          <BorderedButton onClick={() => this.afterClose()}>
            <ErrorButtonText>OK</ErrorButtonText>
          </BorderedButton>
        </div>
      </ToastContainer>
    );
  }
}

export default withTheme(withBaseModal(ErrorModal));
