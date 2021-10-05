import {
  AccountError,
} from '@/store/types/actions';


export const toggleShowError = showError => (dispatch) => {
  dispatch({
    type: AccountError.TOGGLE_SHOW_ACCOUNTERROR,
    data: showError,
  });
};
