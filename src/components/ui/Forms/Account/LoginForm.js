import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { login } from '@/store/actions/account';
import { resetPasswordClear } from '@/store/actions/resetPassword';
import { handleFormSubmit, changeObfuscation } from '@/utils/form';
import { INPUTS, ROUTES } from '@/utils/constants/constants';
import createInitialInputState from '@/utils/input';

import { PrimaryButton } from '@/components/ui/Buttons/Buttons';
import Box from '@/components/ui/Layout/Box/Box';
import StandardModal from '@/components/ui/Modal/StandardModal';
import TextInput from '@/components/ui/Inputs/TextInput';
import Typography from '@/components/ui/Typography/Typography';
import SendResetPasswordEmailForm from '@/components/ui/Forms/Account/SendResetPasswordEmailForm';
import PasswordInput from '@/components/ui/Inputs/PasswordInput';
import Container from '@/components/ui/Layout/Container';

export class LoginForm extends Component {
  static propTypes = {
    'isLoading': PropTypes.bool,
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
        'password': createInitialInputState(this, {
          'name': 'password',
          'label': 'Password',
          'type': INPUTS.PASSWORD,
          'validationRules': {
            'isRequired': true,
          },
        }),
      },
      reset: false,
    };

    this.doLogin = this.doLogin.bind(this);
  }

  doLogin() {
    this.props.login({
      email: this.state.formInputs.email.value,
      password: this.state.formInputs.password.value,
    }).then(() => {
      this.setState({
        success: true,
      });
    });
  }

  handleFormSubmit(event) {
    // TODO: actually make a login request to the API
    handleFormSubmit(event, this, {
      callback: this.doLogin,
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleFormSubmit(e);
    }
  }

  handleModalKeyDown(e) {
    if (e.key === 'Enter') {
      this.openModal(e);
    }

    return false;
  }

  openModal(e) {
    e && e.preventDefault();
    e && e.stopPropagation();

    this.props.resetPasswordClear();
    this.setState({
      reset: true,
    });
  }

  render() {
    const {
      formInputs: {
        email: emailProps,
        password: passwordProps,
      },
      formIsActive,
      formIsValid,
      reset,
    } = this.state;

    const isButtonDisabled = !formIsActive || this.props.loading || !formIsValid;

    if (this.state.success) {
      return (<Redirect to={ROUTES.ORDERS} />);
    }

    return (
      <>
      <form onKeyDown={e => this.handleKeyPress(e)}>
        <TextInput {...emailProps} />
        <Box classes="top5">
          <PasswordInput handleObfuscationClick={(e) => changeObfuscation(e, this, INPUTS.PASSWORD)} inputProps={passwordProps} />
        </Box>
        <Box classes="top5">
          <div>
            <button onKeyDown={e => {this.handleModalKeyDown(e);}} onClick={(e) => this.openModal(e)}>
              <Typography variant="link">
                Forgot Password?
              </Typography>
            </button>
          </div>
        </Box>
        <Box classes="top5">
          <PrimaryButton
            type="primary"
            onClick={(e) => this.handleFormSubmit(e)}
            disabled={isButtonDisabled}
          >
            Sign In
          </PrimaryButton>
        </Box>
      </form>
      <StandardModal
        toggle={reset}
        onAfterClose={() => this.setState({reset: false})}
      >
        <Container>
          <SendResetPasswordEmailForm onClose={() => this.setState({reset: false})}/>
        </Container>
      </StandardModal>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (account) => dispatch(login(account)),
  resetPasswordClear: () => dispatch(resetPasswordClear()),
});

const mapStateToProps = state => ({
  success: state.account.user.token,
  loading: state.account.loading,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTheme(LoginForm)));
