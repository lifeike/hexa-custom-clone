import { getClient } from '@/services/ApiService/apiManager';
import { config } from '@/config/config';
import { defaultGroupInfo } from '@/store/normalizers/orders';
import axios from 'axios';
import { customizerConfiguration } from '@/utils/constants/lookups';
let alltoken = localStorage.getItem("token")?JSON.parse(localStorage.getItem("token"))['token']:''
const GroupClient = getClient({
  baseURL: config.endpoints.group,
//   headers:{
//     contentType: "application/json;charset=utf-8",
//     Authorization: "bearer "+ alltoken
//  }
});

const GroupClient_noInterceptors = getClient({
  baseURL: config.endpoints.group,
}, {
  useAuthHeaders: true,
  checkForDataErrors: false,
});

class GroupService {

  /**
   * Method to fetch all cart and order for a group.
   *
   * @param {string} groupId
   *    This is the group Id from createGroup. It is unclear how we get a list of groups.
   */
  async fetchCarts(groupId = 'G002') {
    return GroupClient_noInterceptors.get(groupId);
  }

  /**
   * Fetch a list of groups belonging to userId.
   * @param {string} userId
   *    The userId returned from account.user.
   */
  async fetchGroups(userId) {
    return GroupClient.get(`seller/${userId}`);
  }

  async fetchAllOrders(userId) {
    const groupPayload = await this.fetchGroups(userId);
    const groups = groupPayload.data.result;

    const groupOrders = {};


    groups.forEach(group => {
      groupOrders[group.purchaseNo] = group;
    });

    return groupOrders;
  }

  async fetchOrder(groupId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: {result: {carts, orders, group}, success} } = await GroupClient.get(`${groupId}`);

        let normalizedOrder = null;

        if (success) {
          // If there is an order, it is no longer editable as a cart.
          // Designs support one cart or order per group. Despite the api supporting more.
          if (orders && orders.length > 0) {
            const order = orders[0];

            const style = order.orderSubs[0].style_no;
            const config = customizerConfiguration[style];

            const shippingInfo = await this.fetchShippingInformation(groupId);

            normalizedOrder = {
              order: order,
              group: group,
              isOrder: true,
              groupId: groupId,
              shipping: shippingInfo,
              config: config,
            };
          }
          else if (carts && carts.length > 0) {
            const order = carts[0];

            const style = order.cartSubs[0].styleNo;
            const config = customizerConfiguration[style];

            // let's get billing information here.
            const billingStatus = await this.shouldBillMonthly(groupId);

            normalizedOrder = {
              order: order,
              group: group,
              isOrder: false,
              groupId: groupId,
              billingStatus: billingStatus,
              config: config,
            };
          }
        }
        else {
          return Promise.reject('Unable to query order');
        }

        return resolve(normalizedOrder);
      }
      catch(e) {
        return reject(e);
      }
    });
  }

  async createGroup(userId, storeId) {
    const defaultInfo = defaultGroupInfo(userId, storeId);
    const response = await GroupClient.post(config.endpoints.group, defaultInfo);

    return response.data.result;
  }

  async createOrder(order, userId, storeId) {
    const groupId = await this.createGroup(userId, storeId);

    const payload = await GroupClient.post(`${groupId}/carts`, order.order.order);

    const {data : {result: cartId}} = payload;

    return {
      cartId: cartId,
      groupId: groupId,
    };
  }

  async fetchShippingInformation(groupId) {
    const {data : {result: packages}} = await GroupClient.get(`express/${groupId}`);

    return packages;
  }

  async addCartSub(groupId, cartId, cartSub) {
    await GroupClient.post(`/${groupId}/carts/${cartId}/cartsub`, cartSub);

    return;
  }

  async updateOrder(groupId, order) {
    const {data: {result: updatedOrder}} = await GroupClient.put(`/${groupId}/carts/${order.cartNo}`,order);

    return {
      order: updatedOrder,
      isOrder: false,
      grouId: groupId,
    };
  }

  async saveCartSub(groupId, cartId, cartSub) {
    const {data: {result: updatedCartSub}} = await GroupClient.put(`/${groupId}/carts/${cartId}/cartsub/${cartSub.cartSubNo}`, cartSub);

    return {
      order: updatedCartSub,
      isOrder: false,
      grouId: groupId,
    };
  }

  async deleteCartSub(groupId, cartId, cartSubId) {
    await GroupClient.delete(`/${groupId}/carts/${cartId}/cartsub/${cartSubId}`);

    return;
  }

  async deleteOrder(groupId) {
    await GroupClient.delete(`/${groupId}`);

    return;
  }

  async updateGroup(groupId, group) {
    await GroupClient.put(`/${groupId}`, group);

    return;
  }

  async updateInvoice(groupId, invoice) {
    await GroupClient.put(`/${groupId}/invoiceInfo`, invoice);

    return;
  }

  async convertCartToOrder(groupId, cartId, shippingInfo) {
    let {
      data: {success, result, message},
    } = await GroupClient_noInterceptors.post(`/${groupId}/carts/${cartId}`, shippingInfo);

    if (!success) {
      if (!result) {
        result = [message];
      }

      return Promise.reject(result);
    }

    return result;
  }

  async checkout(groupId, orderId, userId, stripeToken) {
    return await GroupClient_noInterceptors.put(`/${groupId}/orders/${orderId}/checkout/`, {
      pay_user_id: userId,
      stripe_token: stripeToken,
    });
  }

  async updateCartSubs(groupId, cartId, cartSubs) {
    return axios.all(cartSubs.map(cartSub => {
      return GroupClient.put(`${groupId}/carts/${cartId}/cartsub/${cartSub.cartSubNo}`, cartSub);
    }));
  }

  async patchCartSub(groupId, cartId, cartSubId, cartSub) {
    const {data: {result: updatedCartSub}} = await GroupClient.patch(`/${groupId}/carts/${cartId}/cartsub/${cartSubId}`, cartSub);

    return {
      order: updatedCartSub,
      isOrder: false,
      grouId: groupId,
    };
  }

  async shouldBillMonthly(groupId) {
    try {
      const {data: {result: status}} = await GroupClient_noInterceptors.get(`${groupId}/paymentCheck`);

      return status;
    }
    catch {
      return false;
    }
  }

}

export default GroupService;
