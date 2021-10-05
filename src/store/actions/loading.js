import {
  Loading,
} from '@/store/types/actions';

export const loading = (source, isLoading) => (dispatch) => dispatch({
  type: Loading.LOADING,
  data: {
    [source]: isLoading,
  },
});
