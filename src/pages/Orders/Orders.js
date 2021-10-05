import React, { Component } from 'react';
import styled from 'styled-components/macro';
import { connect } from 'react-redux';
import { ROUTES } from '@/utils/constants/constants';
import { FullHeight } from '@/utils/styled';
import { fetchOrders, clearOrder } from '@/store/actions/orders';
import { loading } from '@/store/actions/loading';
import { submittedOrders, completedOrders } from '@/store/selectors/orders';

import TabList from '@/components/ui/Tabs/TabList';
import Container from '@/components/ui/Layout/Container';
import SubmittedOrders from '@/components/ui/Orders/SubmittedOrders';
import SavedOrders from '@/components/ui/Orders/SavedOrders';
import Typography from '@/components/ui/Typography/Typography';
import Box from '@/components/ui/Layout/Box/Box';
import { NewOrdersLink } from '@/components/ui/Buttons/Buttons';

const OrdersTier = styled.div`
  ${FullHeight()}

  background-color: ${props => props.theme.color_grey_1};
`;

const OrdersHeaderWrapper = styled.div`
  padding-top: 4rem;
  background-color: ${props => props.theme.color_white};
`;

const OrdersHeader = styled.div`
  position: relative;
`;

const NewOrdersLinkWrapper = styled(NewOrdersLink)`
  position: absolute;
  right: 0;
  top: -.6rem;
`;

const tabs = {
  saved: 'Saved',
  submitted: 'Submitted',
  completed: 'Completed',
};

const TAB_STORAGE_KEY = 'HEXA_ORDERS_TAB';

class Orders extends Component {
  componentDidMount() {
    this.props.clearOrder();
    this.props.fetchOrders();
  }

  /**
   * getSavedTab - Returns sessionStorage saved tab or a default tab
   */
  getSavedTab() {
    // Return what's in sessionStorage or the default tab
    return window.sessionStorage.getItem(TAB_STORAGE_KEY) || tabs.saved;
  }

  /**
   * setSavedTab - Sets a string tab name to session storage
   * @param {string} tab - Tab name to save
   */
  setSavedTab(tab) {
    window.sessionStorage.setItem(TAB_STORAGE_KEY, tab);
  }

  render() {
    const { submittedOrders, completedOrders } = this.props;

    return (
      <OrdersTier>
        <OrdersHeaderWrapper>
          <Container>
            <OrdersHeader>
              <Box classes="bottom5 top1Md bottom7Md">
                <Typography variant="h1">My Orders</Typography>
              </Box>
              <NewOrdersLinkWrapper to={ROUTES.NEW_ORDER}>
                <span>+ New Order</span>
                <span>+ New</span>
              </NewOrdersLinkWrapper>
            </OrdersHeader>
          </Container>
        </OrdersHeaderWrapper>
        <TabList
          activeTab={this.getSavedTab()}
          tabCallback={this.setSavedTab}>
          <div label={tabs.saved}>
            <SavedOrders/>
          </div>
          <div label={tabs.submitted}>
            <SubmittedOrders orders={submittedOrders} />
          </div>
          <div label={tabs.completed}>
            <SubmittedOrders orders={completedOrders} />
          </div>
        </TabList>
      </OrdersTier>
    );
  }
}

const mapStateToProps = state => ({
  submittedOrders: submittedOrders(state),
  completedOrders: completedOrders(state),
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrders()),
  clearOrder: () => dispatch(clearOrder()),
  loading: (source, isLoading) => dispatch(loading(source, isLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
