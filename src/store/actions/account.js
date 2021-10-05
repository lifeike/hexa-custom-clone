import {
  Account,
  Token,
} from '@/store/types/actions';
import { loading } from '@/store/actions/loading';
import { ERRORS } from '@/utils/constants/constants';
import { getTokenInformation, setTokenInformation } from '@/services/tokenService';

export const loginChange = data => ({
  type: Account.LOGIN_CHANGE,
  data: data,
});

export const loginLoading = () => ({
  type: Account.LOGIN_LOADING,
});

export const loginError = error => ({
  type: Account.LOGIN_ERROR,
  message: error,
});

export const AuthLoading = () => ({
  type: Account.AUTH_LOADING,
});

export const AuthComplete = () => ({
  type: Account.AUTH_COMPLETE,
});

export const SessionTimeout = message => ({
  type: Account.SESSION_TIMEOUT,
  message: message,
});

export const login = (account) => async (dispatch, getState, { AccountService, AuthService }) => {
  dispatch(loading('account', true));
  dispatch(loginLoading(true));

  try {
    const data = await AuthService.getToken(account.email, account.password);

    setTokenInformation(data);

    const user = await AccountService.login(account);

    dispatch(loginChange(user));

    return Promise.resolve();
  }
  catch(error){
    dispatch(loginError(ERRORS.LOGIN_ERROR));

    return Promise.reject();
  }
  finally {
    dispatch(loading('account', false));
  }
};

export const refreshToken = () => async (dispatch, getState, { AuthService }) => {
  dispatch(loading('refreshToken', true));
  const thePromise = new Promise(async (resolve, reject) => {
    try {
      const tokenInformation = getTokenInformation();
      const data = await AuthService.refreshToken(tokenInformation.refreshToken);

      setTokenInformation(data);
      resolve();
    }
    catch(e){
      const { expiration } = getTokenInformation();
      // below will work with nulls.
      const expiresAt = new Date(expiration);

      if (expiresAt < new Date()) {
        dispatch(loginChange({}));
        dispatch(SessionTimeout(ERRORS.SESSION_TIMEOUT));

        reject();
      }
      resolve();
    }
    finally {
      dispatch(loading('refreshToken', false));
    }
  });

  dispatch({
    'type': Token.LOADING,
    'data': thePromise,
  });

  return thePromise;
};

export const logout = (timeout) => (dispatch, getState) => {
  if (timeout) {
    dispatch(loginChange({}));
    dispatch(SessionTimeout(ERRORS.SESSION_TIMEOUT));
  }
  else {
    dispatch(loginChange({}));
  }

};

export const restoreUser = () => async (dispatch, getState) => {
  dispatch(AuthLoading());
  const { user } = getState().account;

  if (!user || !user.isLoggedIn) {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.token && storedUser.id) {
      await dispatch(loginChange(storedUser));
    }
  }

  dispatch(AuthComplete());
};
