import {
  Token,
} from '@/store/types/actions';


const INITIAL_STATE = {
  refresh: Promise.resolve(),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Token.LOADING:
    return {
      ...state,
      refresh: action.data,
    };
  default:
    return state;
  }
};
