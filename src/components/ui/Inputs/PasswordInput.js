import React, { Component } from 'react';
import { INPUTS } from '@/utils/constants/constants';
import { withTheme } from 'styled-components';
import { TextInputMaskable } from '@/components/ui/Inputs/TextInput';
import PropTypes from 'prop-types';

class PasswordInput extends Component {
  static propTypes = {
    inputProps: PropTypes.object,
    handleObfuscationClick: PropTypes.func,
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.props.handleObfuscationClick(e);
    }
  };

  render() {
    const passwordIconName = this.props.inputProps.type === INPUTS.TEXT ? 'hidePassword' : 'showPassword';

    return (
      <TextInputMaskable
        {...this.props.inputProps}
        handleToggleMask={this.props.handleObfuscationClick}
        maskIcon={passwordIconName}
      />
    );
  }
}

export default withTheme(PasswordInput);
