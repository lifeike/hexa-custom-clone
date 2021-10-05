import {
  FetchOrder,
  Invoice,
  CreateOrder,
} from '@/store/types/actions';

const initialState = {
  order: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FetchOrder.SUCCESS:
    return {
      ...state,
      order: action.data,
    };
  case CreateOrder.SUCCESS:
    return {
      order: null,
    };
  case Invoice.UPDATE_INVOICE_INFO: {
    return {
      order: {
        ...state.order,
        ...{
          group: {
            customerEmail: action.data.customerEmail,
            invoiceNo: action.data.invoiceNo,
          },
        },
      },
    };
  }
  default:
    return state;
  }
};
