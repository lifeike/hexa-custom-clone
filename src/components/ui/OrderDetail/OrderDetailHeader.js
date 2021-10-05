import React from 'react';
import styled from 'styled-components/macro';
import { STATUS_LITERALS } from '@/utils/constants/constants';
import media from '@/utils/media';
import {
  rhythm,
  fromNow,
  getOrderStatusColor, formatStyleName,
} from '@/utils/helpers';

import Typography from '@/components/ui/Typography/Typography';
import Container from '@/components/ui/Layout/Container';
import Box from '@/components/ui/Layout/Box/Box';
import OrderDetailEditHeaderModal from './OrderDetailEditHeaderModal';
import Toggler from '@/components/ui/Toggler';
import Icon from '@/components/ui/Icons/Icon';
import { Breadcrumb } from '@/components/ui/Buttons/Buttons';

const IconButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const OrderDetailHeaderBackground = styled.div`
  background-color: ${props => props.theme.color_white};
  padding: ${rhythm(3)} 0 ${rhythm(2)};
`;

const OrderDetailHeaderWrapper = styled.div`
  position: relative;
`;

const MetaContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Hr = styled.div`
  background-color: ${props => props.theme.color_grey_5};
  height: .1rem;
  margin: ${rhythm(2.5)} 0;
  width: 100%;
`;

const PaddedType = styled(Typography)`
  padding-left: ${rhythm(1)};

  ${media.md`
    display: block;
    padding-left: 0;
  `}
`;

const EditableContent = styled.div`
  position: relative;

  ${media.md`
    display: flex;
    flex-direction: row;
  `}
`;

const MinWidth = styled.div`
  ${media.md`
    min-width: ${props => props.width}rem;
  `}
`;

const Chevron = styled(Icon)`
  margin-left: -1rem;
`;

const OrderStatus = styled.div`
  align-items: center;
  background-color:  ${props => props.theme[props.color]};
  border-radius: 1.6rem;
  display: flex;
  justify-content: center;
  padding: .2rem 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 10.4rem;

  ${media.md`
    padding: .6rem 0;
    right: 0;
    top: 0;
    width: 14rem;
  `}
`;

const Flex = styled.div`
  align-items: center;
  display: flex;

  i {
    margin-left: 2.4rem;
  }
`;

export default function OrderDetailHeader(props) {
  const {
    orderId,
    styleName,
    quantity,
    status,
    createdDate,
    updateTime,
  } = props.summary;

  const {
    showInventoryIcon,
    onInventoryClick,
  } = props;

  const {invoiceNo, customerEmail, distributorName} = props;

  function renderTimeContext(status) {
    const time = fromNow(updateTime || createdDate);

    if (STATUS_LITERALS[status] === 'UNPAID') return '';

    return `Last updated on ${time}`;
  }

  const styleTitle = styleName.toLowerCase().includes('wind breaker') ? formatStyleName(styleName) : styleName;

  return (
    <OrderDetailHeaderBackground>
      <Container>
        <OrderDetailHeaderWrapper>
          <Breadcrumb onClick={props.goBack}>
            <Chevron size={24} name="chevron" />
            All Orders
          </Breadcrumb>
          <Flex>
            <Typography variant="h1">
            Order #{orderId}
            </Typography>
            {showInventoryIcon &&
            <button onClick={e => onInventoryClick(e)}>
              <Icon name="fabricOutOfInventory" size={20} />
            </button>
            }
          </Flex>
          <Box classes="top1">
            <MetaContent>
              <Typography variant="meta1">
                {`${quantity} ${styleTitle}`}
              </Typography>
              <Typography variant="metaTitle">
                {renderTimeContext(status)}
              </Typography>
              {props.isSubmitted &&
                <OrderStatus color={getOrderStatusColor(status)}>
                  <Typography variant="meta3">{STATUS_LITERALS[status]}</Typography>
                </OrderStatus>
              }
            </MetaContent>
            <Hr/>
            <EditableContent>
              <MinWidth width="12">
                <Typography variant="metaTitle">Invoice Number:</Typography>
                <PaddedType variant="meta1">{invoiceNo || '--'}</PaddedType>
              </MinWidth>
              <Box classes="top1 top0Md left7Md">
                <MinWidth width="12">
                  <Typography variant="metaTitle">Customer Email:</Typography>
                  <PaddedType variant="meta1">{customerEmail || '--'}</PaddedType>
                </MinWidth>
              </Box>
              <Box classes="top1 top0Md left7Md">
                <MinWidth width="12">
                  <Typography variant="metaTitle">Distributor Name:</Typography>
                  <PaddedType variant="meta1">{distributorName || '--'}</PaddedType>
                </MinWidth>
              </Box>
              <Box classes="top3">
                <Toggler>
                  {([toggled, onToggle]) => (
                    <>
                      <IconButton
                        onClick={() => onToggle(!toggled)}>
                        <Icon size={20} name="edit"></Icon>
                      </IconButton>
                      <OrderDetailEditHeaderModal
                        isOpen={toggled}
                        customerEmail={customerEmail}
                        invoiceNo={invoiceNo}
                        updateInvoiceInfo={props.updateInvoiceInfo}
                        groupId={props.groupId}
                        onClose={() => onToggle(false)}
                      />
                    </>
                  )}
                </Toggler>
              </Box>
            </EditableContent>
          </Box>
        </OrderDetailHeaderWrapper>
      </Container>
    </OrderDetailHeaderBackground>
  );
}
