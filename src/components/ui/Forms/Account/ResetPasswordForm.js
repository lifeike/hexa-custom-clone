import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { handleFormSubmit } from '@/utils/form';
import { INPUTS } from '@/utils/constants/constants';
import { ROUTES } from '@/utils/constants/constants';
import createInitialInputState from '@/utils/input';
import media from '@/utils/media';
import { getUrlParam, rhythm } from '@/utils/helpers';
import { changeObfuscation } from '@/utils/form';
import { resetPassword } from '@/store/actions/resetPassword';

import { PrimaryButton } from '@/components/ui/Buttons/Buttons';
import Box from '@/components/ui/Layout/Box/Box';
import PasswordInput from '@/components/ui/Inputs/PasswordInput';
import Typography from '@/components/ui/Typography/Typography';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  width: 100%;

  ${media.md`
    height: auto;
    min-height: 0;
  `}
`;

const RequirementsList = styled.ul`
  list-style: disc;
  margin-left: ${rhythm(2)};
`;

const RequirementsListItem = styled.li`
  margin-bottom: ${rhythm(1)};
  margin-top: ${rhythm(1)};
`;

const PasswordRequirements = [
  'Must be at least 8 characters in length',
  'Contain at least one capital letter',
  'Contain at least one special character',
];

export class ResetPasswordForm extends Component {

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
        'password': createInitialInputState(this, {
          'name': 'password',
          'label': 'Password',
          'type': INPUTS.PASSWORD,
          'errorImmediate': false,
          'validationRules': {
            'isRequired': true,
            'password': true,
          },
        }),
      },
    };

    this.resetPassword = this.resetPassword.bind(this);
  }

  componentDidMount() {
    this.verifyToken();
  }

  /**
   * This page is only accessible when it has a valid token
   *
   * TODO: Verify the query string param name and change.
   */
  verifyToken() {
    const token = getUrlParam('resetToken');

    if (!token) {
      this.props.history.push(ROUTES.LOGIN);
    }

    this.setState({
      token: token,
    });
  }

  handleFormSubmit(event) {
    const { formIsValid } = this.state;

    if (formIsValid) {
      handleFormSubmit(event, this, {
        callback: this.resetPassword,
      });
    }

  }

  resetPassword() {
    this.props.resetPassword({
      password: this.state.formInputs.password.value,
      token: this.state.token,
    }).then(() => {
      setTimeout(() => {
        if (this.props.success) {
          this.props.history.push(ROUTES.LOGIN);
        }
      }, 3000);
    });
  }

  renderRequirements() {
    return (
      <RequirementsList>
        {
          PasswordRequirements.map((req, index) =>
            <RequirementsListItem key={index}>
              { req }
            </RequirementsListItem>
          )
        }
      </RequirementsList>
    );
  }

  renderReset() {
    const {
      formInputs: {
        password: passwordProps,
      },
      formIsValid,
      formIsActive,
    } = this.state;

    const isButtonDisabled = !formIsActive || this.props.loading || !formIsValid;

    return (
      <>
        <div>
          <Typography variant="h1">
            Reset Password
          </Typography>
          <Box classes="top2">
            <Typography variant="body">
              Please type your new password below.
            </Typography>
          </Box>
          <Box classes="top4">
            <PasswordInput
              handleObfuscationClick={(e) => changeObfuscation(e, this, INPUTS.PASSWORD)}
              inputProps={passwordProps} />
          </Box>
          <Box classes="top4">
            {this.renderRequirements()}
          </Box>
        </div>
        <Box classes="bottom1 top5">
          <PrimaryButton
            type="primary"
            onClick={(e) => this.handleFormSubmit(e)}
            disabled={isButtonDisabled}
          >
            Reset
          </PrimaryButton>
        </Box>
      </>
    );
  }

  renderSuccess() {
    return (
      <>
        <div>
          <Typography variant="h1">
            Reset Password
          </Typography>
          <Box classes="top2">
            <Typography variant="h3" as="span">
              Success!
            </Typography>
            <div>
              <Typography variant="body">
                Your password has been reset.
              </Typography>
            </div>
          </Box>
        </div>
        <Box classes="bottom1 top5">
          <Link to={ROUTES.LOGIN}>
            <PrimaryButton
              type="primary"
            >
            Sign In
            </PrimaryButton>
          </Link>
        </Box>
      </>
    );
  }

  render() {
    const { success } = this.props;

    if (!this.state.token) return null;

    return (
      <StyledForm>
        {success ? this.renderSuccess() : this.renderReset()}
      </StyledForm>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  resetPassword: (data) => dispatch(resetPassword(data)),
});

const mapStateToProps = state => ({
  success: state.resetPassword.resetPasswordSuccess,
  loading: state.resetPassword.resetPasswordLoading,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm));
