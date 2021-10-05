import React from 'react';
import { ROUTES } from '@/utils/constants/constants';
import styled from 'styled-components/macro';

import Typography from '@/components/ui/Typography/Typography';
import { NewOrdersLink } from '@/components/ui/Buttons/Buttons';
import Box from '@/components/ui/Layout/Box/Box';

const EmptyState = styled.div`
  text-align: center;
  padding-top: 8rem;
`;

export function OrdersEmptyState(props) {
  return (
    <EmptyState>
      <Typography variant="body" block>You have no {props.type} orders</Typography>
      <Box classes="top3">
        <NewOrdersLink to={ROUTES.NEW_ORDER}>
          + Create Order
        </NewOrdersLink>
      </Box>
    </EmptyState>
  );
}

export default OrdersEmptyState;
