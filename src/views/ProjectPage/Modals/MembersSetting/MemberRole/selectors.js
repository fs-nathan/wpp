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
    const { loading: listLoading, error: listError, firstTime } = memberProject;
    return {
      loading: addLoading || removeLoading || (firstTime ? false : listLoading),
      error: addError || removeError || listError,
      firstTime,
    }
  }
);

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

export const userRolesSelector = createSelector(
  [listUserRole],
  (listUserRole) => {
    const { data: { userRoles }, loading, error, firstTime } = listUserRole;
    return {
      userRoles,
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