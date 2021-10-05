import {
  FetchOrders,
  FetchOrder,
  CreateOrder,
  DeleteOrder,
  Checkout,
  DupeDesign,
} from '@/store/types/actions';
import { applicationError } from '@/store/actions/error';
import { loading } from '@/store/actions/loading';
import { STATES } from '@/utils/constants/states';
import { isMale } from '@/utils/selectedOptionsHelper';
import { CHECKOUT_ERRORS } from '@/utils/constants/constants';
import { StyleNames, customizerConfiguration } from '@/utils/constants/lookups';
import { createNewOrder } from '@/store/normalizers/orders';
import { windbreakerStyleNames } from '../../utils/constants/lookups';

export const fetchOrdersSuccess = data => ({
  type: FetchOrders.SUCCESS,
  data: data,
});

export const fetchOrdersFailure = data => ({
  type: FetchOrders.ERROR,
  data: data,
});

export const createOrderSuccess = data => ({
  type: CreateOrder.SUCCESS,
  data: data,
});

export const createOrderFailure = data => ({
  type: CreateOrder.ERROR,
  data: data,
});

export const fetchOrders = (userId) => async (dispatch, getState, { GroupService }) => {
  dispatch(loading('fetchOrders', true));
  try {
    if (!userId) {
      userId = getState().account.user.id;
    }
    const orders = await GroupService.fetchAllOrders(userId);

    dispatch(fetchOrdersSuccess(orders));
  }
  catch(e) {
    dispatch(fetchOrdersFailure(e));
  }
  dispatch(loading('fetchOrders', false));
};

export const createOrder = (order, userId, storeId, maleImage, femaleImage) => async (dispatch, getState, { GroupService }) => {
  dispatch(loading('createOrder', true));
  try {

    order.order.order.cartSubs[0].selectionImg = isMale ? maleImage : femaleImage;
    const payload = await GroupService.createOrder(order, userId, storeId);

    dispatch(createOrderSuccess(payload));
  }
  catch(e) {
    dispatch(applicationError('Error creating order'));
  }

  dispatch(loading('createOrder', false));
};

export const resetNewOrder = () => (dispatch, getState) => {
  dispatch({
    'type': CreateOrder.RESET_NEW_ORDER,
  });
};

export const clearOrder = () => async (dispatch, getState, { GroupService }) => {
  dispatch({
    'type': FetchOrder.SUCCESS,
    'data': null,
  });
};

export const fetchOrder = (groupId) => async (dispatch, getState, { GroupService }) => {
  dispatch(loading('fetchOrder', true));
  dispatch({
    'type': FetchOrder.SUCCESS,
    'data': null,
  });

  try {
    const order = await GroupService.fetchOrder(groupId);

    dispatch({
      'type': FetchOrder.SUCCESS,
      'data': order,
    });
  }
  finally {
    dispatch(loading('fetchOrder', false));
  }
};

/**
 * Get's a list of all operations. Protects against circlular references.
 */
const _getAllOperations = (operations, featureId) => {
  const allOperations = [];
  const localOperations = [];

  let next = featureId;

  while (next) {
    const operation = operations[next];

    if (operation && !localOperations.includes(next)) {
      allOperations.push(operation);
      localOperations.push(next);

      next = operation.item_effect;
    }
    else {
      next = null;
    }
  }

  return allOperations;
};

const _performOperation = (operation, cartSub, option) => {
  //Operation 3 is copy. Not sure the other values.
  if (operation && operation.operation === '3') {
    const foundIndex = cartSub.cartSubDetail.findIndex((item => item.itemNo === operation.item_effect));

    if (foundIndex >= 0) {
      const newSubDetail = cartSub.cartSubDetail[foundIndex];

      newSubDetail.optionNo = option;
      cartSub.cartSubDetail[foundIndex] = {...newSubDetail};
    }
  }
};

export const updateOptionNumber = (featureId, option, isWindbreaker, optionName) => async (dispatch, getState) => {
  dispatch(loading('updateOptionNumber', true));

  try {
    const order = getState().selectedOrder.order;

    //If this is a performance issues, we can defer to later since we only use the first cart sub.
    order.order.cartSubs.forEach(cartSub => {
      cartSub.cartSubDetail.find(feature => feature.itemNo === featureId).optionNo = option;

      if (isWindbreaker && featureId === 'I005') {
        cartSub.cartSubDetail.find(feature => feature.itemNo === featureId).optionName = optionName;
      }

      const operations = _getAllOperations(getState().styles.jackets[cartSub.styleNo].operations, featureId);

      operations.forEach(operation => {
        _performOperation(operation, cartSub, option);
      });

      const additionalOperations = order.config.additionalOperations[featureId];

      if (additionalOperations) {
        additionalOperations.forEach(operation => {
          _performOperation(operation, cartSub, option);
        });
      }
    });

    dispatch({
      'type': FetchOrder.SUCCESS,
      'data': Object.assign({}, order),
    });
  }
  finally {
    dispatch(loading('updateOptionNumber', false));
  }
};

export const updateOptions = (featuresIds, updatedOption) => async (dispatch, getState) => {

  dispatch(loading('updateOptions', true));

  try {
    const order = getState().selectedOrder.order;

    featuresIds.forEach(feature => {
      _updateOption(order, feature, updatedOption);
    });

    dispatch({
      'type': FetchOrder.SUCCESS,
      'data': Object.assign({}, order),
    });
  }
  finally {
    dispatch(loading('updateOptions', false));
  }
};

export const updateOption = (featureId, option) => async (dispatch, getState) => {
  dispatch(loading('updateOption', true));

  try {
    const order = getState().selectedOrder.order;

    _updateOption(order, featureId, option);

    dispatch({
      'type': FetchOrder.SUCCESS,
      'data': Object.assign({}, order),
    });
  }
  finally {
    dispatch(loading('updateOption', false));
  }
};

const _updateOption = (order, featureId, option) => {
  order.order.cartSubs.forEach(cartSub => {
    const detail = cartSub.cartSubDetail.findIndex(feature => feature.itemNo === featureId);

    cartSub.cartSubDetail[detail] = {...cartSub.cartSubDetail[detail], ...option};
  });
};

const getStore = (order, store, getState) => {
  if (order && order.store) {
    return order.store.storeNo;
  }
  else if (store) {
    return store;
  }
  else {
    return getState().user.storeNo;
  }
};

export const saveOrder = (groupId, order, store, maleImage, femaleImage) => async (dispatch, getState, { GroupService }) => {
  dispatch(loading('saveOrder', true));

  const updateOrder = {
    ...order.order,
    store: null,
    cartSubs: [{
      ...order.order.cartSubs[0],
      cartSubDetail: [...order.order.cartSubs[0].cartSubDetail],
    }],
  };

  updateOrder.cartSubs[0].selectionImgFemale = femaleImage;
  updateOrder.cartSubs[0].selectionImgMale = maleImage;

  delete updateOrder.cartSubs[0].selectionImg;

  updateOrder.storeNo = getStore(order.order, store, getState);
  updateOrder.isPublic = 1;
  updateOrder.isTop = 1;

  const styleNames = updateOrder.cartSubs[0].styleNo === 'STY802' ? windbreakerStyleNames : StyleNames;

  // Only send over options that are global across all subCarts.
  updateOrder.cartSubs[0].cartSubDetail = updateOrder.cartSubs[0].cartSubDetail.filter(item => {
    return styleNames[item.itemNo] || getState().styles.jackets[updateOrder.cartSubs[0].styleNo].operationAffected.includes(item.itemNo) || order.config.additionalOperationsAffected.includes(item.itemNo);
  });

  try {
    await GroupService.updateOrder(groupId, {...updateOrder, cartSubs: [updateOrder.cartSubs[0]]});
    dispatch(fetchOrder(groupId));
  }
  finally {
    dispatch(loading('saveOrder', false));
  }
};

export const addSize = (options, image) => async (dispatch, getState, { GroupService }) => {
  const {
    selectedOrder: {
      order: {
        groupId,
        order: {
          userId: cartUserId,
          cartNo: cartId,
          cartSubs,
          store: {
            storeNo,
          },
        },
      },
    },
  } = getState();

  // Making sure that the size hasn't been added before.
  let canUpdate = cartSubs.every(cartSub => {
    return Object.keys(options).find(optionKey => {
      const option = cartSub.cartSubDetail.find((item => item.itemNo === optionKey));

      return option.optionNo !== options[optionKey];
    });
  });

  if (!canUpdate || !image) {
    return Promise.reject();
  }

  dispatch(loading('addSize', true));

  try {
    const newCartSub = cartSubs[0];

    Object.keys(options).forEach(optionKey => {
      const option = newCartSub.cartSubDetail.find((item => item.itemNo === optionKey));

      option.optionNo = options[optionKey];
      const operations = _getAllOperations(getState().styles.jackets[newCartSub.styleNo].operations, optionKey);

      operations.forEach(operation => {
        _performOperation(operation, newCartSub, options[optionKey]);
      });
    });

    newCartSub.quantity = 1;
    newCartSub.selectionImg = image;

    const request = {
      cartUserId: cartUserId,
      storeNo: storeNo,
      cartSubs: [
        newCartSub,
      ],
    };

    await GroupService.addCartSub(groupId, cartId, request);
    dispatch(fetchOrder(groupId));
  }
  finally {
    dispatch(loading('addSize', false));
  }
};

export const saveCartSub = (groupId, cartId, cartSub, maleImage, femaleImage) => async (dispatch, getState, { GroupService }) => {
  dispatch(loading('saveCartSub', true));

  try {
    cartSub.selectionImg = isMale(cartSub.cartSubDetail) ? maleImage : femaleImage;

    await GroupService.saveCartSub(groupId, cartId, cartSub);

    dispatch(fetchOrder(groupId));
  }
  finally {
    dispatch(loading('saveCartSub', false));
  }
};

export const updateQuantity = (groupId, cartId, cartSubId, quantity) => async (dispatch, getState, { GroupService }) => {
  dispatch(loading('updateQuantity', true));

  try {
    await GroupService.patchCartSub(groupId, cartId, cartSubId, {
      quantity: quantity,
    });

    dispatch(fetchOrder(groupId));
  }
  finally {
    dispatch(loading('updateQuantity', false));
  }
};

export const deleteCartSub = (groupId, cartId, cartSubId) => async (dispatch, getState, { GroupService }) => {
  dispatch(loading('deleteCartSub', true));

  try {
    await GroupService.deleteCartSub(groupId, cartId, cartSubId);

    dispatch(fetchOrder(groupId));
  }
  finally {
    dispatch(loading('deleteCartSub', false));
  }
};

export const deleteOrder = groupId => async (dispatch, getState, { GroupService }) => {
  dispatch(loading('deleteOrder', true));

  try {
    await GroupService.deleteOrder(groupId);

    // Need to remove from list without reloading entire list.
    dispatch({
      'type': DeleteOrder.SUCCESS,
      'data': groupId,
    });
  }
  finally {
    dispatch(loading('deleteOrder', false));
  }
};

export const updateShipping = (groupId, data) => async (dispatch, getState, { GroupService }) => {
  dispatch(loading('addShipping', true));

  // What to do with email.
  const shippingInfo = {
    defaultShippingAddress: data.address,
    defaultShippingCity: data.city,
    defaultShippingName: `${data.firstName} ${data.lastName}`,
    defaultShippingPhone: data.phone,
    defaultShippingStateCode: STATES[data.state],
    defaultShippingZip: data.postalCode,
    status: '000',
  };

  try {
    await GroupService.updateGroup(groupId, shippingInfo);
  }
  finally {
    dispatch(loading('addShipping', false));
  }
};

export const convertToOrder = shippingCost => async (dispatch, getState, { GroupService }) => {
  dispatch({
    type: Checkout.CLEAR,
  });

  const {
    checkout: {
      shippingInfo,
    },
    selectedOrder: {
      order: {
        order: {
          userId,
          cartNo: cartId,
        },
        groupId,
      },
    },
  } = getState();

  const request = {
    is_default_address: 1,
    shippingAddress: shippingInfo.address,
    shippingCity: shippingInfo.city,
    shippingName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
    shippingPhone: shippingInfo.phone,
    shippingStateCode: STATES[shippingInfo.state],
    shippingZip: shippingInfo.postalCode,
    shippingPrice: shippingCost,
    user_id: userId,
  };

  let orderId = null;

  try {
    orderId = await GroupService.convertCartToOrder(groupId, cartId, request);
  }
  catch(errors) {
    if (errors && errors.length > 0 && errors[0]['storage_num']) {
      const lowInventoryItems = errors.map(checks => {
        return checks['color_name'] || '';
      });

      dispatch({
        type: Checkout.ERROR,
        data: {
          type: CHECKOUT_ERRORS.INVENTORY,
          lowInventoryItems: lowInventoryItems,
        },
      });
    }
    else if (errors && errors.length > 0 && (errors[0].includes('zip') || errors[0].includes('state') || errors[0].includes('postal'))){
      dispatch({
        type: Checkout.ERROR,
        data: {
          type: CHECKOUT_ERRORS.SHIPPING,
        },
      });
    }
    else {
      dispatch({
        type: Checkout.ERROR,
        data: {
          type: CHECKOUT_ERRORS.CONVERTCART,
        },
      });
    }

    return Promise.reject();
  }

  if (orderId) {
    await dispatch(checkout(orderId));
  }
};


export const checkout = orderId => async (dispatch, getState, { GroupService }) => {
  dispatch({
    type: Checkout.CLEAR,
  });

  const {
    checkout: {
      paymentInfo: {
        token: stripeToken,
      },
    },
    selectedOrder: {
      order: {
        order: {
          userId,
          user_id,
        },
        billingStatus,
        groupId,
      },
    },
  } = getState();

  let stripeTokenId = '';

  if (stripeToken) {
    stripeTokenId = stripeToken.id;
  }

  // api requirement for billing monthly.
  if (billingStatus === 'true') {
    stripeTokenId = '@/storeLimit';
  }

  try {
    const payload = await GroupService.checkout(groupId, orderId, userId || user_id, stripeTokenId);

    const { data: {success} } = payload;

    if (!success) {
      throw CHECKOUT_ERRORS.PAYMENT;
    }
  }
  catch(e) {
    dispatch({
      type: Checkout.ERROR,
      data: {
        type: CHECKOUT_ERRORS.PAYMENT,
      },
    });

    throw CHECKOUT_ERRORS.PAYMENT;
  }
  finally {
    dispatch({
      type: Checkout.REMOVE_PAYMENT,
    });
  }
};


export const applyNewOrderToSelected = (product, userId, storeId, duplicateSource) => async (dispatch) => {
  const order = {};

  order.order = createNewOrder(product, userId, storeId, duplicateSource);
  order.isOrder = false;
  order.config = customizerConfiguration[product.style_no];

  await dispatch({
    'type': FetchOrder.SUCCESS,
    'data':order,
  });
};

export const setDupeGroupId = groupId => dispatch => {
  dispatch(loading('DUPE_DESIGN', true));
  dispatch({type: DupeDesign.SET_DUPE, data: groupId});
};

export const resetDupeGroupId = () => dispatch => {
  dispatch({ type: DupeDesign.RESET_DUPE, data: null });
  dispatch(loading('DUPE_DESIGN', false));
};
