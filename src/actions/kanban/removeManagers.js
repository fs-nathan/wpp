import {
  KANBAN_REMOVE_MANAGERS,
  KANBAN_REMOVE_MANAGERS_RESET,
  KANBAN_REMOVE_MANAGERS_SUCCESS,
  KANBAN_REMOVE_MANAGERS_FAIL,
} from 'constants/actions/kanban/removeManagers';

export const removeManagers = ({ groupId, managers }, quite = false) => ({
  type: KANBAN_REMOVE_MANAGERS,
  quite,
  options: {
    groupId,
    managers
  },
});

export const removeManagersSuccess = ({ managers }, options) => ({
  type: KANBAN_REMOVE_MANAGERS_SUCCESS,
  options,
  data: {
    managers,
  }
});

export const removeManagersFail = (error, options) => ({
  type: KANBAN_REMOVE_MANAGERS_FAIL,
  options,
  error,
});

export const removeManagersReset = () => ({
  type: KANBAN_REMOVE_MANAGERS_RESET,
});