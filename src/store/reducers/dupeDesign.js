import {
  DupeDesign
} from '@/store/types/actions';

const INITIAL_STATE = {
  groupId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DupeDesign.SET_DUPE: {
    return {...state, groupId: action.data}
  }
  case DupeDesign.RESET_DUPE: {
    return { ...state, groupId: null };
  }
  default:
    return state;
  }
};
