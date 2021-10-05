import {
  Errors,
} from '@/store/types/actions';

export const resetError = () => (dispatch) => dispatch({
  type: Errors.RESET_ERROR,
});

export const applicationError = error => ({
  type: Errors.GENERAL_ERROR,
  message: error,
});
