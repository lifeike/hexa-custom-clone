import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import { injectStripe, CardNumberElement, CardCvcElement, CardExpiryElement } from 'react-stripe-elements';
import { rhythm } from '@/utils/helpers';
import Box from '@/components/ui/Layout/Box/Box';
import CheckoutCta from '@/components/ui/Checkout/CheckoutCta';

const Label = styled.label`
  color: ${props => props.theme.color_darkest};
  display: block;
  font-family: ${props => props.theme.font_family};
  font-size: 1.4rem;
  font-weight: ${props => props.theme.font_weight_semi_bold};
  padding-bottom: ${rhythm(1)};
`;


const InputWrapper = styled.div`
  border: none;
  position: relative;
`;

const PaymentForm = styled.form`
  display: ${props => props.isVisible ? 'block': 'none'};
`;

const FORM_INPUTS = [
  {
    label: 'Card Number',
    element: CardNumberElement,
  },
  {
    label: 'Security Code',
    element: CardCvcElement,
  },
  {
    label: 'Expiration',
    element: CardExpiryElement,
  },
];

export class PaymentInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isComplete: false,
    };
  }

  async submit(event) {
    const { handleFormSubmit, stripe } = this.props;

    event.preventDefault();

    if (this.props.stripe) {
      const token = await stripe.createToken()
        .then(token => token);

      handleFormSubmit(event, token);
    }
  }

  handleOnChange = (element, input) => {
    input.complete = element.complete;

    this.setState({
      isComplete: FORM_INPUTS.every(input => {
        return input.complete;
      }),
    });
  }

  renderCta() {
    const isButtonDisabled = !this.state.isComplete;

    return (
      <CheckoutCta
        onClick={event => this.submit(event)}
        text={`Next: ${this.props.ctaText}`}
        disabled={isButtonDisabled}
      />
    );
  }

  renderFields() {
    return FORM_INPUTS.map(input => {
      return (
        <Box classes="top5" key={input.label}>
          <Label>{input.label}</Label>
          <InputWrapper>
            <input.element onChange={(e) => this.handleOnChange(e, input)} />
          </InputWrapper>
        </Box>
      );
    });
  }

  render() {
    const { isVisible } = this.props;

    return (
      <PaymentForm isVisible={isVisible}>
        {this.renderFields()}
        {this.renderCta()}
      </PaymentForm>
    );
  }
}

export default injectStripe(withTheme(PaymentInfoForm));
