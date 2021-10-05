import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '@/utils/constants/constants';
import styled from 'styled-components/macro';
import { rhythm, formatCurrency } from '@/utils/helpers';
import { deleteOrder } from '@/store/actions/orders';
import media from '@/utils/media';
import { STATUS_ENUMS } from '@/utils/constants/constants';
import { Link } from 'react-router-dom';

import Toggler from '@/components/ui/Toggler';
import StandardModal from '@/components/ui/Modal/StandardModal';
import Container from '@/components/ui/Layout/Container';
import { Hr } from '@/components/ui/Utils';
import Typography from '@/components/ui/Typography/Typography';
import ShippingTimeline from '@/components/ui/ShippingTimeline/ShippingTimeline';
import Box from '@/components/ui/Layout/Box/Box';
import OrderDetailCheckoutModal from './OrderDetailCheckoutModal';
import { ModalConfirmButton, ModalCancelButton, HorizontalButtonContainer, PrimaryButton } from '@/components/ui/Buttons/Buttons';
import { toggleShowError } from '@/store/actions/accountError';

const ButtonText = styled.span`
  font-size: 1.6rem;
  font-weight: bold;

  ${media.md`
    width: 9.5rem;
  `}
`;

const OrderContentItem = styled.li`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & + & {
    padding-top: ${rhythm(1.5)};
  }
`;

const OrderTotal = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  margin: 0 auto;
  display: block;
`;

const UnitText = styled(Typography)`
  text-align: right;
`;

class OrderDetailSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeleted: false,
      onAfterClose: undefined,
    };
  }

  handleDelete(callback) {
    this.props.deleteOrder(this.props.groupId).then(() => {

      this.setState({
        isDeleted: true,
      });

      document.body.classList.remove('modalOpen');
    });
  }

  render() {
    const {
      unitPrice,
      quantity,
      subTotal,
      shippingCost,
      total,
      status,
      tax,
    } = this.props.order;

    const { isOpen, isSubmitted, groupId, hideTimeline, hideCheckout, hideHRule } = this.props;
    const { isDeleted } = this.state;

    if (isDeleted) {
      return <Redirect push to={`${ROUTES.ORDERS}`} />;
    }

    return (
    <>
      <ul>
        <OrderContentItem>
          <Typography variant="metaTitle">Unit Price</Typography>
          <UnitText variant="meta1">
            {formatCurrency(unitPrice)}
          </UnitText>
        </OrderContentItem>
        <OrderContentItem>
          <Typography variant="metaTitle">Total Items</Typography>
          <UnitText variant="meta1">
            {new Intl.NumberFormat('en-US').format(quantity || 0)}
          </UnitText>
        </OrderContentItem>
        <OrderContentItem>
          <Typography variant="metaTitle">Sub Total</Typography>
          <UnitText variant="meta1">
            {formatCurrency(subTotal)}
          </UnitText>
        </OrderContentItem>
        <OrderContentItem>
          <Typography variant="metaTitle">Shipping</Typography>
          <UnitText variant="meta1">
            {formatCurrency(shippingCost)}
          </UnitText>
        </OrderContentItem>
        {tax &&
          <OrderContentItem>
            <Typography variant="metaTitle">Tax</Typography>
            <UnitText variant="meta1">
              {formatCurrency(tax)}
            </UnitText>
          </OrderContentItem>
        }
      </ul>
      <Box classes="flats3">
        {!hideHRule &&
          <Hr />
        }
      </Box>
      <OrderTotal>
        <Typography block variant="meta1">Total</Typography>
        <Typography variant="h1">
          {formatCurrency(total)}
        </Typography>
      </OrderTotal>
      {!hideTimeline &&
        <Box classes="top3">
          <ShippingTimeline isOpen={isOpen} />
        </Box>
      }
      {!hideCheckout && STATUS_ENUMS['UNPAID'] === status &&
        <Box classes="top5">
          <Link to={`${ROUTES.ORDER}/${groupId}/checkout`}>
            <PrimaryButton fullMd>
              Checkout
            </PrimaryButton>
          </Link>
        </Box>
      }
      {!isSubmitted &&
        <>
          <Box classes="top5">
            <OrderDetailCheckoutModal
              disabled={!+quantity}
              groupId={groupId}
            />
          </Box>
          <Box classes="top3">
            <Toggler>
              {([toggled, onToggle]) => (
                <>
                <DeleteButton
                  onClick={() => onToggle(true)}
                >
                  <Typography variant="link">
                    Delete Order
                  </Typography>
                </DeleteButton>
                  <StandardModal
                    toggle={toggled}
                    onAfterClose={() => onToggle(false)}
                  >
                    <Container>
                      <Box classes="top3 top5Md bottom2">
                        <Typography variant="h1">
                          Delete Order?
                        </Typography>
                      </Box>
                      <div>
                        <Typography variant="body">
                          Are you sure you want to delete this order?
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body">
                          This action cannot be undone.
                        </Typography>
                      </div>
                      <Box classes="top4 bottom2 bottom4Md">
                        <HorizontalButtonContainer>
                          <ModalCancelButton onClick={() => onToggle(false)}>
                            <ButtonText>
                              Cancel
                            </ButtonText>
                          </ModalCancelButton>
                          <ModalConfirmButton onClick={() => {
                            this.handleDelete();
                          }}>
                            <ButtonText>
                              Delete
                            </ButtonText>
                          </ModalConfirmButton>
                        </HorizontalButtonContainer>
                      </Box>
                    </Container>
                  </StandardModal>
                </>
              )}
            </Toggler>
          </Box>
        </>
      }
    </>
    );
  }
}

// Object of action creators
const mapDispatchToProps = dispatch => ({
  deleteOrder: groupdId => dispatch(deleteOrder(groupdId)),
  toggleShowError: showError => dispatch(toggleShowError(showError)),
});

const mapStateToProps = state => ({
  accountError: state.selectedOrder && state.selectedOrder.order && state.selectedOrder.order.billingStatus === 'block',
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderDetailSummary));
