import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sticky from 'react-sticky-fill';
import styled from 'styled-components/macro';
import media from '@/utils/media';
import { rhythm } from '@/utils/helpers';
import { updateInvoiceInfo } from '@/store/actions/invoice';
import { fetchOrder } from '@/store/actions/orders';
import { getSummary } from '@/store/selectors/order';
import { getSubOrders } from '@/store/selectors/subOrder';

import { HideMobile, ShowMobile, StickyTop } from '@/components/ui/Utils';
import OrderDetailHeader from '@/components/ui/OrderDetail/OrderDetailHeader';
import OrderDetailItems from '@/components/ui/OrderDetail/OrderDetailItems';
import OrderDetailSummary from '@/components/ui/OrderDetail/OrderDetailSummary';
import OrderDetailShipping from '@/components/ui/OrderDetail/OrderDetailShipping';
// import OrderDetailPayment from '@/components/ui/OrderDetail/OrderDetailPayment';
import Container from '@/components/ui/Layout/Container';
import Accordion from '@/components/ui/Accordion/Accordion';
import CustomizerCarousel from '@/components/ui/Carousel/CustomizerCarousel';
import StandardModal from '@/components/ui/Modal/StandardModal';

import { getColorsOutOfInventory } from '@/store/selectors/subOrder';
import { InventoryAlert } from '@/components/ui/Inventory/InventoryAlert';
import { resetDupeGroupId } from '../../store/actions/orders';

const OrderDetailWrapper = styled.div`
  background-color: ${props => props.theme.color_grey_1};
  flex-grow: 1;
`;

const OrderDetailMain = styled.div`
  position: relative;
  padding: ${rhythm(2)} 0;

  ${media.md`
    flex-direction: row;
    display: flex;
  `}
`;

const OrderDetailCenter = styled.div`
  position: relative;

  ${media.md`
    flex: 2;
    padding-right: ${rhythm(2)};
  `}
`;

const OrderDetailSide = styled.div`
  position: relative;

  ${media.md`
    flex: 1;
  `}
`;

const OrderSummaryAccordions = styled.div`
  > * + * {
    padding-top: .2rem;
  }
`;

const CarouselWrapper = styled.div`
  background-color: ${props => props.theme.color_grey_1};
  overflow: hidden;

  ${media.md`
    background-color: ${props => props.theme.color_white};
  `}
`;

export class OrderDetail extends Component {

  constructor() {
    super();
    this.state = {
      hideInventoryAlert: false,
    };
  }

  componentDidMount() {
    const groupId = this.props.match.params.groupId;

    this.props.fetchOrder(groupId);
  }

  onInventoryClick(e) {
    e.preventDefault();
    this.setState({
      forceShowInventory: true,
    });
  }

  goBack() {
    this.props.history.push('/orders');
  }

  disableInventoryModal() {
    sessionStorage.setItem(`${this.props.match.params.groupId}_hideInventoryAlert`, true);
    this.setState({
      forceShowInventory: false,
    });
  }

  render() {
    const {
      order,
      summary,
      updateInvoiceInfo,
      subOrders,
      inventoryIssues,
      dupeGroupId,
      resetDupeDesign,
    } = this.props;

    if (!order) {
      return null;
    }

    if( dupeGroupId ) {
      resetDupeDesign();
    }

    const { invoiceNo, customerEmail } = order.group;

    let storeName = '';

    if (order.order && order.order.store) {
      storeName  = order.order.store.storeName;
    }
    else {
      storeName = order.order.purchased_at;
    }

    const isSubmitted = order.isOrder;
    const groupId = this.props.match.params.groupId;

    const hideInventoryAlert = isSubmitted || (!!sessionStorage.getItem(`${groupId}_hideInventoryAlert`) && !this.state.forceShowInventory);

    const summaryAccordions = (
      <OrderSummaryAccordions>
        <Accordion title="Order Summary">
          <OrderDetailSummary
            isSubmitted={isSubmitted}
            order={summary}
            groupId={groupId}
          />
        </Accordion>
        {isSubmitted &&
          <>
            <Accordion title="Shipping">
              <OrderDetailShipping order={order}/>
            </Accordion>
          </>
        }
      </OrderSummaryAccordions>
    );

    return (
      <OrderDetailWrapper>
        <OrderDetailHeader
          summary={summary}
          isSubmitted={isSubmitted}
          updateInvoiceInfo={updateInvoiceInfo}
          invoiceNo={invoiceNo}
          customerEmail={customerEmail}
          distributorName={storeName}
          groupId={groupId}
          goBack={() => this.goBack()}
          showInventoryIcon={inventoryIssues && inventoryIssues.length > 0}
          onInventoryClick={(e) => this.onInventoryClick(e)}
        />
        <Container md>
          <OrderDetailMain>
            <OrderDetailCenter>
              <CarouselWrapper>
                <CustomizerCarousel
                  groupId={groupId}
                  isSubmitted={isSubmitted}
                  showButton={true}
                />
              </CarouselWrapper>
              <ShowMobile>
                {summaryAccordions}
              </ShowMobile>
              <OrderDetailItems
                subOrders={subOrders}
                isSubmitted={isSubmitted}
                order={order}
              />
            </OrderDetailCenter>
            <OrderDetailSide>
              <Sticky>
                <StickyTop>
                  <HideMobile>
                    {summaryAccordions}
                  </HideMobile>
                </StickyTop>
              </Sticky>
            </OrderDetailSide>
          </OrderDetailMain>
          {!hideInventoryAlert && inventoryIssues && inventoryIssues.length > 0 &&
            <StandardModal
              toggle={true}
              onAfterClose={() => this.disableInventoryModal()}
            >
              <InventoryAlert listItems={inventoryIssues}></InventoryAlert>
            </StandardModal>
          }
        </Container>
      </OrderDetailWrapper>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    order: state.selectedOrder.order,
    summary: getSummary(state.selectedOrder.order),
    subOrders: getSubOrders(state),
    inventoryIssues: getColorsOutOfInventory(state),
    dupeGroupId: state.dupeDesign.groupId,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchOrder: (groupId) => dispatch(fetchOrder(groupId)),
  updateInvoiceInfo: (groupId, data) => dispatch(updateInvoiceInfo(groupId, data)),
  resetDupeDesign: () => dispatch(resetDupeGroupId()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
