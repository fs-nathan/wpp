import { Routes } from 'constants/routes';
import { createSelector } from 'reselect';

const profile = state => state.system.profile;
const viewPermissions = state => state.viewPermissions;

export const routeSelector = createSelector(
  [profile],
  () => {
    return Routes.MEMBERS;
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