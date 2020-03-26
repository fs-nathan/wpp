import { createSelector } from 'reselect';

const colors = state => state.setting.colors;
const memberProject = state => state.project.memberProject;
const addProjectRoleToMember = state => state.project.addProjectRoleToMember;
const removeProjectRoleFromMember = state => state.project.removeProjectRoleFromMember;
const listUserRole = state => state.userRole.listUserRole;

export const updateMemberRoleSelector = createSelector(
  [addProjectRoleToMember, removeProjectRoleFromMember, memberProject],
  (addProjectRoleToMember, removeProjectRoleFromMember, memberProject) => {
    const { loading: addLoading, error: addError } = addProjectRoleToMember;
    const { loading: removeLoading, error: removeError } = removeProjectRoleFromMember;
    const { loading: listLoading, error: listError } = memberProject;
    return {
      loading: addLoading || removeLoading || listLoading,
      error: addError || removeError || listError,
    }
  }
);

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

export const userRolesSelector = createSelector(
  [listUserRole],
  (listUserRole) => {
    const { data: { userRoles }, loading, error } = listUserRole;
    return {
      userRoles,
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