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

export const removeProjectRoleFromMemberSuccess = () => ({
  type: REMOVE_PROJECT_ROLE_FROM_MEMBER_SUCCESS,
});

export const removeProjectRoleFromMemberFail = (error) => ({
  type: REMOVE_PROJECT_ROLE_FROM_MEMBER_FAIL,
  error: error,
});