// import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

/**
 * Calculates the quantity of jackets in a cart/saved order.
 */
export const getCartQuantity = createCachedSelector(
  // inputSelectors
  [order => order],
  (order) => {

    const quantity = Object.values(order.cartSubs).reduce((total, cartSub) => {
      return total + cartSub.quantity;
    }, 0);

    return quantity;
  }
)(
  // Cachekey
  (order) => order.cartNo
);

/**
 * Calculates the numbers of jackets on an order/submitted order.
 */
export const getOrderQuantity = createCachedSelector(
  // inputSelectors
  [order => order],
  (order) => {
    const quantity = Object.values(order.orderSubs).reduce((total, orderSub) => {
      return total + orderSub.num;
    }, 0);

    return quantity;
  }
)(
  // Cachekey
  (order) => `${order.order_no}_quantity`
);

/**
 * Calculates total shipping cost for the order.
 * a Flat &7.5 per unit
 */
export const getShippingCost = quantity => {
  return quantity * 7.5;
};

// Putting these here because I think we'll need to reuse later.
const getOrderSubQuantity = (sub, isOrder) => isOrder ? sub.num : sub.quantity;
const getOrderSubTotal = (order, isOrder) => isOrder ? order.order_basic_price : order.sumPrice;
const getOrderTax = (order, isOrder) => isOrder ? order.sell_tax.toString() : '';
const getOrderTotal = (order, isOrder) => isOrder ? order.order_price : order.sumPrice;

export const getUnitPrice = (order, isOrder) => isOrder ? order.orderSubs[0].price : order.cartSubs[0].sumBasePrice;
const getOrderStyleName = (order, isOrder) => isOrder ? order.orderSubs[0].style : order.cartSubs[0].styleName;
const getCreatedDate = (order, isOrder) => isOrder ? order.order_time : order.createTime;
const getStatus = (order, isOrder) => isOrder ? order.status : '';
const getUpdateTime = order => {
  if (!order.group) {
    return getCreatedDate(order.order, order.isOrder);
  }

  return order.group.updateTime;
};

/**
 * Calculates summary items, could be an order or a cart. Cart and order shape differ.
 */
export const getSummary = createCachedSelector(
  // inputSelectors
  [order => order],
  (order) => {
    const summary = {};

    if (!order) return {};

    const subLiteral = order.isOrder ? 'orderSub': 'cartSub';

    summary.orderId = order.groupId;
    summary.unitPrice = getUnitPrice(order.order, order.isOrder);
    summary.quantity = Object.values(order.order[`${subLiteral}s`]).reduce((total, sub) => {
      return total + getOrderSubQuantity(sub, order.isOrder);
    }, 0);
    summary.styleName = `${getOrderStyleName(order.order, order.isOrder)}${summary.quantity > 1 ? 's': ''}`;
    summary.subTotal = getOrderSubTotal(order.order, order.isOrder);
    summary.shippingCost = getShippingCost(summary.quantity);
    summary.tax = getOrderTax(order.order, order.isOrder);
    summary.total = Number.parseFloat(getOrderTotal(order.order, order.isOrder)) + (order.isOrder ? 0 : summary.shippingCost);
    summary.createdDate = getCreatedDate(order.order,order.isOrder);
    summary.updateTime = getUpdateTime(order);
    // summary.totalWithShipping = parseInt(summary.total) + summary.shippingCost;
    summary.status = getStatus(order.order,order.isOrder);
    summary.isOrder = order.isOrder;

    return summary;
  }
)(
  // Cachekey
  (order) => order ? `${order.groupId || ''}_summary`: 'blank_summary'
);

/**
 * Selector to provide shipping information for the detail page.
 */
export const getShippingInformation = createCachedSelector(
  // inputSelectors
  [order => order],
  (order) => {
    const shipping = {
      name: '',
      company: '',
      address: '',
      cityStateZip: '',
      packages: [
      ],
    };

    if (order) {
      // Shipping Company not available in API.
      shipping.name = order.order.shipping_name;
      shipping.address = order.order.shipping_address;
      shipping.cityStateZip = `${order.order.shipping_city}, ${order.order.shipping_state_code} ${order.order.shipping_zip}`;

      if  (order.shipping) {
        const packageMap = {};

        order.shipping.forEach(shipment => {
          packageMap[shipment.express_tracking_number] = {
            id: shipment.express_tracking_number,
            num: shipment.num,
            shippedDate: shipment.shipping_time,
            shippingCompany: shipment.express_name,
          };
        });

        shipping.packages = Object.values(packageMap);

      }
    }

    return shipping;
  }
)(
  // Cachekey
  (order) => order ? `${order.groupId || ''}_shipping`: 'blank_shipping'
);
