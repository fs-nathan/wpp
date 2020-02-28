import { createSelector } from 'reselect';

const colors = state => state.setting.colors;
const addProjectRoleToMember = state => state.project.addProjectRoleToMember;
const removeProjectRoleFromMember = state => state.project.removeProjectRoleFromMember;
const listUserRole = state => state.userRole.listUserRole;

export const updateMemberRoleSelector = createSelector(
  [addProjectRoleToMember, removeProjectRoleFromMember],
  (addProjectRoleToMember, removeProjectRoleFromMember) => {
    const { loading: addLoading, error: addError} = addProjectRoleToMember;
    const { loading: removeLoading, error: removeError } = removeProjectRoleFromMember;
    return {
      loading: addLoading || removeLoading,
      error: addError || removeError,
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