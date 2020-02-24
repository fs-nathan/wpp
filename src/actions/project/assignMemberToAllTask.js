import {
  ASSIGN_MEMBER_TO_ALL_TASK,
  ASSIGN_MEMBER_TO_ALL_TASK_FAIL,
  ASSIGN_MEMBER_TO_ALL_TASK_SUCCESS,
} from '../../constants/actions/project/assignMemberToAllTask';

export const assignMemberToAllTask = ({ projectId, memberId }) => ({
  type: ASSIGN_MEMBER_TO_ALL_TASK,
  options: {
    projectId,
    memberId,
  },
});

export const assignMemberToAllTaskSuccess = (options) => ({
  type: ASSIGN_MEMBER_TO_ALL_TASK_SUCCESS,
  options,
});

export const assignMemberToAllTaskFail = (error, options) => ({
  type: ASSIGN_MEMBER_TO_ALL_TASK_FAIL,
  options,
  error,
});