import { Checkout } from '@/store/types/actions';

const INITIAL_STATE = {
  shippingInfo: {},
  paymentInfo: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Checkout.ADD_SHIPPING_INFO:
    return {
      ...state,
      shippingInfo: action.data,
    };
  case Checkout.ADD_PAYMENT_INFO:
    return {
      ...state,
      paymentInfo: action.data,
    };
  case Checkout.ERROR:
    return {
      ...state,
      checkoutFailed: true,
      failure: action.data,
    };
  case Checkout.CLEAR:
    return {
      ...state,
      checkoutFailed: false,
      failure: null,
    };
  case Checkout.REMOVE_PAYMENT:
    return {
      ...state,
      paymentInfo: {},
    };
  default:
    return state;
  }
};
