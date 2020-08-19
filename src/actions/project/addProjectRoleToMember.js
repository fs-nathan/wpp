import {
  ADD_PROJECT_ROLE_TO_MEMBER,
  ADD_PROJECT_ROLE_TO_MEMBER_FAIL,
  ADD_PROJECT_ROLE_TO_MEMBER_SUCCESS,
} from '../../constants/actions/project/addProjectRoleToMember';

export const addProjectRoleToMember = ({ projectId, memberId, roleId }) => ({
  type: ADD_PROJECT_ROLE_TO_MEMBER,
  options: {
    projectId,
    memberId,
    roleId,
  },
});

export const addProjectRoleToMemberSuccess = (options) => ({
  type: ADD_PROJECT_ROLE_TO_MEMBER_SUCCESS,
  options,
});

export const addProjectRoleToMemberFail = (error, options) => ({
  type: ADD_PROJECT_ROLE_TO_MEMBER_FAIL,
  options,
  error,
});