import {
  UPDATE_STATE_JOIN_TASK,
  UPDATE_STATE_JOIN_TASK_FAIL,
  UPDATE_STATE_JOIN_TASK_SUCCESS,
} from '../../constants/actions/project/updateStateJoinTask';

export const updateStateJoinTask = ({ projectId, memberId, state }) => ({
  type: UPDATE_STATE_JOIN_TASK,
  options: {
    projectId,
    memberId,
    state,
  },
});

export const updateStateJoinTaskSuccess = (options) => ({
  type: UPDATE_STATE_JOIN_TASK_SUCCESS,
  options,
});

export const updateStateJoinTaskFail = (error, options) => ({
  type: UPDATE_STATE_JOIN_TASK_FAIL,
  options,
  error,
});