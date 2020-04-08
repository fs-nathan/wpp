import { get } from 'lodash';
import { createSelector } from 'reselect';

const profile = state => state.system.profile;
const viewPermissions = state => state.viewPermissions;

export const routeSelector = createSelector(
  [profile],
  (profile) => {
    const { group_active } = profile;
    const route = get(group_active, 'modules[4].url_redirect', '/users');
    return route;
  }
);

export const viewPermissionsSelector = createSelector(
  [viewPermissions],
  (viewPermissions) => {
    const { data: { users }, loading, error } = viewPermissions;
    return ({
      permissions: users,
      loading,
      error,
    });
  }
);