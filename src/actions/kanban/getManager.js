import {
  KANBAN_GET_MANAGER,
  KANBAN_GET_MANAGER_RESET,
  KANBAN_GET_MANAGER_SUCCESS,
  KANBAN_GET_MANAGER_FAIL,
} from 'constants/actions/kanban/getManager';

export const getManager = ({ groupId }, quite = false) => ({
  type: KANBAN_GET_MANAGER,
  quite,
  options: {
    groupId
  },
});

export const getManagerSuccess = ({ managers }, options) => ({
  type: KANBAN_GET_MANAGER_SUCCESS,
  options,
  data: {
    managers,
  }
});

export const getManagerFail = (error, options) => ({
  type: KANBAN_GET_MANAGER_FAIL,
  options,
  error,
});

export const getManagerReset = () => ({
  type: KANBAN_GET_MANAGER_RESET,
});