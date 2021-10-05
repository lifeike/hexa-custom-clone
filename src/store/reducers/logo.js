import {
  FetchLogos,
  LogoOptions,
  Account,
} from '@/store/types/actions';


const INITIAL_STATE = {
  library: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FetchLogos.SUCCESS:
    return {
      ...state,
      library: action.data,
    };
  case LogoOptions.SUCCESS:
    return {
      ...state,
      options: action.data,
    };
  case Account.LOGIN_CHANGE:
    return {};
  default:
    return state;
  }
};
