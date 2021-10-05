import React from 'react';
import styled from 'styled-components/macro';
import media from '@/utils/media';
import { rhythm } from '@/utils/helpers';

import Typography from '@/components/ui/Typography/Typography';
import Box from '@/components/ui/Layout/Box/Box';
import OrderDetailItem from './OrderDetailItem';
import Toggler from '@/components/ui/Toggler';
import AddSizeForm from '@/components/ui/Forms/AddSizeForm';
import { BorderedButton } from '@/components/ui/Buttons/Buttons';
import StandardModal from '@/components/ui/Modal/StandardModal';

const AddSizeButton = styled(BorderedButton)`
  font-size: 1.3rem;
  font-weight: ${props => props.theme.font_weight_semi_bold};
  letter-spacing: 0.11rem;
  padding-left: 4rem;
  padding-right: 4rem;

  ${media.md`
    padding-left: 6rem;
    padding-right: 6rem;
  `}
`;

const OrderDetailItemsHeader = styled(Box)`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Header = styled.div`
  padding: 0 ${rhythm(2)};
  margin-top: .4rem;

  ${media.md`
    background-color: ${props => props.theme.color_white};
    margin-top: ${rhythm(2)};
    padding: 0 ${rhythm(3)};
  `}
`;

export default function OrderDetailHeader(props) {
  const {
    subOrders: items,
    isSubmitted,
    order,
  } = props;

  return (
    <>
      <Header>
        <OrderDetailItemsHeader classes="top7 bottom2 flats3Md">
          <Typography variant="h2">
            Order Items
          </Typography>
          <div>
            {!isSubmitted &&
              <Box classes="textCenter">
                <Toggler>
                  {([toggled, onToggle]) => (
                    <div>
                      <AddSizeButton onClick={() => onToggle(true)}>+ ADD SIZE</AddSizeButton>
                      <StandardModal
                        toggle={toggled}
                        onAfterClose={() => onToggle(false)}
                      >
                        <AddSizeForm onAdd={() => onToggle(false)} styleId={order.order.cartSubs[0].styleNo}></AddSizeForm>
                      </StandardModal>
                    </div>
                  )}
                </Toggler>
              </Box>
            }
          </div>
        </OrderDetailItemsHeader>
      </Header>
      <div>
        {items && items.map((item, i) =>
          <OrderDetailItem
            key={i}
            canDelete={items.length > 1}
            item={item}
            isSubmitted={props.isSubmitted}
          />
        )}
      </div>
    </>
  );
}
