import axios from 'axios';
import { ERRORS } from '@/utils/constants/constants';
import { applicationError } from '@/store/actions/error';
import { Store } from '@/store/store';
import { awaitRefresh } from '@/services/ApiService/apiManager';
import { logout, refreshToken } from '@/store/actions/account';

export const handleGlobalErrors = async (error) => {

  if (error && error.response && error.response.status === 401) {
    // eslint-disable-next-line no-console
    console.log('401 error detected: retry request once.');

    try {
      //wait for token refresh and then retry once
      //if this is the first request that failed, the await should be resolved by default and move on.
      await Store.dispatch(refreshToken());
      const config = await awaitRefresh(error.config);

      const retry = await axios.request(config);

      return Promise.resolve(retry);

    // eslint-disable-next-line no-empty
    } catch (e) {
      Store.dispatch(logout(true));
    }
  }
  else {
    Store.dispatch(applicationError(ERRORS.GENERAL_ERROR));
  }

  return Promise.reject(error);
};

export const checkForErrorInData = (response) => {
  //Check for additional failure conditions outside of axios defaults.
  if (response && response.data && response.data.success === false) {
    Store.dispatch(applicationError(ERRORS.GENERAL_ERROR));

    return Promise.reject(response);
  }

  return response;
};
