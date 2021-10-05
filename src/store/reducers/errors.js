import {
  Errors,
  Account
} from '@/store/types/actions';

export default (state = {errors: []}, action) => {
  switch (action.type) {
  case Errors.GENERAL_ERROR:
    return {
      ...state,
      errors: [...state.errors, {
        message: action.message,
        priority: 10,
      }],
    };
  case Account.LOGIN_ERROR:
    return {
      ...state,
      errors: [...state.errors, {
        message: action.message,
        priority: 5,
      }],
    };
  case Account.SESSION_TIMEOUT:
    return {
      ...state,
      errors: [...state.errors, {
        message: action.message,
        priority: 1,
      }],
    };
  case Errors.RESET_ERROR:
    return {
      ...state,
      errors: [],
    };
  default:
    return state;
  }
};
