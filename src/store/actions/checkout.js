import { Checkout } from '@/store/types/actions';

export const changeShippingInfo = data => {
  return {
    type: Checkout.ADD_SHIPPING_INFO,
    data: data,
  };
};

export const changePaymentInfo = data => {
  return {
    type: Checkout.ADD_PAYMENT_INFO,
    data: data,
  };
};

export const addShippingInfo = (data) => async (dispatch) => {
  return dispatch(changeShippingInfo(data));
};

export const addPaymentInfo = (data) => async (dispatch) => {
  return dispatch(changePaymentInfo(data));
};
