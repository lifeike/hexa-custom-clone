import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isSuperAdmin } from '@/utils/helpers';
import { savedOrders } from '@/store/selectors/orders';
import { formatDate } from '@/utils/helpers';

import Box from '@/components/ui/Layout/Box/Box';
import OrderCard from './OrderCard';
import OrdersEmptyState from './OrdersEmptyState';

export class SavedOrders extends Component {

  renderCard(order, key) {
    if (!order.styleNo || !this.props.styles.jackets[order.styleNo]) return null;

    return (
      <OrderCard
        key={key}
        orderId={order.purchaseNo}
        groupId={order.purchaseNo}
        invoiceId={order.invoiceNo}
        isSuperAdmin={isSuperAdmin(this.props.user)}
        partnerId={order.storeName}
        customerEmail={order.customerEmail}
        createdAt={formatDate(order.updateTime || order.createTime)}
        productName={this.props.styles.jackets[order.styleNo].name}
        quantity={order.sum}
      />
    );
  }

  render() {
    const { savedOrders, styles } = this.props;

    if (!styles || styles.jackets.length < 0 || styles.loading) return null;

    if (savedOrders && savedOrders.length < 0 ) {
      return (
        <OrdersEmptyState type="saved" />
      );
    }

    return (
      <Box classes="top3Md bottom5Md">
        <ul>
          {savedOrders && Object.values(savedOrders).map((order, i) => {
            return this.renderCard(order, i);
          })}
        </ul>
      </Box>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  savedOrders: savedOrders(state),
  user: state.account.user,
  styles: state.styles,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SavedOrders));
