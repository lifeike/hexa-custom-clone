import { Invoice } from '@/store/types/actions';
import { loading } from '@/store/actions/loading';

export const updateInvoiceSuccess = data => {
  return {
    type: Invoice.UPDATE_INVOICE_INFO,
    data: data,
  };
};

export const updateInvoiceInfo = (groupId, data) => async (dispatch, getState, { GroupService }) => {
  dispatch(loading('updateInvoiceInfo', true));

  try {
    await GroupService.updateInvoice(groupId, data);
  }
  finally {
    dispatch(updateInvoiceSuccess(data));
    dispatch(loading('updateInvoiceInfo', false));
  }
};
