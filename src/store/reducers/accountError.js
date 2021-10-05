import { AccountError } from '@/store/types/actions';

const INITIAL_STATE = {
  showError: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case AccountError.TOGGLE_SHOW_ACCOUNTERROR: {

    return {
      ...state,
      showError: action.data,
    };
  }
  default:
    return state;
  }
};
