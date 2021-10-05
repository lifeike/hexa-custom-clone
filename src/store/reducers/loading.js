import {
  Loading,
} from '@/store/types/actions';

export default (state = {}, action) => {
  switch (action.type) {
  case Loading.LOADING:
    return {
      ...{...state, ...action.data},
    } ;
  default:
    return state;
  }
};
