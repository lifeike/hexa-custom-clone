import { Account } from '@/store/types/actions';

const INITIAL_STATE = {
  loading: false,
  user: {},
  authLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Account.LOGIN_CHANGE: {
    const user = action.data;

    user.isLoggedIn = (user && !!user.token && !!user.id);

    localStorage.setItem('user', JSON.stringify(user));

    return {
      ...state,
      user: user,
      loading: false,
    };
  }
  case Account.LOGIN_LOADING:
    return {
      ...state,
      loading: true,
    };
  case Account.AUTH_LOADING:
    return {
      ...state,
      authLoading: true,
    };
  case Account.AUTH_COMPLETE:
    return {
      ...state,
      authLoading: false,
    };
  case Account.LOGIN_ERROR:
    return {
      ...state,
      loading: false,
    };
  default:
    return state;
  }
};
