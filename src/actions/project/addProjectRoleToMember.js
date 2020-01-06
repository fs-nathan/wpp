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

export const addProjectRoleToMemberSuccess = () => ({
  type: ADD_PROJECT_ROLE_TO_MEMBER_SUCCESS,
});

export const addProjectRoleToMemberFail = (error) => ({
  type: ADD_PROJECT_ROLE_TO_MEMBER_FAIL,
  error: error,
});