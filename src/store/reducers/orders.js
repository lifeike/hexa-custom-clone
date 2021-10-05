import {
  FetchOrders,
  DeleteOrder,
  Account,
} from '@/store/types/actions';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FetchOrders.SUCCESS:
    return {
      ...state,
      ...action.data,
    };
  case DeleteOrder.SUCCESS: {
    const { [action.data]: value, ...updatedState } = state;

    return {
      ...updatedState,
    };
  }
  case Account.LOGIN_CHANGE:
    return {};
  default:
    return state;
  }
};
