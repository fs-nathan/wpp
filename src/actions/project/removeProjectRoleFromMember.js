import {
  REMOVE_PROJECT_ROLE_FROM_MEMBER,
  REMOVE_PROJECT_ROLE_FROM_MEMBER_FAIL,
  REMOVE_PROJECT_ROLE_FROM_MEMBER_SUCCESS,
} from '../../constants/actions/project/removeProjectRoleFromMember';

export const removeProjectRoleFromMember = ({ projectId, memberId, roleId }) => ({
  type: REMOVE_PROJECT_ROLE_FROM_MEMBER,
  options: {
    projectId,
    memberId,
    roleId,
  },
});

export const removeProjectRoleFromMemberSuccess = (options) => ({
  type: REMOVE_PROJECT_ROLE_FROM_MEMBER_SUCCESS,
  options,
});

export const removeProjectRoleFromMemberFail = (error, options) => ({
  type: REMOVE_PROJECT_ROLE_FROM_MEMBER_FAIL,
  options,
  error,
});