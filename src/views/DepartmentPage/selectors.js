import { Routes } from 'constants/routes';
import { find, get } from 'lodash';
import { createSelector } from 'reselect';

const profile = state => state.system.profile;
const viewPermissions = state => state.viewPermissions;

export const routeSelector = createSelector(
  [profile],
  (profile) => {
    const { group_active } = profile;
    const modules = get(group_active, 'modules', []);
    const route = get(find(modules, { name: "Users" }), 'url_redirect', Routes.DEPARTMENTS);
    return route;
  }
);

export const viewPermissionsSelector = createSelector(
  [viewPermissions],
  (viewPermissions) => {
    const { data: { users }, loading, error, firstTime } = viewPermissions;
    return ({
      permissions: users,
      loading: firstTime ? false : loading,
      error,
    });
  }
);