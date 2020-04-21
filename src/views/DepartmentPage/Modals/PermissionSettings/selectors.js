import { createSelector } from 'reselect';

const colors = state => state.setting.colors;
const permissionUser = state => state.user.permissionUser;

export const permissionsSelector = createSelector(
  [permissionUser],
  (permissionUser) => {
    const { data: { groupPermissions, adminPermission }, loading, error } = permissionUser;
    return {
      groupPermissions,
      adminPermission,
      loading,
      error,
    }
  }
)

export const bgColorSelector = createSelector(
  [colors],
  (colors) => {
    return colors.find(item => item.selected === true);
  }
)