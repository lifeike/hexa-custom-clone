import {
  CreateOrder,
} from '@/store/types/actions';

const initialState = {
  saveOrderSuccess: null,
  savedOrder: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case CreateOrder.RESET_NEW_ORDER:
    return {
      ...state,
      saveOrderSuccess: null,
      savedOrder: null,
    };
  case CreateOrder.SUCCESS:
    return {
      ...state,
      saveOrderSuccess: true,
      savedOrder: action.data,
    };
  default:
    return state;
  }
};
