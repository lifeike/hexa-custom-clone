import {
  Colors,
} from '@/store/types/actions';
import { loading } from '@/store/actions/loading';

export const colorsLoading = () => ({
  type: Colors.LOADING,
});

export const colorsSuccess = data => ({
  type: Colors.SUCCESS,
  data: data,
});

export const colorsError = () => ({
  type: Colors.ERROR,
});

/**
 * A function used to preload all the color definitions.
 */
export const fetchColors = () => async (dispatch, getState, { StyleService }) => {
  const state = getState();
  // Let's check the state for data and only load if empty since this is static data.
  const hasState = state.colors.length > 0;

  if (!hasState) {
    dispatch(colorsLoading());
    dispatch(loading('colors', true));

    try {
      const { data: {data: {cp_dict_color: colors}} } = await StyleService.getColors();
      // get the options by store and style
      const normalized = colors.reduce((map, color) => {
        map[color.id] = color;

        return map;
      }, {});

      dispatch(colorsSuccess(normalized));
    }
    catch(e) {
      dispatch(colorsError());
    }
    dispatch(loading('colors', false));
  }
};
