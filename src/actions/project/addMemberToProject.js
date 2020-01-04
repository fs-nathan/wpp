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

export const addMemberProjectSuccess = () => ({
  type: ADD_MEMBER_PROJECT_SUCCESS,
});

export const addMemberProjectFail = (error) => ({
  type: ADD_MEMBER_PROJECT_FAIL,
  error: error,
});