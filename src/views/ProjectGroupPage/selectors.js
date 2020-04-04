import { get } from 'lodash';
import { createSelector } from 'reselect';

const profile = state => state.system.profile;

export const routeSelector = createSelector(
  [profile],
  (profile) => {
    const { group_active } = profile;
    const route = get(group_active, 'modules[1].url_redirect', '/projects');
    return route;
  }
);