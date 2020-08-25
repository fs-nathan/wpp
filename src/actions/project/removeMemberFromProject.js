import {
  REMOVE_MEMBER_PROJECT,
  REMOVE_MEMBER_PROJECT_FAIL,
  REMOVE_MEMBER_PROJECT_SUCCESS,
} from '../../constants/actions/project/removeMemberProject';

export const removeMemberProject = ({ projectId, memberId }) => ({
  type: REMOVE_MEMBER_PROJECT,
  options: {
    projectId,
    memberId,
  },
});

export const removeMemberProjectSuccess = (options) => ({
  type: REMOVE_MEMBER_PROJECT_SUCCESS,
  options,
});

export const removeMemberProjectFail = (error, options) => ({
  type: REMOVE_MEMBER_PROJECT_FAIL,
  options,
  error,
});