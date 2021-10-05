import { createSelector } from 'reselect';

export const loadingSelector = state => state.loading;

export const isLoading = createSelector(
  [loadingSelector],
  (loadingArray) => {
    return Object.values(loadingArray).includes(true);
  }
);
