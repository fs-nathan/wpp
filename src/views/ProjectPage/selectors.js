import { createSelector } from 'reselect';

const profile = state => state.system.profile;
const viewPermissions = state => state.viewPermissions;

export const routeSelector = createSelector(
  [profile],
  () => {
    return '/tasks/table';
  }
);

export const viewPermissionsSelector = createSelector(
  [viewPermissions],
  (viewPermissions) => {
    const { data: { detailProject }, loading, error } = viewPermissions;
    return ({
      permissions: detailProject,
      loading,
      error,
    });
  }
);