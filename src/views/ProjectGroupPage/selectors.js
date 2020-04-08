import { get } from 'lodash';
import { createSelector } from 'reselect';

const profile = state => state.system.profile;
const viewPermissions = state => state.viewPermissions;

export const routeSelector = createSelector(
  [profile],
  (profile) => {
    const { group_active } = profile;
    const route = get(group_active, 'modules[1].url_redirect', '/projects');
    return route;
  }
);

export const viewPermissionsSelector = createSelector(
  [viewPermissions],
  (viewPermissions) => {
    const { data: { projects }, loading, error } = viewPermissions;
    return ({
      permissions: projects,
      loading,
      error,
    });
  }
);