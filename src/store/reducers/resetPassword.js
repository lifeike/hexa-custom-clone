import {
  ResetPassword,
} from '@/store/types/actions';

const INITIAL_STATE = {
  sendResetPasswordSuccess: false,
  resetPasswordLoading: false,
  resetPasswordSuccess: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ResetPassword.SEND_RESET_PASSWORD_SUCCESS:
    return {
      ...state,
      ...action.data,
    };
  case ResetPassword.SEND_RESET_PASSWORD_RESET:
    return {
      ...state,
      sendResetPasswordSuccess: false,
    };
  case ResetPassword.RESET_PASSWORD_SUCCESS:
    return {
      ...state,
      ...action.data,
    };
  default:
    return state;
  }
};
