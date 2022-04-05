import {
  LIST_TASK_MEMBER,
  LIST_TASK_MEMBER_FAIL,
  LIST_TASK_MEMBER_SUCCESS,
} from "../../constants/actions/task/listTaskMember";

export const listTaskMember = ({ projectId, memberId }, quite = false) => ({
  type: LIST_TASK_MEMBER,
  quite,
  options: {
    projectId,
    memberId,
  },
});

export const listTaskMemberSuccess = ({ tasks, member }, options) => ({
  type: LIST_TASK_MEMBER_SUCCESS,
  options,
  data: {
    tasks,
    member,
  },
});

export const listTaskMemberFail = (error, options) => ({
  type: LIST_TASK_MEMBER_FAIL,
  options,
  error,
});
