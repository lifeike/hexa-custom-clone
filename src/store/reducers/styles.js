import {
  Styles,
} from '@/store/types/actions';


const INITIAL_STATE = {
  loading: false,
  jackets: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Styles.SUCCESS:
    return {
      ...state,
      jackets: action.data,
      loading: false,
    };
  case Styles.LOADING:
    return {
      ...state,
      loading: true,
    };
  case Styles.ERROR:
    return {
      ...state,
      loading: false,
    };
  default:
    return state;
  }
};
