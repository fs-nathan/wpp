import { Routes } from 'constants/routes';
import { createSelector } from 'reselect';

const profile = state => state.system.profile;
const viewPermissions = state => state.viewPermissions;
const localStorage = state => state.localStorage;

export const routeSelector = createSelector(
  [profile],
  () => {
    return Routes.PROJECT;
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

export const localOptionSelector = createSelector(
  [localStorage],
  (localStorage) => {
    const { project } = localStorage;
    return project;
  }
)