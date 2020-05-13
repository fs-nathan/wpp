import { MEMBER_PROJECT, MEMBER_PROJECT_FAIL, MEMBER_PROJECT_RESET, MEMBER_PROJECT_SUCCESS } from '../../constants/actions/project/memberProject';

export const memberProject = ({ projectId }, quite = false) => ({
  type: MEMBER_PROJECT,
  quite,
  options: {
    projectId,
  },
});

export const memberProjectSuccess = ({ membersAdded, membersFree, totalTask }, options) => ({
  type: MEMBER_PROJECT_SUCCESS,
  options,
  data: {
    membersAdded,
    membersFree,
    totalTask,
  }
});

export const memberProjectFail = (error, options) => ({
  type: MEMBER_PROJECT_FAIL,
  options,
  error,
});

export const memberProjectReset = () => ({
  type: MEMBER_PROJECT_RESET,
});