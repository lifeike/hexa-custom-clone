import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

import StandardModal from '@/components/ui/Modal/StandardModal';
import { BorderedButton } from '@/components/ui/Buttons/Buttons';
import Box from '@/components/ui/Layout/Box/Box';
import Icon from '@/components/ui/Icons/Icon';
import Typography from '@/components/ui/Typography/Typography';
import Container from '@/components/ui/Layout/Container';

const CenteredText = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const ErrorButtonText = styled.span`
  font-size: 1.3rem;
  font-weight: ${props => props.theme.font_weight_semi_bold};
  letter-spacing: 1.1px;
`;

const Copy = styled.span`
  font-size: 1.6rem;
  line-height: 1.25;
  text-align: center;
  color: ${props => props.color_grey_dark_1};
`;

class ErrorModal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool,
    header: PropTypes.string,
    copy: PropTypes.string,
    onAfterClose: PropTypes.func,
  }

  afterClose() {
    if (this.props.onAfterClose) {
      this.props.onAfterClose();
    }
  }

  render() {
    const { isOpen, copy, theme, header } = this.props;

    return (
      <StandardModal
        toggle={isOpen}
        hideClose={true}
      >
        <Container>
          <Box classes="top9 bottom5 textCenter">
            <Icon name="lowInventory" size={61} fill={theme.color_red}></Icon>
          </Box>
          <Box classes="bottom8">
            <CenteredText>
              <Typography variant="h2">{header}</Typography>
              <Box classes="top2 textCenter">
                <Copy>{copy}</Copy>
              </Box>
              <Box classes="top4">
                <BorderedButton onClick={() => this.afterClose()}>
                  <ErrorButtonText>OK</ErrorButtonText>
                </BorderedButton>
              </Box>
            </CenteredText>
          </Box>
        </Container>
      </StandardModal>
    );
  }
}

export default withTheme(ErrorModal);
