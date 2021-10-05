import { createSelector } from 'reselect';
// import createCachedSelector from 're-reselect';
import { ROLES } from '@/utils/constants/constants';

const ordersSelector = state => state.orders;
const userSelector = state => state.account.user;

// TODO: Figure out how this is supported.
/**
 * Get's orders that belong to user.
 */
export const ordersByUser = createSelector(
  [ordersSelector, userSelector],
  (orders, user) => {
    // Return all orders for super admin.
    if (user && user.roles && user.roles.includes(ROLES.SUPER_ADMIN)) {
      return orders;
    }

    return Object.values(orders).filter(order => order.isOwned);
  }
);

/**
 * Returns all carts, otherwise called orders that have not gone through checkout.
 */
export const savedOrders = createSelector(
  [ordersSelector],
  (orders) => {
    return Object.values(orders).filter(order => order.isTransOrder === '0').sort((a, b) => a.updateTime > b.updateTime ? -1 : 1);
  }
);

/**
 * return's all orders; order's that have been through checkout.
 */
export const submittedOrders = createSelector(
  [ordersSelector],
  (orders) => {
    return Object.values(orders).filter(order => (order.isTransOrder === '1' && order.status !== '900')).sort((a, b) => a.updateTime > b.updateTime ? -1 : 1);
  }
);

/**
 * return's all orders; order's that have been through checkout.
 */
export const completedOrders = createSelector(
  [ordersSelector],
  (orders) => {
    return Object.values(orders).filter(order => (order.isTransOrder === '1' && order.status === '900')).sort((a, b) => a.updateTime > b.updateTime ? -1 : 1);
  }
);
