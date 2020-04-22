import { createSelector } from 'reselect';

const colors = state => state.setting.colors;
const memberProject = state => state.project.memberProject;
const permissionProject = state => state.project.permissionProject;
const updateGroupPermissionMember = state => state.project.updateGroupPermissionMember;

export const membersSelector = createSelector(
  [memberProject],
  (memberProject) => {
    const { data: { membersAdded }, loading, error, firstTime } = memberProject;
    return {
      members: membersAdded,
      loading: firstTime ? false : loading,
      error,
      firstTime,
    }
  }
);

export const permissionsSelector = createSelector(
  [permissionProject],
  (permissionProject) => {
    const { data: { groupPermissions, adminPermission }, loading, error, firstTime } = permissionProject;
    return {
      groupPermissions,
      adminPermission,
      loading: firstTime ? false : loading,
      error,
      firstTime,
    }
  }
)

export const updateGroupPermissionSelector = createSelector(
  [updateGroupPermissionMember],
  (updateGroupPermissionMember) => {
    const { loading, error } = updateGroupPermissionMember;
    console.log(updateGroupPermissionMember);
    return {
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