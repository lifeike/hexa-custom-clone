import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { handleFormSubmit } from '@/utils/form';
import { INPUTS } from '@/utils/constants/constants';
import { sendPassWordResetEmail } from '@/store/actions/resetPassword';
import createInitialInputState from '@/utils/input';
import media from '@/utils/media';

import { PrimaryButton } from '@/components/ui/Buttons/Buttons';
import Box from '@/components/ui/Layout/Box/Box';
import TextInput from '@/components/ui/Inputs/TextInput';
import Typography from '@/components/ui/Typography/Typography';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  justify-content: space-between;

  ${media.md`
    height: auto;
  `}
`;

export class SendResetPasswordEmailForm extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...props.account,
      'formIsValid': false,
      'formIsActive': false,
      'formInputs': {
        'email': createInitialInputState(this, {
          'name': 'email',
          'label': 'Email',
          'type': INPUTS.EMAIL,
          'validationRules': {
            'isRequired': true,
            'isEmail': true,
          },
        }),
      },
    };

    this.resetPassword = this.resetPassword.bind(this);
  }

  handleKeyPress(e) {
    if (!e || e.key !== "Enter") return;

    this.handleFormSubmit(e);
  }

  handleFormSubmit(event) {
    event && event.preventDefault() && event.stopPropagation();

    handleFormSubmit(event, this, {
      callback: this.resetPassword,
    });

    return false;
  }

  resetPassword() {
    this.props.sendPassWordResetEmail(this.state.formInputs.email.value);
  }

  handleClose(e) {
    e.preventDefault();

    this.props.onClose();
  }

  renderReset() {
    const {
      formInputs: {
        email: emailProps,
      },
      formIsActive,
      formIsValid,
    } = this.state;

    const isButtonDisabled = !formIsActive || !formIsValid;

    return (
      <div onKeyDown={e => this.handleKeyPress(e)}>
        <Box classes="top4">
          <Typography variant="h1">
            Reset Password
          </Typography>
          <Box classes="top2">
            <Typography variant="body">
              Please enter your email to receive instructions about how to reset your password.
            </Typography>
          </Box>
          <Box classes="top4">
            <TextInput {...emailProps} />
          </Box>
        </Box>
        <Box classes="bottom8 top5">
          <PrimaryButton
            type="primary"
            onClick={(e) => this.handleFormSubmit(e)}
            disabled={isButtonDisabled}
          >
            Submit
          </PrimaryButton>
        </Box>
      </div>
    );
  }

  renderSuccess() {
    const email = this.state.formInputs.email.value;

    return (
      <>
        <Box classes="top4">
          <Typography variant="h1">
            Reset Password
          </Typography>
          <Box classes="top2">
            <Typography variant="h3" as="span">
              {email}
            </Typography>
          </Box>
          <Box classes="top2">
            <Typography variant="body">
              You should recieve an email with instructions about how to reset your password in the next few minutes.
            </Typography>
          </Box>
        </Box>
        <Box classes="bottom8 top5">
          <PrimaryButton
            type="primary"
            onClick={(e) => this.handleClose(e)}
          >
            Back To Login
          </PrimaryButton>
        </Box>
      </>
    );
  }

  render() {
    const resetSuccess = this.props.success;

    return (
      <StyledForm>
        {resetSuccess ? this.renderSuccess() : this.renderReset()}
      </StyledForm>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendPassWordResetEmail: (email) => dispatch(sendPassWordResetEmail(email)),
});

const mapStateToProps = state => ({
  success: state.resetPassword.sendResetPasswordSuccess,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SendResetPasswordEmailForm));
