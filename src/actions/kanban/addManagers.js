import {
  KANBAN_ADD_MANAGERS,
  KANBAN_ADD_MANAGERS_RESET,
  KANBAN_ADD_MANAGERS_SUCCESS,
  KANBAN_ADD_MANAGERS_FAIL,
} from 'constants/actions/kanban/addManagers';

export const addManagers = ({ groupId, managers }, quite = false) => ({
  type: KANBAN_ADD_MANAGERS,
  quite,
  options: {
    groupId,
    managers
  },
});

export const addManagersSuccess = ({ managers }, options) => ({
  type: KANBAN_ADD_MANAGERS_SUCCESS,
  options,
  data: {
    managers,
  }
});

export const addManagersFail = (error, options) => ({
  type: KANBAN_ADD_MANAGERS_FAIL,
  options,
  error,
});

export const addManagersReset = () => ({
  type: KANBAN_ADD_MANAGERS_RESET,
});