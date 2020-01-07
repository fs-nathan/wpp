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

export const assignMemberToAllTaskSuccess = () => ({
  type: ASSIGN_MEMBER_TO_ALL_TASK_SUCCESS,
});

export const assignMemberToAllTaskFail = (error) => ({
  type: ASSIGN_MEMBER_TO_ALL_TASK_FAIL,
  error: error,
});