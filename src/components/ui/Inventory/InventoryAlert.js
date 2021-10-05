import React from 'react';
import styled from 'styled-components';
import Icon from '@/components/ui/Icons/Icon';
import Box from '@/components/ui/Layout/Box/Box';
import Typography from '@/components/ui/Typography/Typography';
import { List } from '@/components/ui/List/List';

const Copy = styled(Typography)`
  font-size: 1.6rem;
`;

const ListLabel = styled.div`
  align-items: center;
  color: ${props => props.theme.color_grey_dark_1};
  display: flex;
  font-size: 1.6rem;
  font-weight: ${props => props.theme.font_weight_bold};

  i {
    margin-right: .8rem;
  }
`;

export const InventoryAlert = (props) => {
  return (
    <Box classes="top5 bottom3 sides2 sides5Md">
      <Typography variant="h1">
        Heads up!
      </Typography>
      <Box classes="top1">
        <Typography variant="h3">
        This order contains fabric or zipper colors that are temporarily out of stock.
        </Typography>
      </Box>
      <Box classes="top3">
        <Copy variant="body">You can still complete your design, but you will not be able to place an order until they are back in stock. Please contact </Copy>
        <a href="mailto:partnersupport@hexa.com"><Copy variant="link">support@hexacustom.com</Copy></a>
        <Copy variant="body"> for more information.</Copy>
      </Box>
      <Box classes="top3">
        <ListLabel>
          <Icon name="fabricOutOfInventory" size={20} />
          <span>Unavailable Colors:</span>
        </ListLabel>
        <List listItems={props.listItems}></List>
      </Box>
    </Box>
  );
};
