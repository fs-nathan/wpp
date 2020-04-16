import { createSelector } from 'reselect';

const colors = state => state.setting.colors;
const memberProject = state => state.project.memberProject;
const permissionProject = state => state.project.permissionProject;
const updateGroupPermissionMember = state => state.project.updateGroupPermissionMember;

export const membersSelector = createSelector(
  [memberProject],
  (memberProject) => {
    const { data: { membersAdded }, loading, error } = memberProject;
    return {
      members: membersAdded,
      loading,
      error,
    }
  }
);

export const permissionsSelector = createSelector(
  [permissionProject],
  (permissionProject) => {
    const { data: { groupPermissions }, loading, error } = permissionProject;
    return {
      groupPermissions,
      loading,
      error,
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