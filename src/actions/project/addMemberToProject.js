import {
  ADD_MEMBER_PROJECT,
  ADD_MEMBER_PROJECT_FAIL,
  ADD_MEMBER_PROJECT_SUCCESS,
} from '../../constants/actions/project/addMemberProject';

export const addMemberProject = ({ projectId, memberId, groupPermission, roles }) => ({
  type: ADD_MEMBER_PROJECT,
  options: {
    projectId,
    memberId,
    groupPermission,
    roles,
  },
});

export const addMemberProjectSuccess = (options) => ({
  type: ADD_MEMBER_PROJECT_SUCCESS,
  options,
});

export const addMemberProjectFail = (error, options) => ({
  type: ADD_MEMBER_PROJECT_FAIL,
  options,
  error,
});