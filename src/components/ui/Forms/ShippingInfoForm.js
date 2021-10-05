import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import { INPUTS, EMAIL_INPUT_LENGTH } from '@/utils/constants/constants';
import { STATES } from '@/utils/constants/states';
import createInitialInputState from '@/utils/input';
import { updateShipping } from '@/store/actions/orders';

import Box from '@/components/ui/Layout/Box/Box';
import TextInput from '@/components/ui/Inputs/TextInput';
import FormDropdown from '@/components/ui/Dropdowns/FormDropdown';
import CheckoutCta from '@/components/ui/Checkout/CheckoutCta';

const ShippingForm = styled.form`
  display: ${props => props.isVisible ? 'block': 'none'};
`;

const defaultProps = {
  'labelStyle': '600',
  'validationRules': {
    'isRequired': true,
  },
};

export class ShippingInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'formIsValid': false,
      'formIsActive': false,
      'formInputs': {
        'firstName': createInitialInputState(this, {
          'name': 'firstName',
          'label': 'First Name',
          ...defaultProps,
        }),
        'lastName': createInitialInputState(this, {
          'name': 'lastName',
          'label': 'Last Name',
          ...defaultProps,
        }),
        'email': createInitialInputState(this, {
          'name': 'email',
          'label': 'Email Address',
          'type': INPUTS.EMAIL,
          ...defaultProps,
          'validationRules': {
            'isRequired': true,
            'isEmail': true,
          },
        }),
        'address': createInitialInputState(this, {
          'name': 'address',
          'label': 'Address',
          ...defaultProps,
        }),
        'city': createInitialInputState(this, {
          'name': 'city',
          'label': 'City',
          ...defaultProps,
        }),
        'state': createInitialInputState(this, {
          'name': 'state',
          'label': 'State',
          'type': 'dropdown',
          'listItems': Object.keys(STATES),
          ...defaultProps,
        }),
        'postalCode': createInitialInputState(this, {
          'name': 'postalCode',
          'label': 'Zip/Postal Code',
          ...defaultProps,
        }),
        'phone': createInitialInputState(this, {
          'name': 'phone',
          'label': 'Phone',
          ...defaultProps,
        }),
      },
    };
  }

  handleFormSubmit(event) {

    event.preventDefault();

    const data = this.inputValues();

    this.props.updateShipping(this.props.match.params.groupId, data).then(() => {
      this.props.handleFormSubmit(event, data);
    });
  }

  inputValues() {
    const { formInputs } = this.state;
    const { getKeys } = this.props;

    const shippingInfo = {};

    return getKeys(formInputs).reduce((shippingInfo, key) => {
      return {
        ...shippingInfo,
        [key]: formInputs[key].value,
      };
    }, shippingInfo);
  }

  handlePhoneInputMask(event) {
    const { formInputs } = this.state;

    const startPosition = event.currentTarget.selectionStart;
    const endPosition = event.currentTarget.selectionEnd;
    const input = event
              && event.target
              && event.target.value
              && event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);

    if (input) {
      // Manually mask number using string concat
      event.target.value = !input[2] ? input[1] : '(' + input[1] + ') ' + input[2] + (input[3] ? '-' + input[3] : '');
      formInputs['phone'].value = event.target.value;

      // restore cursor position when deleting characters
      if (event.nativeEvent.inputType === 'deleteContentBackward') {
        event.currentTarget.selectionStart = startPosition;
        event.currentTarget.selectionEnd = endPosition;
      }
    }
  }

  renderInput(key) {
    const { formInputs } = this.state;

    if (key === 'phone') {
      return (
        <TextInput
          {...formInputs[key]}
          onChange={e => this.handlePhoneInputMask(e)}
          maxLength={EMAIL_INPUT_LENGTH}
        />
      );
    }

    return <TextInput {...formInputs[key]} />;
  }

  renderDropdown(key) {
    const { formInputs } = this.state;

    return (
      <FormDropdown
        {...formInputs[key]}
        listItems={formInputs[key].listItems}
      />
    );
  }

  renderFormInputs() {
    const { formInputs } = this.state;
    const { getKeys } = this.props;

    return getKeys(formInputs).map(key => {
      return (
        <Box classes="top5" key={formInputs[key].name}>
          {
            formInputs[key].type !== 'dropdown'
              ? this.renderInput(key)
              : this.renderDropdown(key)
          }
        </Box>
      );
    });
  }

  renderCta() {
    const { formIsActive, formIsValid } = this.state;
    const isButtonDisabled = !formIsActive || !formIsValid;

    return (
      <CheckoutCta
        onClick={event => this.handleFormSubmit(event)}
        text={`Next: ${this.props.ctaText}`}
        disabled={isButtonDisabled}
      />
    );
  }

  render() {
    const { isVisible } = this.props;

    return  (
      <ShippingForm isVisible={isVisible}>
        {this.renderFormInputs()}
        {this.renderCta()}
      </ShippingForm>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateShipping: (groupId, data) => dispatch(updateShipping(groupId, data)),
});

const mapStateToProps = state => ({
  styles: state.styles,
});

export default withRouter(withTheme(connect(mapStateToProps, mapDispatchToProps)(ShippingInfoForm)));
