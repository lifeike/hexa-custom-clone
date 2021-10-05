import {
  Colors,
} from '@/store/types/actions';


const INITIAL_STATE = {
  loading: false,
  colors: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Colors.SUCCESS:
    return {
      ...state,
      colors: action.data,
      loading: false,
    };
  case Colors.LOADING:
    return {
      ...state,
      loading: true,
    };
  case Colors.ERROR:
    return {
      ...state,
      loading: false,
    };
  default:
    return state;
  }
};
