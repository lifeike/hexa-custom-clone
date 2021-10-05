import { createSelector } from 'reselect';

export const errorSelector = state => state.errors.errors;

export const priorityError = createSelector(
  [errorSelector],
  (errors) => {
    if (!errors || errors.length <= 0) return '';

    if (errors.length > 1) {
      errors.sort((a, b) => { return a.priority < b.priority;});
    }

    return errors[0].message;
  }
);
