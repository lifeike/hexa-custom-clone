import styled from 'styled-components/macro';
import React from 'react';
import {formatDate, formatStyleName} from '@/utils/helpers';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { STATUS_LITERALS } from '@/utils/constants/constants';
import { getOrderStatusColor } from '@/utils/helpers';

import Typography from '@/components/ui/Typography/Typography';
import media from '@/utils/media';
import Box from '@/components/ui/Layout/Box/Box';
import { ROUTES } from '../../../utils/constants/constants';
import { connect } from 'react-redux';
import { setDupeGroupId } from '../../../store/actions/orders';


const Order = styled(Link)`
  background-color: ${props => props.theme.color_white};
  display: block;
  position: relative;

  &:focus {
    z-index: 2;
  }

  ${media.lg`
    padding: 2.4rem;
  `}
`;

const MetaSection = styled.div`
  ${media.lg`
    display: flex;
  `}
`;

const OrderStatus = styled.div`
  align-items: center;
  background-color:  ${props => props.theme[props.color]};
  border-radius: 1.6rem;
  display: flex;
  justify-content: center;
  padding: .2rem 0;
  position: absolute;
  top: 2.4rem;
  right: 1.6rem;
  width: 10.4rem;

  > * {
    text-align: center;
  }

  ${media.md`
    padding: .6rem 0;
    right: 2.4rem;
    top: 2.4rem;
    width: 14rem;
  `}
`;

const OrderDate = styled.div`
  position: absolute;
  top: 2.4rem;
  right: 1.6rem;

  ${media.lg`
    top: 2.4rem;
    right: 2.4rem;
  `}
`;

const MinWidth = styled.div`
  ${media.lg`
    min-width: ${props => props.width}rem;
  `}
`;

const Li = styled.li`
  padding-top: .2rem;
`;

const OrderHeader = styled(Typography)`
  display: block;

  ${media.md`
    display: inline-block;
  `}
`;

const DistributerNameWrapper = styled.div`
  font-size: 1.6rem;
  margin-bottom: 0.8rem;

  ${media.md`
    display: inline-block;
    font-size: 1.8rem;
    padding-left: 1.6rem;
  `}
`;

const LargeMeta = styled(Typography)`
  font-size: 1.4rem;

  ${media.md`
    font-size: 1.6rem;
  `}
`;

const DupeLinkWrapper  = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const DupeLink = styled(Link)`
  font-size: 1.4rem;
  color: black;
`;

export function OrderCard(props) {
  const {
    orderId,
    invoiceId,
    groupId,
    customerEmail,
    createdAt,
    orderStatus,
    partnerId,
    productName,
    quantity,
    setDupeGroupId,
  } = props;

  function getJacketCountDescription(productName, quantity) {
    const plural = quantity > 1;

    const name = productName.toLowerCase().includes('wind breaker') ? formatStyleName(productName) : productName;

    return `${quantity} ${name}${plural ? 's' : ''}`;
  }

  return (
    <Li>
      <Order to={`/order/${groupId}`}>
        <Box classes="sides2 flats3 flats0Lg sides0Lg" color>
          <OrderHeader variant="h2">#{orderId}</OrderHeader>
          <DistributerNameWrapper>
            <LargeMeta variant="metaTitle" className="truncate">{partnerId || '--'}</LargeMeta>
          </DistributerNameWrapper>
          <Typography block variant="meta1">{getJacketCountDescription(productName, quantity)}</Typography>
          <MetaSection>
            <Box classes="top2">
              <MinWidth width="10">
                <Typography block variant="metaTitle">Invoice Number</Typography>
                <Typography block variant="meta1">{invoiceId || '--'}</Typography>
              </MinWidth>
            </Box>
            <Box classes="top2 left7Lg">
              <MinWidth width="12">
                <Typography block variant="metaTitle">Customer Email</Typography>
                <Typography block variant="meta1" className="truncate">{customerEmail || '--'}</Typography>
              </MinWidth>
            </Box>
            {orderStatus &&
              <Box classes="top2 left7Lg">
                <MinWidth width="12">
                  <Typography block variant="metaTitle">Last Updated</Typography>
                  <Typography variant="meta1">{formatDate(createdAt)}</Typography>
                </MinWidth>
              </Box>
            }
          </MetaSection>
          {orderStatus ?
           <>
              <OrderStatus color={getOrderStatusColor(orderStatus)}>
                <Typography variant="meta3">{STATUS_LITERALS[orderStatus]}</Typography>
              </OrderStatus>
           </>
            :
            <OrderDate>
              <Typography variant="metaTitle">{formatDate(createdAt)}</Typography>
            </OrderDate>
          }
          {
            orderStatus &&
            <DupeLinkWrapper>
              <DupeLink
                to={ROUTES.NEW_ORDER}
                onClick={() => setDupeGroupId(orderId)}
              >
                + Duplicate Design
              </DupeLink>
            </DupeLinkWrapper>
          }
        </Box>
      </Order>
    </Li>
  );
}

OrderCard.propTypes = {
  orderId: PropTypes.string,
  invoiceId: PropTypes.string,
  customerEmail: PropTypes.string,
  orderStatus: PropTypes.string,
  createdAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  productName: PropTypes.string,
  quantity: PropTypes.number,
};

const mapDispatchToProps = dispatch => ({
  setDupeGroupId: groupId => dispatch(setDupeGroupId(groupId)),
});

export default connect(null, mapDispatchToProps)(OrderCard);
