import {
  FetchLogos,
  DeleteLogo
} from '@/store/types/actions';
import { loading } from '@/store/actions/loading';

export const fetchLogosSuccess = data => ({
  type: FetchLogos.SUCCESS,
  data: data,
});

export const deleteLogoSuccess = data => ({
  type: DeleteLogo.SUCCESS,
  data: data,
});

export const deleteLogoFailure = error => ({
  type: DeleteLogo.ERROR,
  data: error,
});

/**
 * A function used to preload all the User / Company logos
 */
export const fetchLogos = () => async (dispatch, getState, { LogoService }) => {
  try {
    dispatch(loading('logos', true));
    const {
      account: {
        user: {
          id,
        },
      },
      selectedOrder: {
        order: {
          groupId,
          order: {
            store: {
              storeNo,
            },
          },
        },
      },
    } = getState();

    const { data } = await LogoService.getLogos(id, storeNo, groupId);
    // get the options by store and style
    const normalized = data.reduce((map, logo) => {
      map[logo.id] = logo;

      return map;
    }, {});

    dispatch(fetchLogosSuccess(normalized));
  }
  finally {
    dispatch(loading('logos', false));
  }
};

/**
 * Deletes a user uploaded logo
 * @param {string} logoId
 */
export const deleteLogo = logoId => async (dispatch, getState, { LogoService }) => {
  if (!logoId) return;

  try {
    dispatch(loading('deleteLogo', true));

    const state = getState();
    const userId = state.account.user.id;

    const { data } = await LogoService.deleteLogoForUser(userId, logoId);

    if (data.success) {
      dispatch(fetchLogos());
    }

  } catch (error) {
    dispatch(deleteLogoFailure(error));
  } finally {
    dispatch(loading('deleteLogo', false));
  }
};

/**
 * Create a Logo on the server. Upload a vector file, will create png and associations with order / user.
 * @param {string} name
 * @param {int} type
 * @param {binary string} file
 */
export const createLogo = (name, labType, file) => async (dispatch, getState, { LogoService }) => {
  try {
    dispatch(loading('createLogo', true));

    const {
      account: {
        user: {
          id,
        },
      },
      selectedOrder: {
        order: {
          groupId,
          order: {
            store: {
              storeNo,
            },
          },
        },
      },
    } = getState();

    const labNo = labType === '2' ? groupId : storeNo;

    const { data } = await LogoService.createLogo(id, labNo, name, labType, file);

    if (data && data.result && data.result.id) {
      dispatch(fetchLogos());

      return Promise.resolve(data.result);
    }
  } finally {
    dispatch(loading('createLogo', false));
  }

  return Promise.reject();
};
