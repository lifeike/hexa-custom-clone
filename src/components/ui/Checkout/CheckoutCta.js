import React from 'react';
import Box from '@/components/ui/Layout/Box/Box';
import { PrimaryButton } from '@/components/ui/Buttons/Buttons';

const CheckoutCta = ({ values, disabled, onClick, text }) => (
  <Box classes="top5">
    <PrimaryButton
      buttonWidth="50%"
      onClick={event => onClick(event, values)}
      disabled={disabled}
      maxWidth="240px"
    >
      {text}
    </PrimaryButton>
  </Box>
);

export default CheckoutCta;
