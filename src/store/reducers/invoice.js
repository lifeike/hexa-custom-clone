import { Invoice } from '@/store/types/actions';

const INITIAL_STATE = {
  invoiceInfo: {
    customerEmail: '',
    invoiceNo: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Invoice.UPDATE_INVOICE_INFO:
    return {
      ...state,
      invoiceInfo: Object.assign({}, state.invoiceInfo, { ...action.data }),
    };
  default:
    return state;
  }
};
