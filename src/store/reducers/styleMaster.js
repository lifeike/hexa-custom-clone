import {
  StyleMaster,
} from '@/store/types/actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case StyleMaster.SUCCESS:
    return {
      ...state,
      ...action.data,
    };
  default:
    return state;
  }
};
