import { createSelector } from 'reselect';

const profile = state => state.system.profile;

export const routeSelector = createSelector(
  [profile],
  () => {
    return '/tasks/table';
  }
);