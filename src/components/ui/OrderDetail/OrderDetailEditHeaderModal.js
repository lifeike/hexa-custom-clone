import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import Box from '@/components/ui/Layout/Box/Box';
import StandardModal from '@/components/ui/Modal/StandardModal';

import Typography from '@/components/ui/Typography/Typography';
import Container from '@/components/ui/Layout/Container';

import { TextInputManaged as TextInput } from '@/components/ui/Inputs/TextInput';
import createInitialInputState from '@/utils/input';
import { PrimaryButton } from '@/components/ui/Buttons/Buttons';
import { rhythm } from '@/utils/helpers';
import media from '@/utils/media';
import validate from '@/utils/validator';


const SaveButton = styled.div`
  bottom: ${rhythm(12)};
  position: absolute;
  width: calc(100% - ${rhythm(4)});

  ${media.md`
    position: static;
    width: auto;
  `}
`;

const defaultProps = {
  labelStyle: '600',
};

class OrderDetailEditHeaderModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formInputs: {
        customerEmail: createInitialInputState(this, {
          name: 'customerEmail',
          label: 'Customer Email',
          validationRules: {
            'isEmail': true,
          },
          value: props.customerEmail,
          ...defaultProps,
        }),
        invoiceNo: createInitialInputState(this, {
          name: 'invoiceNo',
          label: 'Invoice #',
          value: props.invoiceNo,
          ...defaultProps,
        }),
      },
    };
  }

  inputValues() {
    const { formInputs } = this.state;
    const keys = Object.keys(formInputs);

    const invoiceInfo = {};

    return keys.reduce((invoiceInfo, key) => {
      return {
        ...invoiceInfo,
        [key]: formInputs[key].value,
      };
    }, invoiceInfo);
  }


  handleOnClick = () => {
    const { updateInvoiceInfo, groupId } = this.props;

    updateInvoiceInfo(groupId, this.inputValues());
    this.props.onClose();
  }

  render() {
    const { customerEmail, invoiceNo } = this.state.formInputs;
    const { isOpen } = this.props;
    const emailIsValid = validate(customerEmail.value, customerEmail.validationRules).isValid;
    const isButtonEnabled = ((customerEmail.value !== this.props.customerEmail) && emailIsValid)
                          || (invoiceNo.value !== this.props.invoiceNo);

    if (!isOpen) return null;

    return (
      <>
        <StandardModal
          toggle={isOpen}
          onAfterClose={() => this.props.onClose()}
        >
          <Container>
            <Box classes="flats7 sides5Md">
              <Box classes="bottom1 bottom2Md">
                <Typography variant="h1">Order Details</Typography>
              </Box>
              <form>
                <Box classes="bottom4">
                  <TextInput {...customerEmail} />
                </Box>
                <Box classes="bottom5">
                  <TextInput {...invoiceNo} />
                </Box>
              </form>
              <SaveButton>
                <PrimaryButton
                  disabled={!isButtonEnabled}
                  onClick={() => this.handleOnClick()}
                >
                  Save
                </PrimaryButton>
              </SaveButton>
            </Box>
          </Container>
        </StandardModal>
      </>
    );
  }
}

export default OrderDetailEditHeaderModal;
