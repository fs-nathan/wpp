import { get } from 'lodash';
import { createSelector } from 'reselect';

const profile = state => state.system.profile;

export const routeSelector = createSelector(
  [profile],
  (profile) => {
    const { group_active } = profile;
    const route = get(group_active, 'modules[4].url_redirect', '/users');
    return route;
  }
);