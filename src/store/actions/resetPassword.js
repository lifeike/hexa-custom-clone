import {
  ResetPassword,
} from '@/store/types/actions';

export const resetPasswordLoading = () => ({
  type: ResetPassword.SEND_RESET_PASSWORD_LOADING,
});

export const sendResetPasswordSuccess = data => ({
  type: ResetPassword.SEND_RESET_PASSWORD_SUCCESS,
  data: data,
});

export const resetPasswordClear = () => ({
  type: ResetPassword.SEND_RESET_PASSWORD_RESET,
});

export const resetPasswordSuccess = data => ({
  type: ResetPassword.RESET_PASSWORD_SUCCESS,
  data: data,
});

export const sendPassWordResetEmail = (email) => (dispatch, getState, { AccountService }) => {
  dispatch(resetPasswordLoading());

  return AccountService.sendPassWordResetEmail(email)
    // Always show success, otherwise malicious users can mine email addresses.
    .finally(dispatch(sendResetPasswordSuccess({
      sendResetPasswordSuccess: true,
    })));
};

export const resetPassword = (data) => (dispatch, getState, { AccountService}) => {
  dispatch(resetPasswordLoading());

  return AccountService.resetPassword(data.password, data.token)
    .then(() => {
      dispatch(resetPasswordSuccess({
        resetPasswordSuccess: true,
      }));
    })
    .catch(() => {
      dispatch(resetPasswordSuccess({
        resetPasswordSuccess: false,
      }));
    });
};
