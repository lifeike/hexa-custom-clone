import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import { connect } from 'react-redux';
import Box from '@/components/ui/Layout/Box/Box';
import Typography from '@/components/ui/Typography/Typography';
import StandardModal from '@/components/ui/Modal/StandardModal';
import { ModalConfirmButton } from '../Buttons/Buttons';
import { toggleShowError } from '@/store/actions/accountError';
import media from '@/utils/media';

const Link = styled(Typography)`
  font-size: 1.6rem;

  ${media.md`
    font-size: 1.9rem;
  `}
`;

class AccountError extends Component {

  render() {
    const { showError, toggleShowError } = this.props;

    return (
      <StandardModal
        toggle={showError}
        onAfterClose={() => toggleShowError(false)}
        hideClose={true}
      >
        <Box classes="top5 bottom3 sides2 sides5Md">
          <Typography variant="h1">
            Account Error
          </Typography>
          <Box classes="top1">
            <Typography variant="body">
              There is currently an issue with your account that will prevent order submission.
            </Typography>
          </Box>
          <Box classes="top3">
            <Typography variant="body">You can contact </Typography>
            <a href="mailto:partnersupport@hexa.com"><Link variant="link">support@hexacustom.com</Link></a>
            <Typography variant="body"> for more information.</Typography>
          </Box>
          <Box classes="top8">
            <ModalConfirmButton onClick={() => toggleShowError(false)}>OK</ModalConfirmButton>
          </Box>
        </Box>
      </StandardModal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toggleShowError: showError => dispatch(toggleShowError(showError)),
});

const mapStateToProps = state => ({
  showError: state.accountError.showError,
});

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(AccountError));
