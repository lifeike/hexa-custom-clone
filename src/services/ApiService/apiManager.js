import { setup } from 'axios-cache-adapter';
import localforage from 'localforage';
import { Store } from '@/store/store';
import { refreshToken, logout } from '@/store/actions/account';
import { getTokenInformation } from '@/services/tokenService';

import { handleGlobalErrors, checkForErrorInData } from './responseInterceptors';

// const DEFAULT_HEADERS = {
//   'Accept': 'application/json, text/javascript, */*; q=0.01',
// };

function getAccessToken() {
  const token = getTokenInformation();

  return `bearer ${token}`;
}

const DEFAULT_OPTIONS = {
  checkForDataErrors: true,
  useAuthHeaders: true,
};

export const getClient = (axiosOptions, customOptions) => {

  const options = {
    ...DEFAULT_OPTIONS,
    ...customOptions,
  };

  const store = localforage.createInstance({
    // List of drivers used
    driver: [
      localforage.LOCALSTORAGE,
    ],
    name: 'hexa',
  });

  const client = setup({
    ...axiosOptions,
    timeout: 60000,
    // headers: DEFAULT_HEADERS,
    cache: {
      maxAge: 1000 * 60,
      store,
      exclude: {
        paths: [
          '/*/groups/seller/*',
          '/*/groups/*',
          '/*/image/user/*',
          '/*/image/store/*',
        ],
      },
      invalidate: async (config, request) => {
        const method = request.method.toLowerCase();

        if (method !== 'get') {
          await config.store.removeItem(config.uuid);

          const parts = config.uuid.split('/');

          while(parts.length > 3) {
            parts.pop();
            await config.store.removeItem(parts.join('/'));
          }
        }
      },
    },
  });

  if (options.useAuthHeaders) {
    client.interceptors.request.use(async request => {
      try {
        // check to see if we need a new token
        const token = getTokenInformation();

        if (!token) {
          Store.dispatch(logout(true));

          return false;
        }

        const lastUpdate = token.timestamp;

        const needsUpdate = lastUpdate && (new Date() - new Date(lastUpdate) > 2 * 60 * 60 * 1000); // 2 hours

        const config = await awaitRefresh(request);

        if (!needsUpdate) return config;
        await Store.dispatch(refreshToken());
        config.headers['Authorization'] = getAccessToken();

        return request;
      }
      catch {
        Store.dispatch(logout(true));

        return false;
      }
    });
  }

  if (options.checkForDataErrors) {
    // Global Interceptors.
    client.interceptors.response.use(response => checkForErrorInData(response), error => handleGlobalErrors(error));
  }

  return client;
};

export const awaitRefresh = async config => {
  const tokenState = Store.getState().token;

  //wait should be fine since promise default state is resolved.
  await tokenState.refresh;
  config.headers['Authorization'] = getAccessToken();

  return config;
};
