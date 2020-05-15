import { createSelector } from 'reselect';

const colors = state => state.setting.colors;
const permissionUser = state => state.user.permissionUser;
const updateGroupPermissionUser = state => state.user.updateGroupPermissionUser;

export const permissionsSelector = createSelector(
  [permissionUser],
  (permissionUser) => {
    const { data: { groupPermissions, adminPermission }, loading, error, firstTime } = permissionUser;
    return {
      groupPermissions,
      adminPermission,
      loading: firstTime ? false : loading,
      error,
      firstTime,
    }
  }
)

export const bgColorSelector = createSelector(
  [colors],
  (colors) => {
    return colors.find(item => item.selected === true);
  }
)


export const updateGroupPermissionSelector = createSelector(
  [updateGroupPermissionUser],
  (updateGroupPermissionUser) => {
    const { loading, error } = updateGroupPermissionUser;
    return {
      loading,
      error,
    }
  }
)
